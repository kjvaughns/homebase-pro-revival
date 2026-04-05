import { Search } from "lucide-react";
import AppDownloadCTA from "./AppDownloadCTA";

interface EmptyStateProps {
  searchTerm?: string;
  category?: string | null;
}

const EmptyState = ({ searchTerm, category }: EmptyStateProps) => (
  <div className="text-center py-16 space-y-6 max-w-md mx-auto">
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
      <Search className="h-8 w-8 text-muted-foreground" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-foreground">No providers found</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {searchTerm
          ? `No results for "${searchTerm}"${category ? ` in ${category}` : ""}. Try a different search.`
          : category
          ? `No providers found in ${category}. Try browsing all categories.`
          : "No providers are currently available. Check back soon!"}
      </p>
    </div>
    <AppDownloadCTA
      variant="card"
      message="Download the app for personalized recommendations"
    />
  </div>
);

export default EmptyState;
