import React, {useContext, useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/solid";
import {Button, NavBar} from "@moosty/dao-storybook";
import {useHistory, useLocation} from "react-router-dom";
import {useDaos} from "../hooks/daos";
import {useProposals} from "../hooks/proposals";
import {createTransaction} from "../utils/transactions";
import {Buffer} from "@liskhq/lisk-client";
import {transactionStates} from "@moosty/dao-storybook/dist/stories/modals/templates/resultTransaction";
import {AppContext} from "../appContext";

export const NavBarContainer = ({onLoginClick, onRegisterClick, onSignOut, user, setModal}) => {
  const history = useHistory();
  const location = useLocation();
  const {getClient} = useContext(AppContext);
  const {daos, getDao} = useDaos();
  const {invitations, setAccount} = useProposals();

  console.log(user)
  const [navBarArgs, setNavBarArgs] = useState({
    onLoginClick,
    onRegisterClick,
    logo: <img onClick={() => history.push("/")} src={"/casinologo.jpg"} className="h-16 inline-block cursor-pointer"/>,
    navigation: [
      {
        name: 'Roulette',
        href: () => history.push('/'),
        path: '/',
        current: '/' === location.pathname,
      },
      {
        name: 'Dices',
        href: () => history.push('/explore'),
        path: '/explore',
        current: '/explore' === location.pathname,
      },
      {
        name: 'Blackjack',
        href: () => history.push('/my-projects'),
        path: '/my-projects',
        current: '/my-projects' === location.pathname,
      },
    ],
    ctaButton: <div className="">
      <span>{user?.chain?.sprinkler?.username}</span>

      <span>46.009 LSK</span>

    </div>,
    userNavigation: [
      {name: 'Create a crowdfund', href: () => history.push("/create-crowdfund")},
      {name: 'Sign out', href: () => onSignOut()},
    ],
    invitations: [],
  })

  const onAcceptInvite = async (proposal) => {
    const client = await getClient;
    const fee = await createTransaction({
      moduleId: 3500,
      assetId: 3,
      assets: {
        dao: Buffer.from(proposal.dao, 'hex'),
        proposal: Buffer.from(proposal.id, 'hex'),
      },
      account: user,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: user.address,
      name: user.username,
      transactionType: "dao:acceptAction",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmit(proposal)
      }
    })
  }

  const onSubmit = async (proposal) => {
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
      cancelLabel: "Close",
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3500,
      assetId: 3,
      assets: {
        dao: Buffer.from(proposal.dao, 'hex'),
        proposal: Buffer.from(proposal.id, 'hex'),
      },
      account: user,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setModal({
            type: "transactionResult",
            text: `Your transaction was successfully`,
            state: transactionStates.confirmed,
            cancelLabel: "Close"
          })
          history.push('/')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setModal({
        type: "transactionResult",
        text: result.message,
        state: transactionStates.error,
        cancelLabel: "Close"
      })
    }
  }

  useEffect(() => {
    setAccount(user)
  }, [user])

  useEffect(() => {
    if (invitations) {
      setNavBarArgs({
        ...navBarArgs,
        invitations: invitations.map(proposal => ({
          dao: getDao(proposal.dao)?.name,
          id: proposal.dao,
          onClick: () => onAcceptInvite(proposal)
        }))
      })
    }
  }, [invitations])

  useEffect(() => {
    const newNavArgs = {...navBarArgs}
    newNavArgs.navigation = newNavArgs.navigation.map(n => ({
      ...n,
      current: n.path === location.pathname,
    }))
    setNavBarArgs({
      ...newNavArgs,
    })
  }, [location]);

  useEffect(() => {
    if (user) {
      console.log(user, daos)
      setNavBarArgs({
        ...navBarArgs,
        user: {
          ...user,
        }
      })
    } else {
      const newNavBarArgs = {...navBarArgs}
      delete newNavBarArgs.user;
      setNavBarArgs({...newNavBarArgs})
    }
  }, [user, daos])

  return (<NavBar
    {...navBarArgs}
  />)
}