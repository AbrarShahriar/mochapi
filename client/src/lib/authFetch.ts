import { refreshToken } from "./auth";
import { getSession } from "./session";

interface FetchOptions extends RequestInit {
  headers?: { [key: string]: string };
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    authorization: `Bearer ${session?.accessToken}`,
  };

  let res = await fetch(url, options);

  if (res.status === 401) {
    if (!session?.refreshToken) throw new Error("Refresh token not found.");

    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      options.headers.authorization = `Bearer ${newAccessToken}`;
      res = await fetch(url, options);
    }
  }

  return res;
};
