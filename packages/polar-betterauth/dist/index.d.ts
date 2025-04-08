import * as better_auth from 'better-auth';
import { User, Session } from 'better-auth';
import * as _polar_sh_sdk_models_components_customerstate_js from '@polar-sh/sdk/models/components/customerstate.js';
import * as better_call from 'better-call';
import * as zod from 'zod';
import { Polar } from '@polar-sh/sdk';
import { WebhookBenefitCreatedPayload } from '@polar-sh/sdk/models/components/webhookbenefitcreatedpayload.js';
import { WebhookBenefitGrantCreatedPayload } from '@polar-sh/sdk/models/components/webhookbenefitgrantcreatedpayload.js';
import { WebhookBenefitGrantRevokedPayload } from '@polar-sh/sdk/models/components/webhookbenefitgrantrevokedpayload.js';
import { WebhookBenefitGrantUpdatedPayload } from '@polar-sh/sdk/models/components/webhookbenefitgrantupdatedpayload.js';
import { WebhookBenefitUpdatedPayload } from '@polar-sh/sdk/models/components/webhookbenefitupdatedpayload.js';
import { WebhookCheckoutCreatedPayload } from '@polar-sh/sdk/models/components/webhookcheckoutcreatedpayload.js';
import { WebhookCheckoutUpdatedPayload } from '@polar-sh/sdk/models/components/webhookcheckoutupdatedpayload.js';
import { WebhookCustomerCreatedPayload } from '@polar-sh/sdk/models/components/webhookcustomercreatedpayload.js';
import { WebhookCustomerDeletedPayload } from '@polar-sh/sdk/models/components/webhookcustomerdeletedpayload.js';
import { WebhookCustomerStateChangedPayload } from '@polar-sh/sdk/models/components/webhookcustomerstatechangedpayload.js';
import { WebhookCustomerUpdatedPayload } from '@polar-sh/sdk/models/components/webhookcustomerupdatedpayload.js';
import { WebhookOrderCreatedPayload } from '@polar-sh/sdk/models/components/webhookordercreatedpayload.js';
import { WebhookOrderRefundedPayload } from '@polar-sh/sdk/models/components/webhookorderrefundedpayload.js';
import { WebhookOrganizationUpdatedPayload } from '@polar-sh/sdk/models/components/webhookorganizationupdatedpayload.js';
import { WebhookProductCreatedPayload } from '@polar-sh/sdk/models/components/webhookproductcreatedpayload.js';
import { WebhookProductUpdatedPayload } from '@polar-sh/sdk/models/components/webhookproductupdatedpayload.js';
import { WebhookRefundCreatedPayload } from '@polar-sh/sdk/models/components/webhookrefundcreatedpayload.js';
import { WebhookRefundUpdatedPayload } from '@polar-sh/sdk/models/components/webhookrefundupdatedpayload.js';
import { WebhookSubscriptionActivePayload } from '@polar-sh/sdk/models/components/webhooksubscriptionactivepayload.js';
import { WebhookSubscriptionCanceledPayload } from '@polar-sh/sdk/models/components/webhooksubscriptioncanceledpayload.js';
import { WebhookSubscriptionCreatedPayload } from '@polar-sh/sdk/models/components/webhooksubscriptioncreatedpayload.js';
import { WebhookSubscriptionRevokedPayload } from '@polar-sh/sdk/models/components/webhooksubscriptionrevokedpayload.js';
import { WebhookSubscriptionUncanceledPayload } from '@polar-sh/sdk/models/components/webhooksubscriptionuncanceledpayload.js';
import { WebhookSubscriptionUpdatedPayload } from '@polar-sh/sdk/models/components/webhooksubscriptionupdatedpayload.js';
import { validateEvent } from '@polar-sh/sdk/webhooks.js';

type Product = {
    /**
     * Product Id from Polar Product
     */
    productId: string;
    /**
     * Easily identifiable slug for the product
     */
    slug: string;
};
interface PolarOptions {
    /**
     * Polar Client
     */
    client: Polar;
    /**
     * Enable customer creation when a user signs up
     */
    createCustomerOnSignUp?: boolean;
    /**
     * A custom function to get the customer create
     * params
     * @param data - data containing user and session
     * @returns
     */
    getCustomerCreateParams?: (data: {
        user: User;
        session: Session;
    }, request?: Request) => Promise<{
        metadata?: Record<string, string>;
    }>;
    /**
     * Enable customer portal
     */
    enableCustomerPortal?: boolean;
    /**
     * Subscriptions
     */
    checkout?: {
        /**
         * Enable checkout
         */
        enabled: boolean;
        /**
         * List of products
         */
        products: Product[] | (() => Promise<Product[]>);
        /**
         * Checkout Success URL
         */
        successUrl?: string;
    };
    /**
     * Webhooks
     */
    webhooks?: {
        /**
         * Webhook Secret
         */
        secret: string;
        /**
         * Generic handler for all webhooks
         */
        onPayload?: (payload: ReturnType<typeof validateEvent>) => Promise<void>;
        /**
         * Webhook for checkout created
         */
        onCheckoutCreated?: (payload: WebhookCheckoutCreatedPayload) => Promise<void>;
        /**
         * Webhook for checkout updated
         */
        onCheckoutUpdated?: (payload: WebhookCheckoutUpdatedPayload) => Promise<void>;
        /**
         * Webhook for order created
         */
        onOrderCreated?: (payload: WebhookOrderCreatedPayload) => Promise<void>;
        /**
         * Webhook for order refunded
         */
        onOrderRefunded?: (payload: WebhookOrderRefundedPayload) => Promise<void>;
        /**
         * Webhook for refund created
         */
        onRefundCreated?: (payload: WebhookRefundCreatedPayload) => Promise<void>;
        /**
         * Webhook for refund updated
         */
        onRefundUpdated?: (payload: WebhookRefundUpdatedPayload) => Promise<void>;
        /**
         * Webhook for subscription created
         */
        onSubscriptionCreated?: (payload: WebhookSubscriptionCreatedPayload) => Promise<void>;
        /**
         * Webhook for subscription updated
         */
        onSubscriptionUpdated?: (payload: WebhookSubscriptionUpdatedPayload) => Promise<void>;
        /**
         * Webhook for subscription active
         */
        onSubscriptionActive?: (payload: WebhookSubscriptionActivePayload) => Promise<void>;
        /**
         * Webhook for subscription canceled
         */
        onSubscriptionCanceled?: (payload: WebhookSubscriptionCanceledPayload) => Promise<void>;
        /**
         * Webhook for subscription revoked
         */
        onSubscriptionRevoked?: (payload: WebhookSubscriptionRevokedPayload) => Promise<void>;
        /**
         * Webhook for subscription uncanceled
         */
        onSubscriptionUncanceled?: (payload: WebhookSubscriptionUncanceledPayload) => Promise<void>;
        /**
         * Webhook for product created
         */
        onProductCreated?: (payload: WebhookProductCreatedPayload) => Promise<void>;
        /**
         * Webhook for product updated
         */
        onProductUpdated?: (payload: WebhookProductUpdatedPayload) => Promise<void>;
        /**
         * Webhook for organization updated
         */
        onOrganizationUpdated?: (payload: WebhookOrganizationUpdatedPayload) => Promise<void>;
        /**
         * Webhook for benefit created
         */
        onBenefitCreated?: (payload: WebhookBenefitCreatedPayload) => Promise<void>;
        /**
         * Webhook for benefit updated
         */
        onBenefitUpdated?: (payload: WebhookBenefitUpdatedPayload) => Promise<void>;
        /**
         * Webhook for benefit grant created
         */
        onBenefitGrantCreated?: (payload: WebhookBenefitGrantCreatedPayload) => Promise<void>;
        /**
         * Webhook for benefit grant updated
         */
        onBenefitGrantUpdated?: (payload: WebhookBenefitGrantUpdatedPayload) => Promise<void>;
        /**
         * Webhook for benefit grant revoked
         */
        onBenefitGrantRevoked?: (payload: WebhookBenefitGrantRevokedPayload) => Promise<void>;
        /**
         * Webhook for customer created
         */
        onCustomerCreated?: (payload: WebhookCustomerCreatedPayload) => Promise<void>;
        /**
         * Webhook for customer updated
         */
        onCustomerUpdated?: (payload: WebhookCustomerUpdatedPayload) => Promise<void>;
        /**
         * Webhook for customer deleted
         */
        onCustomerDeleted?: (payload: WebhookCustomerDeletedPayload) => Promise<void>;
        /**
         * Webhook for customer state changed
         */
        onCustomerStateChanged?: (payload: WebhookCustomerStateChangedPayload) => Promise<void>;
    };
}

declare const polar: <O extends PolarOptions>(options: O) => {
    id: "polar";
    endpoints: {
        polarCheckout: {
            <C extends [better_call.InputContext<"/checkout", {
                method: "GET";
                query: zod.ZodObject<{
                    productId: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    productId: string;
                }, {
                    productId: string;
                }>;
            } & {
                use: any[];
            }>]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: better_call.APIError;
            } : better_call.APIError>;
            options: {
                method: "GET";
                query: zod.ZodObject<{
                    productId: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    productId: string;
                }, {
                    productId: string;
                }>;
            } & {
                use: any[];
            };
            path: "/checkout";
        };
        polarCheckoutWithSlug: {
            <C extends [better_call.InputContext<"/checkout/:slug", {
                method: "GET";
                params: zod.ZodObject<{
                    slug: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    slug: string;
                }, {
                    slug: string;
                }>;
            } & {
                use: any[];
            }>]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: better_call.APIError;
            } : better_call.APIError>;
            options: {
                method: "GET";
                params: zod.ZodObject<{
                    slug: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    slug: string;
                }, {
                    slug: string;
                }>;
            } & {
                use: any[];
            };
            path: "/checkout/:slug";
        };
        polarWebhooks: {
            <C extends [(better_call.InputContext<"/polar/webhooks", {
                method: "POST";
                metadata: {
                    isAction: boolean;
                };
                cloneRequest: true;
            } & {
                use: any[];
            }> | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    received: boolean;
                };
            } : {
                received: boolean;
            }>;
            options: {
                method: "POST";
                metadata: {
                    isAction: boolean;
                };
                cloneRequest: true;
            } & {
                use: any[];
            };
            path: "/polar/webhooks";
        };
        polarCustomerPortal: {
            <C extends [(better_call.InputContext<"/portal", {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            }> | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: better_call.APIError;
            } : better_call.APIError>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/portal";
        };
        polarCustomerState: {
            <C extends [(better_call.InputContext<"/state", {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            }> | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: _polar_sh_sdk_models_components_customerstate_js.CustomerState;
            } : _polar_sh_sdk_models_components_customerstate_js.CustomerState>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/state";
        };
    };
    init(): {
        options: {
            databaseHooks: {
                user: {
                    create: {
                        after: (user: better_auth.User, ctx?: better_auth.GenericEndpointContext) => Promise<void>;
                    };
                    update: {
                        after: (user: better_auth.User, ctx?: better_auth.GenericEndpointContext) => Promise<void>;
                    };
                };
            };
        };
    };
};

export { polar };
