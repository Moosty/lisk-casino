/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {transactions} from "@liskhq/lisk-client"
import {
  Button,
  Container,
  Form,
  FormColumn,
  FormElement,
  FormRow,
  InputAvatar,
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
import {categories, projectImages} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import moment from "moment";
import {useBlocks} from "../hooks/blocks";

const defaultFormData = {
  members: [
    {
      id: 1,
      selectedItem: {id: 0, name: "Select a member"},
      placeholder: "Answer option"
    },
  ]
}

export const CreateCrowdfund = ({account, setModal}) => {
  const history = useHistory();
  const {getClient, blockTime} = useContext(AppContext);
  const {height} = useBlocks();
  const [formData, setFormData] = useState(defaultFormData);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let errors = {}
    if (formData?.start) {
      if (moment(formData.start).isBefore(moment().subtract(1, 'd'))) {
        errors.start = "Project start date should be in the future"
      }
    }
    if (formData?.title) {
      const nameRegex = /^(?=.{5,50}$)(?![_.\W])(?!.*[_.\W]{2})[a-zA-Z0-9._\W]+(?<![_.\W])$/
      if (!formData?.title?.match(nameRegex)) {
        errors.title = <div>
          Project name only allowed [a-zA-Z0-9._ ] <br/>
          (do not start or end with _ or . nor use them double)
        </div>
      }
      if (formData?.title?.length > 50) {
        errors.title = "Project name should be 50 characters or shorter"
      }
      if (formData?.title?.length < 5) {
        errors.title = "Project name should be at least 3 characters long"
      }
    }
    if (formData.description) {
      if (formData?.description?.length > 250) {
        errors.description = "Description should be 250 characters or shorter"
      }
      if (formData?.description?.length < 20) {
        errors.description = "Description should be at least 3 characters long"
      }
    }
    if (formData.periods) {
      if (formData?.periods < 2) {
        errors.periods = "Your project should have at least 2 periods"
      }
    }
    if (formData.goal) {
      if (formData?.goal < 2) {
        errors.goal = "Your projects goal needs to be at least 2 LSK"
      }
      if (formData?.goal > 250) {
        errors.goal = "Your projects goal needs to be lower than 251 LSK"
      }
    }
    if (formData.site) {
      const siteRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      if (!formData?.site?.match(siteRegex)) {
        errors.site = "Your site needs to be a valid url"
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
    const start = moment(formData.start).isBefore(moment()) && moment(formData.start).isAfter(moment().subtract(1, 'd')) ?
      height + 10 : Math.floor((moment(formData?.start).diff(moment()) / 1000) / blockTime) + height;
    const fee = await createTransaction({
      moduleId: 3510,
      assetId: 0,
      assets: {
        title: formData.title,
        description: formData.description,
        goal: BigInt(transactions.convertLSKToBeddows(formData.goal.toString())),
        periods: formData.periods,
        site: formData.site,
        image: parseInt(formData.image.id),
        category: parseInt(formData.category.id),
        start: start,
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account?.summary?.username,
      transactionType: "crowd:create",
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
    const start = moment(formData.start).isBefore(moment()) && moment(formData.start).isAfter(moment().subtract(1, 'd')) ?
      height + 10 : Math.floor((moment(formData?.start).diff(moment()) / 1000) / blockTime) + height;
    const result = await createTransaction({
      moduleId: 3510,
      assetId: 0,
      assets: {
        title: formData.title,
        description: formData.description,
        goal: BigInt(transactions.convertLSKToBeddows(formData.goal.toString())),
        periods: formData.periods,
        site: formData.site,
        image: parseInt(formData.image.id),
        category: parseInt(formData.category.id),
        start: start,
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
            text: `Your crowdfund project is created successfully`,
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

  return (<Container>
    <div className="lg:ml-4 my-4 ">
      <Typography type="h2" Element='h2'>
        Create a Crowdfund
      </Typography>
    </div>
    {/*Form*/}
    <Form className="lg:grid lg:grid-cols-2 lg:divide-x-2 lg:divide-formDivider">
      {/*COLUMN LEFT */}
      <FormColumn className="lg:mx-4 lg:mr-10">
        <FormRow>
          <FormElement label="Creating your Crowdfund">
            <Typography type="body">
              Crowdfund info...
            </Typography>
          </FormElement>
        </FormRow>
        <div>
          <Typography type="h4" Element='h4'>
            Project information
          </Typography>
          <FormRow className="mt-4">
            <FormElement
              label="Title"
              errorMessage={formErrors?.title}
            >
              <SimpleInput
                value={formData?.title || ""}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="My Project Name"/>
            </FormElement>
          </FormRow>
          <FormRow>
            <FormElement
              errorMessage={formErrors?.description}
              label="Description"
            >
              <TextFieldInput
                value={formData?.description || ""}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="What is your project about?"/>
            </FormElement>
          </FormRow>
          <FormRow>
            <FormElement label="Select category">
              <InputAvatar
                label={"Select category"}
                items={categories.map((label, i) => ({id: i, name: label}))}
                selectedItem={formData?.category || {name: "Select category"}}
                onChange={(value) => updateFormData('category', value)}
              />
            </FormElement>
          </FormRow>
          <FormRow>
            <FormElement
              errorMessage={formErrors?.site}
              label="Project url">
              <SimpleInput
                value={formData?.site || ""}
                onChange={(e) => updateFormData('site', e.target.value)}
                placeholder="https://moosty.com/"/>
            </FormElement>
          </FormRow>
          <Typography type="h4" Element='h4' className="mt-10 mb-2">
            Finance & Accountability
          </Typography>
          <Typography type="bodyStrong" Element='span' className="">
            Specify the amount the would like to raise, how many months you need to build it and how many times a
            backer can vote.
          </Typography>
          <FormRow className="space-x-2 mt-4">
            <FormElement
              errorMessage={formErrors?.goal}
              label="Target amount (LSK)" infoIcon
              tooltipText="good practice is a breakdown of this number including more details on the way you are planning to spend it.">
              <SimpleInput
                value={formData?.goal || ""}
                onChange={(e) => updateFormData('goal', parseInt(e.target.value))}
                default
                placeholder="e.g. 5.000 LSK"
                number
              />
            </FormElement>
          </FormRow>
          <FormRow className="space-x-2">
            <FormElement
              errorMessage={formErrors?.periods}
              label="Duration of the project (months)" infoIcon
              descriptionBottom="Backers can vote every month."
              tooltipText="The number stands for the amount of months.">
              <SimpleInput
                value={formData?.periods || ""}
                onChange={(e) => updateFormData('periods', parseInt(e.target.value))}
                default placeholder="12 (one year)"
                number
              />
            </FormElement>
          </FormRow>
        </div>
      </FormColumn>

      {/*COLUMN RIGHT*/}
      <FormColumn className="">
        <div className="lg:ml-10 ">
          <Typography type="h4" Element='h4' className="mt-10 mb-2">
            Date & time
          </Typography>
          <FormRow
            errorMessage={formErrors?.start}
            className="flex-col">
            <FormElement
              label="Start Date"
              errorMessage={formErrors?.start}
              error={formErrors?.start}
              descriptionBottom={formData?.start && moment(formData.start).isBefore(moment()) && moment(formData.start).isAfter(moment().subtract(1, 'd')) ?
                `Start at block height ${height + 10}, current block height is ${height}` :
                formData?.start && moment(formData.start).isAfter(moment()) ?
                  `Start at block height ${Math.floor((moment(formData?.start).diff(moment()) / 1000) / blockTime) + height}, current block height is ${height}` : ""
              }
            >
              <SimpleInput
                error={formErrors?.start}
                default
                placeholder="02/02/1988"
                datePicker
                onChange={({target: {value}}) => updateFormData('start', value)}
                label={"datepicker mockup"}
              />
            </FormElement>
          </FormRow>
          <FormRow>
            <FormElement
              errorMessage={formErrors?.image}
              label="Add a picture to your project">
              <InputAvatar
                items={projectImages.map((image, i) => ({id: i, name: i}))}
                selectedItem={formData?.image || {name: "Select an image"}}
                onChange={(value) => updateFormData('image', value)}
              />
              {formData?.image && <img className={"p-4 max-w-4/5"} src={projectImages[formData?.image.id]}/>}
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
                disabled={
                !formData.title ||
                !formData.description ||
                !formData.periods ||
                !formData.goal ||
                !formData.site ||
                !formData.image ||
                !formData.start ||
                !formData.category ||
                Object.keys(formErrors)?.length > 0
                }
                onClick={onCreate}
                iconBefore
                label="Create Crowdfund"
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