import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io-client';

import fetchStories from '../api/fetchStories';
import fetchUsers from '../api/fetchUsers';
import createStory from '../api/createStory';
import deleteStory from '../api/deleteStory';
import updateStory from '../api/updateStory';
import createTask from '../api/createTask';
import updateTask from '../api/updateTask';
import deleteTask from '../api/deleteTask';

import Story from '../models/Story';
import Task from '../models/Task';
import User from '../models/User';
import genRandomColor from '../utils/genRandomColor';

class BoardStore {
  stories: Story[] = [];
  users: User[] = [];
  boardName = '';
  socket: Socket = null;

  constructor(boardName: string) {
    makeAutoObservable(this);
    this.boardName = boardName;
  }

  setSocket = (socket: Socket): void => {
    this.socket = socket;
  };

  // Load data

  loadData = async (): Promise<void> => {
    await this.loadUsers();
    await this.loadStories();
  };

  loadStories = async (): Promise<void> => {
    this.stories = await fetchStories(this.boardName);
  };

  loadUsers = async (): Promise<void> => {
    this.users = await fetchUsers(this.boardName);
  };

  // Manage stories

  addEmptyStory = (): void => {
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

  addStory = (story: Story): void => {
    this.stories = [...this.stories, { ...story, tasks: [] }];
  };

  replaceStoryWithNewOne = (story: Story): void => {
    this.stories = this.stories.map((s) => (s.id === story.id ? story : s));
  };

  saveOrUpdateStory = async (story: Story): Promise<void> => {
    if (story.new) {
      const newStory = await createStory(story);
      this.socket.emit('ADD_STORY', newStory);
      this.replaceStoryWithNewOne({ ...newStory, tasks: [] });
    } else {
      const updatedStory = await updateStory(story);
      this.socket.emit('UPDATE_STORY', updatedStory);
      this.replaceStoryWithNewOne(updatedStory);
    }
  };

  removeNewStory = (storyId: string): void => {
    this.stories = this.stories.filter((story) => story.id !== storyId);
  };

  deleteStory = (storyId: string): void => {
    this.removeNewStory(storyId);
    this.socket.emit('DELETE_STORY', storyId);
    deleteStory(storyId, this.boardName);
  };

  // Manage tasks

  addEmptyTask = (storyId: string): void => {
    const story = this.findStory(storyId);
    story.tasks = [
      ...story.tasks,
      {
        description: '',
        id: uuidv4(),
        state: 'TODO',
        type: `TODO-${storyId}`,
        username: '',
        storyId,
        new: true,
      },
    ];
    this.replaceStoryWithNewOne(story);
  };

  addTask = async (task: Task): Promise<void> => {
    const story = this.findStory(task.storyId);
    story.tasks = [...story.tasks, task];

    await this.loadUsers();

    this.replaceStoryWithNewOne(story);
  };

  findStory = (storyId: string): Story => {
    return this.stories.find((story: Story) => story.id === storyId);
  };

  replaceTaskWithExistingOne = (task: Task, tasks: Task[]): Task[] => {
    return tasks.map((t: Task) => (t.id === task.id ? task : t));
  };

  saveOrUpdateTask = async (task: Task): Promise<void> => {
    const story = this.findStory(task.storyId);
    let newOrUpdatedTask: Task;
    if (task.new) {
      newOrUpdatedTask = await createTask(
        { ...task, usercolor: genRandomColor() },
        this.boardName
      );
      this.socket.emit('ADD_TASK', newOrUpdatedTask);
    } else {
      newOrUpdatedTask = await updateTask(
        // If the updated username is new on that board it needs a new color.
        { ...task, usercolor: genRandomColor() },
        this.boardName
      );
      this.socket.emit('UPDATE_TASK', newOrUpdatedTask);
    }
    story.tasks = this.replaceTaskWithExistingOne(
      newOrUpdatedTask,
      story.tasks
    );
    await this.loadUsers();
    this.replaceStoryWithNewOne(story);
  };

  removeNewTask = (task: Task): void => {
    const story = this.findStory(task.storyId);
    story.tasks = story.tasks.filter((t: Task) => t.id !== task.id);
    this.replaceStoryWithNewOne(story);
  };

  deleteTask = (task: Task): void => {
    this.removeNewTask(task);
    this.socket.emit('DELETE_TASK', task);
    deleteTask(task, this.boardName);
  };

  moveTask = (
    task: Task,
    newState: 'TODO' | 'IN_PROGRESS' | 'VERIFY' | 'DONE'
  ): void => {
    const story = this.findStory(task.storyId);
    task.state = newState;

    story.tasks = this.replaceTaskWithExistingOne(task, story.tasks);
    this.replaceStoryWithNewOne(story);

    this.socket.emit('MOVE_TASK', task);
    updateTask(task, this.boardName, true);
  };

  websocketMoveTask = (task: Task): void => {
    const story = this.findStory(task.storyId);
    story.tasks = this.replaceTaskWithExistingOne(task, story.tasks);
    this.replaceStoryWithNewOne(story);
  };

  websocketUpdateTask = async (task: Task): Promise<void> => {
    const story = this.findStory(task.storyId);
    story.tasks = this.replaceTaskWithExistingOne(task, story.tasks);

    await this.loadUsers();

    this.replaceStoryWithNewOne(story);
  };
}

export default BoardStore;
