import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Shield } from "lucide-react";
import heroImage from "@/assets/hero-stocks.jpg";

const Hero = () => {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Financial Technology Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Real-Time Market Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              MNC Stock Analytics
            </span>
            <br />
            <span className="text-primary">In Real-Time</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track, analyze, and gain insights on multinational corporation stocks with 
            powerful real-time data visualization and comprehensive market analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToDashboard}
            >
              View Dashboard
              <BarChart3 className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-2">
              <TrendingUp className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">Real-Time Data</h3>
              <p className="text-sm text-muted-foreground">
                Live stock prices and market movements updated instantly
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-2">
              <BarChart3 className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive charts and performance metrics
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-2">
              <Shield className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">Reliable Insights</h3>
              <p className="text-sm text-muted-foreground">
                Data-driven analysis you can trust for decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
