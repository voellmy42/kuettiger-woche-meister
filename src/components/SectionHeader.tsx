interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="relative mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-primary gradient-text">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground font-medium mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative line */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-20"></div>
    </div>
  );
};
