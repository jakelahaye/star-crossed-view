import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, Clock, MapPin } from "lucide-react";

interface BirthInfo {
  name: string;
  date: string;
  time: string;
  city: string;
}

interface BirthInfoFormProps {
  personNumber: number;
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
    <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 shadow-cosmic hover:shadow-starlight transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/30">
          <User className="h-5 w-5 text-accent" />
        </div>
        <Input
          value={birthInfo.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder={`Person ${personNumber}`}
          className="text-xl font-semibold bg-transparent border-none p-0 h-auto focus:ring-0 focus:border-none bg-starlight bg-clip-text text-transparent placeholder:bg-starlight placeholder:bg-clip-text placeholder:text-transparent"
        />
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor={`date-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-accent" />
            Birth Date
          </Label>
          <Input
            id={`date-${personNumber}`}
            type="date"
            value={birthInfo.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`time-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-accent" />
            Birth Time
          </Label>
          <Input
            id={`time-${personNumber}`}
            type="time"
            value={birthInfo.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`city-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-accent" />
            Birth City
          </Label>
          <Input
            id={`city-${personNumber}`}
            type="text"
            value={birthInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="bg-secondary/20 border-border/40 focus:border-primary focus:ring-primary/20 h-11"
            placeholder="Enter birth city"
          />
        </div>
      </div>
    </div>
  );
};

export default BirthInfoForm;