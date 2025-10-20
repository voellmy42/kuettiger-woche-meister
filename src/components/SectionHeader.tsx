interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="border-b-2 border-primary pb-3 mb-6">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground mt-1 text-lg">{subtitle}</p>
      )}
    </div>
  );
};
