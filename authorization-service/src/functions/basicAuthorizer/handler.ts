import { middyfy } from '../../libs/lambda';

enum Effect {
  ALLOW = 'Allow',
  DENY = 'Deny',
}

const generatePolicy = (principalId, resource, effect = Effect.ALLOW) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    },
  },
});

const getCredentials = (encodedCredentials: string) => {
  const buff = Buffer.from(encodedCredentials, 'base64');

  return buff.toString('utf-8').split(':')
}

const basicAuthorizerHandler = async (event, _, cb) => {
  const token = event?.headers?.Authorization;

  if (!token) {
    cb('Unauthorized! Authorization Header is missed.');
  }

  try {
    const encodedCredentials = token.split(' ')[1];

    const [username, password] = getCredentials(encodedCredentials);

    if (!username || !password) {
      cb('Unauthorized!');
    }

    const userPassword = process.env[username];

    const effect = userPassword && userPassword === password ? Effect.ALLOW : Effect.DENY;

    const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

    cb(null, policy);

  } catch (error) {
    cb(`Unauthorized: ${error.message}`);
  }
};

export const basicAuthorizer = middyfy(basicAuthorizerHandler);
