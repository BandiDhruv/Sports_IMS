import SportsDetails from '../models/Sports.js';

const getSportsData = async (req, res) => {
  try {
    const sportsData = await SportsDetails.find({});
    res.json(sportsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getSportsData }; // Modified export
