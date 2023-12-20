export const vendorProductSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/example-1.json",
    "type": "object",
    "default": {},
    "title": "Root Schema",
    "required": [
        "product_id",
        "vendor_id"
    ],
    "properties": {
        "product_id": {
            "type": "string",
            "pattern": "^[0-9]{3,4}$",
            "default": "",
            "title": "The product_id Schema",
            "examples": [
                "2190"
            ]
        },
        "vendor_id": {
            "type": "string",
            "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
            "default": "",
            "title": "The vendor_id Schema",
            "examples": [
                "a2b743d7-f959-4ba9-94d4-64b428261d32"
            ]
        }
    },
    "examples": [{
        "product_id": "2190",
        "vendor_id": "a2b743d7-f959-4ba9-94d4-64b428261d32"
    }],
    "additionalProperties": false
}