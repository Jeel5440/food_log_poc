import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CameraCapture } from "@/components/CameraCapture";
import { ProcessingView } from "@/components/ProcessingView";
import { ResultsView } from "@/components/ResultsView";

type AppState = "home" | "camera" | "processing" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [capturedImage, setCapturedImage] = useState<string>("");

  const handleGetStarted = () => {
    setAppState("camera");
  };

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setAppState("processing");
    
    // Simulate ML processing time (2-3 seconds)
    setTimeout(() => {
      setAppState("results");
    }, 2500);
  };

  const handleNewScan = () => {
    setCapturedImage("");
    setAppState("camera");
  };

  const handleReturnHome = () => {
    setCapturedImage("");
    setAppState("home");
  };

  if (appState === "camera") {
    return <CameraCapture onImageCapture={handleImageCapture} onCancel={handleReturnHome} />;
  }

  if (appState === "processing") {
    return <ProcessingView />;
  }

  if (appState === "results") {
    return (
      <ResultsView 
        imageData={capturedImage} 
        onNewScan={handleNewScan}
        onHome={handleReturnHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
    </div>
  );
};

export default Index;
