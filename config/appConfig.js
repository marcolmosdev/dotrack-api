require('dotenv').config();

module.exports = {
  production: true,
  swagger: {
    user: process.env.swagger_user,
    password: process.env.swagger_password
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    apiKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
};
