import * as AWS from 'aws-sdk';

const ssmClient = new AWS.SSM({
  apiVersion: '2021-11-17',
  region: 'us-east-2',
});

export async function getParameter(name: string): Promise<void> {
  ssmClient.getParameter(
    {
      Name: name,
    },
    (err, data) => {
      if (data?.Parameter) {
        console.log(data.Parameter);
        return data.Parameter;
      }
    },
  );
}
