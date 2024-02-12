import teachers from './teachers.json';
const URL_FOR_CREATE_USER = 'http://localhost:8000/api/v0/users';

async function makeRequset(payload) {
  payload.authProvider = 'GOOGLE';
  payload.roles = ['TEACHER'];

  payload.phone = payload.phone ? payload.phone.replaceAll(' ', '') : null;
  payload.email = payload.email ? payload.email.replaceAll(' ', '') : null;

  if (payload.phone === null || !payload.phone === true) {
    delete payload.phone;
  }
  const request = await fetch(URL_FOR_CREATE_USER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const resonse = await request.json();

  if (request.status >= 400) {
    console.error(JSON.stringify(payload));
    throw Error(JSON.stringify(resonse));
  }

  return request.status;
}

async function main() {
  for (const obj of teachers) {
    if (obj['email'] === null) continue;
    await makeRequset(obj);
  }
}

main();
