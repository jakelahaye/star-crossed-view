import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, Star } from "lucide-react";

interface CompatibilityResultProps {
  sign1: string;
  sign2: string;
}

// Simplified compatibility calculation (in a real app, this would be more complex)
const calculateCompatibility = (sign1: string, sign2: string): number => {
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    "Aries": { "Leo": 95, "Sagittarius": 90, "Gemini": 85, "Aquarius": 80, "Libra": 75 },
    "Taurus": { "Virgo": 95, "Capricorn": 90, "Cancer": 85, "Pisces": 80, "Scorpio": 75 },
    "Gemini": { "Libra": 95, "Aquarius": 90, "Aries": 85, "Leo": 80, "Sagittarius": 75 },
    "Cancer": { "Scorpio": 95, "Pisces": 90, "Taurus": 85, "Virgo": 80, "Capricorn": 75 },
    "Leo": { "Aries": 95, "Sagittarius": 90, "Gemini": 85, "Libra": 80, "Aquarius": 75 },
    "Virgo": { "Taurus": 95, "Capricorn": 90, "Cancer": 85, "Scorpio": 80, "Pisces": 75 },
    "Libra": { "Gemini": 95, "Aquarius": 90, "Leo": 85, "Aries": 80, "Sagittarius": 75 },
    "Scorpio": { "Cancer": 95, "Pisces": 90, "Virgo": 85, "Taurus": 80, "Capricorn": 75 },
    "Sagittarius": { "Aries": 95, "Leo": 90, "Aquarius": 85, "Gemini": 80, "Libra": 75 },
    "Capricorn": { "Taurus": 95, "Virgo": 90, "Scorpio": 85, "Cancer": 80, "Pisces": 75 },
    "Aquarius": { "Gemini": 95, "Libra": 90, "Sagittarius": 85, "Aries": 80, "Leo": 75 },
    "Pisces": { "Cancer": 95, "Scorpio": 90, "Capricorn": 85, "Taurus": 80, "Virgo": 75 },
  };

  return compatibilityMatrix[sign1]?.[sign2] || 
         compatibilityMatrix[sign2]?.[sign1] || 
         Math.floor(Math.random() * 40) + 50; // Random between 50-90 if not in matrix
};

const getCompatibilityMessage = (score: number): { message: string; color: string } => {
  if (score >= 90) return { message: "Cosmic Soulmates! ✨", color: "text-accent" };
  if (score >= 80) return { message: "Stellar Connection! 🌟", color: "text-primary" };
  if (score >= 70) return { message: "Harmonious Bond 💫", color: "text-primary/80" };
  if (score >= 60) return { message: "Potential for Growth 🌙", color: "text-muted-foreground" };
  return { message: "Challenging but Rewarding 🔮", color: "text-muted-foreground" };
};

const CompatibilityResult = ({ sign1, sign2 }: CompatibilityResultProps) => {
  const score = calculateCompatibility(sign1, sign2);
  const { message, color } = getCompatibilityMessage(score);

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-cosmic">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Heart className="h-6 w-6 text-accent animate-float" />
          Compatibility Result
          <Heart className="h-6 w-6 text-accent animate-float" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{getZodiacSymbol(sign1)}</div>
              <div className="font-semibold">{sign1}</div>
            </div>
            <Heart className="h-8 w-8 text-accent animate-pulse" />
            <div className="text-center">
              <div className="text-4xl mb-2">{getZodiacSymbol(sign2)}</div>
              <div className="font-semibold">{sign2}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold bg-starlight bg-clip-text text-transparent mb-2">
              {score}%
            </div>
            <div className={`text-lg font-semibold ${color}`}>
              {message}
            </div>
          </div>

          <Progress value={score} className="h-3" />
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            Cosmic Insights
          </h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Your celestial connection reveals a {score >= 75 ? 'powerful' : score >= 60 ? 'moderate' : 'gentle'} 
              {' '}bond that transcends the earthly realm.
            </p>
            <p>
              The stars align to create {score >= 80 ? 'extraordinary' : 'meaningful'} possibilities for 
              {' '}love, growth, and cosmic understanding.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Star className="h-6 w-6 text-accent animate-twinkle" />
        </div>
      </CardContent>
    </Card>
  );
};

const getZodiacSymbol = (sign: string): string => {
  const symbols: { [key: string]: string } = {
    "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋",
    "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏",
    "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓"
  };
  return symbols[sign] || "⭐";
};

export default CompatibilityResult;