import { NextApiRequest, NextApiResponse } from 'next';
import Story from '../../../../../../../api/models/Story';
import Task from '../../../../../../../api/models/Task';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      try {
        const story = await Story.findOne({ where: { id: req.query.storyId } });
        const task = await Task.create({
          ...req.body,
          storyId: story.getDataValue('id'),
        });
        res.status(202).json(task);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
