import seedDataGenerator from './seedDataGenerator';
import * as AWS from 'aws-sdk';

export const savetoDynamoDB = async ({data, tableName}: {data: any[], tableName: string}) => {
    const env = process.env.enviorment;

    if (!env){
        throw Error('No environment parameter found');
    }

    const config = {
        region: 'us-east-2',
        convertEmptyValues: true,
    };

    AWS.config.update(config);

    await batch({
        data,
        tableName,
    })
}

const batch = async ({data, tableName}: {data: any[], tableName: string}) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const formattedRecords = data.map( record => {
        return {
            PutRequest: {
                Item: record,
            }
        }
    })

    try {
        while (formattedRecords.length > 0) {
            const batch = formattedRecords.splice(0, 20);
        
            const params = {
                RequestItems: {
                    [tableName]: batch,
                }
            }

            await documentClient.batchWrite(params).promise();
            console.log("Uploading to dynamodb")
            console.log('remaning items =', formattedRecords.length);
        }

    } catch (error) {
        console.error('Error writing to DynamoDB:');
        console.log(error);
    }
}

export const deploytoAWS = async () => {
    const records = seedDataGenerator();
    try{
        await savetoDynamoDB({
            data: records,
            tableName: `ecommerce-app-${process.env.enviorment}-item-table`
        })
        console.log('Data uploaded successfully to dynamodb');

    } catch (error){
        console.error('Error while deploying to dynamodb:', error);
    }
}

deploytoAWS();