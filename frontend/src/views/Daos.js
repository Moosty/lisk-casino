import React from "react";
import {MemberCard} from "@moosty/dao-storybook";
import {useDaos} from "../hooks/daos";

export const Daos = () => {
  const {daos} = useDaos();

  return (<div className="flex flex-row flex-wrap content-center justify-center space-x-5 space-y-8">
    {daos?.map((dao, i) => <div className={[
      i === 0 && "ml-5 mt-8",
      "w-auto pr-5 ",
    ].join(" ")} key={dao.id}><MemberCard address={dao.id} name={dao.name} /></div>)}
  </div>)
}