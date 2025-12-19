import { useState } from "react";
import { Building2 } from "lucide-react";
import { MaintenanceForm } from "@/components/MaintenanceForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { 
  MaintenanceInput, 
  MaintenanceResult, 
  calculateMaintenance 
} from "@/lib/calculations";

const Index = () => {
  const [result, setResult] = useState<{
    input: MaintenanceInput;
    result: MaintenanceResult;
  } | null>(null);

  const handleCalculate = (input: MaintenanceInput) => {
    const calculationResult = calculateMaintenance(input);
    setResult({ input, result: calculationResult });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Apartment Maintenance
              </h1>
              <p className="text-xs text-muted-foreground">
                Simple. Transparent. Reliable.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Title Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {result ? "Monthly Maintenance Summary" : "Calculate Monthly Maintenance"}
          </h2>
          <p className="text-muted-foreground">
            {result 
              ? "Review and share with your apartment group" 
              : "Enter your apartment's monthly expenses"
            }
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-card rounded-3xl p-6">
          {result ? (
            <ResultsDisplay 
              input={result.input} 
              result={result.result} 
              onReset={handleReset} 
            />
          ) : (
            <MaintenanceForm onCalculate={handleCalculate} />
          )}
        </div>

        {/* Footer Info */}
        {!result && (
          <p className="text-center text-xs text-muted-foreground mt-6 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            All calculations are rounded to the nearest ₹500 for convenience. 
            Extra amount goes to the miscellaneous fund.
          </p>
        )}
      </main>
    </div>
  );
};

export default Index;
