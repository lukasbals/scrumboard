import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../_api/models/Board';
import Story from '../../_api/models/Story';
import Task from '../../_api/models/Task';
import User from '../../_api/models/User';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await Board.sync();
  await Story.sync();
  await Task.sync();
  await User.sync();

  res.status(200).json({ message: 'Welcome to the scrumboard api!' });
};
