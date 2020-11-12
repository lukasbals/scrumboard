import { NextApiRequest, NextApiResponse } from 'next';
import Story from '../../../../../api/models/Story';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await Story.sync();
      const stories = await Story.findAll({
        where: { boardName: req.query.boardName },
      });
      res.status(200).json(stories);
      break;

    case 'POST':
      await Story.sync();
      try {
        const story = await Story.create({
          ...req.body,
          boardName: req.query.boardName,
        });
        res.status(200).json(story);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
