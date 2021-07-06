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

export const Home = ({account, setModal, filters, visible, userName, hands}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return (
    <div className="bg-blue" style={{backgroundImage:"/images/pexels-photo-2837909.jpeg", backgroundSize:"cover"}}>
    <Container

      className="flex flex-col lg:items-center  lg:flex-row-reverse my-10 lg:my-16 lg:justify-between min-h-screen">
      <div className="flex w-full lg:w-2/3 xl:w1/3 ">
      </div>
      <div className="flex-col my-10 lg:my-auto w-full lg:w-1/3 ">
        <Typography type="sloganLarge" Element="h5" className="text-themeButtonBg  hidden lg:block">Together, we
          decide!</Typography>
        <Typography type="sloganSmall" Element="h5" className="text-themeButtonBg lg:hidden ">Together, we
          decide!</Typography>
        <Typography type="h3" Element="span" className="text-textBody my-auto ">Everyone is equally
          important</Typography>
        <Button
          onClick={() => history.push("/votings")}
          label="Get started!"
          iconBefore
          icon={<div className={"mr-2"}><RocketSvg/></div>}
          className="mt-8"
          shadow/>
      </div>
    </Container>
    <Container
      className={["flex flex-col lg:flex-row justify-between my-4 space-x-20  lg:my-10"].join(" ")}>
      <div className="flex flex-col w-1/2  mb-4">
        <Typography type="h1" Element="h1">Kalipo</Typography>
        <Typography type="body" Element="span">Voting is a valuable governance tool. Votings give community members the
          possibility to exert influence and to express their viewpoints. However, votings consume time and energy of
          the voters and a voting committee. This often results in poor voter attendance and even in invalid votings.
          Kalipo solves this problem by making votings easy. Kalipo powers the community!
        </Typography>
      </div>
      <div className="flex flex-col  w-1/2 ">
        <Typography type="h1" Element="h1">About the Kalipo team</Typography>
        <Typography type="body" Element="span">The team consists of Xinrong Ding, Peter Nobels and <a
          href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer">Moosty</a> (Jurre, Raphael,
          Sander). With different background, skillsets and experience we are on a journey to reinvent how organisations
          work.
          <a href="https://kalipo.com/contact" target="_blank" rel="noopener noreferrer" className="">
            {` `}Reach out to us!
          </a></Typography>
      </div>
    </Container>
    <Container className={["flex", "flex-row "].join(" ")}>
      <BlogSection title="Blogs" descriptionTop="" blogPosts={blogs}/>
    </Container></div>)
}