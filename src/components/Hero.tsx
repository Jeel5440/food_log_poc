import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative z-10 pt-safe px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">FoodLog AI</h1>
      </div>

      {/* Hero Image */}
      <div 
        className="flex-1 relative"
        style={{
          backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%), url(${heroFood})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-safe pb-8 bg-gradient-to-t from-background via-background/95 to-transparent pt-20">
          <h2 className="text-4xl font-bold mb-4 text-foreground leading-tight">
            Track Your Nutrition With a Photo
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Snap a picture of your meal and let AI analyze calories, nutrients, and ingredients instantly
          </p>
          
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 shadow-lg"
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Scanning Food
          </Button>
        </div>
      </div>
    </section>
  );
};
