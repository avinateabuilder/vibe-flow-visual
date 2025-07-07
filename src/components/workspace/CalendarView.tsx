import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Target
} from "lucide-react";

interface CalendarViewProps {
  departmentName: string;
}

const mockEvents = [
  {
    id: "event-1",
    title: "Reunión de Estrategia Q1",
    type: "meeting",
    date: "2025-03-15",
    time: "10:00 - 11:30",
    attendees: ["María García", "Carlos López", "Ana Martín"],
    location: "Sala de Juntas A",
    objective: "Obj #1",
    description: "Revisión de objetivos y planificación estratégica"
  },
  {
    id: "event-2",
    title: "Deadline: A/B Testing",
    type: "deadline",
    date: "2025-03-18",
    time: "23:59",
    attendees: ["María García"],
    location: "Remote",
    objective: "Obj #1",
    description: "Entrega final de resultados del A/B testing"
  },
  {
    id: "event-3",
    title: "Workshop: Análisis de Datos",
    type: "workshop",
    date: "2025-03-20",
    time: "14:00 - 17:00",
    attendees: ["Todo el equipo"],
    location: "Aula de Formación",
    objective: "Obj #2",
    description: "Taller práctico de análisis de métricas y KPIs"
  },
  {
    id: "event-4",
    title: "Review Mensual Departamento",
    type: "review",
    date: "2025-03-25",
    time: "09:00 - 10:00",
    attendees: ["Jefe de Departamento", "Equipo completo"],
    location: "Sala Principal",
    objective: "General",
    description: "Revisión mensual de progreso y resultados"
  }
];

const eventTypeColors = {
  "meeting": "bg-primary/10 text-primary border-primary/20",
  "deadline": "bg-destructive/10 text-destructive border-destructive/20",
  "workshop": "bg-success/10 text-success border-success/20",
  "review": "bg-warning/10 text-warning border-warning/20"
};

const eventTypeIcons = {
  "meeting": "👥",
  "deadline": "⚡",
  "workshop": "🎓", 
  "review": "📋"
};

// Simulated calendar days for the current month
const generateCalendarDays = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = mockEvents.filter(event => event.date === dateStr);
    days.push({ day, events: dayEvents, isToday: day === today.getDate() });
  }
  
  return days;
};

export function CalendarView({ departmentName }: CalendarViewProps) {
  const calendarDays = generateCalendarDays();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Calendario - {departmentName}</h1>
          <p className="text-muted-foreground">Eventos, deadlines y reuniones del equipo</p>
        </div>
        <Button className="btn-vibework">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {currentMonth} {currentYear}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((dayData, index) => (
                    <div
                      key={index}
                      className={`
                        min-h-[80px] p-2 rounded-lg border transition-colors
                        ${dayData ? 'border-border/50 hover:bg-surface/50 cursor-pointer' : ''}
                        ${dayData?.isToday ? 'bg-primary/10 border-primary/50' : ''}
                      `}
                    >
                      {dayData && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${dayData.isToday ? 'text-primary' : ''}`}>
                            {dayData.day}
                          </div>
                          <div className="space-y-1">
                            {dayData.events.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-center truncate ${
                                  eventTypeColors[event.type as keyof typeof eventTypeColors]
                                }`}
                              >
                                {eventTypeIcons[event.type as keyof typeof eventTypeIcons]} {event.title}
                              </div>
                            ))}
                            {dayData.events.length > 2 && (
                              <div className="text-xs text-center text-muted-foreground">
                                +{dayData.events.length - 2} más
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEvents.slice(0, 4).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg">
                        {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{event.title}</h4>
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                          {event.objective !== "General" && (
                            <div className="flex items-center gap-1 text-xs">
                              <Target className="w-3 h-3 text-primary" />
                              <span className="text-primary">{event.objective}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Este Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Eventos</span>
                  <span className="text-lg font-bold text-primary">{mockEvents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reuniones</span>
                  <span className="text-lg font-bold text-success">
                    {mockEvents.filter(e => e.type === 'meeting').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Deadlines</span>
                  <span className="text-lg font-bold text-destructive">
                    {mockEvents.filter(e => e.type === 'deadline').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}