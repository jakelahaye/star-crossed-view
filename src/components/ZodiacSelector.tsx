import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const zodiacSigns = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
];

interface ZodiacSelectorProps {
  title: string;
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}

const ZodiacSelector = ({ title, selectedSign, onSelect }: ZodiacSelectorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center bg-starlight bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {zodiacSigns.map((sign) => (
          <Card
            key={sign.name}
            className={`cursor-pointer transition-all duration-300 hover:shadow-starlight hover:scale-105 ${
              selectedSign === sign.name 
                ? 'bg-primary/20 border-primary shadow-starlight' 
                : 'bg-card/50 backdrop-blur-sm border-border/50'
            }`}
            onClick={() => onSelect(sign.name)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2 animate-twinkle">{sign.symbol}</div>
              <div className="text-sm font-medium text-foreground">{sign.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{sign.dates}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ZodiacSelector;