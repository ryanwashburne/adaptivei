import { authorize } from '../lambda_helpers';
import fetch from "node-fetch";

exports.handler = async (event, context) => authorize(context.clientContext.user, async () => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;
  const adminAuthHeader = `Bearer ${identity.token}`;
  try {
    await fetch(userUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': adminAuthHeader
      },
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
});