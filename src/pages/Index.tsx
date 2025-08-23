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
            <h1 className="text-4xl md:text-5xl font-bold bg-starlight bg-clip-text text-transparent">
              Astrological Compatibility
            </h1>
            <Star className="h-8 w-8 text-accent animate-twinkle" />
          </div>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover the celestial connection between two souls through detailed birth chart analysis
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent animate-float" />
            <span className="text-foreground text-sm">Enter birth details below to reveal cosmic compatibility</span>
            <Sparkles className="h-4 w-4 text-accent animate-float" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-8 mb-8 opacity-30">
          <div className="text-2xl animate-twinkle">⭐</div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="text-2xl animate-twinkle" style={{ animationDelay: '1s' }}>✨</div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="text-2xl animate-twinkle" style={{ animationDelay: '2s' }}>🌟</div>
        </div>

        {!showResult ? (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Birth Information Forms */}
            <div className="relative">
              {/* Cosmic connector line */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
                <div className="w-px h-12 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0"></div>
                <Heart className="h-5 w-5 text-accent mx-auto -mt-2.5 -mb-2.5 animate-pulse" />
                <div className="w-px h-12 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                <div className="order-1 animate-fade-in-up">
                  <BirthInfoForm
                    personNumber={1}
                    birthInfo={person1Info}
                    onUpdate={setPerson1Info}
                  />
                </div>
                <div className="order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <BirthInfoForm
                    personNumber={2}
                    birthInfo={person2Info}
                    onUpdate={setPerson2Info}
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleCalculateCompatibility}
                disabled={!isFormValid()}
                className="text-base px-10 py-3 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Calculate Compatibility
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
              {!isFormValid() && (
                <p className="text-muted-foreground mt-4 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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