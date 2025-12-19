import { 
  Receipt, 
  Home, 
  Wallet, 
  PiggyBank, 
  MessageCircle, 
  Info,
  ArrowLeft,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaintenanceInput, MaintenanceResult, formatCurrency, generateWhatsAppMessage, createWhatsAppUrl } from "@/lib/calculations";

interface ResultsDisplayProps {
  input: MaintenanceInput;
  result: MaintenanceResult;
  onReset: () => void;
}

interface ResultCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
  description?: string;
}

export function ResultsDisplay({ input, result, onReset }: ResultsDisplayProps) {
  const cards: ResultCard[] = [
    {
      label: "Total Monthly Expense",
      value: formatCurrency(result.totalExpense),
      icon: <Receipt className="w-6 h-6" />,
      description: "Sum of all utility bills",
    },
    {
      label: "Maintenance Per Flat",
      value: formatCurrency(result.roundedCostPerFlat),
      icon: <Home className="w-6 h-6" />,
      highlight: true,
      description: "Rounded to nearest ₹500",
    },
    {
      label: "Total Amount Collected",
      value: formatCurrency(result.totalCollected),
      icon: <Wallet className="w-6 h-6" />,
      description: `From ${input.numberOfFlats} flats`,
    },
    {
      label: "Miscellaneous Fund",
      value: formatCurrency(result.surplus),
      icon: <PiggyBank className="w-6 h-6" />,
      description: "Extra saved for future expenses",
    },
  ];

  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage(input, result);
    const url = createWhatsAppUrl(message);
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Results Grid */}
      <div className="grid gap-4">
        {cards.map((card, index) => (
          <div
            key={card.label}
            className={`result-card animate-scale-in ${
              card.highlight 
                ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30" 
                : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-muted-foreground text-sm font-medium mb-1">
                  {card.label}
                </p>
                <p className={`text-2xl font-bold ${card.highlight ? "text-primary" : "text-foreground"}`}>
                  {card.value}
                </p>
                {card.description && (
                  <p className="text-muted-foreground text-xs mt-1">
                    {card.description}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-xl ${
                card.highlight 
                  ? "bg-primary/15 text-primary" 
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calculation Breakdown */}
      <div 
        className="p-4 rounded-2xl bg-secondary/50 border border-border/50 animate-fade-in"
        style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Calculation Breakdown</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Raw cost per flat:</span>
            <span className="font-medium">{formatCurrency(result.rawCostPerFlat)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rounded to nearest ₹500:</span>
            <span className="font-semibold text-primary">{formatCurrency(result.roundedCostPerFlat)}</span>
          </div>
        </div>
      </div>

      {/* Trust Note */}
      <div 
        className="flex gap-3 p-4 rounded-2xl bg-info/10 border border-info/20 animate-fade-in"
        style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          Maintenance is rounded to the nearest ₹500 to keep amounts simple. The extra collected forms a small common fund for unexpected apartment expenses.
        </p>
      </div>

      {/* Action Buttons */}
      <div 
        className="space-y-3 pt-2 animate-slide-up"
        style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <Button
          onClick={handleWhatsAppShare}
          variant="whatsapp"
          size="xl"
          className="w-full"
        >
          <MessageCircle className="w-5 h-5" />
          Send to WhatsApp
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Calculate Again
        </Button>
      </div>
    </div>
  );
}
