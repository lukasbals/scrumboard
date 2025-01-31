import { message } from 'antd';
import Board from '../models/Board';

export type FormValues = {
  boardName: string;
};

const createBoard = async (values: FormValues): Promise<Board> => {
  message.info('Creating board ...');
  const response = await fetch('/api/boards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.boardName,
    }),
  });
  message.destroy();
  if (response.status === 202) {
    const board = await response.json();
    message.success('Board created!');
    return board;
  }
  message.error(
    'Some error occurred while creating your board. Please try again.'
  );
  return null;
};

export default createBoard;
