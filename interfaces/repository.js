/**
 * 
 */
export class IRepository {
    /**
     * Updates a catalog item with the given id using the provided payload
     * @param {Object} document - The parameters for the update operation
     * @param {String} document.id - The unique identifier of the catalog item to be updated
     * @param {Object} document.record - The data to be used for updating the catalog item
     * @returns {Result}
     */
    updateCatalogItem({ id, record }) {
        
    }

    /**
     * @param {object} document - The parameters for the update operation
     * @param {string} document.product_id 
     * @param {string} document.vendor_id 
     */
    updateVendorProduct({ product_id, vendor_id}) {
        
    }
}
