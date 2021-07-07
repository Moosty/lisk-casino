/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../appContext";
import {useDaos} from "./daos";
import {useBlocks} from "./blocks";

export const useProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [invitations, setInvitations] = useState([])
  const {getDao} = useDaos();
  const {height} = useBlocks();
  const [account, setAccount] = useState();
  const {getClient} = useContext(AppContext);

  const isQuorumReached = (votes, quorum, eligibleCount) => {
    return votes > (quorum / 100) * eligibleCount
  }

  const getWinningOption = (proposal, dao, eligibleMembers, totalVotePoints) => {
    const absoluteMinToWin = (proposal.rules.minToWin / 100) * totalVotePoints;
    const cumulativePerVote = proposal.options.map(option => ({
      id: option.id, count: proposal.votes
        .map(v => v.options)
        .flat()
        .filter(v =>  v.id === option.id)
        .reduce((sum, vote) => vote.valueType === "count" ?
          parseInt(sum) + parseInt(vote.value) :
          BigInt(sum) + BigInt(vote.value),
          0)
    }))

    let winningOption = null;
    let winningCount = 0;
    cumulativePerVote.map(vote => {
      if (vote.valueType === "count") {
        if (absoluteMinToWin < vote.count && vote.count > winningCount) {
          winningOption = vote.id
        }
      } else {
        if (absoluteMinToWin < parseInt(vote.count.toString()) && parseInt(vote.count.toString()) > winningCount) {
          winningOption = vote.id
        }
      }
    })
    return winningOption;
  }

  const voteDecision = (proposal) => {
    const dao = getDao(proposal.dao);
    const allowedVotes = dao.members.filter(m => (
        BigInt(m.removedAt) === BigInt(0) || BigInt(m.removedAt) <= BigInt(proposal.nonce)
      ) &&
      BigInt(m.nonce) <= BigInt(proposal.nonce)).length
    const voteCount = proposal.votes.reduce((sum, vote) => sum + vote.options.reduce((s, vo) => s + parseInt(vo.value), 0), 0)
    if (!isQuorumReached(voteCount, proposal.rules.quorum, allowedVotes)) {
      return false;
    }
    if (allowedVotes * proposal.rules.allowedOptions === voteCount || height > proposal.end) {
      return getWinningOption(proposal, dao, allowedVotes, voteCount)
    }
    return false
  }

  const invitationFilter = (proposal) => {
    if (proposal.actions.length === 0) {
      return false
    }
    const addMemberActions = proposal.actions.filter(a => a.module === "dao" && a.reducers === "addMember" && a.acceptor === account?.address)
    if (addMemberActions.length === 0) {
      return false;
    }
    const dao = getDao(proposal?.dao);
    if (dao?.members?.find(m => m.id === account.address)) {
      return false;
    }
    const voteResult = voteDecision(proposal)
    if (!voteResult) {
      return false;
    }
    return voteResult === "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d"
  }

  useEffect(() => {
    const getProposals = async () => {
      // const client = await getClient;
      // const chainProposals = await client.invoke("dao:getAllProposals", {limit: 100000, offset: 0});
      // if (chainProposals?.meta?.count > 0) {
      //   setProposals(chainProposals.data)
      //   if (account && account?.address) {
      //     setInvitations(chainProposals.data.filter(invitationFilter))
      //   }
      // }
    }
    getProposals()
  }, [account, height])

  return {
    proposals,
    invitations,
    setAccount,
  }
}