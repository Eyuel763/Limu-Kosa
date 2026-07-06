import { Camera } from "lucide-react";
import PublicHero from "@/components/common/PublicHero";
import { getPublicResource } from "@/lib/api";

// Define the interface to ensure type safety during the build process
interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
  altText?: string;
}

export default async function GalleryPage() {
  // Explicitly type the array as GalleryImage[]
  const images: GalleryImage[] = await getPublicResource("gallery", []);
  const apiBase = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
    : "http://127.0.0.1:4000";

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      <PublicHero
        eyebrow="Photo archive"
        title="Gallery"
        description="Official gallery of government activities, infrastructure development, agricultural initiatives, tourism sites, and community events."
        icon={Camera}
      />
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Camera className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-sm font-black text-[#2C2C2C]">No images found</h3>
            <p className="mt-2 text-xs text-[#50627A]">Official photo records will be shown once they are published by the admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((img: GalleryImage) => {
              const fullUrl = img.imageUrl.startsWith("http") 
                ? img.imageUrl 
                : `${apiBase}${img.imageUrl}`;
                
              return (
                <article key={img.id} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                    <img
                      src={fullUrl}
                      alt={img.altText || img.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {img.category && (
                      <span className="inline-block rounded bg-[#E8F0EA] px-2.5 py-0.5 text-xs font-bold text-[#1E5631]">
                        {img.category}
                      </span>
                    )}
                    <h2 className="mt-2 text-base font-black text-[#2C2C2C] leading-snug">{img.title}</h2>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}