import id from 'firebase-auto-ids';

export default class CoreSystem {
  constructor() {
    this.plugins = [];
    this.listeners = {};
    this.api = {};
    this.emittedEvents = [];
  }

  /**
   * Register a plugin with the core system
   * @param {MKPlugin} plugin - instance of MKPlugin
   */
  registerPlugin(plugin) {
    this.plugins.push(plugin);

    //console.log(`Plugin ${plugin.getVersion().name} registered with core system`);

    plugin.init(this);
  }
  /**
   * Execute all registered plugins
   */
  run() {
    this.plugins.forEach((plugin) => {
      let { name } = plugin.getVersion();
      this.api[name] = plugin.start();
    });
  }

  /**
   *@return {String}
   */
  generateId() {
    return id(Date.now());
  }

  /**
   * Register an event listener with the core system
   * @param {String} event - the name of an event to listen for
   * @param {Function} listener - a function to execute when the named event is emitted
   */
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
    // console.log(`Core system registered listener for event (${event})`);
  }

  /**
   * Emit a registered event with data to all listeners
   * @param {string} event
   * @param {any} data
   * @param {object} meta - optional metadata to include about the event
   */
  emit(event, data, meta={}) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        const publishedEvent = {
          header: {
            meta,
            id: this.generateId(),
            name: event,
            timestamp: new Date().toISOString(),
          },
          payload: {
            ...data
          }
        };
        
        this.emittedEvents.push(publishedEvent);
        try {
          listener(publishedEvent);
        } catch(e) {
          console.error(`Core system encountered error while emitting event (${event}): ${e.message} `);
        }
      });
      console.log(`Core system emitted event (${event})`);
    }
  }
}
