import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation,} from "react-router-dom";
import * as Views from "./views";
import {NavBarContainer} from "./containers/NavBar";
import {PageTop} from "./containers/PageTop";
import {ModalContainer} from "./containers/Modal";
import {useAuth} from "./hooks/auth";
import {Footer,} from "@moosty/dao-storybook";
import {TopHeader} from "./components/TopHeader";
import {footerAuthor, footerItems} from "./fixtures/footerItems";

export const Routes = () => {
  const [currentOpen, setCurrentOpen] = useState();
  const {account, onLogin, onRegister, registerError, loadingSprinkler, onSignOut} = useAuth(setCurrentOpen);

  return (
    <Router>
      <ModalContainer
        currentOpen={currentOpen}
        setCurrentOpen={setCurrentOpen}
        onLogin={onLogin}
        onRegister={onRegister}
        externalError={registerError}
        ctaLoading={loadingSprinkler}
      />
      <TopHeader />
      <NavBarContainer
        setModal={setCurrentOpen}
        onSignOut={() => onSignOut()}
        user={account}
        onLoginClick={() => setCurrentOpen("login")}
        onRegisterClick={() => setCurrentOpen("register")}
      />
      <div style={{backgroundColor:""}} className="w-full bg-gray-900  min-h-screen  flex flex-col">
        <div  className={"w-full mx-auto flex-grow "}>
          <Switch>
            <Route path={"/top-list"}>
              <Views.TopList account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/blackjack"}>
              <Views.Blackjack account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/dices"}>
              <Views.Dices account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/roulette"}>
              <Views.Roulette account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/lottery"}>
              <Views.Lottery account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/charity"}>
              <Views.Charity />
            </Route>
            <Route path={"/about"}>
              <Views.About />
            </Route>
            <Route path={"/"}>
              <Views.Home />
            </Route>
          </Switch>
        </div>
        <Footer
          author={footerAuthor}
          items={footerItems}
        />
      </div>
    </Router>
  )
}
