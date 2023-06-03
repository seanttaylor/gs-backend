import jsonServer from 'json-server';

import MKPlugin from '../src/plugin.js';

export default function PluginFactory(db) {
  class HTTPServer extends MKPlugin {
    #core;

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
      _jsonServer.get('/events', (req, res) => {
        res.json({
          count: this.#core.emittedEvents.length,
          entries: this.#core.emittedEvents,
        });
      });

      /**
       *
       */
      _jsonServer.post('/orders', (req, res) => {
        const order = {
          id: this.#core.generateId(),
          customerId: req.body.customerId,
          createdDate: new Date().toISOString(),
          status: {
            order: 'pending',
            payment: null,
          },
          items: req.body.items,
        };

        db.orders.push(order);
        res.json({ count: 1, entries: [order] });
      });

      /**
       *
       */
      _jsonServer.post('/orders/:id/payment', (req, res) => {
        const order = db.orders.find((item) => item.id === req.params.id);
        order.status.payment = 'authorizing';


        res.json({ count: 1, entries: [order] });
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
