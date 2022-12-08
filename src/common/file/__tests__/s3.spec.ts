import { ConfigurationOptions, S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import environment from '../../environment';
import { Directory } from '../directory';
import * as UploadFileS3 from '../s3';

const mockUpdate = jest.fn();
const mockUpload = jest.fn();

jest.mock('aws-sdk', () => {
  const origin = jest.requireActual('aws-sdk');
  return {
    ...origin,
    S3: function () {
      return {
        config: {
          update: (config: ConfigurationOptions) => mockUpdate(config)
        },
        upload: (
          params: S3.Types.PutObjectRequest,
          options: ManagedUpload.ManagedUploadOptions
        ) => mockUpload(params, options)
      };
    }
  };
});

describe('upload-file-s3', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('#updateS3Config', () => {
    it('should update with correct config with company_logo directory', async () => {
      const directory: Directory = Directory.CompanyLogo;
      const expectedConfigOption: ConfigurationOptions = {
        accessKeyId: environment.aws.uploads.companyLogo.accessKeyId,
        region: environment.aws.uploads.companyLogo.region,
        secretAccessKey: environment.aws.uploads.companyLogo.secretAccessKey,
        signatureVersion: 'v4'
      };
      mockUpdate.mockResolvedValue(void 0);
      await UploadFileS3.updateS3Config(directory);

      expect(mockUpdate).toBeCalledWith(expectedConfigOption);
    });

    it('should update with correct config with user_avatar directory', async () => {
      const directory: Directory = Directory.UserAvatar;
      const expectedConfigOption: ConfigurationOptions = {
        accessKeyId: environment.aws.uploads.userAvatar.accessKeyId,
        region: environment.aws.uploads.userAvatar.region,
        secretAccessKey: environment.aws.uploads.userAvatar.secretAccessKey,
        signatureVersion: 'v4'
      };
      mockUpdate.mockResolvedValue(void 0);
      await UploadFileS3.updateS3Config(directory);
      expect(mockUpdate).toBeCalledWith(expectedConfigOption);
    });

    it('should update with correct config with public directory', async () => {
      const directory: Directory = Directory.Public;
      const expectedConfigOption: ConfigurationOptions = {
        accessKeyId: environment.aws.uploads.public.accessKeyId,
        region: environment.aws.uploads.public.region,
        secretAccessKey: environment.aws.uploads.public.secretAccessKey,
        signatureVersion: 'v4'
      };
      mockUpdate.mockResolvedValue(void 0);
      await UploadFileS3.updateS3Config(directory);
      expect(mockUpdate).toBeCalledWith(expectedConfigOption);
    });
  });

  describe('#getPutObjectRequest', () => {
    it('should return putObjectRequest with company_logo directory', async () => {
      const directory: Directory = Directory.CompanyLogo;
      const now = new Date().getTime().toString();
      const expectedPutObjectRequest: S3.Types.PutObjectRequest = {
        Bucket: `${environment.aws.uploads.companyLogo.bucket}`,
        Key: now,
        Body: ''
      };

      const result = await UploadFileS3.getPutObjectRequest(directory, '', now);
      expect(result).toEqual(expectedPutObjectRequest);
    });

    it('should return putObjectRequest with other directory', async () => {
      const directory: Directory = Directory.Public;
      const now = new Date().getTime().toString();
      const expectedPutObjectRequest: S3.Types.PutObjectRequest = {
        Bucket: `${environment.aws.uploads.companyLogo.bucket}/${Directory.Public}`,
        Key: now,
        Body: ''
      };

      const result = await UploadFileS3.getPutObjectRequest(directory, '', now);
      expect(result).toEqual(expectedPutObjectRequest);
    });
  });

  describe('#uploadFileToS3', () => {
    it('should call appropriate function to upload file to s3', async () => {
      const directory: Directory = Directory.CompanyLogo;
      const now = new Date().getTime().toString();
      const mockPutObjectRequest: S3.Types.PutObjectRequest = {
        Bucket: `${environment.aws.uploads.companyLogo.bucket}/${environment.aws.uploads.companyLogo.directory}`,
        Key: now,
        Body: ''
      };
      const mockOptions: ManagedUpload.ManagedUploadOptions = {
        partSize: 10 * 1024 * 1024,
        queueSize: 1
      };
      jest.spyOn(UploadFileS3, 'updateS3Config').mockImplementation();
      jest
        .spyOn(UploadFileS3, 'getPutObjectRequest')
        .mockReturnValue(mockPutObjectRequest);
      mockUpload.mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({})
      }));

      await UploadFileS3.uploadFileToS3(directory, '', now);
      expect(mockUpload).toBeCalledWith(mockPutObjectRequest, mockOptions);
    });
  });
});
