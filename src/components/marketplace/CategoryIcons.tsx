import {
  Wrench, Sparkles, Hammer, TreePine, Paintbrush,
  Wind, Zap, HardHat, MoreHorizontal,
} from "lucide-react";

const CATEGORIES = [
  { name: "Plumbing", icon: Wrench },
  { name: "Cleaning", icon: Sparkles },
  { name: "Handyman", icon: Hammer },
  { name: "Lawn Care", icon: TreePine },
  { name: "Painting", icon: Paintbrush },
  { name: "HVAC", icon: Wind },
  { name: "Electrical", icon: Zap },
  { name: "Contractor", icon: HardHat },
  { name: "Other", icon: MoreHorizontal },
];

interface CategoryIconsProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

const CategoryIcons = ({ selected, onSelect }: CategoryIconsProps) => (
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    <button
      onClick={() => onSelect(null)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        !selected
          ? "bg-primary text-primary-foreground"
          : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
      }`}
    >
      All
    </button>
    {CATEGORIES.map(({ name, icon: Icon }) => (
      <button
        key={name}
        onClick={() => onSelect(selected === name ? null : name)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
          selected === name
            ? "bg-primary text-primary-foreground"
            : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
        }`}
      >
        <Icon className="h-4 w-4" />
        {name}
      </button>
    ))}
  </div>
);

export default CategoryIcons;
