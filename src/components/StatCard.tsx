
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  count: number;
  title: string;
  icon: ReactNode;
  color: string;
  link?: string;
  className?: string;
}

export const StatCard = ({ count, title, icon, color, link, className }: StatCardProps) => {
  const cardContent = (
    <div
      className={cn(
        "dashboard-card animate-slideUp",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-count">{count}</div>
      <div className="card-title">{title}</div>
      {link && (
        <div className="card-link">
          <span>More Info</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );

  if (link) {
    return <Link to={link}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatCard;
