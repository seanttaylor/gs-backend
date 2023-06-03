import jsonServer from 'json-server';

import MKPlugin from '../src/plugin.js';

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
      const port = 3000;
      const _jsonServer = jsonServer.create();
      const jsonRouter = jsonServer.router(db);
      const middlewares = jsonServer.defaults();

      _jsonServer.use(jsonServer.bodyParser);
      _jsonServer.use(middlewares);

       /**
       *
       */
      _jsonServer.post('/items', (req, res) => {
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
      _jsonServer.get('/events', (req, res) => {
        res.json({
          count: this.#core.emittedEvents.length,
          entries: this.#core.emittedEvents,
        });
      });

     
      _jsonServer.use(jsonRouter);

      _jsonServer.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
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
