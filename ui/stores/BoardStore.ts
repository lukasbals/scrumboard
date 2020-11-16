import { action, makeObservable, observable } from 'mobx';
import fetchStories from '../api/fetchStories';
import Story from '../models/Story';
import { v4 as uuidv4 } from 'uuid';
import createStory from '../api/createStory';
import deleteStory from '../api/deleteStory';
import updateStory from '../api/updateStory';
import createTask from '../api/createTask';
import Task from '../models/Task';

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
      addTask: action,
      saveOrUpdateTask: action,
      removeNewTask: action,
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
        tasks: [],
      },
    ];
  };

  replaceStoryWithNewOne = (story: Story): void => {
    this.stories = this.stories.map((s) => (s.id === story.id ? story : s));
  };

  saveOrUpdateStory = async (story: Story): Promise<void> => {
    if (story.new) {
      const newStory = await createStory(story);
      this.replaceStoryWithNewOne({ ...newStory, tasks: [] });
    } else {
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

  // Manage tasks

  addTask = (storyId: string): void => {
    const story = this.findStory(storyId);
    story.tasks = [
      ...story.tasks,
      {
        description: '',
        id: uuidv4(),
        state: 'TODO',
        type: `TODO-${storyId}`,
        usercolor: '#e8e8d8',
        username: '',
        storyId,
        new: true,
      },
    ];
    this.replaceStoryWithNewOne(story);
  };

  findStory = (storyId: string): Story => {
    return this.stories.find((story: Story) => story.id === storyId);
  };

  replaceTaskWithExistingOne = (task: Task, tasks: Task[]): Task[] => {
    return tasks.map((t: Task) => (t.id === task.id ? task : t));
  };

  saveOrUpdateTask = async (task: Task): Promise<void> => {
    if (task.new) {
      const story = this.findStory(task.storyId);
      const newTask = await createTask(task, this.boardName);

      story.tasks = this.replaceTaskWithExistingOne(newTask, story.tasks);
      this.replaceStoryWithNewOne(story);
    } else {
      console.log('Update task');
      // const updatedTask = await updateTask(task, this.boardName);
      // this.replaceStoryWithNewOne(updatedStory);
    }
  };

  removeNewTask = (task: Task): void => {
    const story = this.findStory(task.storyId);
    story.tasks = story.tasks.filter((t: Task) => t.id !== task.id);
    this.replaceStoryWithNewOne(story);
  };
}

export default BoardStore;
