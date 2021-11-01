import fetch from 'isomorphic-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

async function mkdir(foldername: string): Promise<Error | void> {
  try {
    await fs.mkdir(foldername);
  } catch (e: unknown) {
    return e as Error;
  }
}

async function touch(filename: string, destination: string, contents: string): Promise<Error | void> {
  try {
    await fs.writeFile(destination + '/' + filename + '.ts', contents);
  } catch (e: unknown) {
    return e as Error;
  }
}

async function fetchHTML(url: string): Promise<Error | string> {
  const response = await fetch(url);
  if (!response.ok) {
    return new Error(`Status code: ${response.status}`);
  }
  const html = await response.text();
  return html;
}

async function createProblemFiles(foldername: string, html: string): Promise<Error | void> {
  const parsed = new JSDOM(html);
  const dtc = parsed.window.document.querySelectorAll('dl');
  if (dtc == null) {
    return new Error('Error parsing, cant find problems container');
  }
  const titles: HTMLElement[] = [];
  dtc.forEach((container) => {
    let _titles = container.querySelectorAll('dt');
    _titles.forEach((title) => {
      titles.push(title);
    });
  });
  for (const title of titles) {
    const problem = {
      title: '',
      description: '',
    };
    const filename = title.textContent
      ?.toLocaleLowerCase()
      ?.replace(/(\s+|\.|\:|\n)/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/(\(\*+\)-|\'|\"|(-+)$|\;.+|\(|\))/gm, '')
      ?.slice(2);
    if (!filename) {
      return new Error('Cannot create file without a filename');
    }
    problem.title = filename;
    const nextSibling = title.nextElementSibling;
    if (nextSibling?.tagName === 'DD') {
      problem.description =
        nextSibling?.textContent
          ?.split('\n')
          ?.map((x) => '// ' + x)
          ?.join('\n') || '';
    }
    const touchError = await touch(problem.title, foldername, problem.description);
    if (touchError) {
      console.error(touchError.message);
    }
  }
}

async function fetchProblems(foldername: string, url: string) {
  const folderCreateError = await mkdir(foldername);
  if (folderCreateError) {
    console.error(folderCreateError.message);
  }
  const htmlOrError = await fetchHTML(url);
  if (htmlOrError instanceof Error) {
    return console.error(htmlOrError.message);
  }
  const html = htmlOrError;
  const creationError = await createProblemFiles(foldername, html);
  if (creationError) {
    return console.error(creationError.message);
  }
}

async function main() {
  await fetchProblems('src/01-lists', 'https://sites.google.com/site/prologsite/prolog-problems/1');
  await fetchProblems('src/02-arithmetic', 'https://sites.google.com/site/prologsite/prolog-problems/2');
  await fetchProblems('src/03-logic-and-codes', 'https://sites.google.com/site/prologsite/prolog-problems/3');
  await fetchProblems('src/04-binary-trees', 'https://sites.google.com/site/prologsite/prolog-problems/4');
  await fetchProblems('src/05-multiway-trees', 'https://sites.google.com/site/prologsite/prolog-problems/5');
  // await fetchProblems('src/06-graphs', 'https://sites.google.com/site/prologsite/prolog-problems/6');
  // await fetchProblems('src/07-miscellaneous', 'https://sites.google.com/site/prologsite/prolog-problems/7');
}

main();
