import React from 'react';
import { apiClient, codec } from "@liskhq/lisk-client"

const server = 'wss://crowdws.moosty.com/ws'

let client;
const getClient = async () => {
  if (!client) {
    client = await apiClient.createWSClient(server)
  }
  return client;
}

const api = {
  server: server,
  getClient: getClient(),
  blockTime: 5,
}

const AppContext = React.createContext({api});

export {
  api,
  AppContext
}
