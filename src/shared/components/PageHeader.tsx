import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  action?: ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  emoji,
  action,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          {title}
        </h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
