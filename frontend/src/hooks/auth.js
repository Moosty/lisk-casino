import React, {useContext, useEffect, useState} from "react";
import {createTransaction} from "../utils/transactions";
import {AppContext} from "../appContext";
import {Buffer} from "@liskhq/lisk-client";
import {useBlocks} from "./blocks";

export const useAuth = (closeModal) => {
  const {getClient} = useContext(AppContext);
  const [account, setAccount] = useState();
  const {height} = useBlocks()
  const [loadingSprinkler, setLoadingSprinkler] = useState(false);
  const [registerError, setRegisterError] = useState();

  const onLogin = (account) => {
    const checkLogin = async () => {
      const client = await getClient;
      const foundAccount = await client.account.get(Buffer.from(account.address, 'hex'))
      setAccount({...account, name: foundAccount.sprinkler.username, chain: foundAccount})
      closeModal(null)
    }
    checkLogin();
  }

  useEffect(() => {
    const updateAccount = async () => {
      const client = await getClient;
      const foundAccount = await client.account.get(Buffer.from(account.address, 'hex'))
      setAccount({...account, name: foundAccount.sprinkler.username, chain: foundAccount})
    }
    if (account) {
      updateAccount()
    }
  }, [height])

  const onRegister = (account) => {
    const doSprinkler = async () => {
      const client = await getClient;
      const result = await createTransaction({
        moduleId: 6666,
        assetId: 100,
        assets: {
          username: account.username,
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            onLogin(account)
            setRegisterError(false)
            setLoadingSprinkler(false)
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
       await findTransaction()
      } else {
        setRegisterError(result.message)
        setLoadingSprinkler(false)
      }
    }
    setLoadingSprinkler(true);
    doSprinkler();
  }

  const onSignOut = () => {
    setAccount(null)
  }

  return {
    onLogin,
    onRegister,
    onSignOut,
    account,
    loadingSprinkler,
    registerError,

  }
}