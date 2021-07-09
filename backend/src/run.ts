import * as genesisBlock from './config/genesis_block.json'
import * as config from './config/config.json'
import { getApplication } from './app/app';
import {PartialApplicationConfig} from "lisk-sdk";

const conf = config as PartialApplicationConfig;
const app = getApplication(genesisBlock, conf);
app.run()
  .then(() => app.logger.info('Blockchain application started...'))
  .catch(error => {
    console.error('Error in the application', error);
    process.exit(1);
  });
