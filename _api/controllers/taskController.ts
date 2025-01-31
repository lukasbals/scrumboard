import { NextApiRequest } from 'next';
import Board from '../models/Board';
import User from '../models/User';

type UserType = {
  username: string;
  color: string;
  boardName: string;
};

const createUserIfNotExists = async (
  req: NextApiRequest,
  boardName: string
): Promise<void> => {
  const board = await Board.findOne({
    where: { name: boardName },
    include: { model: User, as: 'users' },
  });

  // Check if username is set in the request body and if the user does not
  // exist already on the board
  if (
    req.body.username &&
    req.body.usercolor &&
    req.body.username !== '' &&
    !board
      .getDataValue('users')
      .find((user: UserType) => user.username === req.body.username)
  ) {
    await User.create({
      username: req.body.username,
      color: req.body.usercolor,
      boardName: board.getDataValue('name'),
    });
  }
};

export default createUserIfNotExists;
