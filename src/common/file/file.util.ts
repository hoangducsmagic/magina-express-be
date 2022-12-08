import * as path from 'path';

export const getFileExtension = (fileName: string) => {
  if (!fileName) return null;
  return path.extname(fileName);
};
