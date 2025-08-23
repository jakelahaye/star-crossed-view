import React from 'react';

interface BirthInfo {
  name: string;
  date: string;
  time: string;
  city: string;
}

interface BirthChartProps {
  birthInfo: BirthInfo;
}

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', color: '#FF6B6B', element: 'Fire' },
  { name: 'Taurus', symbol: '♉', color: '#4ECDC4', element: 'Earth' },
  { name: 'Gemini', symbol: '♊', color: '#FFE66D', element: 'Air' },
  { name: 'Cancer', symbol: '♋', color: '#A8E6CF', element: 'Water' },
  { name: 'Leo', symbol: '♌', color: '#FFB347', element: 'Fire' },
  { name: 'Virgo', symbol: '♍', color: '#DDA0DD', element: 'Earth' },
  { name: 'Libra', symbol: '♎', color: '#98FB98', element: 'Air' },
  { name: 'Scorpio', symbol: '♏', color: '#F0A0A0', element: 'Water' },
  { name: 'Sagittarius', symbol: '♐', color: '#87CEEB', element: 'Fire' },
  { name: 'Capricorn', symbol: '♑', color: '#D2B48C', element: 'Earth' },
  { name: 'Aquarius', symbol: '♒', color: '#B0E0E6', element: 'Air' },
  { name: 'Pisces', symbol: '♓', color: '#FFEAA7', element: 'Water' }
];

const planets = [
  { name: 'Sun', symbol: '☉', color: '#FFA500' },
  { name: 'Moon', symbol: '☽', color: '#C0C0C0' },
  { name: 'Mercury', symbol: '☿', color: '#98FB98' },
  { name: 'Venus', symbol: '♀', color: '#FFB6C1' },
  { name: 'Mars', symbol: '♂', color: '#FF6347' },
  { name: 'Jupiter', symbol: '♃', color: '#4169E1' },
  { name: 'Saturn', symbol: '♄', color: '#8B4513' }
];

const getZodiacSign = (dateString: string) => {
  if (!dateString) return zodiacSigns[0];
  
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
};

const getPlanetaryPositions = (dateString: string, timeString: string) => {
  // Simplified planetary positions based on date
  const date = new Date(dateString);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  return planets.map((planet, index) => ({
    ...planet,
    position: (dayOfYear * (index + 1) * 7) % 360, // Simplified calculation
    house: Math.floor(((dayOfYear * (index + 1) * 7) % 360) / 30) + 1
  }));
};

const BirthChart: React.FC<BirthChartProps> = ({ birthInfo }) => {
  if (!birthInfo.date) {
    return (
      <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center bg-secondary/10 rounded-full border border-border/20">
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">🌟</div>
          <div className="text-sm">Enter birth date<br />to see chart</div>
        </div>
      </div>
    );
  }

  const sunSign = getZodiacSign(birthInfo.date);
  const planetaryPositions = getPlanetaryPositions(birthInfo.date, birthInfo.time);
  
  return (
    <div className="w-48 h-48 mx-auto mb-4 relative">
      {/* Outer zodiac wheel */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 bg-gradient-to-br from-background/50 to-secondary/20 backdrop-blur-sm">
        {zodiacSigns.map((sign, index) => {
          const angle = (index * 30) - 90; // Start from top
          const radian = (angle * Math.PI) / 180;
          const x = 85 + 70 * Math.cos(radian);
          const y = 85 + 70 * Math.sin(radian);
          
          return (
            <div
              key={sign.name}
              className="absolute w-6 h-6 flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-200"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: sign.name === sunSign.name ? sign.color + '40' : 'transparent',
                border: sign.name === sunSign.name ? `2px solid ${sign.color}` : '1px solid rgba(255,255,255,0.1)',
                color: sign.name === sunSign.name ? sign.color : 'currentColor'
              }}
              title={sign.name}
            >
              {sign.symbol}
            </div>
          );
        })}
      </div>

      {/* Inner planetary positions */}
      <div className="absolute inset-4 rounded-full border border-accent/20 bg-gradient-to-br from-primary/5 to-accent/5">
        {planetaryPositions.slice(0, 5).map((planet, index) => {
          const angle = planet.position - 90;
          const radian = (angle * Math.PI) / 180;
          const radius = 45 + (index * 8); // Varying orbital distances
          const x = 80 + radius * Math.cos(radian);
          const y = 80 + radius * Math.sin(radian);
          
          return (
            <div
              key={planet.name}
              className="absolute w-4 h-4 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-300 hover:scale-125"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: planet.color + '30',
                border: `1px solid ${planet.color}`,
                color: planet.color
              }}
              title={`${planet.name} in House ${planet.house}`}
            >
              {planet.symbol}
            </div>
          );
        })}
      </div>

      {/* Center sun sign */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 shadow-lg"
          style={{
            backgroundColor: sunSign.color + '20',
            borderColor: sunSign.color,
            color: sunSign.color
          }}
          title={`${sunSign.name} - ${sunSign.element} Sign`}
        >
          {sunSign.symbol}
        </div>
      </div>

      {/* Houses grid lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) - 90;
          const radian = (angle * Math.PI) / 180;
          const x1 = 96 + 30 * Math.cos(radian);
          const y1 = 96 + 30 * Math.sin(radian);
          const x2 = 96 + 85 * Math.cos(radian);
          const y2 = 96 + 85 * Math.sin(radian);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default BirthChart;