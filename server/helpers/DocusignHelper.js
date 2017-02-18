//
// to run this sample
//  1. copy the file in your own directory - say, example.js
//  2. change '***' to appropriate values
//  3. install async and request packages
//     npm install async
//     npm install request
//  4. execute
//     node example.js
//

import async from 'async';
import request from 'request';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const email = 'samuel@finliv.com';
const password = 'finlivMaster1!';
const integratorKey = 'ee5dcb68-907a-4851-800f-22e391abea7e';

const templateId = '1c93eaad-dd63-4e93-94cf-99f50abaabfa';
const templateRoleName = 'Customer';

let baseUrl = '';
let accountId = '';
let envelopeId = '';
let recipientName = '';

// --- HELPER FUNCTIONS ---

function addRequestHeaders(options, emailInput, passwordInput) {
  // JSON formatted authentication header (XML format allowed as well)
  const dsAuthHeader = JSON.stringify({
    Username: emailInput,
    Password: passwordInput,
    IntegratorKey: integratorKey
  });
  // DocuSign authorization header
  options.headers['X-DocuSign-Authentication'] = dsAuthHeader;
}

function initializeRequest(url, method, body, emailInput, passwordInput) {
  const options = {
    method,
    url,
    body,
    headers: {}
  };
  addRequestHeaders(options, emailInput, passwordInput);
  return options;
}

function parseResponseBody(err, res, body) {
  console.log('\r\nAPI Call Result: \r\n', JSON.parse(body));
  if (res.statusCode !== 200 && res.statusCode !== 201) {
    console.log('Error calling webservice, status is: ', res.statusCode);
    console.log('\r\n', err);
    return false;
  }
  return true;
}

export default function sendMailDocusignPromise(customerName, customerEmail, customerId) {
  console.log("calling docusign helper");
  const promiseDocusignURL = new Promise((resolve, reject) => {
    async.waterfall(
      [
        // Step 1 - Login (used to retrieve accountId and baseUrl)
        (next) => {
          const url = 'https://demo.docusign.net/restapi/v2/login_information';
          const body = '';// no request body for login api call

          // set request url, method, body, and headers
          const options = initializeRequest(url, 'GET', body, email, password);

          // send the request...
          request(options, (err, res, bodyInput) => {
            if (!parseResponseBody(err, res, bodyInput)) {
              reject();
            }
            baseUrl = JSON.parse(bodyInput).loginAccounts[0].baseUrl;
            accountId = JSON.parse(bodyInput).loginAccounts[0].accountId;
            next(null); // call next function
          });
        },
        // Step 2 - Send envelope with one Embedded recipient (using clientUserId property)
        () => {
          const url = baseUrl + '/envelopes';
          const webhookUrl = `https://beta.finliv.com/api/docusign/listener/${customerId}`;
          const eventNotification = {
              "url": webhookUrl,
              loggingEnabled: "true",
              "requireAcknowledgment": "true",
              "useSoapInterface": "false",
              "includeCertificateWithSoap": "false",
              "signMessageWithX509Cert": "false",
              "includeDocuments": "true",
              "includeEnvelopeVoidReason": "true",
              "includeTimeZone": "true",
              "includeSenderAccountAsCustomField": "true",
              "includeDocumentFields": "true",
              "includeCertificateOfCompletion": "true",
              "recipientEvents": [
                  {"recipientEventStatusCode": "Sent"},
                  {"recipientEventStatusCode": "Delivered"},
                  {"recipientEventStatusCode": "Completed"},
                  {"recipientEventStatusCode": "Declined"},
                  {"recipientEventStatusCode": "AuthenticationFailed"},
                  {"recipientEventStatusCode": "AutoResponded"}]
          };
          const body = JSON.stringify({
            accountId,
            emailSubject: 'DocuSign API call - Embedded Sending Example',
            templateId,
            eventNotification,
            templateRoles: [{
              email: customerEmail,
              name: customerName,
              roleName: templateRoleName
            }],
            status: 'sent'
          });

          console.log('body sent for email request', body);

          // set request url, method, body, and headers
          const options = initializeRequest(url, 'POST', body, email, password);

          // send the request...
          request(options, (err, res, bodyInput) => {
            if (parseResponseBody(err, res, bodyInput)) {
              resolve();
            } else {
              const apiError = new APIError('Docusign Error', httpStatus.UNAUTHORIZED, true);
              reject(apiError);
            }
          });
        }
      ]);
  });

  return promiseDocusignURL;
}
