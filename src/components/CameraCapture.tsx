import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void;
  onCancel: () => void;
}

export const CameraCapture = ({ onImageCapture, onCancel }: CameraCaptureProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleAnalyze = () => {
    if (preview) {
      onImageCapture(preview);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="mb-4"
          >
            <X className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Capture Your Meal
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload or drag & drop an image of your food
          </p>
        </div>

        <Card className="border-2 border-border shadow-xl overflow-hidden animate-scale-in">
          <CardContent className="p-8">
            {!preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-4 border-dashed rounded-2xl p-12 text-center 
                  transition-all duration-300 cursor-pointer
                  ${isDragging 
                    ? 'border-primary bg-primary/10 scale-105' 
                    : 'border-border bg-gradient-to-br from-secondary/30 to-secondary/10 hover:border-primary/50 hover:bg-primary/5'
                  }
                `}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                    <div className="relative bg-primary/10 p-8 rounded-full">
                      <Camera className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-2xl font-semibold text-foreground">
                      {isDragging ? 'Drop your image here!' : 'Upload a food photo'}
                    </p>
                    <p className="text-muted-foreground">
                      Drag and drop or click to browse
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <Button
                      type="button"
                      size="lg"
                      className="bg-primary hover:bg-primary/90 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Choose File
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground pt-2">
                    Supports: JPG, PNG, WEBP
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">
                <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-2xl group">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center gap-3 text-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    <p className="text-foreground font-medium">
                      Ready to analyze your meal with AI
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    variant="outline"
                    size="lg"
                    className="h-14 text-base"
                  >
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Choose Different
                  </Button>
                  <Button
                    onClick={handleAnalyze}
                    size="lg"
                    className="h-14 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze with AI
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
