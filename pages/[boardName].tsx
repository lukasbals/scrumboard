import { useRouter } from 'next/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../ui/components/Board';
import { BoardStoreContext } from '../ui/contexts/BoardStoreContext';
import BoardStore from '../ui/stores/BoardStore';

const BoardRoute: React.FC = () => {
  const {
    query: { boardName },
  } = useRouter();

  if (boardName) {
    return (
      <DndProvider backend={HTML5Backend}>
        <BoardStoreContext.Provider value={new BoardStore(`${boardName}`)}>
          <Board />
        </BoardStoreContext.Provider>
      </DndProvider>
    );
  }
  return <div>Loading ...</div>;
};

export default BoardRoute;
