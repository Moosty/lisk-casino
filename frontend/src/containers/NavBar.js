import React, {useEffect, useState} from "react";
import {NavBar} from "@moosty/dao-storybook";
import {useHistory, useLocation} from "react-router-dom";
import {useProposals} from "../hooks/proposals";
import {transactions} from "@liskhq/lisk-client"

export const NavBarContainer = ({onLoginClick, onRegisterClick, onSignOut, user, setModal}) => {
  const history = useHistory();
  const location = useLocation();
  const {setAccount} = useProposals();
  const [navBarArgs, setNavBarArgs] = useState({
    onLoginClick,
    onRegisterClick,
    logo: <img onClick={() => history.push("/")} src={"/casinologo.jpg"} className="h-16 inline-block cursor-pointer"/>,
    navigation: [
      {
        name: 'Roulette',
        href: () => history.push('/roulette'),
        path: '/roulette',
        current: '/roulette' === location.pathname,
      },
      {
        name: 'Dices',
        href: () => history.push('/dices'),
        path: '/dices',
        current: '/dices' === location.pathname,
      },
      {
        name: 'Blackjack',
        href: () => history.push('/blackjack'),
        path: '/blackjack',
        current: '/blackjack' === location.pathname,
      },
      {
        name: 'Lottery',
        href: () => history.push('/lottery'),
        path: '/lottery',
        current: '/lottery' === location.pathname,
      },
      {
        name: 'Top List',
        href: () => history.push('/top-list'),
        path: '/top-list',
        current: '/top-list' === location.pathname,
      },
    ],
    ctaButton: <div className="text-white">
      <span className="mx-3">{user?.chain?.sprinkler?.username}</span>
      <span>{user?.chain?.token?.balance && transactions.convertBeddowsToLSK(user?.chain?.token?.balance.toString())} LSK</span>
    </div>,
    userNavigation: [
      {name: 'Sign out', href: () => onSignOut()},
    ],
    invitations: [],
  })

  useEffect(() => {
    setAccount(user)
  }, [user])

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
  }, [user])

  return (<NavBar
    {...navBarArgs}
    ctaButton={<div className="text-white">
      <span className="mx-3">{user?.chain?.sprinkler?.username}</span>
      <span>{user?.chain?.token?.balance && transactions.convertBeddowsToLSK(user?.chain?.token?.balance.toString())} LSK</span>
    </div>}
  />)
}
