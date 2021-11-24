import * as AWS from 'aws-sdk';
import { getParameter } from "./getParameter";

const snsClient = new AWS.SNS({
  apiVersion: '2021-11-24',
  region: 'us-east-2',
});

export async function sendMessage(text: string): Promise<void> {
  await snsClient
    .publish({
      TopicArn: await getParameter('ERROR_TOPIC'),
      Message: text,
    })
    .promise();
}
