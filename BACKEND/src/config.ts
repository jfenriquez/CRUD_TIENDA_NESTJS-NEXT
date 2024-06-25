import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  postgres: {
    User: process.env.DB_USR,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: parseInt(process.env.DB_PORT, 10) || 5432,
  },
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL,
  emailPassword: process.env.PASS_EMAIL,
  apiKey: process.env.API_KEY,
  tasks: process.env.TASKS,
  LINK_FRONTEND: process.env.LINK_FRONTEND,
  LINK_FRONTEN_RECOVERY: process.env.LINK_FRONTEND_RECOVERY,

  cloudinaryConfig: {
    cloudName: process.env.cloud_name,
    apiKey_cloudinary: process.env.api_key_cloudinary,
    apiSecret: process.env.api_secret,
  },
  Mercadopago: {
    MERCADOPAGO_API_KEY: process.env.MERCADOPAGO_API_KEY,
  },
}));

/* DATABASE_URL='ddsdssssssssss'
DATABASE_HOST='https://www.goo55555gle.com'
DATABASE_PORT=5432
API_KEY='sdsd'
TASKS='dsd1111115'

PORT=80
DB_USER='root'
DB_PASSWORD='admin123'
DB_HOST='localhost' 
DB_NAME='my_store'
DB_PORT='3632'
API_KEY=123
JWT_SECRET=018493bbc8a8662e2e9c970325cd4b9ab6d3c3d4f7e12c1fb6a1dad763a53478
EMAIL='cobragerc@gmail.com'
PASS_EMAIL='crljmfcooqlbjbel'
 */
