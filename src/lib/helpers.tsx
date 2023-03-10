import CodiceFiscale from 'codice-fiscale-js'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12)

export const id = () => {
  return nanoid()
}

export const base64 = {
  encode: base64Encode,
  decode: base64Decode,
}

function base64Encode (input: any) {
  const data = typeof input !== 'string' ? JSON.stringify(input) : input
  return Buffer.from(data).toString('base64')
}

//function base64Decode<T>(input: string, toObj: boolean): typeof toObj extends true ? string : T;
//function base64Decode<T>(x: T): T extends true ? T : string

function base64Decode<T> (input: string): T
function base64Decode<T> (input: string, toObj: true): T
function base64Decode<T> (input: string, toObj: false): string
function base64Decode<T = string> (input: string, toObj = true) {
  try {
    const data = Buffer.from(input, 'base64').toString('utf8')
    return toObj ? JSON.parse(data) as T : data
  } catch (e) {
    return toObj ? {} as T : ''
  }
}

export const verifyTin = function(tin: string, firstName: string, lastName: string) {
  const cf = new CodiceFiscale(tin);

  if (!cf.isValid()) {
    throw new Error(`Codice fiscale ${tin} non valido`);
  }

  const checkTin = new CodiceFiscale({
    name: firstName,
    surname: lastName,
    gender: cf.gender,
    day: cf.day,
    month: cf.month,
    year: cf.year,
    birthplace: cf.birthplace.nome,
    birthplaceProvincia: '',
  });

  if (checkTin.toString() !== cf.cf) {
    throw new Error(`Corrispondenza codice fiscale non valida`);
  }

  return cf;
};

export const callback = function(entries: any) {
  entries.forEach((entry: any) => {

    // Is the element in the viewport?
    if (entry.isIntersecting) {

      // Add the fadeIn class:
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {

      // Otherwise remove the fadein class
      entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};

export const capitalize = function(input: string) {
  // .replace(/\b./g, function(m){ return m.toUpperCase(); });
  const wordArray = input.split(' ');
  const output = wordArray.map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`);

  return output.join(' ');
};