import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import BlogHeroPlaceholder from "./BlogHeroPlaceholder";

const BlogCard = ({ post }: { post: BlogPost }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group block bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    {post.heroImage ? (
      <img src={post.heroImage} alt={post.heroImageDescription} className="w-full aspect-[16/9] object-cover" />
    ) : (
      <BlogHeroPlaceholder category={post.category} alt={post.heroImageDescription} className="aspect-[16/9]" />
    )}
    <div className="p-6 space-y-3">
      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary">
        {post.category}
      </span>
      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
      <div className="inline-flex items-center gap-1 text-sm font-medium text-primary pt-1">
        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  </Link>
);

export default BlogCard;
