import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../appContext";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState({});
  const {getClient} = useContext(AppContext);

  useEffect(() => {
    const getMembers = async () => {
      const client = await getClient;
      const membersList = await client.invoke("sprinkler:getAllUsernames");
      if (membersList?.length > 0) {
        console.log(filter)
        setMembers(membersList.filter(typeof filter.memberFilter === "function" ? filter.memberFilter : () => true).map(m => ({
          id: m.ownerAddress,
          icon: `https://avatar.moosty.com/${m.ownerAddress}`,
          address: m.ownerAddress,
          name: m.username,
        })))
      }
    }
    getMembers()
  }, [filter])

  return {
    members,
    setFilter,
  }
}