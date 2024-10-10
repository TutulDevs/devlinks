import { cn } from "@/lib/utils";

export const CardNeutral: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={cn("p-3 space-y-3 bg-neutral-100 rounded-md", className)}>
      {children}
    </div>
  );
};
