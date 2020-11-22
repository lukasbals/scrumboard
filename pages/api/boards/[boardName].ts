import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../../api/models/Board';
import User from '../../../api/models/User';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === 'GET') {
    const board = await Board.findOne({
      where: { name: req.query.boardName },
      include: { model: User, as: 'users' },
    });

    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ message: 'Board not found' });
    }
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};
