const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";

export async function getPublicResource<T>(
  resource: string,
  fallback: T,
  queryParams?: Record<string, string | number | undefined>
): Promise<T> {
  try {
    const url = new URL(`${apiBase}/public/${resource}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          url.searchParams.set(key, String(val));
        }
      });
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      console.warn(`API returned status ${res.status} for public/${resource}, using static fallback`);
      return fallback;
    }
    const json = await res.json();

    // If backend returns paginated object { data: [...], meta: {...} }
    if (json && typeof json === "object" && "data" in json && Array.isArray(json.data)) {
      if (json.data.length === 0 && Array.isArray(fallback)) {
        return { data: fallback, meta: json.meta } as T;
      }
      return json as T;
    }

    if (Array.isArray(json) && json.length === 0 && Array.isArray(fallback)) {
      return fallback;
    }
    return json as T;
  } catch (err) {
    console.warn(`Failed to fetch dynamic content for ${resource} from ${apiBase}, falling back to static content.`, err);
    return fallback;
  }
}
