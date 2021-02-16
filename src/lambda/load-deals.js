import { authorize } from '../lambda_helpers';
import NetlifyAPI from 'netlify';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const formId = process.env.SENDGRID_FORM_ID;
const apiKey = process.env.NETLIFY_ACCESS_TOKEN;
const client = new NetlifyAPI(apiKey);

exports.handler = async (event, context) => authorize(context.clientContext.user, async () => {
  try {
    const forms = await client.listFormSubmissions({
      form_id: formId,
    })
    return {
      statusCode: 200,
      body: JSON.stringify(forms)
    }
  } catch (e) {
    console.log(e.message)
    return {
      statusCode: 500,
      body: "Internal Server Error: " + e
    };
  }
});