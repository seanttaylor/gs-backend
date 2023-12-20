import figlet from 'figlet';
import { promisify } from 'util';

import Core from './src/core.js';
import PluginServer from './plugins/server.js';
import PluginDAL from './plugins/dal.js';

import { IJsonDB } from './interfaces/json-db.js';
import { SimpleRepository } from './lib/repository.js';
import { AdminClient } from './lib/clients/db/supabase/index.js';

/**
 * @type {IJsonDB}
 */
import db from './db.js';

const APP_NAME = 'gs_backend';
const APP_VERSION = '0.0.1';

const figletize = promisify(figlet);
const noop = () => {};
const banner = await figletize(`${APP_NAME} v${APP_VERSION}`);
const SUPABASE_CLIENT = AdminClient.getInstance();

/******** PLUGIN DEFINITION ********/

const core = new Core();
const foh = PluginServer(db);
const dal = PluginDAL(
    new SimpleRepository(SUPABASE_CLIENT)
);

/******** EVENT REGISTRATION ********/
core.on('evt.catalog.update_error', noop);

/******** PLUGIN REGISTRATION ********/

core.registerPlugin(foh);
core.registerPlugin(dal);

/******** APP START ********/

core.run();
console.log(banner);
