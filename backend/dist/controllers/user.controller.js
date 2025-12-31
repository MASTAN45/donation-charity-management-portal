"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const validation_middleware_1 = require("../middleware/validation.middleware");
class UserController {
    // Register new user
    static async register(req, res) {
        try {
            const { name, email, password, role, contact_info, address } = req.body;
            // Validate role
            if (!(0, validation_middleware_1.validateRole)(role)) {
                return res.status(400).json({ error: 'Invalid role. Must be donor, ngo, or admin' });
            }
            // Check if user already exists
            const pool = (0, database_1.getPool)();
            const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
            if (existing.length > 0) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            // Insert user
            const [result] = await pool.query(`INSERT INTO users (name, email, password, role, contact_info, address) 
         VALUES (?, ?, ?, ?, ?, ?)`, [name, email, hashedPassword, role, contact_info || null, address || null]);
            // Generate token
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET environment variable is not set');
            }
            const token = jsonwebtoken_1.default.sign({ id: result.insertId, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role
                },
                token
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
    }
    // Login user
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const pool = (0, database_1.getPool)();
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (users.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const user = users[0];
            // Verify password
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            // Generate token
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET environment variable is not set');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    contact_info: user.contact_info,
                    address: user.address
                },
                token
            });
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    }
    // Get current user profile
    static async getProfile(req, res) {
        try {
            const pool = (0, database_1.getPool)();
            const [users] = await pool.query('SELECT id, name, email, role, contact_info, address, verified, created_at FROM users WHERE id = ?', [req.user?.id]);
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(users[0]);
        }
        catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Failed to get profile' });
        }
    }
    // Update user profile
    static async updateProfile(req, res) {
        try {
            const { name, contact_info, address } = req.body;
            const pool = (0, database_1.getPool)();
            await pool.query('UPDATE users SET name = ?, contact_info = ?, address = ? WHERE id = ?', [name, contact_info, address, req.user?.id]);
            res.json({ message: 'Profile updated successfully' });
        }
        catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    }
    // Get all users (Admin only)
    static async getAllUsers(req, res) {
        try {
            const pool = (0, database_1.getPool)();
            const [users] = await pool.query('SELECT id, name, email, role, contact_info, verified, created_at FROM users ORDER BY created_at DESC');
            res.json(users);
        }
        catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({ error: 'Failed to get users' });
        }
    }
    // Get users by role
    static async getUsersByRole(req, res) {
        try {
            const { role } = req.params;
            if (!(0, validation_middleware_1.validateRole)(role)) {
                return res.status(400).json({ error: 'Invalid role' });
            }
            const pool = (0, database_1.getPool)();
            const [users] = await pool.query('SELECT id, name, email, contact_info, verified, created_at FROM users WHERE role = ? ORDER BY created_at DESC', [role]);
            res.json(users);
        }
        catch (error) {
            console.error('Get users by role error:', error);
            res.status(500).json({ error: 'Failed to get users' });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map