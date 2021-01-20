import auth from 'basic-auth';
import { IncomingMessage, ServerResponse } from 'http';
import timingSafeCompare from 'tsscmp';

const check = (name: string, pass: string): boolean => {
  let valid = true;

  const basicAuth = process.env.BASIC_AUTH.split(':');

  // Simple method to prevent short-circut and use timing-safe compare
  valid = timingSafeCompare(name, basicAuth[0]) && valid;
  valid = timingSafeCompare(pass, basicAuth[1]) && valid;

  return valid;
};

const basicAuth = (req: IncomingMessage, res: ServerResponse): boolean => {
  const credentials = auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="simple"');
    res.end();
    return false;
  }
  return true;
};

export default basicAuth;
