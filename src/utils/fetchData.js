import { headers } from "../static";

export const apiRequest = async ({ url, method, body }) => {
  try {
    const options = {
      method,
      headers,
      credentials: "include",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(`Error with request to ${url}:`, error);
    throw error;
  }
};
