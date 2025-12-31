"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const database_1 = require("../config/database");
class LeaderboardController {
    // Get top donors by contribution count
    static async getTopDonorsByCount(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const pool = (0, database_1.getPool)();
            const [donors] = await pool.query(`SELECT u.id, u.name, u.email, COUNT(c.id) as contribution_count,
         SUM(CASE WHEN c.status = 'completed' THEN 1 ELSE 0 END) as completed_count
         FROM users u
         LEFT JOIN contributions c ON u.id = c.donor_id
         WHERE u.role = 'donor'
         GROUP BY u.id, u.name, u.email
         HAVING contribution_count > 0
         ORDER BY contribution_count DESC, completed_count DESC
         LIMIT ?`, [limit]);
            res.json(donors);
        }
        catch (error) {
            console.error('Get top donors by count error:', error);
            res.status(500).json({ error: 'Failed to get leaderboard' });
        }
    }
    // Get top donors by amount (for fund donations)
    static async getTopDonorsByAmount(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const pool = (0, database_1.getPool)();
            const [donors] = await pool.query(`SELECT u.id, u.name, u.email, 
         SUM(CAST(c.quantity_or_amount AS DECIMAL(10,2))) as total_amount,
         COUNT(c.id) as contribution_count
         FROM users u
         LEFT JOIN contributions c ON u.id = c.donor_id
         LEFT JOIN donations d ON c.donation_id = d.id
         WHERE u.role = 'donor' AND d.donation_type = 'funds' AND c.status = 'completed'
         GROUP BY u.id, u.name, u.email
         HAVING total_amount > 0
         ORDER BY total_amount DESC
         LIMIT ?`, [limit]);
            res.json(donors);
        }
        catch (error) {
            console.error('Get top donors by amount error:', error);
            res.status(500).json({ error: 'Failed to get leaderboard' });
        }
    }
    // Get donation statistics
    static async getStatistics(req, res) {
        try {
            const pool = (0, database_1.getPool)();
            const [stats] = await pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM users WHERE role = 'donor') as total_donors,
          (SELECT COUNT(*) FROM users WHERE role = 'ngo') as total_ngos,
          (SELECT COUNT(*) FROM donations) as total_donations,
          (SELECT COUNT(*) FROM donations WHERE status = 'pending') as pending_donations,
          (SELECT COUNT(*) FROM donations WHERE status = 'completed') as completed_donations,
          (SELECT COUNT(*) FROM contributions) as total_contributions,
          (SELECT COUNT(*) FROM contributions WHERE status = 'completed') as completed_contributions,
          (SELECT COUNT(*) FROM pickups) as total_pickups,
          (SELECT COUNT(*) FROM pickups WHERE status = 'completed') as completed_pickups
      `);
            res.json(stats[0]);
        }
        catch (error) {
            console.error('Get statistics error:', error);
            res.status(500).json({ error: 'Failed to get statistics' });
        }
    }
    // Get recent activities
    static async getRecentActivities(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 20;
            const pool = (0, database_1.getPool)();
            const [activities] = await pool.query(`(SELECT 'donation' as type, d.id, d.title as description, d.created_at, u.name as user_name
          FROM donations d
          LEFT JOIN users u ON d.ngo_id = u.id
          ORDER BY d.created_at DESC
          LIMIT ?)
         UNION ALL
         (SELECT 'contribution' as type, c.id, CONCAT('Contribution to donation #', c.donation_id) as description, 
          c.created_at, u.name as user_name
          FROM contributions c
          LEFT JOIN users u ON c.donor_id = u.id
          ORDER BY c.created_at DESC
          LIMIT ?)
         ORDER BY created_at DESC
         LIMIT ?`, [limit, limit, limit]);
            res.json(activities);
        }
        catch (error) {
            console.error('Get recent activities error:', error);
            res.status(500).json({ error: 'Failed to get recent activities' });
        }
    }
}
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=leaderboard.controller.js.map