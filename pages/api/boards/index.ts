import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../../api/models/Board';
import { boardNameRegex } from '../../../constants';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      try {
        if (boardNameRegex.test(req.body.name)) {
          const board = await Board.create(req.body);
          res.status(202).json(board);
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
