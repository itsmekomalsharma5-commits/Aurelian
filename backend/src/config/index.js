import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'aurelian_imperial_high_jewelry_secret_2026',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  dbFilePath: process.env.DB_FILE_PATH || path.resolve(__dirname, '../data/store.json'),
  currency: 'USD',
  taxRate: 0.0825, // 8.25% luxury sales tax
  standardShippingFee: 0, // Complimentary insured courier shipping for luxury items
  expressCourierFee: 150, // Ultra-secure armored courier option
};

