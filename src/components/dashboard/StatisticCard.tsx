
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatisticCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className
}: StatisticCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2 mb-1">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {trend && trendValue && (
              <div className="flex items-center mt-2">
                <span 
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    trend === "up" && "bg-green-100 text-green-800",
                    trend === "down" && "bg-red-100 text-red-800",
                    trend === "neutral" && "bg-gray-100 text-gray-800"
                  )}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
