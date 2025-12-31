"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.initDatabase = initDatabase;
exports.getPool = getPool;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validate required environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    console.warn('⚠️  Database configuration incomplete. Some features may not work.');
}
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'charity_portal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
let pool = null;
exports.pool = pool;
async function initDatabase() {
    try {
        // Create connection without database to create database if not exists
        const connection = await promise_1.default.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
        await connection.end();
        // Create pool with database
        exports.pool = pool = promise_1.default.createPool(dbConfig);
        // Create tables
        await createTables();
        console.log('✅ Database initialized successfully');
    }
    catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}
async function createTables() {
    if (!pool) {
        throw new Error('Pool not initialized');
    }
    // Users table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('donor', 'ngo', 'admin') NOT NULL,
      contact_info VARCHAR(255),
      address TEXT,
      verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_role (role)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
    // Donations table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ngo_id INT NOT NULL,
      donation_type ENUM('food', 'funds', 'clothes', 'books', 'toys', 'medical', 'other') NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      quantity_or_amount VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      pickup_date_time DATETIME NOT NULL,
      status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
      images TEXT,
      priority ENUM('normal', 'urgent', 'critical') DEFAULT 'normal',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (ngo_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_ngo (ngo_id),
      INDEX idx_status (status),
      INDEX idx_type (donation_type),
      INDEX idx_pickup_date (pickup_date_time)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
    // Contributions table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS contributions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      donation_id INT NOT NULL,
      donor_id INT NOT NULL,
      quantity_or_amount VARCHAR(100) NOT NULL,
      status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
      pickup_scheduled DATETIME,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
      FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_donation (donation_id),
      INDEX idx_donor (donor_id),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
    // Pickups table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS pickups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      contribution_id INT NOT NULL,
      pickup_date DATETIME NOT NULL,
      pickup_address TEXT NOT NULL,
      contact_person VARCHAR(255),
      contact_phone VARCHAR(50),
      status ENUM('scheduled', 'in-progress', 'completed', 'cancelled') DEFAULT 'scheduled',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (contribution_id) REFERENCES contributions(id) ON DELETE CASCADE,
      INDEX idx_contribution (contribution_id),
      INDEX idx_pickup_date (pickup_date),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
    // Simple donations table for public donations (from donate form)
    await pool.query(`
    CREATE TABLE IF NOT EXISTS simple_donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amount VARCHAR(50),
      customAmount VARCHAR(50),
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      cause VARCHAR(255),
      anonymous TINYINT(1),
      recurring TINYINT(1),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
    console.log('✅ All tables created successfully');
}
function getPool() {
    if (!pool) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return pool;
}
exports.default = { getPool, initDatabase };
//# sourceMappingURL=database.js.map