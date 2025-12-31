"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const donation_routes_1 = __importDefault(require("./routes/donation.routes"));
const contribution_routes_1 = __importDefault(require("./routes/contribution.routes"));
const pickup_routes_1 = __importDefault(require("./routes/pickup.routes"));
const leaderboard_routes_1 = __importDefault(require("./routes/leaderboard.routes"));
const simple_donation_routes_1 = __importDefault(require("./routes/simple-donation.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Donation & Charity Management API'
    });
});
// API Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/donations', simple_donation_routes_1.default); // Simple public donations
app.use('/api/donation-requests', donation_routes_1.default); // NGO donation requests
app.use('/api/contributions', contribution_routes_1.default);
app.use('/api/pickups', pickup_routes_1.default);
app.use('/api/leaderboard', leaderboard_routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
// Initialize database and start server
async function startServer() {
    try {
        console.log('🔄 Initializing database...');
        await (0, database_1.initDatabase)();
        app.listen(PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log('🚀 Donation & Charity Management Backend Server');
            console.log('='.repeat(60));
            console.log(`📍 Server running on: http://localhost:${PORT}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🗄️  Database: ${process.env.DB_NAME || 'charity_portal'}`);
            console.log('='.repeat(60) + '\n');
            console.log('📚 Available API endpoints:');
            console.log('   - POST   /api/users/register');
            console.log('   - POST   /api/users/login');
            console.log('   - GET    /api/users/profile');
            console.log('   - GET    /api/donations');
            console.log('   - POST   /api/donations (NGO)');
            console.log('   - POST   /api/contributions (Donor)');
            console.log('   - POST   /api/pickups');
            console.log('   - GET    /api/leaderboard/donors/count');
            console.log('   - GET    /api/leaderboard/statistics');
            console.log('='.repeat(60) + '\n');
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM received, shutting down gracefully...');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT received, shutting down gracefully...');
    process.exit(0);
});
// Start the server
startServer();
//# sourceMappingURL=server.js.map