import { useState } from "react";
import { Building2, Plus, Calendar as CalendarIcon, Bell } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'annual' | 'monthly' | 'one-time';
  description?: string;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual Water Tank Cleaning',
      date: new Date(2025, 0, 15),
      type: 'annual',
      description: 'Schedule tank cleaning service'
    },
    {
      id: '2',
      title: 'Monthly Electricity Bill',
      date: new Date(2025, 0, 5),
      type: 'monthly',
      description: 'Pay electricity bill'
    }
  ]);

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'annual': return 'bg-primary/20 text-primary border-primary/30';
      case 'monthly': return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'one-time': return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const upcomingEvents = events.slice(0, 3);

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

      {/* Tab Navigation */}
      <nav className="bg-background/60 backdrop-blur-sm border-b border-border/30">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex gap-1">
            <NavLink
              to="/"
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent"
              activeClassName="text-primary border-primary"
            >
              Calculator
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
      <main className="container max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Title Section */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Maintenance Calendar
          </h2>
          <p className="text-muted-foreground">
            Track events and set reminders
          </p>
        </div>

        {/* Calendar Card */}
        <Card className="glass-card rounded-3xl mb-6 animate-slide-up">
          <CardContent className="p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="glass-card rounded-3xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <Button size="sm" variant="ghost" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm truncate">
                        {event.title}
                      </span>
                      <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">
                No upcoming events
              </p>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <p className="text-center text-xs text-muted-foreground mt-6 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Add events for annual maintenance, monthly bills, and one-time tasks.
          Set reminders to stay organized.
        </p>
      </main>
    </div>
  );
};

export default CalendarPage;
