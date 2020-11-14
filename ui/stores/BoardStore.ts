import { action, makeObservable, observable } from 'mobx';
import fetchStories from '../api/fetchStories';
import Story from '../models/Story';

class BoardStore {
  stories: Story[] = [];
  boardName = '';

  constructor(boardName: string) {
    makeObservable(this, {
      stories: observable,
      boardName: observable,
      loadStories: action,
    });
    this.boardName = boardName;
  }

  loadStories = async (): Promise<void> => {
    this.stories = await fetchStories(this.boardName);
  };
}

export default BoardStore;
