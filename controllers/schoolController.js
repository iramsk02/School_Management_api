import db from '../config/db.js';

export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding school.' });
  }
};

export const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  try {
    const [schools] = await db.execute('SELECT * FROM schools');
    const sorted = schools.map(school => {
      const distance = Math.sqrt(
        Math.pow(school.latitude - userLat, 2) +
        Math.pow(school.longitude - userLon, 2)
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching schools.' });
  }
};
