require('dotenv').config();

module.exports = {
  production: true,
  swagger: {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    apiKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
};
