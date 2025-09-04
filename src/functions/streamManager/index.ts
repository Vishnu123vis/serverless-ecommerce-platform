import { DynamoDBStreamEvent } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput, PutEventsRequestEntry } from '@aws-sdk/client-eventbridge';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

const client = new EventBridgeClient({})

const eventBridgeBusName = process.env.eventBridgeBusName;

export const handler = async (event: DynamoDBStreamEvent) => {
    try {
        const eventBEvents = event.Records.map((record) => {
            if (!record?.dynamodb?.NewImage) {
                return;
            }
            const event = recordToEB(record)
            return event
        })

        const params: PutEventsCommandInput = {
            Entries: eventBEvents,
        }

        const command = new PutEventsCommand(params)
        const res = await client.send(command)
        console.log(res)

    } catch (error) {
        console.log('error', error)
    }
  
}

const recordToEB = (record: DynamoDBStreamEvent['Records'][0]) => {
    const statusToSource = {
        placed: 'order.placed',
        packed: 'order.packed',
        delivered: 'order.delivered',
        error: 'order.error',
    }

    const data = unmarshall(
        record.dynamodb.NewImage as Record<string, AttributeValue>
    )

    const [tableArn] = record.eventSourceARN.split('/')

    const event: PutEventsRequestEntry = {
        Time: new Date(record?.dynamodb?.ApproximateCreationDateTime || new Date()),
        Source: statusToSource[data.status],
        Resources: [tableArn],
        DetailType: record['eventName'],
        Detail: JSON.stringify(data),
        EventBusName: eventBridgeBusName,
    }

    return event
}