import { $fetch } from "ofetch";
import { getQuery } from "ufo";

const TMDB_API_URL = "https://api.themoviedb.org/3";

export default defineEventHandler(async (event) => {
  // get query from url
  const query = getQuery(event.req.url!);

  const config = useRuntimeConfig();

  if (!config.tmdb.apiKey) {
    throw new Error("TMDB API key is not set");
  }

  try {
    return await $fetch(event.context.params!.path, {
      baseURL: TMDB_API_URL,
      params: {
        api_key: config.tmdb.apiKey,
        language: "en-US",
        ...query,
      },
      headers: {
        Accept: "application/json",
      },
    });
  } catch (e: any) {
    const status = e?.response?.status || 500;
    event.res.statusCode = status;
    return e.message?.replace(config.tmdb.apiKey, "***");
  }
});
