const BASE_API_URL = "https://3cb8-118-185-191-21.ngrok-free.app/api/v1";

export default async function fetch(
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

  const result = await window.fetch(`${BASE_API_URL}${path}`, opts);

  if (!result.ok) {
    window.location.href = `/error?msg=${`Error, status code ${result.status}`}`;
    return null;
  }
  return await result.json();
}
