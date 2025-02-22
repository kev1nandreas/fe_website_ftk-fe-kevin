export const ENV = {
  MODE: process.env.NEXT_PUBLIC_MODE,
  TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'default_token_key',
  JWT_SCREET: process.env.NEXT_PUBLIC_JWT_SCREET,
  URI: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    IMAGE_URL: process.env.NEXT_PUBLIC_BASE_IMAGE_URL,
  },
};
