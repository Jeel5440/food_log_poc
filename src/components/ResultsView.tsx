import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Camera, Home, Flame, Award, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Ingredient {
  name: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ResultsViewProps {
  imageData: string;
  onNewScan: () => void;
  onHome: () => void;
}

export const ResultsView = ({ imageData, onNewScan, onHome }: ResultsViewProps) => {
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setShowResults(true), 300);
  }, []);

  const ingredients: Ingredient[] = [
    { name: "Grilled Chicken", weight: 150, calories: 248, protein: 47, carbs: 0, fat: 6 },
    { name: "Lettuce", weight: 50, calories: 8, protein: 1, carbs: 2, fat: 0 },
    { name: "Tomatoes", weight: 80, calories: 14, protein: 1, carbs: 3, fat: 0 },
    { name: "Onions", weight: 30, calories: 12, protein: 0, carbs: 3, fat: 0 },
    { name: "Quinoa", weight: 100, calories: 120, protein: 4, carbs: 21, fat: 2 },
  ];

  const totals = ingredients.reduce(
    (acc, ing) => ({
      calories: acc.calories + ing.calories,
      protein: acc.protein + ing.protein,
      carbs: acc.carbs + ing.carbs,
      fat: acc.fat + ing.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleSave = () => {
    toast.success("Meal logged successfully!", {
      description: "Your nutrition data has been saved."
    });
    setTimeout(onHome, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background py-8 px-4">
      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Success Header */}
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-xl animate-scale-in overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <CardContent className="relative p-8 text-center">
            <div className="inline-block mb-4 relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-full" />
              <CheckCircle className="relative h-20 w-20 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Analysis Complete!
            </h2>
            <p className="text-muted-foreground text-lg">
              We've identified <span className="font-semibold text-primary">{ingredients.length} ingredients</span> in your meal
            </p>
          </CardContent>
        </Card>

        {/* Image & Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Preview */}
          <Card className={`border-2 border-border shadow-lg overflow-hidden transition-all duration-500 ${showResults ? 'animate-slide-up' : 'opacity-0'}`}>
            <CardContent className="p-0">
              <div className="relative group">
                <img 
                  src={imageData} 
                  alt="Analyzed meal" 
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold text-lg">Your Healthy Meal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Summary */}
          <Card className={`border-2 border-border shadow-lg transition-all duration-500 delay-150 ${showResults ? 'animate-slide-up' : 'opacity-0'}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-accent" />
                Total Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <NutritionBox 
                  label="Calories" 
                  value={totals.calories} 
                  unit="kcal" 
                  icon={<Flame className="h-5 w-5" />}
                  gradient="from-accent to-accent/70"
                />
                <NutritionBox 
                  label="Protein" 
                  value={totals.protein} 
                  unit="g" 
                  icon={<Award className="h-5 w-5" />}
                  gradient="from-primary to-primary/70"
                />
                <NutritionBox 
                  label="Carbs" 
                  value={totals.carbs} 
                  unit="g" 
                  icon={<TrendingUp className="h-5 w-5" />}
                  gradient="from-primary to-primary/70"
                />
                <NutritionBox 
                  label="Fat" 
                  value={totals.fat} 
                  unit="g" 
                  icon={<TrendingUp className="h-5 w-5" />}
                  gradient="from-primary to-primary/70"
                />
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">Great choice!</span> This meal provides balanced nutrition
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients Breakdown */}
        <Card className={`border-2 border-border shadow-lg transition-all duration-500 delay-300 ${showResults ? 'animate-slide-up' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="text-2xl">Ingredient Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-secondary/40 to-secondary/20 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-foreground mb-1">{ing.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Weight: <span className="font-medium text-foreground">{ing.weight}g</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {ing.calories}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">kcal</p>
                    <div className="flex gap-3 text-xs">
                      <span className="px-2 py-1 bg-primary/10 rounded-md">
                        <span className="text-muted-foreground">P:</span> {ing.protein}g
                      </span>
                      <span className="px-2 py-1 bg-primary/10 rounded-md">
                        <span className="text-muted-foreground">C:</span> {ing.carbs}g
                      </span>
                      <span className="px-2 py-1 bg-primary/10 rounded-md">
                        <span className="text-muted-foreground">F:</span> {ing.fat}g
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className={`grid md:grid-cols-2 gap-4 transition-all duration-500 delay-500 ${showResults ? 'animate-slide-up' : 'opacity-0'}`}>
          <Button 
            variant="outline" 
            size="lg"
            className="h-16 text-lg border-2 hover:border-primary hover:bg-primary/5"
            onClick={onNewScan}
          >
            <Camera className="mr-2 h-6 w-6" />
            Scan Another Meal
          </Button>
          <Button 
            size="lg"
            className="h-16 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
            onClick={handleSave}
          >
            <Home className="mr-2 h-6 w-6" />
            Save & Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

const NutritionBox = ({ 
  label, 
  value, 
  unit, 
  icon,
  gradient 
}: { 
  label: string; 
  value: number; 
  unit: string; 
  icon: React.ReactNode;
  gradient: string;
}) => (
  <div className={`group relative overflow-hidden text-center p-5 rounded-xl bg-gradient-to-br ${gradient} border-2 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
    <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity text-white/80">
      {icon}
    </div>
    <p className="text-sm text-white/90 mb-2 font-medium">{label}</p>
    <p className="text-3xl font-bold text-white">
      {value}
      <span className="text-sm ml-1 text-white/80">{unit}</span>
    </p>
  </div>
);
