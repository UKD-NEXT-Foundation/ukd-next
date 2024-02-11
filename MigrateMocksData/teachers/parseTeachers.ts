import teachersURLs from './teachersUrls.json';
import { parse } from 'node-html-parser';

async function getPerson(person: string) {
  const req = await fetch('https://ukd.edu.ua/person/' + person);
  const res = await req.text();

  if (req.status >= 400) {
    throw Error(JSON.stringify(res));
  }

  console.log(req.status);

  const document = parse(res).querySelector('#content');
  let department = '';
  let phone = '';
  let email = '';

  document.querySelectorAll('.field__item').forEach((el) => {
    if (el.innerText.includes('Кафедра ')) department += el.innerText;
    if (el.innerText.includes('+38')) phone += el.innerText;
    if (el.innerText.includes('@')) email += el.innerText;
  });

  return {
    fullname: document.querySelector('.field--type-string').innerText,
    email: email ? email.trim() : null,
    pictureURL: 'https://ukd.edu.ua' + document.querySelector('.card-img-top')['_attrs']['src'],
    department,
    phone: phone ? phone.trim() : null,
  };
}

async function main() {
  const teachers = [];

  for (const index in teachersURLs) {
    const teacherName = teachersURLs[index];
    const result = await getPerson(teacherName);
    teachers.push(result);

    console.log(`${index}/${teachersURLs.length}`, 'https://ukd.edu.ua/person/' + teacherName, result);
  }

  console.log(JSON.stringify(teachers));
}

main();
