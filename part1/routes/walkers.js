onst express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/walkers/summary', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        u.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
        ROUND(AVG(r.rating), 1) AS average_rating,
        (
          SELECT COUNT(*) FROM WalkApplications wa
          JOIN WalkRequests wr ON wa.request_id = wr.request_id
          WHERE wa.walker_id = u.user_id AND wr.status = 'completed'
        ) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch walker summary' });
  }
});

module.exports = router;c
z