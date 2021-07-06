import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../appContext";
import {codec} from "@liskhq/lisk-client";

export const useBlocks = () => {
  const {getClient} = useContext(AppContext);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const subscribe = async () => {
      const client = await getClient;
      client.subscribe("app:block:new", ({block}) => {
        const decodedBlock = codec.codec.decode(
          client._schemas.block,
          Buffer.from(block, 'hex')
        );
        const decodedHeader = codec.codec.decode(
          client._schemas.blockHeader,
          decodedBlock.header,
        )
        setHeight(decodedHeader.height)
      })
    }
    subscribe()
  }, [])

  return {
    height,
  }
}