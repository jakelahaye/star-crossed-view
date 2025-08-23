import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, Clock, MapPin } from "lucide-react";

interface BirthInfo {
  date: string;
  time: string;
  city: string;
}

interface BirthInfoFormProps {
  personNumber: 1 | 2;
  birthInfo: BirthInfo;
  onUpdate: (info: BirthInfo) => void;
}

const BirthInfoForm = ({ personNumber, birthInfo, onUpdate }: BirthInfoFormProps) => {
  const handleInputChange = (field: keyof BirthInfo, value: string) => {
    onUpdate({
      ...birthInfo,
      [field]: value
    });
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 shadow-cosmic hover:shadow-starlight transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
          <User className="h-4 w-4 text-accent" />
        </div>
        <h3 className="text-base font-semibold bg-starlight bg-clip-text text-transparent">
          Person {personNumber}
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor={`date-${personNumber}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Calendar className="h-3 w-3 text-accent" />
            Date of Birth
          </Label>
          <Input
            id={`date-${personNumber}`}
            type="date"
            value={birthInfo.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor={`time-${personNumber}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3 w-3 text-accent" />
            Time of Birth
          </Label>
          <Input
            id={`time-${personNumber}`}
            type="time"
            value={birthInfo.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor={`city-${personNumber}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3 w-3 text-accent" />
            Place of Birth
          </Label>
          <Input
            id={`city-${personNumber}`}
            type="text"
            value={birthInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-9 text-sm"
            placeholder="City, Country"
          />
        </div>
      </div>
    </div>
  );
};

export default BirthInfoForm;