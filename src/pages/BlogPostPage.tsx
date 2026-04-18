import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogHeroPlaceholder from "@/components/blog/BlogHeroPlaceholder";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      document.title = "Post not found — HomeBase Blog";
      return;
    }
    document.title = `${post.title} — HomeBase Blog`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-3">Post not found</h1>
            <Link to="/blog" className="text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-primary font-semibold uppercase tracking-wide">{post.category}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{post.readMinutes} min read</span>
              <span className="text-muted-foreground">·</span>
              <time className="text-muted-foreground" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </header>

          {post.heroImage ? (
            <img
              src={post.heroImage}
              alt={post.heroImageDescription}
              className="w-full aspect-[16/9] object-cover rounded-2xl mb-10"
            />
          ) : (
            <BlogHeroPlaceholder
              category={post.category}
              alt={post.heroImageDescription}
              className="aspect-[16/9] rounded-2xl mb-10"
            />
          )}

          <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{post.body}</ReactMarkdown>
          </div>

          <aside className="mt-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Put this into action</h2>
            <p className="text-muted-foreground mb-5">Jump back into HomeBase and apply what you just read.</p>
            <Link to={post.cta.href}>
              <Button className="rounded-full px-7 h-11">{post.cta.label}</Button>
            </Link>
          </aside>
        </article>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <h2 className="text-2xl font-bold mb-6">Related posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                See all posts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
