"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionController = void 0;
const database_1 = require("../config/database");
class ContributionController {
    // Create contribution (Donor only)
    static async createContribution(req, res) {
        try {
            const donor_id = req.user?.id;
            const { donation_id, quantity_or_amount, notes } = req.body;
            if (!quantity_or_amount || parseFloat(quantity_or_amount) <= 0) {
                return res.status(400).json({ error: 'Quantity/amount must be greater than 0' });
            }
            const pool = (0, database_1.getPool)();
            // Check if donation exists and is active
            const [donations] = await pool.query('SELECT id, status FROM donations WHERE id = ?', [donation_id]);
            if (donations.length === 0) {
                return res.status(404).json({ error: 'Donation not found' });
            }
            if (donations[0].status === 'cancelled' || donations[0].status === 'completed') {
                return res.status(400).json({ error: 'This donation is no longer active' });
            }
            const [result] = await pool.query(`INSERT INTO contributions (donation_id, donor_id, quantity_or_amount, notes) 
         VALUES (?, ?, ?, ?)`, [donation_id, donor_id, quantity_or_amount, notes || null]);
            res.status(201).json({
                message: 'Contribution created successfully',
                id: result.insertId
            });
        }
        catch (error) {
            console.error('Create contribution error:', error);
            res.status(500).json({ error: 'Failed to create contribution' });
        }
    }
    // Get all contributions for a donation (NGO can see)
    static async getContributionsByDonation(req, res) {
        try {
            const { donation_id } = req.params;
            const pool = (0, database_1.getPool)();
            const [contributions] = await pool.query(`SELECT c.*, u.name as donor_name, u.email as donor_email, u.contact_info as donor_contact
         FROM contributions c
         LEFT JOIN users u ON c.donor_id = u.id
         WHERE c.donation_id = ?
         ORDER BY c.created_at DESC`, [donation_id]);
            res.json(contributions);
        }
        catch (error) {
            console.error('Get contributions error:', error);
            res.status(500).json({ error: 'Failed to get contributions' });
        }
    }
    // Get donor's contribution history
    static async getDonorContributions(req, res) {
        try {
            const donor_id = req.user?.id;
            const pool = (0, database_1.getPool)();
            const [contributions] = await pool.query(`SELECT c.*, d.title as donation_title, d.donation_type, d.location, 
         u.name as ngo_name, u.contact_info as ngo_contact
         FROM contributions c
         LEFT JOIN donations d ON c.donation_id = d.id
         LEFT JOIN users u ON d.ngo_id = u.id
         WHERE c.donor_id = ?
         ORDER BY c.created_at DESC`, [donor_id]);
            res.json(contributions);
        }
        catch (error) {
            console.error('Get donor contributions error:', error);
            res.status(500).json({ error: 'Failed to get contributions' });
        }
    }
    // Confirm contribution (NGO only)
    static async confirmContribution(req, res) {
        try {
            const { id } = req.params;
            const { pickup_scheduled } = req.body;
            const pool = (0, database_1.getPool)();
            // Verify NGO owns the donation
            const [contributions] = await pool.query(`SELECT c.*, d.ngo_id FROM contributions c
         LEFT JOIN donations d ON c.donation_id = d.id
         WHERE c.id = ?`, [id]);
            if (contributions.length === 0) {
                return res.status(404).json({ error: 'Contribution not found' });
            }
            if (contributions[0].ngo_id !== req.user?.id && req.user?.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to confirm this contribution' });
            }
            await pool.query('UPDATE contributions SET status = ?, pickup_scheduled = ? WHERE id = ?', ['confirmed', pickup_scheduled || null, id]);
            res.json({ message: 'Contribution confirmed successfully' });
        }
        catch (error) {
            console.error('Confirm contribution error:', error);
            res.status(500).json({ error: 'Failed to confirm contribution' });
        }
    }
    // Update contribution status
    static async updateContributionStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: 'Invalid status' });
            }
            const pool = (0, database_1.getPool)();
            await pool.query('UPDATE contributions SET status = ? WHERE id = ?', [status, id]);
            res.json({ message: 'Contribution status updated successfully' });
        }
        catch (error) {
            console.error('Update contribution status error:', error);
            res.status(500).json({ error: 'Failed to update contribution status' });
        }
    }
    // Get contribution by ID
    static async getContributionById(req, res) {
        try {
            const { id } = req.params;
            const pool = (0, database_1.getPool)();
            const [contributions] = await pool.query(`SELECT c.*, 
         d.title as donation_title, d.donation_type, d.location, d.pickup_date_time,
         donor.name as donor_name, donor.email as donor_email, donor.contact_info as donor_contact,
         ngo.name as ngo_name, ngo.email as ngo_email, ngo.contact_info as ngo_contact
         FROM contributions c
         LEFT JOIN donations d ON c.donation_id = d.id
         LEFT JOIN users donor ON c.donor_id = donor.id
         LEFT JOIN users ngo ON d.ngo_id = ngo.id
         WHERE c.id = ?`, [id]);
            if (contributions.length === 0) {
                return res.status(404).json({ error: 'Contribution not found' });
            }
            res.json(contributions[0]);
        }
        catch (error) {
            console.error('Get contribution error:', error);
            res.status(500).json({ error: 'Failed to get contribution' });
        }
    }
}
exports.ContributionController = ContributionController;
//# sourceMappingURL=contribution.controller.js.map