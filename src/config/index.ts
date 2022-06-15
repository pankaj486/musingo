// export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const API_BASE_URL = BASE_URL + "/api";

export const BASE_URL = 'https://api-integration-staging.herokuapp.com'

export const API_BASE_URL = 'https://api-integration-staging.herokuapp.com/api'

// Auth URLS
export const googleAuthorizationUrl =
  "https://accounts.google.com/o/oauth2/v2/auth";

export const facebookAuthorizationUrl =
  "https://www.facebook.com/v13.0/dialog/oauth";

export const spotifyAuthorizationUrl = "https://accounts.spotify.com/authorize";

export const yahooAuthorizationUrl =
  "https://api.login.yahoo.com/oauth2/request_auth";

export const outlookAuthorizationUrl =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";

export const appleAuthorizationUrl = "https://appleid.apple.com/auth/authorize";

// Client IDs

export const googleClientId =
  "709041609882-6aihkqudhd0pn78iudtrd7a16io037j0.apps.googleusercontent.com";

export const facebookClientId = "4906875836066969";

export const spotifyClientId = "4cfae09bdf1e4ff98ed883be7aa171e3";

export const yahooClientId =
  "dj0yJmk9WnBXWTNJeEN3WVUyJmQ9WVdrOVpEWlBiMWxHWms4bWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTlj";

export const yahooClientSecretId = "9b2b2a35c5488ae1e9a38168ae9d77b24fdef496";

export const outlookClientId = "faa22c59-20d2-433c-b693-052e02b61d1c";

export const appleClientId = "de.musingoo";

export const redirectUri = window.location.origin;

export const serverUrl = "http://localhost:8001";

export const stripePublicSecret =
  process.env.REACT_APP_STRIPE_PUBLIC_SECRET || "pk_test_vYzWektUo7g9JZ5adRJOPLku";
//Provider Endpoints

export const googleContactsServer =
  "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&sortOrder=FIRST_NAME_ASCENDING&pageSize=1000";

export const googleOtherContactsServer =
  "https://people.googleapis.com/v1/otherContacts?readMask=names,emailAddresses&pageSize=1000";

export const outlookContactsServer =
  "https://graph.microsoft.com/v1.0/me/contacts?$select=displayName,emailAddresses";
