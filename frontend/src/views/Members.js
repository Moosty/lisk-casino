import React, {useEffect} from "react";
import {useMembers} from "../hooks/members";
import {MemberCard} from "@moosty/dao-storybook";

export const Members = () => {
  const {members} = useMembers();

  return (<div className="flex flex-row flex-wrap content-center justify-center space-x-5 space-y-8">
    {members?.map((member, i) => <div className={[
      i === 0 && "ml-5 mt-8",
      "w-auto pr-5 ",
    ].join(" ")} key={member.id}><MemberCard {...member} /></div>)}
  </div>)
}