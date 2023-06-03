import figlet from 'figlet';
import { promisify } from 'util';

import Core from './src/core.js';
import PluginFOH from './plugins/foh.js';

import db from './db.js';

const APP_NAME = 'gs_backend';
const APP_VERSION = '0.0.1';

const figletize = promisify(figlet);
const banner = await figletize(`${APP_NAME} v${APP_VERSION}`);

/******** PLUGIN DEFINITION ********/

const core = new Core();
const foh = PluginFOH(db);

/******** PLUGIN REGISTRATION ********/

core.registerPlugin(foh);

/******** APP START ********/

core.run();
console.log(banner);
