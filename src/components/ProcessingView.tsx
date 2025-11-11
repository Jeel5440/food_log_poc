import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ScanLine, Calculator, Sparkles, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const ProcessingView = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: <Brain />, text: "Detecting food items", color: "text-primary" },
    { icon: <ScanLine />, text: "Measuring portions", color: "text-accent" },
    { icon: <Calculator />, text: "Calculating nutrition", color: "text-primary" },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg border-2 border-border shadow-2xl animate-scale-in">
        <CardContent className="p-10 text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 animate-pulse-glow rounded-full" />
            <div className="relative bg-gradient-to-br from-primary to-primary/70 p-6 rounded-full">
              <Sparkles className="h-16 w-16 text-white animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
              Analyzing Your Meal
            </h2>
            <p className="text-muted-foreground text-lg">
              AI is processing your image...
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <p className="text-sm font-medium text-primary">
              {progress}% Complete
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {steps.map((step, index) => (
              <ProcessStep 
                key={index}
                icon={step.icon} 
                text={step.text}
                color={step.color}
                isActive={index === currentStep}
                isCompleted={index < currentStep}
              />
            ))}
          </div>

          <div className="pt-4">
            <div className="inline-block">
              <div 
                className="h-2 w-2 rounded-full bg-primary animate-pulse mx-1 inline-block"
                style={{ animationDelay: '0ms' }}
              />
              <div 
                className="h-2 w-2 rounded-full bg-primary animate-pulse mx-1 inline-block"
                style={{ animationDelay: '200ms' }}
              />
              <div 
                className="h-2 w-2 rounded-full bg-primary animate-pulse mx-1 inline-block"
                style={{ animationDelay: '400ms' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProcessStep = ({ 
  icon, 
  text, 
  color,
  isActive, 
  isCompleted 
}: { 
  icon: React.ReactNode; 
  text: string; 
  color: string;
  isActive: boolean;
  isCompleted: boolean;
}) => {
  return (
    <div 
      className={`
        flex items-center gap-4 p-4 rounded-xl transition-all duration-500
        ${isActive ? 'bg-primary/10 scale-105 shadow-md' : 'bg-secondary/30'}
        ${isCompleted ? 'opacity-60' : 'opacity-100'}
      `}
    >
      <div className={`${isCompleted ? 'text-primary' : color} transition-all duration-300`}>
        {isCompleted ? <Check className="h-6 w-6" /> : icon}
      </div>
      <span className={`flex-1 text-left font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {text}
      </span>
      {isActive && (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
      )}
      {isCompleted && (
        <Check className="h-5 w-5 text-primary" />
      )}
    </div>
  );
};
