"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const router = (0, express_1.Router)();
// Public leaderboard routes
router.get('/donors/count', leaderboard_controller_1.LeaderboardController.getTopDonorsByCount);
router.get('/donors/amount', leaderboard_controller_1.LeaderboardController.getTopDonorsByAmount);
router.get('/statistics', leaderboard_controller_1.LeaderboardController.getStatistics);
router.get('/activities', leaderboard_controller_1.LeaderboardController.getRecentActivities);
exports.default = router;
//# sourceMappingURL=leaderboard.routes.js.map