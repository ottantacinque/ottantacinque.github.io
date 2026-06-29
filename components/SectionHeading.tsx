export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-7 flex items-center gap-3 text-lg font-bold tracking-tight">
      <span className="h-5 w-1 rounded-full bg-accent" />
      {children}
    </h2>
  );
}
