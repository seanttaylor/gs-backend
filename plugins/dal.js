import MKPlugin from '../src/plugin.js';
import { Validator } from '../types/validator.js';
import { catalogItemSchema } from '../schemas/catalog-item.js';
import { vendorProductSchema } from '../schemas/vendor-product.js';

const VALIDATION_STRATEGIES = Object.freeze({
  'ice_creams': catalogItemSchema,
  'vendors_products': vendorProductSchema
});

/**
 * 
 * @param {object} repository
 * @returns 
 */
export default function PluginDAL(repository) {
  class DataAccessLayer extends MKPlugin {
    #validator = new Validator();
    #core;
    #eventForwardingMap = {};
    #repository = repository;

    constructor(name = 'com.beepboop.plugin.dal', version = '0.0.1') {
      super(name, version);

      this.#eventForwardingMap['ice_creams'] = this.#onCatalogItemUpdated.bind(this);
      this.#eventForwardingMap['vendors_products'] = this.#onVendorProductUpdated.bind(this);
    }

    /**
     *
     */
    start() {
      this.#core.on('evt.catalog.rt_update', this.#onGSRealtimeUpdate.bind(this));
  
      return {
        name: super.getVersion().name,
      };
    }

    /**
     * Generic handler for _any_ events triggered by an update to a 
     * Google Sheet referencing catalog data; forwards event to more specific handlers
     * @param {object} event
     */
    async #onGSRealtimeUpdate(event) {
      const { header, payload } = event;
      const googleSheetRef = header.meta._open.sheet;

      this.#validator.setStrategy(
        VALIDATION_STRATEGIES[googleSheetRef]
      );
      const validationResult = this.#validator.isValid(payload);

      if (!validationResult.valid) {
        this.#core.emit('evt.catalog.update_error', validationResult.errors);
        return;
      }

      try {
        await this.#eventForwardingMap[googleSheetRef](event);
      } catch(e) {
        console.error(`Could not forward event (${header.name}). See message: ${e.message} `);
      }
    }

    /**
     * Pushes individual catalog item updates to the datastore
     * @param {object} event 
     */
    async #onCatalogItemUpdated(event) {
      const { payload } = event;
      const result = await this.#repository.updateCatalogItem(payload);

      if (!result.isOk()) {
        this.#core.emit('evt.catalog.update_error', result.error);
      }
    }
    /**
     * Pushes vendor product updates to the datastore
     * @param {object} event 
     */
    async #onVendorProductUpdated(event) {
      const { payload } = event;
      const result = await this.#repository.updateVendorProduct(payload);

      if (!result.isOk()) {
        this.#core.emit('evt.catalog.update_error', result.error);
      }
    }

    /**
     * @param {object} core
     */
    init(core) {
      this.#core = core;

      const { version, name } = super.getVersion();

      console.log(`Plugin ${name} version ${version} initialized`);
    }
  }

  return new DataAccessLayer();
}
