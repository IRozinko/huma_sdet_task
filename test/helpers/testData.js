export const uniqueName = (prefix = 'Player') =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
