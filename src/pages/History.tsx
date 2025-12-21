import { useEffect, useState } from "react";
import { Building2, Trash2, FileSpreadsheet } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";

interface HistoryRecord {
  id: string;
  calculation_date: string;
  electricity: number;
  water: number;
  watchman: number;
  garbage: number;
  number_of_flats: number;
  total_expense: number;
  cost_per_flat: number;
  total_collected: number;
  surplus: number;
  created_at: string;
}

const History = () => {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("maintenance_history")
      .select("*")
      .order("calculation_date", { ascending: false });

    if (error) {
      toast.error("Failed to load history");
      console.error(error);
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("maintenance_history")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete record");
    } else {
      toast.success("Record deleted");
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-4">
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

      {/* Tab Navigation */}
      <nav className="bg-background/60 backdrop-blur-sm border-b border-border/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex gap-1">
            <NavLink
              to="/"
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent"
              activeClassName="text-primary border-primary"
            >
              Calculator
            </NavLink>
            <NavLink
              to="/history"
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent"
              activeClassName="text-primary border-primary"
            >
              History
            </NavLink>
            <NavLink
              to="/calendar"
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent"
              activeClassName="text-primary border-primary"
            >
              Calendar
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-6 pb-12">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileSpreadsheet className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Calculation History
            </h2>
          </div>
          <p className="text-muted-foreground">
            View all past maintenance calculations
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading history...
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No calculations yet. Create one from the Calculator tab.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Electricity</TableHead>
                    <TableHead className="text-right">Water</TableHead>
                    <TableHead className="text-right">Watchman</TableHead>
                    <TableHead className="text-right">Garbage</TableHead>
                    <TableHead className="text-right">Flats</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Per Flat</TableHead>
                    <TableHead className="text-right">Surplus</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {format(new Date(record.calculation_date), "MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.electricity)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.water)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.watchman)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.garbage)}
                      </TableCell>
                      <TableCell className="text-right">
                        {record.number_of_flats}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(record.total_expense)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {formatCurrency(record.cost_per_flat)}
                      </TableCell>
                      <TableCell className="text-right text-emerald-600">
                        {formatCurrency(record.surplus)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(record.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
