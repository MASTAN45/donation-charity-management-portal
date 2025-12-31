"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickupController = void 0;
const database_1 = require("../config/database");
class PickupController {
    // Schedule pickup
    static async schedulePickup(req, res) {
        try {
            const { contribution_id, pickup_date, pickup_address, contact_person, contact_phone, notes } = req.body;
            if (!pickup_date || !pickup_address) {
                return res.status(400).json({ error: 'Pickup date and address are required' });
            }
            const pickupDateTime = new Date(pickup_date);
            if (pickupDateTime < new Date()) {
                return res.status(400).json({ error: 'Pickup date must be in the future' });
            }
            const pool = (0, database_1.getPool)();
            // Check if contribution exists
            const [contributions] = await pool.query('SELECT id, donor_id FROM contributions WHERE id = ?', [contribution_id]);
            if (contributions.length === 0) {
                return res.status(404).json({ error: 'Contribution not found' });
            }
            const [result] = await pool.query(`INSERT INTO pickups (contribution_id, pickup_date, pickup_address, contact_person, contact_phone, notes) 
         VALUES (?, ?, ?, ?, ?, ?)`, [contribution_id, pickup_date, pickup_address, contact_person || null, contact_phone || null, notes || null]);
            // Update contribution with pickup schedule
            await pool.query('UPDATE contributions SET pickup_scheduled = ? WHERE id = ?', [pickup_date, contribution_id]);
            res.status(201).json({
                message: 'Pickup scheduled successfully',
                id: result.insertId
            });
        }
        catch (error) {
            console.error('Schedule pickup error:', error);
            res.status(500).json({ error: 'Failed to schedule pickup' });
        }
    }
    // Get pickups by contribution
    static async getPickupsByContribution(req, res) {
        try {
            const { contribution_id } = req.params;
            const pool = (0, database_1.getPool)();
            const [pickups] = await pool.query('SELECT * FROM pickups WHERE contribution_id = ? ORDER BY pickup_date DESC', [contribution_id]);
            res.json(pickups);
        }
        catch (error) {
            console.error('Get pickups error:', error);
            res.status(500).json({ error: 'Failed to get pickups' });
        }
    }
    // Get all pickups for NGO
    static async getNgoPickups(req, res) {
        try {
            const ngo_id = req.user?.id;
            const pool = (0, database_1.getPool)();
            const [pickups] = await pool.query(`SELECT p.*, c.quantity_or_amount, c.status as contribution_status,
         d.title as donation_title, d.donation_type,
         u.name as donor_name, u.contact_info as donor_contact
         FROM pickups p
         LEFT JOIN contributions c ON p.contribution_id = c.id
         LEFT JOIN donations d ON c.donation_id = d.id
         LEFT JOIN users u ON c.donor_id = u.id
         WHERE d.ngo_id = ?
         ORDER BY p.pickup_date DESC`, [ngo_id]);
            res.json(pickups);
        }
        catch (error) {
            console.error('Get NGO pickups error:', error);
            res.status(500).json({ error: 'Failed to get pickups' });
        }
    }
    // Update pickup status
    static async updatePickupStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const validStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: 'Invalid status' });
            }
            const pool = (0, database_1.getPool)();
            await pool.query('UPDATE pickups SET status = ? WHERE id = ?', [status, id]);
            // If pickup is completed, update contribution status
            if (status === 'completed') {
                const [pickups] = await pool.query('SELECT contribution_id FROM pickups WHERE id = ?', [id]);
                if (pickups.length > 0) {
                    await pool.query('UPDATE contributions SET status = ? WHERE id = ?', ['completed', pickups[0].contribution_id]);
                }
            }
            res.json({ message: 'Pickup status updated successfully' });
        }
        catch (error) {
            console.error('Update pickup status error:', error);
            res.status(500).json({ error: 'Failed to update pickup status' });
        }
    }
    // Get pickup by ID
    static async getPickupById(req, res) {
        try {
            const { id } = req.params;
            const pool = (0, database_1.getPool)();
            const [pickups] = await pool.query(`SELECT p.*, c.quantity_or_amount, c.status as contribution_status,
         d.title as donation_title, d.donation_type, d.location,
         donor.name as donor_name, donor.email as donor_email, donor.contact_info as donor_contact,
         ngo.name as ngo_name, ngo.email as ngo_email, ngo.contact_info as ngo_contact
         FROM pickups p
         LEFT JOIN contributions c ON p.contribution_id = c.id
         LEFT JOIN donations d ON c.donation_id = d.id
         LEFT JOIN users donor ON c.donor_id = donor.id
         LEFT JOIN users ngo ON d.ngo_id = ngo.id
         WHERE p.id = ?`, [id]);
            if (pickups.length === 0) {
                return res.status(404).json({ error: 'Pickup not found' });
            }
            res.json(pickups[0]);
        }
        catch (error) {
            console.error('Get pickup error:', error);
            res.status(500).json({ error: 'Failed to get pickup' });
        }
    }
}
exports.PickupController = PickupController;
//# sourceMappingURL=pickup.controller.js.map