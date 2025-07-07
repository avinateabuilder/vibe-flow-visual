import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calendar,
  User,
  Target,
  MoreHorizontal
} from "lucide-react";

interface KanbanViewProps {
  departmentName: string;
}

const kanbanColumns = [
  {
    id: "todo",
    title: "📝 TO DO",
    color: "bg-muted/50",
    tasks: [
      {
        id: "task-1",
        title: "A/B Test Headlines",
        description: "Probar diferentes versiones de titulares en landing page principal",
        assignee: "María García",
        deadline: "2025-03-15",
        objective: "Obj #1",
        priority: "Alta"
      },
      {
        id: "task-2", 
        title: "Investigación de mercado",
        description: "Análisis de competencia y tendencias del sector",
        assignee: "Carlos López",
        deadline: "2025-03-20",
        objective: "Obj #2",
        priority: "Media"
      }
    ]
  },
  {
    id: "progress",
    title: "🔄 IN PROGRESS", 
    color: "bg-warning/20",
    tasks: [
      {
        id: "task-3",
        title: "Redesign Landing Page",
        description: "Nuevo diseño responsive con mejor conversión",
        assignee: "Ana Martín",
        deadline: "2025-03-25",
        objective: "Obj #1",
        priority: "Alta"
      }
    ]
  },
  {
    id: "review",
    title: "👀 REVIEW",
    color: "bg-accent/20", 
    tasks: [
      {
        id: "task-4",
        title: "Configurar Google Analytics",
        description: "Setup completo de eventos y conversiones",
        assignee: "Pedro Ruiz",
        deadline: "2025-03-10",
        objective: "Obj #2",
        priority: "Media"
      }
    ]
  },
  {
    id: "done",
    title: "✅ DONE",
    color: "bg-success/20",
    tasks: [
      {
        id: "task-5",
        title: "Análisis de palabras clave",
        description: "Research SEO completado para Q1",
        assignee: "Laura Sánchez",
        deadline: "2025-02-28",
        objective: "Obj #1",
        priority: "Alta"
      }
    ]
  }
];

const priorityColors = {
  "Alta": "bg-destructive/10 text-destructive",
  "Media": "bg-warning/10 text-warning", 
  "Baja": "bg-success/10 text-success"
};

export function KanbanView({ departmentName }: KanbanViewProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Tareas - {departmentName}</h1>
          <p className="text-muted-foreground">Organiza y gestiona el trabajo del equipo</p>
        </div>
        <Button className="btn-vibework">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </motion.div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto">
        {kanbanColumns.map((column, columnIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
            className="flex flex-col"
          >
            {/* Column Header */}
            <Card className={`glass-card border-0 mb-4 ${column.color}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  {column.title}
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Tasks */}
            <div className="space-y-3 flex-1">
              {column.tasks.map((task, taskIndex) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (columnIndex * 0.1) + (taskIndex * 0.05) }}
                >
                  <Card className="glass-card border-0 hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-semibold line-clamp-2">
                          {task.title}
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>
                      
                      {/* Task Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs">{task.assignee}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs">
                            {new Date(task.deadline).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs">{task.objective}</span>
                        </div>
                      </div>

                      {/* Priority Badge */}
                      <div className="mt-3 flex justify-between items-center">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Add Task Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (columnIndex * 0.1) + 0.3 }}
              >
                <Button 
                  variant="ghost" 
                  className="w-full h-20 border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Tarea
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}