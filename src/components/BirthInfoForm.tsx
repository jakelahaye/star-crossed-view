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
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-cosmic">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <User className="h-5 w-5 text-accent" />
          <span className="bg-starlight bg-clip-text text-transparent">
            Person {personNumber}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`date-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-accent" />
            Birth Date:
          </Label>
          <Input
            id={`date-${personNumber}`}
            type="date"
            value={birthInfo.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="bg-secondary/30 border-border/50 focus:border-primary focus:ring-primary/20"
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`time-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-accent" />
            Birth Time:
          </Label>
          <Input
            id={`time-${personNumber}`}
            type="time"
            value={birthInfo.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="bg-secondary/30 border-border/50 focus:border-primary focus:ring-primary/20"
            placeholder="12:30 PM"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`city-${personNumber}`} className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-accent" />
            Birth City:
          </Label>
          <Input
            id={`city-${personNumber}`}
            type="text"
            value={birthInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="bg-secondary/30 border-border/50 focus:border-primary focus:ring-primary/20"
            placeholder="Enter birth city"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthInfoForm;