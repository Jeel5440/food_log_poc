import cameraIcon from "@/assets/camera-icon.png";
import aiIcon from "@/assets/ai-icon.png";
import nutritionIcon from "@/assets/nutrition-icon.png";
import { Card, CardContent } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: cameraIcon,
      title: "Photo Capture",
      description: "Take a photo of your meal"
    },
    {
      icon: aiIcon,
      title: "AI Analysis",
      description: "Identify ingredients instantly"
    },
    {
      icon: nutritionIcon,
      title: "Nutrition Data",
      description: "Get complete nutritional info"
    }
  ];

  return (
    <section className="px-6 py-12 pb-safe">
      <h2 className="text-2xl font-bold mb-2 text-foreground">
        How It Works
      </h2>
      <p className="text-muted-foreground mb-8">
        Three simple steps to track your meals
      </p>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="border-border bg-card"
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
