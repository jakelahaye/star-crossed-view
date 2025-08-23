import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, Star, Calendar, MapPin, Clock } from "lucide-react";

interface BirthInfo {
  date: string;
  time: string;
  city: string;
}

interface DetailedCompatibilityResultProps {
  person1: BirthInfo;
  person2: BirthInfo;
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

// Calculate compatibility based on zodiac signs
const calculateDetailedCompatibility = (person1: BirthInfo, person2: BirthInfo): number => {
  const sign1 = getZodiacSign(person1.date).sign;
  const sign2 = getZodiacSign(person2.date).sign;
  
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
         Math.floor(Math.random() * 40) + 50;
};

const getCompatibilityMessage = (score: number): { message: string; color: string } => {
  if (score >= 90) return { message: "Cosmic Soulmates! ✨", color: "text-accent" };
  if (score >= 80) return { message: "Stellar Connection! 🌟", color: "text-primary" };
  if (score >= 70) return { message: "Harmonious Bond 💫", color: "text-primary/80" };
  if (score >= 60) return { message: "Potential for Growth 🌙", color: "text-muted-foreground" };
  return { message: "Challenging but Rewarding 🔮", color: "text-muted-foreground" };
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

const DetailedCompatibilityResult = ({ person1, person2 }: DetailedCompatibilityResultProps) => {
  const person1Zodiac = getZodiacSign(person1.date);
  const person2Zodiac = getZodiacSign(person2.date);
  const score = calculateDetailedCompatibility(person1, person2);
  const { message, color } = getCompatibilityMessage(score);

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-cosmic">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Heart className="h-6 w-6 text-accent animate-float" />
          Compatibility Analysis
          <Heart className="h-6 w-6 text-accent animate-float" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Birth Info Display */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-center bg-starlight bg-clip-text text-transparent">
              Person 1 - {person1Zodiac.sign}
            </h4>
            <div className="text-center text-4xl mb-2">{person1Zodiac.symbol}</div>
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
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-center bg-starlight bg-clip-text text-transparent">
              Person 2 - {person2Zodiac.sign}
            </h4>
            <div className="text-center text-4xl mb-2">{person2Zodiac.symbol}</div>
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
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl">{person1Zodiac.symbol}</div>
            </div>
            <Heart className="h-8 w-8 text-accent animate-pulse" />
            <div className="text-center">
              <div className="text-3xl">{person2Zodiac.symbol}</div>
            </div>
          </div>

          <div className="text-3xl font-bold bg-starlight bg-clip-text text-transparent">
            {score}%
          </div>
          <div className={`text-lg font-semibold ${color}`}>
            {message}
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {/* Cosmic Insights */}
        <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            Cosmic Insights
          </h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              {person1Zodiac.sign} and {person2Zodiac.sign} create a {score >= 75 ? 'powerful' : score >= 60 ? 'moderate' : 'gentle'} 
              {' '}celestial connection that transcends the earthly realm.
            </p>
            <p>
              Your birth times and locations add unique cosmic influences that shape this 
              {' '}{score >= 80 ? 'extraordinary' : 'meaningful'} compatibility.
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

export default DetailedCompatibilityResult;