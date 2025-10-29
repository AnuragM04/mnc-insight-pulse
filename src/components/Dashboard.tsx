import { useState } from "react";
import StockCard from "./StockCard";
import StockChart from "./StockChart";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for MNC stocks
const mockStocks = [
  {
    company: "Apple Inc.",
    ticker: "AAPL",
    price: 178.25,
    change: 2.45,
    changePercent: 1.39,
    marketCap: "2.78T",
    volume: "52.3M",
    high: 179.50,
    low: 176.80,
  },
  {
    company: "Microsoft Corporation",
    ticker: "MSFT",
    price: 412.80,
    change: 5.60,
    changePercent: 1.38,
    marketCap: "3.06T",
    volume: "23.1M",
    high: 415.20,
    low: 408.50,
  },
  {
    company: "Amazon.com Inc.",
    ticker: "AMZN",
    price: 178.35,
    change: -1.25,
    changePercent: -0.70,
    marketCap: "1.85T",
    volume: "45.8M",
    high: 180.10,
    low: 177.90,
  },
  {
    company: "Alphabet Inc.",
    ticker: "GOOGL",
    price: 175.63,
    change: 3.12,
    changePercent: 1.81,
    marketCap: "2.17T",
    volume: "28.4M",
    high: 176.80,
    low: 173.50,
  },
  {
    company: "Tesla Inc.",
    ticker: "TSLA",
    price: 242.84,
    change: -3.76,
    changePercent: -1.52,
    marketCap: "771.2B",
    volume: "95.6M",
    high: 248.20,
    low: 241.50,
  },
  {
    company: "Meta Platforms Inc.",
    ticker: "META",
    price: 511.25,
    change: 8.45,
    changePercent: 1.68,
    marketCap: "1.30T",
    volume: "18.9M",
    high: 514.30,
    low: 506.80,
  },
];

// Generate mock chart data
const generateChartData = (basePrice: number, change: number) => {
  const data = [];
  const times = ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30"];
  const variance = Math.abs(change) * 0.8;
  
  for (let i = 0; i < times.length; i++) {
    const fluctuation = (Math.random() - 0.5) * variance;
    const progress = i / (times.length - 1);
    data.push({
      time: times[i],
      price: basePrice - change + (change * progress) + fluctuation,
    });
  }
  return data;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="dashboard" className="py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Live Market Dashboard</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track the performance of leading multinational corporations with real-time data
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search stocks by company or ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Stock Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <StockCard key={stock.ticker} {...stock} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
            <StockChart
              data={generateChartData(mockStocks[0].price, mockStocks[0].change)}
              title={`${mockStocks[0].company} - Today's Performance`}
              isPositive={mockStocks[0].change >= 0}
            />
            <StockChart
              data={generateChartData(mockStocks[1].price, mockStocks[1].change)}
              title={`${mockStocks[1].company} - Today's Performance`}
              isPositive={mockStocks[1].change >= 0}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
