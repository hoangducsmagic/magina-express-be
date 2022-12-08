import * as FileUtil from '../file.util';
const mockFileName = 'mockFileName.txt';

describe('file.util', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('#getFileExtension', () => {
    it('should return null if the file name is a blank string', async () => {
      const result = FileUtil.getFileExtension('');
      expect(result).toBeNull();
    });
    it('should return file name extension successfully', async () => {
      const result = FileUtil.getFileExtension(mockFileName);
      expect(result).toEqual('.txt');
    });
  });
});
