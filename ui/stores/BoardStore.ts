import { action, makeObservable, observable } from 'mobx';
import fetchStories from '../api/fetchStories';
import Story from '../models/Story';
import { v4 as uuidv4 } from 'uuid';
import createStory from '../api/createStory';
import deleteStory from '../api/deleteStory';
import updateStory from '../api/updateStory';

class BoardStore {
  stories: Story[] = [];
  boardName = '';

  constructor(boardName: string) {
    makeObservable(this, {
      stories: observable,
      boardName: observable,
      loadStories: action,
      addStory: action,
      saveOrUpdateStory: action,
      removeNewStory: action,
      deleteStory: action,
    });
    this.boardName = boardName;
  }

  // Manage stories

  loadStories = async (): Promise<void> => {
    this.stories = await fetchStories(this.boardName);
  };

  addStory = (): void => {
    this.stories = [
      ...this.stories,
      {
        boardName: this.boardName,
        link: '',
        name: '',
        id: uuidv4(),
        new: true,
      },
    ];
  };

  replaceStoryWithNewOne = (story: Story): void => {
    this.stories = this.stories.map((s) => (s.id === story.id ? story : s));
  };

  saveOrUpdateStory = async (story: Story): Promise<void> => {
    if (story.new) {
      const newStory = await createStory(story);
      this.replaceStoryWithNewOne(newStory);
    } else {
      console.log('IN');
      const updatedStory = await updateStory(story);
      this.replaceStoryWithNewOne(updatedStory);
    }
  };

  removeNewStory = (storyId: string): void => {
    this.stories = this.stories.filter((story) => story.id !== storyId);
  };

  deleteStory = (storyId: string): void => {
    this.removeNewStory(storyId);
    deleteStory(storyId, this.boardName);
  };
}

export default BoardStore;
