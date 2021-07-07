import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation,} from "react-router-dom";
import * as Views from "./views";
import {NavBarContainer} from "./containers/NavBar";
import {PageTop} from "./containers/PageTop";
import {ModalContainer} from "./containers/Modal";
import {useAuth} from "./hooks/auth";
import {ContentSection, Footer, Hero} from "@moosty/dao-storybook";
import {ContentContainer} from "./containers/Content";
import {TopHeader} from "./components/TopHeader";
import {footerAuthor, footerItems} from "./fixtures/footerItems";

export const Routes = () => {
  const history = useHistory();
  const [currentOpen, setCurrentOpen] = useState();
  const [visible, setVisible] = useState()
  const [filtersFilter, setFilters] = useState();
  const {account, onLogin, onRegister, registerError, loadingSprinkler, onSignOut} = useAuth(setCurrentOpen);

  const updateFilters = (filter, value, filters) => {
    console.log(filter, filters, value)
    setFilters({
      ...filters,
      [filter]: value,
    })
  }

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
      <div style={{backgroundColor:""}} className="w-full  min-h-screen  flex flex-col">
        <div  className={"w-full mx-auto flex-grow "}>
          <Switch>
            <Route path={"/my-projects"}>
              <Views.MyProjects filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/create-crowdfund"}>
              <Views.CreateCrowdfund account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/explore"}>
              <Views.Explore filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/top-list"}>
              <Views.TopList filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/blackjack"}>
              <Views.Blackjack filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/dices"}>
              <Views.Dices filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/roulette"}>
              <Views.Roulette filters={filtersFilter} account={account} setModal={setCurrentOpen}/>
            </Route>
            <Route path={"/"}>
              <Views.Home filters={filtersFilter} account={account} setModal={setCurrentOpen} visible={visible}/>
            </Route>
          </Switch>
        </div>
        <ContentContainer />
        <Footer
          author={footerAuthor}
          items={footerItems}
        />
      </div>
    </Router>
  )
}
