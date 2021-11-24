import * as AWS from 'aws-sdk';

const snsClient = new AWS.SNS({
  apiVersion: '2021-11-24',
  region: 'us-east-2',
});

export async function sendMessage(text: string): Promise<void> {
  await snsClient
    .publish({
      Message: text,
    })
    .promise();
}
