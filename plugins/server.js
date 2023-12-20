import { randomUUID } from 'crypto';
import jsonServer from 'json-server';

import MKPlugin from '../src/plugin.js';
import { IJsonDB } from '../interfaces/json-db.js';

/**
 * 
 * @param {IJsonDB} db
 * @returns 
 */
export default function PluginFactory(db) {
  class HTTPServer extends MKPlugin {
    #core;
    #knownIds = new Map();

    constructor(name = 'com.beepboop.plugin.server', version = '0.0.1') {
      super(name, version);
    }


    /**
     *
     */
    start() {
      const PORT = 3001;
      const server = jsonServer.create();
      const jsonRouter = jsonServer.router(db);
      const middlewares = jsonServer.defaults();

      server.use(jsonServer.bodyParser);
      server.use(middlewares);

      /**
       *
       */
      server.post('/items', (req, res) => {
        const item = req.body;

        if (!this.#knownIds.has(item.id)) {
          db.items.push(item);
          this.#knownIds.set(item.id, db.items.length-1);
          res.json(item);
          return;
        }

        const itemLookupIndex = this.#knownIds.get(item.id);
        
        db.items[itemLookupIndex] = item;
        res.json(item);
      });

      /**
       *
       */
      server.get('/events', (req, res) => {
        res.json({
          count: this.#core.emittedEvents.length,
          entries: this.#core.emittedEvents,
        });
      });

      /**
       *
       */
      server.post('/events', (req, res) => {
        const { name: eventName, meta, payload } = req.body;
        this.#core.emit(eventName, payload, meta);  

        const [ lastEmittedEvent ] = this.#core.emittedEvents.filter((event)=> event.header.name === eventName).reverse();

        res.status(201);
        res.json({
          ...lastEmittedEvent.header, 
          requestId: randomUUID() 
        });
      });
     
      server.use(jsonRouter);

      server.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
      });

      return {
        name: super.getVersion().name,
      };
    }

    /**
     *
     */
    init(core) {
      this.#core = core;

      const { version, name } = super.getVersion();

      console.log(`Plugin ${name} version ${version} initialized`);
    }
  }

  return new HTTPServer();
}
