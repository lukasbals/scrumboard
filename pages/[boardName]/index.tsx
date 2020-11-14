import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../../ui/components/Board';

const BoardRoute: React.FC = () => {
  const {
    query: { boardName },
  } = useRouter();

  useEffect(() => {
    console.log(boardName);
  }, [boardName]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
};

export default BoardRoute;
