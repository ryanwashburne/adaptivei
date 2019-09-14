import { authorize } from '../lambda_helpers';
import NetlifyAPI from 'netlify';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const apiKey = process.env.REACT_APP_NETLIFY_ACCESS_TOKEN;
const client = new NetlifyAPI(apiKey);

export const deleteDeal = async (event) => {
  try {
    console.log(event.body)
    const data = JSON.parse(event.body);
    const submissionId = data.submissionId;
    await client.deleteSubmission({
      submission_id: submissionId,
    });
    return {
      statusCode: 204,
      body: 'deleted'
    };
  } catch (e) {
    console.log(e.message);
    return {
      statusCode: 500,
      body: "Internal Server Error: " + e
    };
  }
};

exports.handler = async (event, context) => authorize(context.clientContext.user, async () => deleteDeal(event));