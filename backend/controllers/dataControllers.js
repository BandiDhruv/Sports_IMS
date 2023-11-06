import SportsDetails from '../models/Sports.js'; 

export const dataControllers = {
  getSportsData: async (req, res) => {
    try {
      const sportsData = await SportsDetails.find({});
      res.json(sportsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
