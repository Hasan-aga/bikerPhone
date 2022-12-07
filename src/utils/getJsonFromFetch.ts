import {RootObject} from './routeTypes';

export const getJsonFromFetch = async function (
  apiUrl: string,
): Promise<RootObject> {
  const serverlessUrl = `https://biker.hasan.one/.netlify/functions/attachAPIkey`;
  const data = JSON.stringify({
    url: apiUrl,
  });
  console.log('query: ', data);

  try {
    const response = await fetch(serverlessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    return await response.json();
  } catch (e) {
    console.log('getJson failed');
    throw e;
  }
};
