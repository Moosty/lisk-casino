import React from "react";
import {Hero} from "@moosty/dao-storybook";
import {useHistory, useLocation} from "react-router-dom";

export const HeroContainer = () => {
  const history = useHistory();
  const location = useLocation();

  return <>
    {location?.pathname === "/" && <Hero
      title="Lisk Crowd | A Regulated Crowdfund Platform"
      subTitle="Regulate your crowdfund journey with Lisk Crowd!"
      buttonLabel2="Start Crowdfund!"
      onClickButton2={() => history.push("/create-crowdfund")}
      onClickButton1={() => history.push("/explore")}
      buttonLabel1="Explore"
    />}
  </>
}