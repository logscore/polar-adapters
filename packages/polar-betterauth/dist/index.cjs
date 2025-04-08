"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  polar: () => polar
});
module.exports = __toCommonJS(index_exports);

// src/endpoints/checkout.ts
var import_api = require("better-auth/api");
var import_plugins = require("better-auth/plugins");
var import_zod = require("zod");
var checkout = (options) => (0, import_plugins.createAuthEndpoint)(
  "/checkout",
  {
    method: "GET",
    query: import_zod.z.object({
      productId: import_zod.z.string()
    })
  },
  async (ctx) => {
    if (!options.checkout?.enabled) {
      throw new import_api.APIError("BAD_REQUEST", {
        message: "Checkout is not enabled"
      });
    }
    const productId = ctx.query?.productId;
    if (!productId) {
      throw new import_api.APIError("BAD_REQUEST", {
        message: "Product Id not found"
      });
    }
    const session = await (0, import_api.getSessionFromCtx)(ctx);
    try {
      const checkout2 = await options.client.checkouts.create({
        customerExternalId: session?.user.id,
        productId,
        successUrl: options.checkout.successUrl ? new URL(options.checkout.successUrl, ctx.request?.url).toString() : void 0
      });
      return ctx.redirect(checkout2.url);
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar checkout creation failed. Error: ${e.message}`
        );
      }
      throw new import_api.APIError("INTERNAL_SERVER_ERROR", {
        message: "Checkout creation failed"
      });
    }
  }
);
var checkoutWithSlug = (options) => (0, import_plugins.createAuthEndpoint)(
  "/checkout/:slug",
  {
    method: "GET",
    params: import_zod.z.object({
      slug: import_zod.z.string()
    })
  },
  async (ctx) => {
    if (!options.checkout?.enabled) {
      throw new import_api.APIError("BAD_REQUEST", {
        message: "Checkout is not enabled"
      });
    }
    const products = await (typeof options.checkout.products === "function" ? options.checkout.products() : options.checkout.products);
    const productId = products.find(
      (product) => product.slug === ctx.params?.["slug"]
    )?.productId;
    if (!productId) {
      throw new import_api.APIError("BAD_REQUEST", {
        message: "Product Id not found"
      });
    }
    const session = await (0, import_api.getSessionFromCtx)(ctx);
    try {
      const checkout2 = await options.client.checkouts.create({
        customerExternalId: session?.user.id,
        productId,
        successUrl: options.checkout.successUrl ? new URL(options.checkout.successUrl, ctx.request?.url).toString() : void 0
      });
      return ctx.redirect(checkout2.url);
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar checkout creation failed. Error: ${e.message}`
        );
      }
      throw new import_api.APIError("INTERNAL_SERVER_ERROR", {
        message: "Checkout creation failed"
      });
    }
  }
);

// src/endpoints/customerPortal.ts
var import_api2 = require("better-auth/api");
var import_plugins2 = require("better-auth/plugins");
var customerPortal = (options) => (0, import_plugins2.createAuthEndpoint)(
  "/portal",
  {
    method: "GET",
    use: [import_api2.sessionMiddleware]
  },
  async (ctx) => {
    if (!options.enableCustomerPortal) {
      throw new import_api2.APIError("BAD_REQUEST", {
        message: "Customer portal is not enabled"
      });
    }
    if (!ctx.context.session?.user.id) {
      throw new import_api2.APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    try {
      const customerSession = await options.client.customerSessions.create({
        customerExternalId: ctx.context.session?.user.id
      });
      return ctx.redirect(customerSession.customerPortalUrl);
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar customer portal creation failed. Error: ${e.message}`
        );
      }
      throw new import_api2.APIError("INTERNAL_SERVER_ERROR", {
        message: "Customer portal creation failed"
      });
    }
  }
);

// src/endpoints/customerState.ts
var import_api3 = require("better-auth/api");
var import_plugins3 = require("better-auth/plugins");
var customerState = (options) => (0, import_plugins3.createAuthEndpoint)(
  "/state",
  {
    method: "GET",
    use: [import_api3.sessionMiddleware]
  },
  async (ctx) => {
    if (!ctx.context.session.user.id) {
      throw new import_api3.APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    try {
      const state = await options.client.customers.getStateExternal({
        externalId: ctx.context.session?.user.id
      });
      return ctx.json(state);
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar subscriptions list failed. Error: ${e.message}`
        );
      }
      throw new import_api3.APIError("INTERNAL_SERVER_ERROR", {
        message: "Subscriptions list failed"
      });
    }
  }
);

// src/endpoints/webhooks.ts
var import_webhooks = require("@polar-sh/sdk/webhooks");
var import_api4 = require("better-auth/api");
var import_plugins4 = require("better-auth/plugins");
var webhooks = (options) => (0, import_plugins4.createAuthEndpoint)(
  "/polar/webhooks",
  {
    method: "POST",
    metadata: {
      isAction: false
    },
    cloneRequest: true
  },
  async (ctx) => {
    const { webhooks: webhooks2 } = options;
    if (!webhooks2) {
      throw new import_api4.APIError("NOT_FOUND", {
        message: "Webhooks not enabled"
      });
    }
    const {
      secret,
      onPayload,
      onCheckoutCreated,
      onCheckoutUpdated,
      onOrderCreated,
      onOrderRefunded,
      onRefundCreated,
      onRefundUpdated,
      onSubscriptionCreated,
      onSubscriptionUpdated,
      onSubscriptionActive,
      onSubscriptionCanceled,
      onSubscriptionRevoked,
      onSubscriptionUncanceled,
      onProductCreated,
      onProductUpdated,
      onOrganizationUpdated,
      onBenefitCreated,
      onBenefitUpdated,
      onBenefitGrantCreated,
      onBenefitGrantUpdated,
      onBenefitGrantRevoked,
      onCustomerCreated,
      onCustomerUpdated,
      onCustomerDeleted,
      onCustomerStateChanged
    } = webhooks2;
    if (!ctx.request?.body) {
      throw new import_api4.APIError("INTERNAL_SERVER_ERROR");
    }
    const buf = await ctx.request.text();
    let event;
    try {
      if (!secret) {
        throw new import_api4.APIError("INTERNAL_SERVER_ERROR", {
          message: "Polar webhook secret not found"
        });
      }
      const headers = {
        "webhook-id": ctx.request.headers.get("webhook-id"),
        "webhook-timestamp": ctx.request.headers.get(
          "webhook-timestamp"
        ),
        "webhook-signature": ctx.request.headers.get(
          "webhook-signature"
        )
      };
      event = (0, import_webhooks.validateEvent)(buf, headers, secret);
    } catch (err) {
      if (err instanceof Error) {
        ctx.context.logger.error(`${err.message}`);
        throw new import_api4.APIError("BAD_REQUEST", {
          message: `Webhook Error: ${err.message}`
        });
      }
      throw new import_api4.APIError("BAD_REQUEST", {
        message: `Webhook Error: ${err}`
      });
    }
    try {
      if (onPayload) {
        onPayload(event);
      }
      switch (event.type) {
        case "checkout.created":
          if (onCheckoutCreated) {
            onCheckoutCreated(event);
          }
          break;
        case "checkout.updated":
          if (onCheckoutUpdated) {
            onCheckoutUpdated(event);
          }
          break;
        case "order.created":
          if (onOrderCreated) {
            onOrderCreated(event);
          }
          break;
        case "subscription.created":
          if (onSubscriptionCreated) {
            onSubscriptionCreated(event);
          }
          break;
        case "subscription.updated":
          if (onSubscriptionUpdated) {
            onSubscriptionUpdated(event);
          }
          break;
        case "subscription.active":
          if (onSubscriptionActive) {
            onSubscriptionActive(event);
          }
          break;
        case "subscription.canceled":
          if (onSubscriptionCanceled) {
            onSubscriptionCanceled(event);
          }
          break;
        case "subscription.uncanceled":
          if (onSubscriptionUncanceled) {
            onSubscriptionUncanceled(event);
          }
          break;
        case "subscription.revoked":
          if (onSubscriptionRevoked) {
            onSubscriptionRevoked(event);
          }
          break;
        case "product.created":
          if (onProductCreated) {
            onProductCreated(event);
          }
          break;
        case "product.updated":
          if (onProductUpdated) {
            onProductUpdated(event);
          }
          break;
        case "organization.updated":
          if (onOrganizationUpdated) {
            onOrganizationUpdated(event);
          }
          break;
        case "benefit.created":
          if (onBenefitCreated) {
            onBenefitCreated(event);
          }
          break;
        case "benefit.updated":
          if (onBenefitUpdated) {
            onBenefitUpdated(event);
          }
          break;
        case "benefit_grant.created":
          if (onBenefitGrantCreated) {
            onBenefitGrantCreated(event);
          }
          break;
        case "benefit_grant.updated":
          if (onBenefitGrantUpdated) {
            onBenefitGrantUpdated(event);
          }
          break;
        case "benefit_grant.revoked":
          if (onBenefitGrantRevoked) {
            onBenefitGrantRevoked(event);
          }
          break;
        case "order.refunded":
          if (onOrderRefunded) {
            onOrderRefunded(event);
          }
          break;
        case "refund.created":
          if (onRefundCreated) {
            onRefundCreated(event);
          }
          break;
        case "refund.updated":
          if (onRefundUpdated) {
            onRefundUpdated(event);
          }
          break;
        case "customer.created":
          if (onCustomerCreated) {
            onCustomerCreated(event);
          }
          break;
        case "customer.updated":
          if (onCustomerUpdated) {
            onCustomerUpdated(event);
          }
          break;
        case "customer.deleted":
          if (onCustomerDeleted) {
            onCustomerDeleted(event);
          }
          break;
        case "customer.state_changed":
          if (onCustomerStateChanged) {
            onCustomerStateChanged(event);
          }
          break;
      }
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(`Polar webhook failed. Error: ${e.message}`);
      } else {
        ctx.context.logger.error(`Polar webhook failed. Error: ${e}`);
      }
      throw new import_api4.APIError("BAD_REQUEST", {
        message: "Webhook error: See server logs for more information."
      });
    }
    return ctx.json({ received: true });
  }
);

// src/hooks/customer.ts
var onUserCreate = (options) => async (user, ctx) => {
  if (ctx && options.createCustomerOnSignUp) {
    try {
      const params = options.getCustomerCreateParams && ctx.context.session ? await options.getCustomerCreateParams({
        user,
        session: ctx.context.session.session
      }) : {};
      const { result: existingCustomers } = await options.client.customers.list({ email: user.email });
      const existingCustomer = existingCustomers.items[0];
      if (existingCustomer) {
        if (existingCustomer.externalId !== user.id) {
          await options.client.customers.update({
            id: existingCustomer.id,
            customerUpdate: {
              externalId: user.id
            }
          });
        }
      } else {
        await options.client.customers.create({
          ...params,
          email: user.email,
          name: user.name,
          externalId: user.id
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar customer creation failed. Error: ${e.message}`
        );
      } else {
        ctx.context.logger.error(
          `Polar customer creation failed. Error: ${e}`
        );
      }
    }
  }
};
var onUserUpdate = (options) => async (user, ctx) => {
  if (ctx && options.createCustomerOnSignUp) {
    try {
      await options.client.customers.updateExternal({
        externalId: user.id,
        customerUpdate: {
          email: user.email,
          name: user.name
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        ctx.context.logger.error(
          `Polar customer update failed. Error: ${e.message}`
        );
      } else {
        ctx.context.logger.error(`Polar customer update failed. Error: ${e}`);
      }
    }
  }
};

// src/index.ts
var polar = (options) => {
  return {
    id: "polar",
    endpoints: {
      polarCheckout: checkout(options),
      polarCheckoutWithSlug: checkoutWithSlug(options),
      polarWebhooks: webhooks(options),
      polarCustomerPortal: customerPortal(options),
      polarCustomerState: customerState(options)
    },
    init() {
      return {
        options: {
          databaseHooks: {
            user: {
              create: {
                after: onUserCreate(options)
              },
              update: {
                after: onUserUpdate(options)
              }
            }
          }
        }
      };
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  polar
});
//# sourceMappingURL=index.cjs.map