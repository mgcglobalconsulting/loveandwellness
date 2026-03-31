import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Tag } from "lucide-react";
import BlogTagFilter from "./BlogTagFilter";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string;
  tags: string[] | null;
}

export const metadata = {
  title: "Insights & Inspiration | Love & Wellness Coaching",
  description:
    "Wisdom, reflections, and transformational insights from Dr. Patricia George on love, relationships, and becoming the woman you were always meant to be.",
};

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at, tags")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Blog listing error:", error);
    return [];
  }
  return (data as Post[]) ?? [];
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent-gold/20">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="script-accent text-primary/30 text-5xl">L&W</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl font-serif text-text-primary mb-3 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <time className="text-xs text-gray-400 font-medium tracking-wide">
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function EmptyPlaceholderCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-dashed border-gray-200 flex flex-col h-full opacity-60">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/10 to-accent-gold/10 flex items-center justify-center">
        <span className="script-accent text-primary/20 text-5xl">L&W</span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-3 bg-gray-100 rounded-full w-1/3 mb-4" />
        <div className="h-5 bg-gray-100 rounded-full w-3/4 mb-2" />
        <div className="h-5 bg-gray-100 rounded-full w-2/3 mb-4" />
        <div className="h-3 bg-gray-100 rounded-full w-full mb-2" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6 mb-6" />
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
          <div className="h-3 bg-gray-100 rounded-full w-1/4" />
          <div className="h-3 bg-gray-100 rounded-full w-1/5" />
        </div>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags ?? []))
  ).sort();

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-4xl text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-6">
          <Tag className="w-4 h-4" />
          THE JOURNAL
        </div>
        <h1 className="section-heading mb-6 text-primary">
          Insights &amp; <span className="text-gradient-gold">Inspiration</span>
        </h1>
        <p className="section-subheading text-gray-600 max-w-2xl mx-auto">
          Reflections on love, healing, and the sacred work of becoming — from the heart of Dr. Patricia George.
        </p>
        {posts.length > 0 && (
          <div className="mt-4">
            <p className="script-accent text-primary/60">From the Heart</p>
          </div>
        )}
      </section>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl mb-10">
          <BlogTagFilter tags={allTags} />
        </section>
      )}

      {/* Grid */}
      <section className="container mx-auto px-4 max-w-6xl">
        {posts.length === 0 ? (
          <>
            <p className="text-center text-gray-500 mb-12 italic font-light text-lg">
              Insights coming soon — check back for love, wisdom &amp; transformation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EmptyPlaceholderCard />
              <EmptyPlaceholderCard />
              <EmptyPlaceholderCard />
            </div>
          </>
        ) : (
          <div
            id="blog-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up"
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-midnight text-cream py-20 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-40" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <p className="script-accent text-accent-gold mb-4">Ready to begin?</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-cream">
            Transform Your Love Life
          </h2>
          <p className="text-gray-300 mb-10 text-lg font-light">
            Join Dr. Patricia's free masterclass and discover the proven path to the love you deserve.
          </p>
          <Link href="/webinar" className="btn-gold">
            Reserve Your Seat — Free
          </Link>
        </div>
      </section>
    </div>
  );
}
