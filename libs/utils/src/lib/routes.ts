/* private */ const _relativeClientPaths = {
  default: `/`,
  login: `/auth/login`,
  logout: `/logout`,
  account: {
    default: `/account`,
    billing: `/account/subscription`,
    settings: `/account/settings`,
    plans: `/account/plans`,
  },
};

/* private */ const _domains = {
  client: process.env.CLIENT_URL,
  api: process.env.API_URL,
};

/**
 * all application routes
 */
export const routes = {
  client: _relativeClientPaths,
  domains: _domains,
};
