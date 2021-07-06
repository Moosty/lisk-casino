/* global BigInt */
import React, {useContext, useEffect} from "react";
import * as cards from '../assets/cards'
import {Buffer, transactions} from "@liskhq/lisk-client"
import {AccountProjectList, AccountProjectSingleItem, Container, Button,} from "@moosty/dao-storybook";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {crowdFundStates} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {useProjects} from "../hooks/projects";
import {createTransaction} from "../utils/transactions";
import {AppContext} from "../appContext";
import {transactionStates} from "@moosty/dao-storybook/dist/stories/modals/templates/resultTransaction";
import {Dealer} from "../components/Dealer";
import {Hand} from "../components/Hand";
import {GameControl} from "../components/GameControl";
import {Card} from "../components/Card";
import {Player} from "../components/Player";

export const Home = ({account, setModal, filters, visible, userName, hands}) => {
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

return (<div>
  test home </div>
)
}