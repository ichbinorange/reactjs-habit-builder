// local
// export const API_BASE_URL = 'http://localhost:3000';

// For deployed server
export const API_BASE_URL = 'https://habit-builder-ada.herokuapp.com';

export const ACCESS_TOKEN = 'accessToken';

// local
// export const OAUTH2_REDIRECT_URI = 'http://localhost:3001/oauth2/redirect'

// deployed front-end
export const OAUTH2_REDIRECT_URI = 'https://ichbinorange.github.io/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;