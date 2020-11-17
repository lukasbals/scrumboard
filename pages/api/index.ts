import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../api/models/Board';
import Story from '../../api/models/Story';
import Task from '../../api/models/Task';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await Board.sync();
  await Story.sync();
  await Task.sync();

  res.status(200).json({ message: 'Welcome to the scrumboard api!' });
};
