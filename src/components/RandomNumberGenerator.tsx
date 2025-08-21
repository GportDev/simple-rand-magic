import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Shuffle } from "lucide-react";

const RandomNumberGenerator = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [minValue, setMinValue] = useState([1]);
  const [maxValue, setMaxValue] = useState([100]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomNumber = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate through several numbers before settling
    let animationCount = 0;
    const maxAnimations = 10;
    
    const animate = () => {
      if (animationCount < maxAnimations) {
        const tempNumber = Math.floor(Math.random() * (maxValue[0] - minValue[0] + 1)) + minValue[0];
        setCurrentNumber(tempNumber);
        animationCount++;
        setTimeout(animate, 50);
      } else {
        // Final number
        const finalNumber = Math.floor(Math.random() * (maxValue[0] - minValue[0] + 1)) + minValue[0];
        setCurrentNumber(finalNumber);
        setIsAnimating(false);
      }
    };
    
    animate();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
        <div className="text-center space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Random Number</h1>
            <p className="text-sm text-muted-foreground">Generate a number between {minValue[0]} and {maxValue[0]}</p>
          </div>

          {/* Number Display */}
          <div className="relative">
            <div className={`
              text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent 
              transition-all duration-300 ease-smooth
              ${isAnimating ? 'scale-105' : 'scale-100'}
              ${currentNumber === null ? 'opacity-30' : 'opacity-100'}
            `}>
              {currentNumber ?? "?"}
            </div>
            {isAnimating && (
              <div className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent text-6xl font-bold animate-pulse">
                {currentNumber}
              </div>
            )}
          </div>

          {/* Range Controls */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Minimum</label>
                <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  {minValue[0]}
                </span>
              </div>
              <Slider
                value={minValue}
                onValueChange={setMinValue}
                max={maxValue[0] - 1}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Maximum</label>
                <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  {maxValue[0]}
                </span>
              </div>
              <Slider
                value={maxValue}
                onValueChange={setMaxValue}
                max={1000}
                min={minValue[0] + 1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateRandomNumber}
            disabled={isAnimating}
            size="lg"
            className={`
              w-full h-14 text-base font-medium
              bg-gradient-primary hover:shadow-elegant
              transition-all duration-300 ease-smooth
              ${isAnimating ? 'scale-95' : 'hover:scale-105'}
            `}
          >
            <Shuffle className={`mr-2 h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
            {isAnimating ? 'Generating...' : 'Generate Number'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RandomNumberGenerator;