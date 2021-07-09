import {Application, HTTPAPIPlugin} from 'lisk-sdk';

export const registerPlugins = (app: Application): void => {
  app.registerPlugin(HTTPAPIPlugin, { loadAsChildProcess: true });
};
