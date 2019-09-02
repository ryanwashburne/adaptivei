import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;
  const adminAuthHeader = "Bearer " + identity.token;
  try {
    return fetch(userUrl, {
      method: "DELETE",
      headers: { Authorization: adminAuthHeader }
    })
      .then(response => {
        console.log("Deleted a user: " + user.email);
        return response.json();
      })
      .then(data => {
        console.log({ data });
        return { statusCode: 204 };
      })
      .catch(e => {
        return {
          statusCode: 500,
          body: "Internal Server Error: " + e
        };
      });
  } catch (e) {
    return e;
  }
};