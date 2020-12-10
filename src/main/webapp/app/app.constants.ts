// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BILLING_SERVER_API_URL = process.env.BILLING_SERVER_API_URL;
export const SCHEDULING_SERVER_API_URL = process.env.SCHEDULING_SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const INVOICE_SERVER_API_URL = process.env.INVOICE_SERVER_API_URL;
export const INVENTORY_SERVER_API_URL = process.env.INVENTORY_SERVER_API_URL;
export const BILLINGIMPORT_SERVER_API_URL = process.env.BILLINGIMPORT_SERVER_API_URL;
export const INJOBS_SERVER_API_URL = process.env.INJOBS_SERVER_API_URL;
export const SITES_SERVER_API_URL = process.env.SITES_SERVER_API_URL;
export const ACCOUNTING_SERVER_API_URL = process.env.ACCOUNTING_SERVER_API_URL;
export const RATE_REPOSITORY_API_URL = process.env.RATE_REPOSITORY_API_URL;
export const INVOICE_GENERATION_API_URL = process.env.INVOICE_GENERATION_API_URL;
export const INVOICE_VALIDATION_API_URL = process.env.INVOICE_VALIDATION_API_URL;
export const ALERT_API_URL = process.env.ALERT_API_URL;
export const AUTH_API_URL = process.env.AUTH_API_URL;
