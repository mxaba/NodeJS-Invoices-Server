module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Invoices APIs Document",
    description: "APIs document for all operations on the inboxes app.",
    termsOfService: "",
    contact: {
      name: "Mcebo Samuel Xaba",
      email: "samuel.mcebo@gmail.com"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },

  paths: {
    "/invoices": {
      get: {
        summary: "Find list of invoices",
        description: "Get all available invoices",
        operationId: "getListOfInvoices",
        responses: {
          "200": {
            description: "Returns a list of invoices",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Invoice"
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Create an invoice",
        operationId: "createInvoice",
        requestBody: {
          description: "Add an invoice to the avaialable invoices",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Invoice"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Invoice created"
          },
          "409": {
            description: "Invoice already exists!"
          }
        }
      }
    },
    "/invoices/{id}": {
      get: {
        summary: "Find invoice by id",
        description: "Get specific available invoices by Id",
        operationId: "getInvoiceById",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Invoice ID",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              type: "integer",
              format: "int64"
            }
          }
        ],
        responses: {
          "200": {
            description: "Invoice found"
          },
          "404": {
            description: "Invoice does not exists"
          }
        }
      },
      put: {
        summary: "Update an invoice by id",
        operationId: "updateInvoiceById",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Invoice ID",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              type: "integer",
              format: "int64"
            }
          }
        ],
        requestBody: {
          description: "Invoice to update",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Invoice"
              }
            }
          }
        },
        responses: {
          "204": {
            description: "Invoice updated"
          },
          "404": {
            description: "Invoice does not exists"
          }
        }
      },
      delete: {
        summary: "Delete an invoice by Id",
        operationId: "deleteInvoice",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Invoice Id",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              type: "integer",
              format: "int64"
            }
          }
        ],
        responses: {
          "204": {
            description: "Invoice deleted"
          },
          "404": {
            description: "Invoice does not exists"
          }
        }
      }
    }
  },

  components: {
    schemas: {
      Invoice: {
        required: [
          "paymentType",
          "currency",
          "customerDetails",
          "items",
          "refNo"
        ],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "integer",
            example: 45
          },
          paymentType: {
            type: "string",
            example: "Cash"
          },
          refNo: {
            refNo: "string",
            example: "#45"
          },
          currency: {
            type: "string",
            example: "R"
          },
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Item"
            }
          },
          customerDetails: {
            $ref: "#/components/schemas/CustomerDetails"
          }
        }
      },
      CustomerDetails: {
        required: ["email", "firstName", "id", "lastName"],
        type: "object",
        properties: {
          firstName: {
            type: "string"
          },
          lastName: {
            type: "string"
          },
          email: {
            type: "string",
            format: "email"
          }
        }
      },
      Item: {
        required: ["category", "code", "id", "name", "price"],
        type: "object",
        properties: {
          code: {
            type: "string"
          },
          name: {
            type: "string"
          },
          category: {
            type: "string"
          },
          price: {
            type: "number"
          }
        }
      }
    }
  }
};
