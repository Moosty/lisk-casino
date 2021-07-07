/* global BigInt */
import React, {useContext, useEffect} from "react";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {useProjects} from "../hooks/projects";
import {AppContext} from "../appContext";
import {Container} from "@moosty/dao-storybook";
import {Typography} from "@moosty/dao-storybook";
import {Button} from "@moosty/dao-storybook";
import {RocketSvg} from "@moosty/dao-storybook";
import {BlogSection} from "@moosty/dao-storybook";
import {blogs} from "../fixtures/blogs";
import {HeroContainer} from "../containers/Hero";
import {Header} from "../containers/Header";

export const Home = ({account, setModal, filters, visible, userName, hands}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return (
    <>
   <Header title="Welcome to the Lisk Casino!"
           subTitle="Where all your dreams become reality"
           buttonLabel1="Learn more!"
           gradient/>

    <Container
      className={["flex flex-col lg:flex-row justify-between my-16 space-x-20  md:w-app "].join(" ")}>
      <div className="flex flex-col w-1/2  mb-4">
        <Typography type="h1" Element="h1">Lisk Casino</Typography>
        <Typography type="body" Element="span">Voting is a valuable governance tool. Votings give community members the
          possibility to exert influence and to express their viewpoints. However, votings consume time and energy of
          the voters and a voting committee. This often results in poor voter attendance and even in invalid votings.
          Kalipo solves this problem by making votings easy. Kalipo powers the community!
        </Typography>
      </div>
      <div className="flex flex-col  w-1/2 ">
        <Typography type="h1" Element="h1">About the Lisk Casino team</Typography>
        <Typography type="body" Element="span">The team consists of Xinrong Ding, Peter Nobels and <a
          href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer">Moosty</a> (Jurre, Raphael,
          Sander). With different background, skillsets and experience we are on a journey to reinvent how organisations
          work.
          <a href="https://kalipo.com/contact" target="_blank" rel="noopener noreferrer" className="">
            {` `}Reach out to us!
          </a></Typography>
      </div>
    </Container>
    <Container className={["flex", "flex-row", "w-app"].join(" ")}>
      <BlogSection title="Blogs" descriptionTop="" blogPosts={blogs}/>
    </Container></>)
}