import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BirthInfoForm from "@/components/BirthInfoForm";
import DetailedCompatibilityResult from "@/components/DetailedCompatibilityResult";
import { Sparkles, Heart, Star } from "lucide-react";
import cosmicBackground from "@/assets/cosmic-background.jpg";

interface BirthInfo {
  date: string;
  time: string;
  city: string;
}

const Index = () => {
  const [person1Info, setPerson1Info] = useState<BirthInfo>({
    date: "",
    time: "",
    city: ""
  });
  const [person2Info, setPerson2Info] = useState<BirthInfo>({
    date: "",
    time: "",
    city: ""
  });
  const [showResult, setShowResult] = useState(false);

  const isFormValid = () => {
    return person1Info.date && person1Info.time && person1Info.city &&
           person2Info.date && person2Info.time && person2Info.city;
  };

  const handleCalculateCompatibility = () => {
    if (isFormValid()) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setPerson1Info({ date: "", time: "", city: "" });
    setPerson2Info({ date: "", time: "", city: "" });
    setShowResult(false);
  };

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Cosmic overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-8 w-8 text-accent animate-twinkle" />
            <h1 className="text-5xl md:text-6xl font-bold bg-starlight bg-clip-text text-transparent">
              Cosmic Love
            </h1>
            <Star className="h-8 w-8 text-accent animate-twinkle" />
          </div>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover the celestial connection between two souls through detailed birth chart analysis
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-accent animate-float" />
            <span className="text-foreground">Calculate Compatibility</span>
            <Sparkles className="h-5 w-5 text-accent animate-float" />
          </div>
        </div>

        {!showResult ? (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Birth Information Forms */}
            <div className="grid md:grid-cols-2 gap-8">
              <BirthInfoForm
                personNumber={1}
                birthInfo={person1Info}
                onUpdate={setPerson1Info}
              />
              <BirthInfoForm
                personNumber={2}
                birthInfo={person2Info}
                onUpdate={setPerson2Info}
              />
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleCalculateCompatibility}
                disabled={!isFormValid()}
                className="text-lg px-8 py-4"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Calculate Compatibility
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
              {!isFormValid() && (
                <p className="text-muted-foreground mt-3">
                  Please fill in all birth information for both people
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <DetailedCompatibilityResult person1={person1Info} person2={person2Info} />
            
            <div className="text-center space-y-4">
              <Button
                variant="mystical"
                onClick={handleReset}
                className="mr-4"
              >
                Calculate Another Compatibility
              </Button>
              <div className="text-sm text-muted-foreground">
                Explore more cosmic connections with different birth details
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating stars decoration */}
      <div className="absolute top-20 left-10 text-accent/30 animate-twinkle">⭐</div>
      <div className="absolute top-40 right-20 text-accent/30 animate-twinkle" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-40 left-20 text-accent/30 animate-twinkle" style={{ animationDelay: '2s' }}>🌟</div>
      <div className="absolute bottom-20 right-10 text-accent/30 animate-twinkle" style={{ animationDelay: '0.5s' }}>⭐</div>
    </div>
  );
};

export default Index;