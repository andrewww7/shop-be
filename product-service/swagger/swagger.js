// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "AWS Course EPAM - Online Shop",
    "version": "1"
  },
  "paths": {
    "/products/{productUUID}": {
      "get": {
        "summary": "getProductById",
        "description": "",
        "operationId": "getProductById.get.products/{productUUID}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "productUUID",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Products"
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "count": {
          "title": "Product.count",
          "type": "number"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        }
      },
      "required": [
        "count",
        "description",
        "id",
        "price",
        "title"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "Products": {
      "items": {
        "$ref": "#/definitions/Product",
        "title": "Products.[]"
      },
      "title": "Products.[]",
      "type": "array"
    }
  },
  "securityDefinitions": {}
};