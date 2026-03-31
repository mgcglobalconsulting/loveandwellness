import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Tag, Heart } from "lucide-react";
import type { Metadata } from "next";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string;
  tags: string[] | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return data as Post;
}

async function getRelatedPosts(currentId: string, tags: string[]): Promise<Post[]> {
  if (tags.length === 0) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at, tags")
    .eq("published", true)
    .neq("id", currentId)
    .contains("tags", tags.slice(0, 1))
    .order("published_at", { ascending: false })
    .limit(2);

  return (data as Post[]) ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Post Not Found | Love & Wellness Coaching" };
  }
  return {
    title: `${post.title} | Love & Wellness Coaching`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.tags ?? []);

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      {/* Back Link */}
      <div className="container mx-auto px-4 max-w-4xl mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="container mx-auto px-4 max-w-5xl mb-12 animate-fade-in">
          <div className="photo-frame aspect-[21/9] w-full relative overflow-hidden rounded-3xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-3xl animate-slide-up">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/15 hover:bg-primary/15 transition-colors duration-200"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 italic font-serif">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-6 pb-8 mb-10 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent-gold/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary fill-current" />
            </div>
            <span className="font-medium text-gray-700">Dr. Patricia George</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:text-gray-600 prose-blockquote:italic max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Sign-off */}
        <div className="mt-16 pt-10 border-t border-gray-200 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent-gold/30 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-primary fill-current" />
          </div>
          <div>
            <p className="script-accent text-primary !text-2xl leading-none mb-1">
              With Love,
            </p>
            <p className="font-serif text-xl text-text-primary">Dr. Patricia</p>
            <p className="text-sm text-gray-500 mt-0.5">Love &amp; Wellness Coach</p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <h3 className="text-2xl font-serif text-center mb-10 text-text-primary">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 to-accent-gold/15">
                    {related.cover_image && (
                      <Image
                        src={related.cover_image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg text-text-primary group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">
                      {related.title}
                    </h4>
                    {related.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-2">{related.excerpt}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-midnight text-cream py-20 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-40" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <p className="script-accent text-accent-gold mb-4">Your next step</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-cream">
            Ready to Transform Your Love Life?
          </h2>
          <p className="text-gray-300 mb-10 text-lg font-light max-w-xl mx-auto">
            Join Dr. Patricia's free masterclass and discover the exact steps to magnetize the deep, lasting love you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/webinar" className="btn-gold">
              Join the Free Masterclass
            </Link>
            <Link href="/blog" className="btn-outline">
              More Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
