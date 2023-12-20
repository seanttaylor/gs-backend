import { IRepository } from '../interfaces/repository.js';
import { Result } from '../types/result.js';

/**
 * @typedef {Object} CatalogItem
 * @property {string} name - The name of the item
 * @property {string} id - The unique identifier of the item
 * @property {string} image_closed - The URL of the image when the item is closed
 * @property {string} image_open - The URL of the image when the item is open
 * @property {string} description - The description of the item
 * @property {string} story - The story or background information of the item
 * @property {string} sourcing_values - The sourcing values associated with the item
 * @property {string} ingredients - The list of ingredients of the item
 * @property {string} allergy_info - Information about allergens present in the item
 * @property {string} dietary_certifications - The dietary certifications of the item
 * @property {string} product_id - The product ID of the item
 * @property {string} ingredient_count - The count of ingredients in the item
 * @property {boolean} is_archived - Indicates if the item is archived
 */

/**
 * @typedef {object} VendorProduct
 * @property {string} product_id - The product ID of the item
 * @property {string} vendor_id - The unique identifier of the vendor
 */

export class SimpleRepository extends IRepository {
    #dbClient;

    /**
     * @param {object} dbClient - an instance of the Supabase client
     */
    constructor(dbClient) {
        super();
        this.#dbClient = dbClient;
    }

    /**
     * @param {CatalogItem} record
     */
    async updateCatalogItem(record) {
    
        const { data, error } = await this.#dbClient
        .from('ice_creams')
        .upsert({ ...record })
        .eq('id', record.id)
        .select();

        if (error) {
            return Result.error(error.message);
        }

        return Result.ok(data[0]);
    }

    /**
     * @param {VendorProduct} record
     */
    async updateVendorProduct(record) {
        const { data, error } = await this.#dbClient
        .from('vendors_products')
        .upsert({ ...record })
        //.eq('id', record.id)
        .select();

        if (error) {
            return Result.error(error.message);
        }

        return Result.ok(data[0]);
    }
}