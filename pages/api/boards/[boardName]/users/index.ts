import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../../_api/models/User';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      const users = await User.findAll({
        where: { boardName: req.query.boardName },
      });
      res.status(200).json(users);
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
