import { authorize } from '../lambda_helpers';
import { deleteDeal } from './delete-deal';
import fetch from "node-fetch";
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const apiKey = process.env.REACT_APP_SENDGRID_ACCESS_TOKEN;
const templateId = process.env.REACT_APP_SENDGRID_TEMPLATE;

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();

  if (dd<10) {
    dd = '0' + dd;
  } 

  if (mm<10) {
    mm = '0' + mm;
  }

  return `${mm}/${dd}/${yyyy}`;
}

exports.handler = async (event, context) => authorize(context.clientContext.user, async () => {
  const { user } = context.clientContext;
  try {
    const data = JSON.parse(event.body);
    const body = {
      template_id: templateId,
      personalizations: [
        {
          to: [{ email: process.env.NODE_ENV === 'production' ? data.email : user.email }],
          dynamic_template_data: {
            name: data.name,
            customer: data.customer,
            date: getDate(),
          },
        },
      ],
      from: {
        email: user.email,
      },
    };
    if (process.env.NODE_ENV === 'production') {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
      
      // delete the deal after approved
      await deleteDeal({
        body: JSON.stringify({
          id: data.id,
        }),
      });

      return {
        statusCode: 200,
        body: JSON.stringify(res),
      };
    } else {
      return {
        statusCode: 200,
        body: 'ok',
      };
    }
  } catch (e) {
    console.log(e.message);
    return {
      statusCode: 500,
      body: "Internal Server Error: " + e
    };
  }
})