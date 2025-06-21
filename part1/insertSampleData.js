const pool = require('./db');

async function insertSampleData() {
  const conn = await pool.getConnection();
  try {
    await conn.query('DELETE FROM WalkRatings');
    await conn.query('DELETE FROM WalkApplications');
    await conn.query('DELETE FROM WalkRequests');
    await conn.query('DELETE FROM Dogs');
    await conn.query('DELETE FROM Users');

    await conn.query(`INSERT INTO Users (username, email, password_hash, role) VALUES
      ('alice123', 'alice@example.com', 'hashed123', 'owner'),
      ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
      ('carol123', 'carol@example.com', 'hashed789', 'owner'),
      ('davewalker', 'dave@example.com', 'hashedabc', 'walker'),
      ('eveowner', 'eve@example.com', 'hashedxyz', 'owner')`);

    await conn.query(`INSERT INTO Dogs (owner_id, name, size) VALUES
      ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
      ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
      ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Rocky', 'large'),
      ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Daisy', 'medium'),
      ((SELECT user_id FROM Users WHERE username = 'eveowner'), 'Luna', 'small')`);

    await conn.query(`INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
      ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 10:00:00', 60, 'Hillside Park', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Daisy'), '2025-06-12 14:00:00', 30, 'City Center', 'cancelled'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Luna'), '2025-06-13 16:00:00', 40, 'Riverside Trail', 'open')`);
  } finally {
    conn.release();
  }
}

module.exports = insertSampleData;
