import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../../api/Board';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await Board.sync();
  console.log('New board: ', await Board.create({ name: 'Board 3' }));
  const boards = await Board.findAll();
  res.status(200).json(boards);
};
