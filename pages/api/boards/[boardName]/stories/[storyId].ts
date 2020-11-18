import { NextApiRequest, NextApiResponse } from 'next';
import Story from '../../../../../api/models/Story';
import Task from '../../../../../api/models/Task';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'PUT':
      try {
        await Story.update(
          { name: req.body.name, link: req.body.link },
          {
            where: { id: req.query.storyId, boardName: req.query.boardName },
          },
        );
        res.status(200).json(req.body);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'DELETE':
      try {
        await Task.destroy({ where: { storyId: req.query.storyId } });
        await Story.destroy({
          where: { id: req.query.storyId, boardName: req.query.boardName },
        });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
