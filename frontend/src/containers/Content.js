import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {projectImages} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {ContentSection} from "@moosty/dao-storybook";

export const ContentContainer = () => {
  const location = useLocation();
  useEffect(() => console.log(location), [location])
  return (
    <div className={"z-0"}>{location?.pathname === "/" && <ContentSection
      gradient
      title="The New Way Of Crowdfunding"
      subTitle="more transparency, more structure, more success. "
      titleContent="What would you do?"
      content="Dit is een stukje tekst.Dit is een stukje tekst.  Dit is een stukje tekst.  Dit is een stukje tekst. Dit is een stukje tekst.Dit is een stukje tekst.  Dit is een stukje tekst.  Dit is een stukje tekst.Dit is een stukje tekst.Dit is een stukje tekst.  Dit is een stukje tekst.  Dit is een stukje tekst.Dit is een stukje tekst.Dit is een stukje tekst.  Dit is een stukje tekst.  Dit is een stukje tekst.Dit is een stukje tekst.Dit is een stukje tekst.  Dit is een stukje tekst.  Dit is een stukje tekst.  "
      image={projectImages[1]}
      backgroundImage
    />}
      </div>
  )
}