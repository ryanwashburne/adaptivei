import { authorize } from "../lambda_helpers"
import NetlifyAPI from "netlify"
const apiKey = process.env.NETLIFY_ACCESS_TOKEN
const client = new NetlifyAPI(apiKey)

export const deleteDeal = async event => {
  try {
    const data = JSON.parse(event.body)
    const submissionId = data.submissionId
    await client.deleteSubmission({
      submission_id: submissionId,
    })
    return {
      statusCode: 204,
      body: "deleted",
    }
  } catch (e) {
    console.log(e.message)
    return {
      statusCode: 500,
      body: "Internal Server Error: " + e,
    }
  }
}

exports.handler = async (event, context) =>
  authorize(context.clientContext.user, async () => deleteDeal(event))
