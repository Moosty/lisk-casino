import React, {useContext, useEffect, useState} from "react";
import {
  Button,
  Container,
  Form,
  FormColumn,
  FormElement,
  FormRow,
  MultipleChoice,
  SimpleInput,
  TextFieldInput,
  Typography,
} from "@moosty/dao-storybook"
import {useMembers} from "../hooks/members";
import {createTransaction} from "../utils/transactions";
import {Buffer} from "@liskhq/lisk-client";
import {transactionStates} from "@moosty/dao-storybook/dist/stories/modals/templates/resultTransaction";
import {AppContext} from "../appContext";
import {useHistory} from "react-router-dom";

const defaultFormData = {
  members: [
    {
      id: 1,
      selectedItem: {id: 0, name: "Select a member"},
      placeholder: "Answer option"
    },
  ]
}

export const CreateDao = ({account, setModal}) => {
  const history = useHistory();
  const {getClient} = useContext(AppContext);
  const {members} = useMembers();
  const [formData, setFormData] = useState(defaultFormData);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let errors = {}
    if (formData?.name) {
      const nameRegex = /^(?=.{3,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      if (!formData?.name?.match(nameRegex)) {
        errors.name = <div>
          DAO name only allowed [a-zA-Z0-9._] <br/>
          (do not start or end with _ or . nor use them double)
        </div>
      }
      if (formData?.name?.length > 50) {
        errors.name = "DAO name should be 50 characters or shorter"
      }
      if (formData?.name?.length < 3) {
        errors.name = "DAO name should be at least 3 characters long"
      }
    }
    if (formData.description) {
      if (formData?.description?.length > 140) {
        errors.description = "Description should be 140 characters or shorter"
      }
      if (formData?.description?.length < 3) {
        errors.description = "Description should be at least 3 characters long"
      }
    }
    setFormErrors(errors)
  }, [formData])

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const onCreate = async () => {
    const client = await getClient
    const fee = await createTransaction({
      moduleId: 3500,
      assetId: 0,
      assets: {
        name: formData.name,
        members: [
          ...formData.members.map(m => m?.value?.address && ({
            id: new Buffer.from(m.value.address, 'hex'),
            isDao: false,
          })).filter(Boolean),
        ],
        rules: {},
        description: formData.description,
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account.username,
      transactionType: "dao:create",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmit()
      }
    })
  }

  const onSubmit = async () => {
    setLoadingCreate(true)
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3500,
      assetId: 0,
      assets: {
        name: formData.name,
        members: [
          ...formData.members.map(m => m?.value?.address && ({
            id: new Buffer.from(m.value.address, 'hex'),
            isDao: false,
          })).filter(Boolean),
        ],
        rules: {},
        description: formData.description,
      },
      account,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setError(null)
          setLoadingCreate(false)
          setSuccess(true)
          setModal({
            type: "transactionResult",
            text: `Your DAO is created successfully`,
            state: transactionStates.confirmed
          })
          history.push('/')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setError(result.message)
      setLoadingCreate(false)
      setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
    }
  }

  useEffect(() => {
    if (!account) {
      setModal("login")
    }
  }, [account])

  useEffect(() => console.log(formData), [formData])

  return (<Container>
    <div className="lg:ml-4 my-4 ">
      <Typography type="h2" Element='h2'>
        Create new DAO
      </Typography>
    </div>
    {/*Form*/}
    <Form className="lg:grid lg:grid-cols-2 lg:divide-x-2 lg:divide-formDivider">
      {/*COLUMN LEFT */}
      <FormColumn className="lg:mx-4 lg:mr-10">
        <FormRow>
          <FormElement label="Creating your DAO">
            <Typography type="body">
              Every Decentralized Organization has a name and a purpose. Try to give a short description of the
              purpose of your DAO
            </Typography></FormElement>
        </FormRow>
        <FormRow>
          <FormElement
            errorMessage={formErrors?.name}
            label="DAO Name">
            <SimpleInput
              value={formData?.name || ""}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="The LCU Community"
            />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement
            errorMessage={formErrors?.description}
            label="A short description of the purpose">
            <TextFieldInput
              value={formData?.description || ""}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="A blockchain developers community that shares knowledge to facilitate blockchain innovation."/>
          </FormElement>
        </FormRow>
      </FormColumn>

      {/*COLUMN RIGHT*/}
      <FormColumn className="">
        <div className="lg:ml-10 ">
          <FormRow>
            <FormElement label="Creating your DAO">
              <Typography type="body">
                The DAO starts with a group of founding members. These members need to
                be in the DAO from the start.
                You are in the new DAO by default.
              </Typography></FormElement>
          </FormRow>
          <FormRow className="">
            <FormElement label="Select all founding members">
              <MultipleChoice
                maxItems={10}
                onChange={(options) => {
                  console.log(options)
                  updateFormData('members', [...options.map(option => ({...option, selectedItem: option.value}))])
                }}
                minItems={1}
                type={"inputAvatar"}
                newOptionPlaceholder={"Answer option"}
                typeOptions={{
                  items: members,
                  selectedItem: {id: 0, name: "Select a member"},
                }}
                options={formData?.members.map(m => {
                  console.log(m.selectedItem)
                  return m
                })}
              />
            </FormElement>
          </FormRow>
          <div className="pt-5">
            <div className="flex justify-end">
              <Button
                shadow
                onClick={() => setFormData({
                  ...defaultFormData,
                  members: [
                    ...defaultFormData.members.map(m => ({
                      ...m,
                      id: (Math.floor(Math.random() * 10001) + 100)
                    }))
                  ]
                })}
                label="Cancel"
                secondary
              />
              <Button
                disabled={formData.members.filter(m => !!m.value).length === 0 || !formData.name || !formData.description || formErrors?.name || formErrors?.description}
                onClick={onCreate}
                iconBefore
                label="Create DAO"
                className="ml-2"
                shadow
                icon={<svg
                  className="mr-2"
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.211 1.36361L1.74279 6.29055C1.59583 6.332 1.46503 6.41731 1.36786 6.53509C1.27069 6.65287 1.21178 6.79751 1.19901 6.94966C1.18624 7.10182 1.22021 7.25424 1.29639 7.38657C1.37257 7.5189 1.48733 7.62483 1.62532 7.69019L9.65133 11.492C9.80787 11.5661 9.93392 11.6922 10.0081 11.8487L13.8099 19.8747C13.8752 20.0127 13.9812 20.1275 14.1135 20.2037C14.2458 20.2798 14.3982 20.3138 14.5504 20.301C14.7025 20.2883 14.8472 20.2294 14.965 20.1322C15.0827 20.035 15.1681 19.9042 15.2095 19.7573L20.1364 2.28904C20.1726 2.16073 20.174 2.02509 20.1403 1.89609C20.1066 1.76709 20.0392 1.64939 19.9449 1.55512C19.8507 1.46085 19.733 1.39341 19.604 1.35975C19.475 1.32609 19.3393 1.32742 19.211 1.36361Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.8934 11.6067L14.136 7.36401" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>}
              />
            </div>
          </div>
        </div>
      </FormColumn>
    </Form>
  </Container>)
}