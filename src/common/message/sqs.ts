import * as aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';
import { AppError } from '../appError';
import environment from '../environment';
import { ERROR_CODE } from '../errors';

const config: ConfigurationOptions = {
  region: environment.aws.sqs.region,
  accessKeyId: environment.aws.sqs.accessKeyId,
  secretAccessKey: environment.aws.sqs.secretAccessKey
};
aws.config.update(config);

const sqs = new aws.SQS({ apiVersion: '2012-11-05' });

export const pushMessageToAWSSQS = async (
  body: string,
  functionType:
    | 'processingDeletedUsers'
    | 'deletedUsers'
    | 'processingImportedCompanies'
) => {
  const params: SendMessageRequest = {
    MessageAttributes: {
      functionType: {
        DataType: 'String',
        StringValue: functionType
      }
    },
    MessageBody: body,
    QueueUrl: environment.aws.sqs.url || ''
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      throw new AppError(ERROR_CODE.INTERNAL_ERROR, [
        {
          key: 'sqs',
          message: 'Error to push message to AWS SQS',
          code: ERROR_CODE.INTERNAL_ERROR
        }
      ]);
    } else {
      return data.MessageId;
    }
  });
};
