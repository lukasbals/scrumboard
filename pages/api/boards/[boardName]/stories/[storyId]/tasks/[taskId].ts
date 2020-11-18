import { NextApiRequest, NextApiResponse } from 'next';
import Task from '../../../../../../../api/models/Task';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'PUT':
      try {
        await Task.update(
          {
            description: req.body.description,
            username: req.body.username,
            state: req.body.state,
          },
          {
            where: { id: req.query.taskId, storyId: req.query.storyId },
          },
        );
        res.status(200).json(req.body);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'DELETE':
      try {
        await Task.destroy({ where: { id: req.query.taskId } });
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
