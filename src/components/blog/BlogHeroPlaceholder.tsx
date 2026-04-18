import { BookOpen, Wrench, BarChart3, type LucideIcon } from "lucide-react";
import type { BlogCategory } from "@/data/blogPosts";

const iconMap: Record<BlogCategory, LucideIcon> = {
  Guide: BookOpen,
  Article: Wrench,
  Tool: BarChart3,
};

const gradientMap: Record<BlogCategory, string> = {
  Guide: "from-primary/30 via-primary/10 to-transparent",
  Article: "from-emerald-500/30 via-emerald-500/10 to-transparent",
  Tool: "from-sky-500/30 via-sky-500/10 to-transparent",
};

interface Props {
  category: BlogCategory;
  alt: string;
  className?: string;
}

const BlogHeroPlaceholder = ({ category, alt, className = "" }: Props) => {
  const Icon = iconMap[category];
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full overflow-hidden bg-neutral-900 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[category]}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-16 h-16 text-foreground/40" strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default BlogHeroPlaceholder;
