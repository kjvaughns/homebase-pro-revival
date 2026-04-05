import SearchBar from "./SearchBar";

interface MarketplaceHeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  providerCount: number;
}

const MarketplaceHero = ({ searchValue, onSearchChange, providerCount }: MarketplaceHeroProps) => (
  <div className="text-center space-y-6 py-12 px-4">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
      Find Your <span className="text-primary">Home Pro</span>
    </h1>
    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
      Browse verified professionals ready to help with any home project.
      {providerCount > 0 && (
        <span className="text-foreground font-medium"> {providerCount} pros available.</span>
      )}
    </p>
    <SearchBar value={searchValue} onChange={onSearchChange} />
  </div>
);

export default MarketplaceHero;
