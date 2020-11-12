import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../../api/models/Board';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await Board.sync();
      const boards = await Board.findAll();
      res.status(200).json(boards);
      break;

    case 'POST':
      await Board.sync();
      try {
        const regex = /^[a-z](:?[a-z0-9-]{0,61}[a-z0-9])?$/;
        if (regex.test(req.body.name)) {
          const board = await Board.create(req.body);
          res.status(200).json(board);
        } else {
          res.status(400).json({ message: 'Board name is not URL safe' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
