import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ZodiacSelector from "@/components/ZodiacSelector";
import CompatibilityResult from "@/components/CompatibilityResult";
import { Sparkles, Heart, Star } from "lucide-react";
import cosmicBackground from "@/assets/cosmic-background.jpg";

const Index = () => {
  const [selectedSign1, setSelectedSign1] = useState<string | null>(null);
  const [selectedSign2, setSelectedSign2] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculateCompatibility = () => {
    if (selectedSign1 && selectedSign2) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedSign1(null);
    setSelectedSign2(null);
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
            Discover the celestial connection between two souls through the ancient wisdom of astrology
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-accent animate-float" />
            <span className="text-foreground">Let the stars reveal your compatibility</span>
            <Sparkles className="h-5 w-5 text-accent animate-float" />
          </div>
        </div>

        {!showResult ? (
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Sign Selection */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-cosmic">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    First Person
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ZodiacSelector
                    title="Choose Your Sign"
                    selectedSign={selectedSign1}
                    onSelect={setSelectedSign1}
                  />
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-cosmic">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Second Person
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ZodiacSelector
                    title="Choose Their Sign"
                    selectedSign={selectedSign2}
                    onSelect={setSelectedSign2}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleCalculateCompatibility}
                disabled={!selectedSign1 || !selectedSign2}
                className="text-lg px-8 py-4"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Reveal Cosmic Compatibility
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
              {(!selectedSign1 || !selectedSign2) && (
                <p className="text-muted-foreground mt-3">
                  Please select both zodiac signs to continue
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <CompatibilityResult sign1={selectedSign1!} sign2={selectedSign2!} />
            
            <div className="text-center space-y-4">
              <Button
                variant="mystical"
                onClick={handleReset}
                className="mr-4"
              >
                Try Another Combination
              </Button>
              <div className="text-sm text-muted-foreground">
                Explore more cosmic connections and discover new possibilities
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