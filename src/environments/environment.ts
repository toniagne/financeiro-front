export const environment = {
  production: true,
  isMockEnabled: false,
  api: 'http://localhost:8000/api',
  server:'http://localhost:8000/api',
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  auth: {
    grant_type: 'password',
    client_id: '90d10696-904a-4302-9f49-50a307c253a8',
    client_secret: 'o4rVtNO9Y2ZUHSySWML7nZXpTIoCWDlh08fJBvMt',
    clientID: 'YOUR-AUTH0-CLIENT-ID',
    domain: 'http://localhost:8000/oauth/token', // e.g., https://you.auth0.com/
    audience: 'YOUR-AUTH0-API-IDENTIFIER', // e.g., http://localhost:3001
    redirect: 'http://localhost:8000/callback',
    scope: 'openid profile email'
  }
};
