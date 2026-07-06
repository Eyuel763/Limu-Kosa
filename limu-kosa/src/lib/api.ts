const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";

export async function getPublicResource<T>(resource: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${apiBase}/public/${resource}`, {
      next: { revalidate: 10 }, // Cache and revalidate every 10 seconds in Next.js
    });
    if (!res.ok) {
      console.warn(`API returned status ${res.status} for public/${resource}, using static fallback`);
      return fallback;
    }
    const data = await res.json();
    
    // Check if the data is empty and fallback if needed, or return parsed data
    if (Array.isArray(data) && data.length === 0) {
      return fallback;
    }
    return data as T;
  } catch (err) {
    console.warn(`Failed to fetch dynamic content for ${resource} from ${apiBase}, falling back to static content.`, err);
    return fallback;
  }
}
