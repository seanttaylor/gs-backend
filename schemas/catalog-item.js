export const catalogItemSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/example.json",
    "type": "object",
    "default": {},
    "title": "Catalog Item Schema",
    "required": [
        "name",
        "id",
        "image_closed",
        "image_open",
        "description",
        "story",
        "sourcing_values",
        "ingredients",
        "allergy_info",
        "dietary_certifications",
        "product_id",
        "ingredient_count",
        "is_archived"
    ],
    "properties": {
        "name": {
            "type": "string",
            "default": "",
            "title": "The name Schema",
            "examples": [
                "Caramel Chocolate Cheesecake"
            ]
        },
        "id": {
            "type": "string",
            "default": "",
            "title": "The id Schema",
            "examples": [
                "65d5a375-5b98-4a34-8917-bb58c508b262"
            ]
        },
        "image_closed": {
            "type": "string",
            "default": "",
            "title": "The image_closed Schema",
            "examples": [
                "/files/live/sites/systemsite/files/flavors/products/us/pint/open-closed-pints/caramel-chocolate-cheesecake-truffles-landing.png"
            ]
        },
        "image_open": {
            "type": "string",
            "default": "",
            "title": "The image_open Schema",
            "examples": [
                "/files/live/sites/systemsite/files/flavors/products/us/pint/open-closed-pints/caramel-chocolate-cheesecake-truffles-landing-open.png"
            ]
        },
        "description": {
            "type": "string",
            "default": "",
            "title": "The description Schema",
            "examples": [
                "Caramel Cheesecake Ice Cream with Graham Cracker-Covered Cheesecake Truffles \u0026 Chocolate Cookie Swirls"
            ]
        },
        "story": {
            "type": "string",
            "default": "",
            "title": "The story Schema",
            "examples": [
                "In your cheesecake dreams, is it like you’re spooning through a world of caramel cheesecake ice cream swirled with chocolate cookies in a wonderland of truffles filled with cheesecake? Hello? You can wake up now…"
            ]
        },
        "sourcing_values": {
            "type": "string",
            "default": "",
            "title": "The sourcing_values Schema",
            "examples": [
                "Non-GMO, Cage-Free Eggs, Fairtrade, Responsibly Sourced Packaging, Caring Dairy"
            ]
        },
        "ingredients": {
            "type": "string",
            "default": "",
            "title": "The ingredients Schema",
            "examples": [
                "cream, skim milk, water, liquid sugar (sugar, water), sugar, corn syrup, canola oil, cream cheese (pasteurized milk, cream, cheese cultures, salt, carob bean gum), coconut oil, egg yolks, wheat flour, dried cane syrup, soybean oil, graham flour, eggs, cocoa (processed with alkali), natural flavors, cocoa, guar gum, butteroil, milk protein concentrate, corn starch, salt, soy lecithin, tapioca starch, pectin, caramelized sugar syrup, baking soda, molasses, honey, carrageenan, vanilla extract"
            ]
        },
        "allergy_info": {
            "type": "string",
            "default": "",
            "title": "The allergy_info Schema",
            "examples": [
                "contains milk, eggs, wheat and soy"
            ]
        },
        "dietary_certifications": {
            "type": "string",
            "default": "",
            "title": "The dietary_certifications Schema",
            "examples": [
                "Kosher"
            ]
        },
        "product_id": {
            "type": "string",
            "default": "",
            "title": "The product_id Schema",
            "examples": [
                "2190"
            ]
        },
        "ingredient_count": {
            "type": "string",
            "default": "",
            "title": "The ingredient_count Schema",
            "examples": [
                "37"
            ]
        },
        "is_archived": {
            "type": "boolean",
            "default": false,
            "title": "The is_archived Schema",
            "examples": [
                false
            ]
        }
    },
    "examples": [{
        "name": "Caramel Chocolate Cheesecake",
        "id": "65d5a375-5b98-4a34-8917-bb58c508b262",
        "image_closed": "/files/live/sites/systemsite/files/flavors/products/us/pint/open-closed-pints/caramel-chocolate-cheesecake-truffles-landing.png",
        "image_open": "/files/live/sites/systemsite/files/flavors/products/us/pint/open-closed-pints/caramel-chocolate-cheesecake-truffles-landing-open.png",
        "description": "Caramel Cheesecake Ice Cream with Graham Cracker-Covered Cheesecake Truffles \u0026 Chocolate Cookie Swirls",
        "story": "In your cheesecake dreams, is it like you’re spooning through a world of caramel cheesecake ice cream swirled with chocolate cookies in a wonderland of truffles filled with cheesecake? Hello? You can wake up now…",
        "sourcing_values": "Non-GMO, Cage-Free Eggs, Fairtrade, Responsibly Sourced Packaging, Caring Dairy",
        "ingredients": "cream, skim milk, water, liquid sugar (sugar, water), sugar, corn syrup, canola oil, cream cheese (pasteurized milk, cream, cheese cultures, salt, carob bean gum), coconut oil, egg yolks, wheat flour, dried cane syrup, soybean oil, graham flour, eggs, cocoa (processed with alkali), natural flavors, cocoa, guar gum, butteroil, milk protein concentrate, corn starch, salt, soy lecithin, tapioca starch, pectin, caramelized sugar syrup, baking soda, molasses, honey, carrageenan, vanilla extract",
        "allergy_info": "contains milk, eggs, wheat and soy",
        "dietary_certifications": "Kosher",
        "product_id": "2190",
        "ingredient_count": "37",
        "is_archived": false
    }]
}