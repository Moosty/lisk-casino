/* global BigInt */
import React from "react";
import {Container, Typography} from "@moosty/dao-storybook";

export const About = () => (
  <Container
    className={["flex flex-col lg:flex-row justify-between bg-white mt-8 rounded py-4 space-x-20  md:w-app "].join(" ")}>
    <div className="flex flex-col w-1/2 ">
      <Typography type="h1" Element="h1">About Lisk Casino</Typography>
      <Typography type="body" Element="span">
        This is a proof of concept, developed for the HackonLisk hackathon.
      </Typography>
    </div>
    <div className="flex flex-col  w-1/2 ">
      <Typography type="h1" Element="h1">The Moosty Team</Typography>
      <Typography type="body" Element="span">
        The Lisk Casino Proof of concept is brought to you by
        <a href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer">Moosty</a>
        (Jurre, Raphael, Sander). With different backgrounds, skillsets and experience we are on a journey to reinvent
        how organisations work, how musicians create and distribute content and play around with concepts like an online
        casino. You'll never know where it ends.
        <a href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer" className="">
          Reach out to us!
        </a>
      </Typography>
    </div>
  </Container>)
