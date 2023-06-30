export default async function fetcher(
  path: string,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: Record<string, unknown>
) {
  const opts: RequestInit = { method: method ?? "GET" };
  opts.headers = {
    "ngrok-skip-browser-warning": "69420",
  };
  if (body) {
    opts.body = JSON.stringify(body);
    opts.headers["Content-Type"] = "application/json";
  }

  if (!process.env.REACT_APP_BASE_API_URL)
    throw new Error("REACT_APP_BASE_API_URL is not set");

  const result = await window.fetch(
    `${process.env.REACT_APP_BASE_API_URL}${path}`,
    opts
  );

  if (!result.ok) {
    //window.location.href = `/error?msg=${`Error, status code ${result.status}`}`;
    return null;
  }

  if (result.status === 204) return true;
  return await result.json();
}
