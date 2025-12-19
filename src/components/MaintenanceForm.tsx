import { useState } from "react";
import { Zap, Droplets, Shield, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaintenanceInput } from "@/lib/calculations";

interface MaintenanceFormProps {
  onCalculate: (input: MaintenanceInput) => void;
}

interface FormField {
  key: keyof MaintenanceInput;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const formFields: FormField[] = [
  {
    key: "electricity",
    label: "Electricity Bill",
    icon: <Zap className="text-warning" />,
    placeholder: "e.g., 5000",
  },
  {
    key: "water",
    label: "Water Bill",
    icon: <Droplets className="text-info" />,
    placeholder: "e.g., 2000",
  },
  {
    key: "watchman",
    label: "Watchman Fees",
    icon: <Shield className="text-primary" />,
    placeholder: "e.g., 8000",
  },
  {
    key: "garbage",
    label: "Garbage Collection",
    icon: <Trash2 className="text-muted-foreground" />,
    placeholder: "e.g., 1500",
  },
  {
    key: "numberOfFlats",
    label: "Number of Flats",
    icon: <Building2 className="text-secondary-foreground" />,
    placeholder: "e.g., 12",
  },
];

export function MaintenanceForm({ onCalculate }: MaintenanceFormProps) {
  const [values, setValues] = useState<Record<string, string>>({
    electricity: "",
    water: "",
    watchman: "",
    garbage: "",
    numberOfFlats: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    // Only allow numeric input
    if (value !== "" && !/^\d*$/.test(value)) return;
    
    setValues((prev) => ({ ...prev, [key]: value }));
    
    // Clear error when user types
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    formFields.forEach((field) => {
      const value = values[field.key];
      if (!value || value.trim() === "") {
        newErrors[field.key] = `Please enter ${field.label.toLowerCase()}`;
      } else if (parseInt(value) <= 0) {
        newErrors[field.key] = "Value must be greater than 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const input: MaintenanceInput = {
      electricity: parseInt(values.electricity),
      water: parseInt(values.water),
      watchman: parseInt(values.watchman),
      garbage: parseInt(values.garbage),
      numberOfFlats: parseInt(values.numberOfFlats),
    };

    onCalculate(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formFields.map((field, index) => (
        <div
          key={field.key}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
        >
          <Label
            htmlFor={field.key}
            className="flex items-center gap-2 text-base font-medium mb-2"
          >
            {field.icon}
            {field.label}
          </Label>
          <div className="relative">
            {field.key !== "numberOfFlats" && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground font-medium">
                ₹
              </span>
            )}
            <Input
              id={field.key}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={values[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className={`${field.key !== "numberOfFlats" ? "pl-10" : ""} ${
                errors[field.key] ? "border-destructive focus-visible:border-destructive" : ""
              }`}
            />
          </div>
          {errors[field.key] && (
            <p className="text-destructive text-sm mt-1.5 animate-fade-in">
              {errors[field.key]}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        size="xl"
        className="w-full mt-8 animate-slide-up"
        style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}
      >
        Calculate Maintenance
      </Button>
    </form>
  );
}
