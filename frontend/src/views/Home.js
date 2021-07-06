/* global BigInt */
import React, {useContext, useEffect} from "react";
import * as cards from '../assets/cards'
import {Buffer, transactions} from "@liskhq/lisk-client"
import {AccountProjectList, AccountProjectSingleItem, Container, Button, } from "@moosty/dao-storybook";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {crowdFundStates} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {useProjects} from "../hooks/projects";
import {createTransaction} from "../utils/transactions";
import {AppContext} from "../appContext";
import {transactionStates} from "@moosty/dao-storybook/dist/stories/modals/templates/resultTransaction";

export const Home = ({account, setModal, filters, visible}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  //
  // useEffect(() => {
  //   console.log(projects)
  // }, [projects])

  // const onBack = async (amount, project) => {
  //   const client = await getClient
  //   const fee = await createTransaction({
  //     moduleId: 3510,
  //     assetId: 1,
  //     assets: {
  //       crowdfund: Buffer.from(project.id, 'hex'),
  //       amount: BigInt(transactions.convertLSKToBeddows(amount)),
  //       message: "",
  //     },
  //     account,
  //     client,
  //     getFee: true,
  //   })
  //   setModal({
  //     type: "transactionConfirm",
  //     address: account.address,
  //     name: account?.chain?.sprinkler?.username,
  //     transactionType: "crowd:back",
  //     fee: `${fee} LSK`,
  //     ctaButton: {
  //       label: "Confirm",
  //       onClick: () => onSubmit(amount, project)
  //     }
  //   })
  // }

  // const onSubmit = async (amount, project) => {
  //   setModal({
  //     type: "transactionResult",
  //     text: `Submitting transaction, this can take a few seconds.`,
  //     state: transactionStates.pending,
  //   })
  //   const client = await getClient;
  //   const result = await createTransaction({
  //     moduleId: 3510,
  //     assetId: 1,
  //     assets: {
  //       crowdfund: Buffer.from(project.id, 'hex'),
  //       amount: BigInt(transactions.convertLSKToBeddows(amount)),
  //       message: "",
  //     },
  //     account,
  //     client,
  //   })
  //   if (result.status) {
  //     const findTransaction = async () => {
  //       try {
  //         await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
  //         setModal({
  //           type: "transactionResult",
  //           text: `You backed this crowdfund successfully`,
  //           state: transactionStates.confirmed
  //         })
  //         history.push('/my-projects')
  //       } catch (e) {
  //         setTimeout(async () => await findTransaction(), 1000)
  //       }
  //     }
  //     await findTransaction()
  //
  //   } else {
  //     setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
  //   }
  // }

  return <div style={{backgroundColor: "#114602"}} className={"h-screen"}>
    <Container className={"flex flex-col space-y-10"}>
      {/*//DEALER*/}
      <Container className="flex flex-col justify-center">
        <div className="font-medium text-24px text-yellow-300 text-center">
          Dealer: 15
        </div>
        <Container className=" space-x-2  w-1/3 flex flex-row justify-center">

          <img src={cards.H7} className={"w-32"}/>
          <img src={cards.B1} className={"w-32"}/>
        </Container>
      </Container>
      <Container className=" flex flex-col justify-center">

        <div className="font-medium text-24px text-yellow-300 text-center">
          Player: 14
        </div>
        <div className="flex-col md:flex-row flex space-x-4">
        <Container className="space-x-2 w-1/3 flex flex-row justify-center">

          <img src={cards.HJ} className={"w-32"}/>
          <img src={cards.HK} className={"w-32"}/>
          <img src={cards.HQ} className={"w-32"}/>
        </Container>
        </div>
        {/*controls*/}
        <div className="flex flex-col w-full">
          <Container className="my-8 w-full flex flex-row justify-center space-x-4">
            place bet
          </Container>
          <Container className="my-8 w-full flex flex-row justify-center space-x-4">
            <div className="bg-green-500 pointer text-white font-medium py-2 px-8 rounded-default"> HIT</div>
            <div className="bg-yellow-500 pointer text-white font-medium py-2 px-8 rounded-default"> STAND</div>
          </Container>
        </div>
      </Container>
      <div className="flex flex-row">
      <Container className=" flex flex-col justify-center">

        <div className="font-medium text-24px text-yellow-300 text-center">
          Player: 14
        </div>
        <div className="flex-col md:flex-row flex space-x-4">
        <Container className="space-x-2 w-1/3 flex flex-row justify-center">

          <img src={cards.HJ} className={"w-32"}/>
          <img src={cards.HK} className={"w-32"}/>
          <img src={cards.HQ} className={"w-32"}/>
        </Container>
        </div>
        {/*controls*/}
        <div className="flex flex-col w-full">
          <Container className="my-8 w-full flex flex-row justify-center space-x-4">
            place bet
          </Container>
          <Container className="my-8 w-full flex flex-row justify-center space-x-4">
            <Button className="bg-green-500 pointer text-white font-medium py-2 px-8 rounded-default"> HIT</Button>
            <Button className="bg-yellow-500 pointer text-white font-medium py-2 px-8 rounded-default"> STAND</Button>
          </Container>
        </div>


      </Container>
      </div>



    </Container>

  </div>
}