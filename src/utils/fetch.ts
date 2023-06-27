const BASE_API_URL = "http://localhost:3000/api/v1";

export default async function fetch(
  path: string,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: Record<string, unknown>
) {
  const opts: RequestInit = { method: method ?? "GET" };
  if (body) {
    opts.body = JSON.stringify(body);
    opts.headers = { "Content-Type": "application/json" };
  }

  const result = await window.fetch(`${BASE_API_URL}${path}`, opts);

  if (!result.ok) {
    window.location.href = `/error?msg=${`Error, status code ${result.status}`}`;
    return null;
  }
  return await result.json();
}
