/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/profile/cart": {
    /** Get user cart or create if it is missing */
    get: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      responses: {
        /** @description Returns user cart */
        200: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
    /** Update user cart */
    put: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Cart"];
        };
      };
      responses: {
        /** @description Cart can be updated in the following ways - 1) products can be added 2) products can be dropped 3) amount of product might have changed. Request body to be provided contains a snapshot of cart after changes. */
        200: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Bad request */
        400: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
    /** Create user cart */
    post: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      responses: {
        /** @description Returns empty cart */
        201: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
    /** Empty user cart */
    delete: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      responses: {
        /** @description Returns success = true if cart was successfully emptied */
        200: {
          content: {
            "application/json": components["schemas"]["EmptySuccessResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
  };
  "/api/profile/cart/checkout": {
    /** Create an order */
    post: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      responses: {
        /** @description Successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["CheckoutResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
  };
  "/api/products": {
    /** Returns a list of products */
    get: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
      };
      responses: {
        /** @description Returns a list of all products available */
        200: {
          content: {
            "application/json": components["schemas"]["ProductsResponse"][];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
  };
  "/api/products/{productId}": {
    /** Returns single product */
    get: {
      parameters: {
        header: {
          /**
           * @description User id (uuid)
           * @example eb5a26af-6e4c-4f31-a9b1-3450d42ac66c
           */
          "x-user-id": string;
        };
        path: {
          /** @description Id (uuid) of product to return */
          productId: number;
        };
      };
      responses: {
        /** @description Successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["ProductResponse"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Not found */
        404: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": components["schemas"]["CartResponse"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Cart: {
      /**
       * @description Cart id (uuid)
       * @example dd5ec5ab-deaa-419c-8a6b-7e67b1f7ec87
       */
      id: string;
      /** @description Items added to cart */
      items: components["schemas"]["CartItem"][];
    };
    CartItem: {
      product: components["schemas"]["Product"];
      /**
       * @description Total count of specific products
       * @example 2
       */
      count: number;
    };
    Product: {
      /**
       * @description Product id (uuid)
       * @example 5c293ad0-19d0-41ee-baa3-4c648f9f7697
       */
      id: string;
      /**
       * @description Product name
       * @example Book
       */
      title: string;
      /**
       * @description Product description
       * @example Interesting book
       */
      description: string;
      /**
       * @description Product price
       * @example 200
       */
      price: number;
    };
    Order: {
      id: string;
      userId: string;
      cartId: string;
      items: components["schemas"]["CartItem"][];
      payment: {
        type: string;
        address: string;
        creditCard: string;
      };
      delivery: {
        type: string;
        address: string;
      };
      comments?: string;
      status: string;
      totalPrice: number;
    };
    CartResponse: {
      data: {
        cart: components["schemas"]["Cart"];
        totalPrice: number;
      };
      error?: components["schemas"]["ErrorResponse"];
    };
    CheckoutResponse: {
      data: {
        order: components["schemas"]["Order"];
      };
      error?: components["schemas"]["ErrorResponse"];
    };
    ProductResponse: {
      data: components["schemas"]["Product"];
      error?: components["schemas"]["ErrorResponse"];
    };
    ProductsResponse: {
      data: components["schemas"]["Product"][];
      error?: components["schemas"]["ErrorResponse"];
    };
    EmptySuccessResponse: {
      data: {
        success?: boolean;
      };
      error?: components["schemas"]["ErrorResponse"];
    };
    ErrorResponse: {
      message: string;
    } | null;
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type Cart = components['schemas']['Cart'];
export type CartItem = components['schemas']['CartItem'];
export type Product = components['schemas']['Product'];
export type Order = components['schemas']['Order'];


export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
