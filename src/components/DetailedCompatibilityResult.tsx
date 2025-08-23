import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, Star, Calendar, MapPin, Clock, Brain, MessageCircle, Sprout, Zap } from "lucide-react";

import CircularProgress from "./CircularProgress";

interface BirthInfo {
  date: string;
  time: string;
  city: string;
}

interface DetailedCompatibilityResultProps {
  person1: BirthInfo;
  person2: BirthInfo;
}

interface CompatibilityBreakdown {
  emotional: number;
  intellectual: number;
  communication: number;
  growth: number;
  sexual: number;
  adventure: number;
}

// Convert birth date to zodiac sign
const getZodiacSign = (dateString: string): { sign: string; symbol: string } => {
  if (!dateString) return { sign: "Unknown", symbol: "⭐" };
  
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const zodiacSigns = [
    { sign: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20] },
    { sign: "Aries", symbol: "♈", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22] },
    { sign: "Leo", symbol: "♌", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22] },
    { sign: "Libra", symbol: "♎", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] },
  ];

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;
    
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return { sign: zodiac.sign, symbol: zodiac.symbol };
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return { sign: zodiac.sign, symbol: zodiac.symbol };
      }
    }
  }
  
  return { sign: "Capricorn", symbol: "♑" };
};

// Calculate detailed compatibility breakdown
const calculateCompatibilityBreakdown = (person1: BirthInfo, person2: BirthInfo): CompatibilityBreakdown => {
  const sign1 = getZodiacSign(person1.date).sign;
  const sign2 = getZodiacSign(person2.date).sign;
  
  // Enhanced compatibility matrix with detailed breakdowns
  const compatibilityData: { [key: string]: { [key: string]: CompatibilityBreakdown } } = {
    "Aries": {
      "Leo": { emotional: 88, intellectual: 75, communication: 82, growth: 90, sexual: 95, adventure: 92 },
      "Sagittarius": { emotional: 80, intellectual: 85, communication: 88, growth: 85, sexual: 88, adventure: 95 },
      "Gemini": { emotional: 70, intellectual: 90, communication: 95, growth: 75, sexual: 78, adventure: 85 },
    },
    "Taurus": {
      "Virgo": { emotional: 95, intellectual: 80, communication: 75, growth: 88, sexual: 85, adventure: 60 },
      "Capricorn": { emotional: 85, intellectual: 88, communication: 70, growth: 92, sexual: 80, adventure: 65 },
    },
    // Add more combinations as needed...
  };

  // Get compatibility data or generate random realistic values
  const data = compatibilityData[sign1]?.[sign2] || compatibilityData[sign2]?.[sign1] || {
    emotional: Math.floor(Math.random() * 40) + 50,
    intellectual: Math.floor(Math.random() * 40) + 50,
    communication: Math.floor(Math.random() * 40) + 45,
    growth: Math.floor(Math.random() * 40) + 55,
    sexual: Math.floor(Math.random() * 40) + 50,
    adventure: Math.floor(Math.random() * 40) + 50,
  };

  return data;
};

const calculateOverallScore = (breakdown: CompatibilityBreakdown): number => {
  const scores = Object.values(breakdown);
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
};

const getCompatibilityMessage = (score: number): { message: string; color: string } => {
  if (score >= 85) return { message: "Cosmic Soulmates! ✨", color: "text-green-400" };
  if (score >= 75) return { message: "Stellar Connection! 🌟", color: "text-green-400" };
  if (score >= 65) return { message: "Good Compatibility 💫", color: "text-accent" };
  if (score >= 55) return { message: "Potential for Growth 🌙", color: "text-orange-400" };
  return { message: "Challenging but Rewarding 🔮", color: "text-red-400" };
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTime = (timeString: string): string => {
  if (!timeString) return "Not specified";
  const [hours, minutes] = timeString.split(':');
  const hour12 = parseInt(hours) % 12 || 12;
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};

const getScoreColor = (score: number): string => {
  if (score >= 75) return "#10B981"; // Green
  if (score >= 60) return "hsl(var(--accent))"; // Gold/Yellow
  if (score >= 45) return "#F97316"; // Orange
  return "#EF4444"; // Red
};

const DetailedCompatibilityResult = ({ person1, person2 }: DetailedCompatibilityResultProps) => {
  const person1Zodiac = getZodiacSign(person1.date);
  const person2Zodiac = getZodiacSign(person2.date);
  const breakdown = calculateCompatibilityBreakdown(person1, person2);
  const overallScore = calculateOverallScore(breakdown);
  const { message, color } = getCompatibilityMessage(overallScore);

  const compatibilityCategories = [
    { 
      key: 'emotional', 
      label: 'Emotional', 
      icon: Heart, 
      score: breakdown.emotional,
      description: "Heart connection and emotional understanding"
    },
    { 
      key: 'intellectual', 
      label: 'Intellectual', 
      icon: Brain, 
      score: breakdown.intellectual,
      description: "Mental stimulation and shared interests"
    },
    { 
      key: 'communication', 
      label: 'Communication', 
      icon: MessageCircle, 
      score: breakdown.communication,
      description: "How well you express and understand each other"
    },
    { 
      key: 'growth', 
      label: 'Growth', 
      icon: Sprout, 
      score: breakdown.growth,
      description: "Potential for personal development together"
    },
    { 
      key: 'sexual', 
      label: 'Physical', 
      icon: Zap, 
      score: breakdown.sexual,
      description: "Physical attraction and intimacy"
    },
    { 
      key: 'adventure', 
      label: 'Adventure', 
      icon: Star, 
      score: breakdown.adventure,
      description: "Shared experiences and exploration"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Birth Info Display */}
      <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-cosmic">
          <CardHeader>
            <CardTitle className="text-center bg-starlight bg-clip-text text-transparent">
              Person 1 - {person1Zodiac.sign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-4xl mb-4 animate-twinkle">{person1Zodiac.symbol}</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{formatDate(person1.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>{formatTime(person1.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{person1.city || "Not specified"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-cosmic">
          <CardHeader>
            <CardTitle className="text-center bg-starlight bg-clip-text text-transparent">
              Person 2 - {person2Zodiac.sign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-4xl mb-4 animate-twinkle">{person2Zodiac.symbol}</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{formatDate(person2.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>{formatTime(person2.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{person2.city || "Not specified"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Compatibility Score */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-cosmic animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Compatibility Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">
            <CircularProgress 
              percentage={overallScore} 
              size={160} 
              strokeWidth={12}
              color={getScoreColor(overallScore)}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{overallScore}%</div>
              </div>
            </CircularProgress>
          </div>
          <div className={`text-xl font-semibold ${color}`}>
            {message}
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl">{person1Zodiac.symbol}</div>
            </div>
            <Heart className="h-6 w-6 text-accent animate-pulse" />
            <div className="text-center">
              <div className="text-2xl">{person2Zodiac.symbol}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-cosmic">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Compatibility Breakdown
            <Sparkles className="h-5 w-5 text-accent" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {compatibilityCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.key} 
                  className="text-center space-y-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CircularProgress 
                    percentage={category.score} 
                    size={100} 
                    strokeWidth={8}
                    color={getScoreColor(category.score)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{category.score}%</div>
                    </div>
                  </CircularProgress>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <IconComponent className="h-4 w-4 text-accent" />
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground px-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cosmic Insights */}
      <Card className="bg-secondary/50 backdrop-blur-sm border-border/50 animate-fade-in-up">
        <CardContent className="p-6 space-y-4">
          <h4 className="font-semibold flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent" />
            Cosmic Insights
          </h4>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              Your {person1Zodiac.sign} and {person2Zodiac.sign} connection reveals a unique cosmic dance 
              with an overall compatibility of {overallScore}%.
            </p>
            <p>
              <strong>Strongest Areas:</strong> Your highest compatibility shines in{" "}
              {compatibilityCategories
                .sort((a, b) => b.score - a.score)
                .slice(0, 2)
                .map(cat => cat.label.toLowerCase())
                .join(" and ")}, creating a foundation for lasting connection.
            </p>
            <p>
              <strong>Growth Opportunities:</strong> Focus on developing your{" "}
              {compatibilityCategories
                .sort((a, b) => a.score - b.score)
                .slice(0, 1)
                .map(cat => cat.label.toLowerCase())
                .join("")}{" "}
              connection to unlock even greater harmony in your relationship.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedCompatibilityResult;