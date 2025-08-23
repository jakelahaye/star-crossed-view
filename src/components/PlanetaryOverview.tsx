import React from 'react';
import { Sun, Moon, ArrowUp, MessageCircle } from 'lucide-react';

interface BirthInfo {
  name: string;
  date: string;
  time: string;
  city: string;
}

interface PlanetaryOverviewProps {
  person1: BirthInfo;
  person2?: BirthInfo;
}

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', element: 'Fire', color: '#FF6B6B' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', color: '#4ECDC4' },
  { name: 'Gemini', symbol: '♊', element: 'Air', color: '#FFE66D' },
  { name: 'Cancer', symbol: '♋', element: 'Water', color: '#A8E6CF' },
  { name: 'Leo', symbol: '♌', element: 'Fire', color: '#FFB347' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', color: '#DDA0DD' },
  { name: 'Libra', symbol: '♎', element: 'Air', color: '#98FB98' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', color: '#F0A0A0' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', color: '#87CEEB' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', color: '#D2B48C' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', color: '#B0E0E6' },
  { name: 'Pisces', symbol: '♓', element: 'Water', color: '#FFEAA7' }
];

const planets = [
  { name: 'Sun', icon: Sun, symbol: '☉' },
  { name: 'Moon', icon: Moon, symbol: '☽' },
  { name: 'Rising', icon: ArrowUp, symbol: '↗' },
  { name: 'Mercury', icon: MessageCircle, symbol: '☿' },
  { name: 'Venus', iconSymbol: '♀', symbol: '♀' },
  { name: 'Mars', iconSymbol: '♂', symbol: '♂' }
];

const elementIcons = {
  Fire: '🔥',
  Water: '💧',
  Air: '💨',
  Earth: '🌍'
};

const getZodiacSign = (dateString: string) => {
  if (!dateString) return zodiacSigns[0];
  
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return zodiacSigns[0];
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return zodiacSigns[1];
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return zodiacSigns[2];
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return zodiacSigns[3];
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return zodiacSigns[4];
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return zodiacSigns[5];
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return zodiacSigns[6];
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return zodiacSigns[7];
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return zodiacSigns[8];
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return zodiacSigns[9];
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return zodiacSigns[10];
  return zodiacSigns[11];
};

const generatePlanetaryData = (birthInfo: BirthInfo) => {
  const sunSign = getZodiacSign(birthInfo.date);
  const date = new Date(birthInfo.date);
  const seed = date.getDate() + date.getMonth() * 30;
  
  return planets.map((planet, index) => {
    const signIndex = (seed + index * 3) % 12;
    const sign = zodiacSigns[signIndex];
    return {
      ...planet,
      sign: sign
    };
  });
};

const calculateElementCounts = (planetaryData: any[]) => {
  const counts = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
  planetaryData.forEach(planet => {
    counts[planet.sign.element as keyof typeof counts]++;
  });
  return counts;
};

const PlanetaryOverview: React.FC<PlanetaryOverviewProps> = ({ person1, person2 }) => {
  const person1Data = generatePlanetaryData(person1);
  const person2Data = person2 ? generatePlanetaryData(person2) : null;
  
  const person1Elements = calculateElementCounts(person1Data);
  const person2Elements = person2Data ? calculateElementCounts(person2Data) : null;

  const PersonColumn = ({ personData, elements, title }: { personData: any[], elements: any, title: string }) => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        {title}
      </h3>
      
      {/* Element Overview */}
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-3 text-accent">Element Overview</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(elements).map(([element, count]) => (
            <div
              key={element}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/20 border border-border/20"
            >
              <span className="text-lg">{elementIcons[element as keyof typeof elementIcons]}</span>
              <span className="text-sm font-medium">{element}:</span>
              <span className="text-sm font-bold text-accent">{count as number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Planetary Positions */}
      <div className="space-y-3">
        {personData.map((planet, index) => (
          <div
            key={planet.name}
            className="flex items-center justify-between p-4 bg-card/20 backdrop-blur-sm border border-border/20 rounded-xl hover:bg-card/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {planet.icon ? (
                <planet.icon className="h-5 w-5 text-accent" />
              ) : (
                <span className="text-xl">{planet.iconSymbol}</span>
              )}
              <span className="font-medium">{planet.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1 rounded-full border text-sm font-semibold flex items-center gap-1"
                style={{
                  backgroundColor: planet.sign.color + '20',
                  borderColor: planet.sign.color + '40',
                  color: planet.sign.color
                }}
              >
                <span>{planet.sign.name}</span>
                <span className="text-lg">{elementIcons[planet.sign.element as keyof typeof elementIcons]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
          {person2 ? "Astrological Profiles" : "Astrological Profile"}
        </h2>
        <p className="text-muted-foreground">
          {person2 ? "Planetary positions and elemental distributions" : "Your planetary positions and elemental distribution"}
        </p>
      </div>

      <div className={person2 ? "grid md:grid-cols-2 gap-8" : "max-w-2xl mx-auto"}>
        <PersonColumn 
          personData={person1Data} 
          elements={person1Elements} 
          title={person1.name || "Person 1"} 
        />
        {person2 && person2Data && person2Elements && (
          <PersonColumn 
            personData={person2Data} 
            elements={person2Elements} 
            title={person2.name || "Person 2"} 
          />
        )}
      </div>
    </div>
  );
};

export default PlanetaryOverview;