/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {Container, VotingContainer,CrowdCardContainer, AccountProjectList, AccountProjectSingleItem} from "@moosty/dao-storybook";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {crowdFundStates, projectImages} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {useProjects} from "../hooks/projects";

export const Explore = ({account, setModal, filters, visible}) => {
  const history = useHistory()
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return <div>
   <Container className={[ "my-20"].join(" ")}>
      <AccountProjectList>
        {projects && projects.filter(project => project.state === crowdFundStates.PENDING || project.state === crowdFundStates.ACTIVE.ACTIVE || project.state === crowdFundStates.ACTIVE.PENDING || project.state === crowdFundStates.ACTIVE.CLAIMING || project.state === crowdFundStates.ACTIVE.VOTING).map((project) =>
          <AccountProjectSingleItem
            {...project}
            gradient
          />
        )}
      </AccountProjectList>
    </Container>
  </div>
}
