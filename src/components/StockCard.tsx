import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockCardProps {
  company: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high: number;
  low: number;
}

const StockCard = ({ 
  company, 
  ticker, 
  price, 
  change, 
  changePercent, 
  marketCap,
  volume,
  high,
  low
}: StockCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
              {company}
            </h3>
            <p className="text-sm text-muted-foreground">{ticker}</p>
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className={cn(
              "gap-1",
              isPositive && "bg-success hover:bg-success"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {changePercent > 0 ? "+" : ""}{changePercent.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold">
            ${price.toFixed(2)}
          </div>
          <div className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {change > 0 ? "+" : ""}{change.toFixed(2)} USD
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-semibold">{marketCap}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="text-sm font-semibold">{volume}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Day High</p>
            <p className="text-sm font-semibold">${high.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Day Low</p>
            <p className="text-sm font-semibold">${low.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
