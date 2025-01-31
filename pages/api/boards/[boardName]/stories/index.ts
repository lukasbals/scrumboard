import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../../../../../_api/models/Board';
import Story from '../../../../../_api/models/Story';
import Task from '../../../../../_api/models/Task';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      const stories = await Story.findAll({
        where: { boardName: req.query.boardName },
        order: [['createdAt', 'ASC']],
        include: {
          model: Task,
          as: 'tasks',
        },
      });
      res.status(200).json(stories);
      break;

    case 'POST':
      try {
        const board = await Board.findOne({
          where: { name: req.query.boardName },
        });
        const story = await Story.create({
          ...req.body,
          boardName: board.getDataValue('name'),
        });
        res.status(202).json(story);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
