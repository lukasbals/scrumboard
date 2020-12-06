export const boardNameRegex = /^[a-z](:?[a-z0-9-]{0,61}[a-z0-9])?$/;

const addStoryToType = (type: string, storyId: string): string =>
  `${type}-${storyId}`;

export const todo = (storyId: string): string =>
  addStoryToType('TODO', storyId);

export const inProgress = (storyId: string): string =>
  addStoryToType('IN_PROGRESS', storyId);

export const verify = (storyId: string): string =>
  addStoryToType('VERIFY', storyId);

export const done = (storyId: string): string =>
  addStoryToType('DONE', storyId);

export const WEBSOCKET_EVENTS = [
  {
    name: 'ADD_STORY',
    uiStoreFunction: 'addStory',
  },
  {
    name: 'UPDATE_STORY',
    uiStoreFunction: 'replaceStoryWithNewOne',
  },
  {
    name: 'DELETE_STORY',
    uiStoreFunction: 'removeNewStory',
  },
  {
    name: 'ADD_TASK',
    uiStoreFunction: 'addTask',
  },
  {
    name: 'UPDATE_TASK',
    uiStoreFunction: 'websocketUpdateTask',
  },
  {
    name: 'MOVE_TASK',
    uiStoreFunction: 'websocketMoveTask',
  },
  {
    name: 'DELETE_TASK',
    uiStoreFunction: 'removeNewTask',
  },
];
