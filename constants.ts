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
