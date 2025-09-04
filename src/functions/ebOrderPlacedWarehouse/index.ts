import { EventBridgeEvent } from 'aws-lambda'
import { OrderRecord } from '@libs/types/dyno'
import axios from 'axios'
import Secrets from '@libs/Secrets'

export const handler = async (event: EventBridgeEvent<string, OrderRecord>) => {
  try {
    const details = event.detail

    const authKey = await Secrets.getSecret(
      `${process.env.APP_PREFIX}warehouse-api-key`
    )

    const maxRetries = 3
    let attempt = 0
    let success = false

    while (attempt < maxRetries && !success) {
      try {
        await axios.post(
          "https://dummy.restapiexample.com/api/v1/create",
          details,
          {
            headers: {
              authorization: authKey,
              'User-Agent': 'ecommerce-app/1.0', // recommended
              'Content-Type': 'application/json',
            },
          }
        )
        console.log("wareHouse API successfully called")
        success = true
      } catch (err: any) {
        if (err.response?.status === 429 && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000 // Exponential backoff: 1s, 2s, 4s...
          console.warn(`Rate limited. Retrying in ${waitTime / 1000}s...`)
          await new Promise(res => setTimeout(res, waitTime))
          attempt++
        } else {
          throw err
        }
      }
    }

    return

  } catch (error) {
    console.error("Warehouse API call failed:", error)
  }
}