import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../appContext";
import {useBlocks} from "./blocks";

export const useDaos = () => {
  const [daos, setDaos] = useState([]);
  const {height} = useBlocks();
  const [account, setAccount] = useState();
  const [userDaos, setUserDaos] = useState([]);
  const {getClient} = useContext(AppContext);

  useEffect(() => {
    const getDaos = async () => {
      // const client = await getClient;
      // const dai = await client.invoke("dao:getAllDaos", {limit: 10000, offset: 0});
      // if (dai?.meta?.count > 0) {
      //   setDaos(dai.data)
      //   if (account && account?.address) {
      //     console.log(dai.data)
      //     setUserDaos(dai.data.filter(dao => dao.members.findIndex(m => m.id === account.address) > -1))
      //   }
      // }
    }
    getDaos()
  }, [account, height])

  const getDao = (id) => {
    if (daos) {
      return daos.find(d => d.id === id)
    }
  }

  return {
    daos,
    userDaos,
    setAccount,
    getDao,
  }
}