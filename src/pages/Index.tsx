import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BirthInfoForm from "@/components/BirthInfoForm";
import DetailedCompatibilityResult from "@/components/DetailedCompatibilityResult";
import PlanetaryOverview from "@/components/PlanetaryOverview";
import { Sparkles, Heart, Star, User, Users, UserPlus, UsersRound, Plus, X } from "lucide-react";
import cosmicBackground from "@/assets/cosmic-background.jpg";

interface BirthInfo {
  name: string;
  date: string;
  time: string;
  city: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("romantic");
  const [people, setPeople] = useState<BirthInfo[]>([
    { name: "", date: "", time: "", city: "" },
    { name: "", date: "", time: "", city: "" },
    { name: "", date: "", time: "", city: "" }
  ]);
  const [showResult, setShowResult] = useState(false);

  const getRequiredPeopleCount = () => {
    switch (activeTab) {
      case "solo": return 1;
      case "romantic":
      case "friendship": return 2;
      case "group": return Math.max(3, people.length);
      default: return 2;
    }
  };

  const isFormValid = () => {
    const requiredCount = getRequiredPeopleCount();
    return people.slice(0, requiredCount).every(person => 
      person.name && person.date && person.time && person.city
    );
  };

  const updatePersonInfo = (index: number, info: BirthInfo) => {
    const newPeople = [...people];
    newPeople[index] = info;
    setPeople(newPeople);
  };

  const addPerson = () => {
    if (people.length < 5) {
      setPeople([...people, { name: "", date: "", time: "", city: "" }]);
    }
  };

  const removePerson = (index: number) => {
    if (people.length > 3 && index >= 3) {
      const newPeople = people.filter((_, i) => i !== index);
      setPeople(newPeople);
    }
  };

  const handleCalculateCompatibility = () => {
    if (isFormValid()) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setPeople([
      { name: "", date: "", time: "", city: "" },
      { name: "", date: "", time: "", city: "" },
      { name: "", date: "", time: "", city: "" }
    ]);
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
            <h1 className="text-4xl md:text-5xl font-bold bg-starlight bg-clip-text text-transparent">
              Astrological Compatibility
            </h1>
            <Star className="h-8 w-8 text-accent animate-twinkle" />
          </div>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover the celestial connection between two souls through detailed birth chart analysis
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent animate-float" />
            <span className="text-foreground text-sm">Enter birth details below to reveal cosmic compatibility</span>
            <Sparkles className="h-4 w-4 text-accent animate-float" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-full grid-cols-4 bg-background/20 backdrop-blur-md border border-accent/20">
              <TabsTrigger value="solo" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
                <User className="h-4 w-4" />
                Solo
              </TabsTrigger>
              <TabsTrigger value="romantic" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <Heart className="h-3 w-3" />
                </div>
                Romantic
              </TabsTrigger>
              <TabsTrigger value="friendship" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
                <Users className="h-4 w-4" />
                Friendship
              </TabsTrigger>
              <TabsTrigger value="group" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
                <UsersRound className="h-4 w-4" />
                Group
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-8 mb-8 opacity-30">
          <div className="text-2xl animate-twinkle">⭐</div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="text-2xl animate-twinkle" style={{ animationDelay: '1s' }}>✨</div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="text-2xl animate-twinkle" style={{ animationDelay: '2s' }}>🌟</div>
        </div>

        {!showResult ? (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Birth Information Forms */}
            <div className="relative">
              {/* Cosmic connector line for 2-person modes */}
              {(activeTab === "romantic" || activeTab === "friendship") && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                  <div className="w-px h-20 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0"></div>
                  <Heart className="h-6 w-6 text-accent mx-auto -mt-3 -mb-3 animate-pulse" />
                  <div className="w-px h-20 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0"></div>
                </div>
              )}
              
              {/* Dynamic form rendering based on mode */}
              {activeTab === "solo" && (
                <div className="flex justify-center">
                  <div className="w-full max-w-md animate-fade-in-up">
                    <BirthInfoForm
                      personNumber={1}
                      birthInfo={people[0]}
                      onUpdate={(info) => updatePersonInfo(0, info)}
                    />
                  </div>
                </div>
              )}
              
              {(activeTab === "romantic" || activeTab === "friendship") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                  <div className="order-1 animate-fade-in-up">
                    <BirthInfoForm
                      personNumber={1}
                      birthInfo={people[0]}
                      onUpdate={(info) => updatePersonInfo(0, info)}
                    />
                  </div>
                  <div className="order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <BirthInfoForm
                      personNumber={2}
                      birthInfo={people[1]}
                      onUpdate={(info) => updatePersonInfo(1, info)}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === "group" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {people.slice(0, getRequiredPeopleCount()).map((person, index) => (
                      <div 
                        key={index} 
                        className="relative animate-fade-in-up" 
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {index >= 3 && (
                          <button
                            onClick={() => removePerson(index)}
                            className="absolute -top-2 -right-2 z-10 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-full p-1 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                        <BirthInfoForm
                          personNumber={index + 1}
                          birthInfo={person}
                          onUpdate={(info) => updatePersonInfo(index, info)}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {people.length < 5 && (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={addPerson}
                        className="border-accent/20 hover:bg-accent/10 hover:border-accent/40"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Person ({people.length + 1}/5)
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Demo Data Button */}
            <div className="text-center mb-6">
              <Button
                variant="outline"
                onClick={() => {
                  const demoData = [
                    { name: "Alex", date: "1990-06-15", time: "14:30", city: "New York" },
                    { name: "Jordan", date: "1992-03-22", time: "09:45", city: "Los Angeles" },
                    { name: "Taylor", date: "1989-11-08", time: "18:20", city: "Chicago" }
                  ];
                  setPeople(demoData);
                }}
                className="border-accent/20 hover:bg-accent/10 hover:border-accent/40"
              >
                <Star className="h-4 w-4 mr-2" />
                Load Demo Data
              </Button>
            </div>

            {/* Calculate Button */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleCalculateCompatibility}
                disabled={!isFormValid()}
                className="text-lg px-12 py-4 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Calculate Compatibility
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
              {!isFormValid() && (
                <p className="text-muted-foreground mt-4 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Please fill in all birth information for {activeTab === "solo" ? "yourself" : `all ${getRequiredPeopleCount()} people`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            <DetailedCompatibilityResult person1={people[0]} person2={people[1]} />
            <PlanetaryOverview person1={people[0]} person2={people[1]} />
            
            <div className="text-center space-y-4">
              <Button
                variant="mystical"
                onClick={handleReset}
                className="mr-4"
              >
                Calculate Another Compatibility
              </Button>
              <div className="text-sm text-muted-foreground">
                Explore more cosmic connections with different birth details
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