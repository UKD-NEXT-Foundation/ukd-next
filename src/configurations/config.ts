export function config() {
  const ENV = process.env;

  return {
    isDevelopmentEnvironment: ENV.IS_DEVELOPMENT_ENVIRONMENT === 'true',
    domain: ENV.SERVER_DOMAIN,
    serverPort: Number(ENV.SERVER_PORT) || 8001,
    apiPrefix: ENV.API_PREFIX || '/api',
    swaggerUiPath: ENV.SWAGGER_UI_PATH || '/docs',
    databaseURL: ENV.DATABASE_URL,
    jwtAccessTokenSecret: ENV.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: ENV.JWT_REFRESH_TOKEN_SECRET,
    jwtAccessTokenExpiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwtRefreshTokenExpiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRES_IN,
    googleClientId: ENV.GOOGLE_CLIENT_ID,
    googleClientSecret: ENV.GOOGLE_CLIENT_SECRET,
  } as const;
}
