import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { blogPosts, type BlogCategory } from "@/data/blogPosts";

type Filter = "All" | BlogCategory;
const FILTERS: Filter[] = ["All", "Guide", "Article", "Tool"];

const BlogIndexPage = () => {
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    document.title = "Blog — HomeBase";
    const desc = "Practical guides for independent home-service providers.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">HomeBase Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical guides for independent home-service providers.
          </p>
        </header>

        <nav aria-label="Categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-neutral-900 text-muted-foreground border-neutral-800 hover:text-foreground hover:border-neutral-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to grow your business on HomeBase?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Join thousands of pros booking jobs, getting paid, and scaling on HomeBase.
            </p>
            <Link to="/signup" className="inline-block mt-6">
              <Button className="rounded-full px-8 h-11">Get started free</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndexPage;
