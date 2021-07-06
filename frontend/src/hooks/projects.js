/* global BigInt */
import {useContext, useEffect, useState} from "react";
import {transactions} from '@liskhq/lisk-client'
import {useBlocks} from "./blocks";
import {AppContext} from "../appContext";
import {crowdFundStates, PROJECT_LIFECYCLE} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {useMembers} from "./members";

export const useProjects = () => {
  const {getClient} = useContext(AppContext);
  const {members} = useMembers();
  const {height} = useBlocks();
  const [projects, setProjects] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const client = await getClient;
      const chainData = await client.invoke("crowd:getAllCrowdfunds", {limit: 100000, offset: 0});
      if (chainData?.meta?.count > 0) {
        setProjects(chainData.data.map(item => {
          const owner = members?.find(m => m.id === item.owner);
          return {
            ...item,
            ...getState(item),
            owner: {...owner, username: owner?.name},
            durationProject: item.periods,
            targetAmount: parseInt(transactions.convertBeddowsToLSK(item.goal)),
            totalRaised: parseInt(transactions.convertBeddowsToLSK(item.backers.reduce((sum, backer) => sum + BigInt(backer?.amount), BigInt(0)).toString())),
            budget: parseInt(transactions.convertBeddowsToLSK(item.balance.toString())),
            projectUrl: item.site,
            amountOfDays: 1000
          }
        }))
      }
    }
    getProjects()
  }, [height, members])

  const getState = (project) => {
    const state = project.state.toLowerCase();
    if (state === crowdFundStates.PENDING.toLowerCase()) {
      return {state: crowdFundStates.PENDING};
    }
    if (state === crowdFundStates.CANCELED.toLowerCase()) {
      return {state: crowdFundStates.CANCELED}
    }
    if (state === crowdFundStates.FAILED.toLowerCase()) {
      return {state: crowdFundStates.FAILED};
    }
    if (state === crowdFundStates.PREVIEW.toLowerCase()) {
      if (height > project.start) {
        return {state: crowdFundStates.OPEN};
      }
      return {state: crowdFundStates.PREVIEW};
    }
    if (state === crowdFundStates.OPEN.toLowerCase()) {
      return {state: crowdFundStates.OPEN}
    }
    if (state === crowdFundStates.ENDED.toLowerCase()) {
      return {state: crowdFundStates.ENDED}
    }
    console.log(project)
    if (height < project.startProject) {
      return {state: crowdFundStates.ACTIVE.PENDING}
    }

    return {state: crowdFundStates.ACTIVE.ACTIVE}
  }

  return {
    projects,
  }
}

/*
totalRaised,
                                     percentage,
                                     budget = 80,
                                     title,
                                     category,
                                     owner,
                                     targetAmount,
                                     durationProject,
                                     projectUrl,
                                     image,
                                     closeDate,
                                     closeDateFull,
                                     state,
                                     backers,
                                     donatedAmount,
                                     message,
                                     viewer,
                                     maxVoteWeight,
                                     notVoteWeight,
                                     ownerMessage,
                                     voteResult,
                                     time,
                                     gradient,
                                     subTitle,
 */

/*
backers: (2) [{…}, {…}]
category: 2
closeDate: "5-4"
closeDateFull: "7-3"
donatedAmount: "10009"
durationProject: "90"
id: "1"
image: 0
maxVoteWeight: "100"
notVoteWeight: "60"
percentage: 20
projectUrl: "#"
state: "PREVIEW"
targetAmount: "89504"
time: "in one day"
title: "The DAO Project"
totalRaised: "20040"
userAddress: "345733333743L"
userName: "Raphael"
viewer: "guest"
voteResult: "voteresult"
 */