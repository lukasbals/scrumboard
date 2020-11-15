export const boardNameRegex = /^[a-z](:?[a-z0-9-]{0,61}[a-z0-9])?$/;

const addStoryToType = (type: string, storyId: number): string =>
  `${type}-${storyId}`;

export const todo = (storyId: number): string =>
  addStoryToType('TODO', storyId);

export const inProgress = (storyId: number): string =>
  addStoryToType('IN_PROGRESS', storyId);

export const verify = (storyId: number): string =>
  addStoryToType('VERIFY', storyId);

export const done = (storyId: number): string =>
  addStoryToType('DONE', storyId);
