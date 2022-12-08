/* eslint-disable @typescript-eslint/no-explicit-any */
import * as aws from 'aws-sdk'; // import aws-sdk
import { ConfigurationOptions } from 'aws-sdk';
import S3, {
  DeleteObjectsRequest,
  ManagedUpload,
  ObjectIdentifierList
} from 'aws-sdk/clients/s3';
import environment from '../environment';
import { logger } from '../logger';
import { Directory } from './directory';
import * as ThisModule from './s3';

// We will have may folder/directory to upload different file such as company logo, user avatar, user's document.
// So each time we upload we should to update the config
export const updateS3Config = (directory: Directory) => {
  const configOptions: ConfigurationOptions = { signatureVersion: 'v4' };

  switch (directory) {
    case Directory.CompanyLogo:
      configOptions.secretAccessKey =
        environment.aws.uploads.companyLogo.secretAccessKey;
      configOptions.accessKeyId =
        environment.aws.uploads.companyLogo.accessKeyId;
      configOptions.region = environment.aws.uploads.companyLogo.region;
      break;
    case Directory.UserAvatar:
      configOptions.secretAccessKey =
        environment.aws.uploads.userAvatar.secretAccessKey;
      configOptions.accessKeyId =
        environment.aws.uploads.userAvatar.accessKeyId;
      configOptions.region = environment.aws.uploads.userAvatar.region;
      break;
    case Directory.Document:
      configOptions.secretAccessKey =
        environment.aws.uploads.documentUpload.secretAccessKey;
      configOptions.accessKeyId =
        environment.aws.uploads.documentUpload.accessKeyId;
      configOptions.region = environment.aws.uploads.documentUpload.region;
      break;
    // TODO: Define more case
    default:
      configOptions.secretAccessKey =
        environment.aws.uploads.public.secretAccessKey;
      configOptions.accessKeyId = environment.aws.uploads.public.accessKeyId;
      configOptions.region = environment.aws.uploads.public.region;
  }

  s3.config.update(configOptions);
};

// Bucket name
const bucket = environment.aws.uploads.companyLogo.bucket;

/**
 * Get PutObjectRequest
 * @param directory - To define where to save file {bucket}/{directory}
 * @param body - File content
 * @param key - File name
 * @returns putObjectRequest
 */
export const getPutObjectRequest = (
  directory: Directory,
  body: Buffer | Uint8Array | Blob | string,
  key: string = new Date().getTime().toString()
) => {
  const putObjectRequest: S3.Types.PutObjectRequest = {
    Bucket: '',
    Key: key,
    Body: body
  };

  switch (directory) {
    case Directory.CompanyLogo:
      putObjectRequest.Bucket = `${environment.aws.uploads.companyLogo.bucket}`;
      break;
    case Directory.Document:
      putObjectRequest.Bucket = `${environment.aws.uploads.documentUpload.bucket}`;
      break;
    default:
      putObjectRequest.Bucket = `${environment.aws.uploads.companyLogo.bucket}/${Directory.Public}`;
      break;
  }

  return putObjectRequest;
};

// Initiating S3 instance
const s3: S3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucket }
});

// Limit file size
const options: ManagedUpload.ManagedUploadOptions = {
  partSize: 10 * 1024 * 1024,
  queueSize: 1
};

/**
 * Upload file to S3
 * @param directory - To define where to save file {bucket}/{directory}
 * @param body - File content
 * @param key - File name
 * @returns  S3.ManagedUpload.SendData
 */
const uploadFileToS3 = async (
  directory: Directory,
  body: Buffer | Uint8Array | Blob | string,
  key: string = new Date().toString()
): Promise<S3.ManagedUpload.SendData> => {
  ThisModule.updateS3Config(directory);

  const putObjectRequest = ThisModule.getPutObjectRequest(directory, body, key);

  const params: S3.Types.PutObjectRequest = putObjectRequest;

  const uploadedFile = await s3.upload(params, options).promise();

  return uploadedFile;
};

/**
 * Get full bucket name
 * @param directory Directory
 * @returns string
 */
export const getBucketName = (directory: Directory) => {
  switch (directory) {
    case Directory.CompanyLogo:
      return `${environment.aws.uploads.companyLogo.bucket}`;
    case Directory.UserAvatar:
      return `${environment.aws.uploads.userAvatar.bucket}`;
    case Directory.Document:
      return `${environment.aws.uploads.documentUpload.bucket}`;
    default:
      return `${environment.aws.uploads.public.bucket}`;
  }
};

/**
 *  Get file from S3
 * @param directory Directory
 * @param key File name
 * @returns string
 */

const getFileFromS3 = (directory: Directory, key: string) => {
  ThisModule.updateS3Config(directory);
  const params = {
    Bucket: getBucketName(directory),
    Key: key,
    // TODO: Update Expires later if any
    Expires: 60 * 60 * 24
  };

  return s3.getSignedUrl('getObject', params);
};

const listFiles = async (directory: Directory, folder?: string) => {
  ThisModule.updateS3Config(directory);
  const params = {
    Bucket: getBucketName(directory),
    Delimiter: '/',
    Prefix: folder + '/'
  };
  const files = await s3.listObjects(params).promise();
  return files;
};

const copyFileInS3 = async (
  srcKey: string,
  desKey: string
): Promise<string | null> => {
  ThisModule.updateS3Config(Directory.Document);
  const bucketName = getBucketName(Directory.Document);
  const params = {
    Bucket: bucketName,
    CopySource: `${bucketName}/${srcKey}`,
    Key: desKey
  };
  try {
    await s3.copyObject(params).promise();
    return desKey;
  } catch (error) {
    return null;
  }
};

const deleteFolder = async (directory: Directory, folder?: string) => {
  ThisModule.updateS3Config(directory);

  const deleteObjects: ObjectIdentifierList = [];
  const files = await listFiles(directory, folder);
  files.Contents?.map(({ Key }) => deleteObjects.push({ Key: Key as string }));

  const params: DeleteObjectsRequest = {
    Bucket: getBucketName(directory),
    Delete: {
      Objects: deleteObjects
    }
  };

  s3.deleteObjects(params, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

export { uploadFileToS3, getFileFromS3, listFiles, copyFileInS3, deleteFolder };
