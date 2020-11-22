import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../api/models/Board';
import Story from '../../api/models/Story';
import Task from '../../api/models/Task';
import User from '../../api/models/User';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await Board.sync();
  await Story.sync();
  await Task.sync();
  await User.sync();

  res.status(200).json({ message: 'Welcome to the scrumboard api!' });
};
