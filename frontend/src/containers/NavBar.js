import React, {useEffect, useState} from "react";
import {NavBar} from "@moosty/dao-storybook";
import {useHistory, useLocation} from "react-router-dom";
import {transactions} from "@liskhq/lisk-client"

export const NavBarContainer = ({onLoginClick, onRegisterClick, onSignOut, user, setModal}) => {
  const history = useHistory();
  const location = useLocation();
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
        name: 'Charity',
        href: () => history.push('/charity'),
        path: '/charity',
        current: '/charity' === location.pathname,
      },
    ],
    ctaButton: <div />,
    userNavigation: [
      {name: 'Sign out', href: () => onSignOut()},
    ],
    invitations: [],
  })


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
    ctaButton={<div className="text-white flex flex-col font-medium flex-end text-right">
      <span className="mx-3">{user?.chain?.sprinkler?.username}</span>
      <span>{user?.chain?.token?.balance && transactions.convertBeddowsToLSK(user?.chain?.token?.balance.toString())} LSK</span>
    </div>}
  />)
}
