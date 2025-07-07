import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  Calendar,
  Edit,
  Trash2,
  BarChart3,
  Plus
} from "lucide-react";

interface ObjectivesViewProps {
  departmentName: string;
}

const mockObjectives = [
  {
    id: "obj-1",
    title: "Aumentar leads calificados 40%",
    description: "Incrementar la generación de leads de alta calidad a través de campañas digitales optimizadas",
    progress: 78,
    target: 10000,
    current: 7800,
    deadline: "2025-12-31",
    tasks: { completed: 12, total: 15 },
    assignees: ["María García", "Carlos López", "Ana Martín"],
    parentObjective: "Crecer revenue 25% (General)"
  },
  {
    id: "obj-2", 
    title: "Mejorar conversión web 25%",
    description: "Optimizar landing pages y procesos de compra para incrementar la tasa de conversión",
    progress: 45,
    target: 5.5,
    current: 4.2,
    deadline: "2025-11-15",
    tasks: { completed: 8, total: 20 },
    assignees: ["Pedro Ruiz", "Laura Sánchez"],
    parentObjective: "Crecer revenue 25% (General)"
  }
];

export function ObjectivesView({ departmentName }: ObjectivesViewProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Objetivos - {departmentName}</h1>
          <p className="text-muted-foreground">Gestiona y monitorea el progreso de los objetivos</p>
        </div>
        <Button className="btn-vibework">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Objetivo
        </Button>
      </motion.div>

      {/* Objectives List */}
      <div className="space-y-4">
        {mockObjectives.map((objective, index) => (
          <motion.div
            key={objective.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      {objective.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-3">
                      {objective.description}
                    </p>
                    {objective.parentObjective && (
                      <Badge variant="outline" className="mb-3">
                        🏢 Vinculado a: {objective.parentObjective}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Progress Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progreso General</span>
                      <span className="text-sm text-primary font-bold">{objective.progress}%</span>
                    </div>
                    <Progress value={objective.progress} className="h-3" />
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surface/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">Progreso</span>
                      </div>
                      <p className="text-lg font-bold">
                        {objective.current.toLocaleString()} / {objective.target.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-surface/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-warning" />
                        <span className="text-sm text-muted-foreground">Deadline</span>
                      </div>
                      <p className="text-lg font-bold">
                        {new Date(objective.deadline).toLocaleDateString('es-ES')}
                      </p>
                    </div>

                    <div className="bg-surface/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Equipo</span>
                      </div>
                      <p className="text-lg font-bold">{objective.assignees.length} personas</p>
                    </div>
                  </div>

                  {/* Tasks Progress */}
                  <div className="bg-surface/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Tareas Completadas</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">
                        {objective.tasks.completed} de {objective.tasks.total} tareas
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {Math.round((objective.tasks.completed / objective.tasks.total) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(objective.tasks.completed / objective.tasks.total) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="font-semibold mb-2">Equipo Asignado</h4>
                    <div className="flex items-center gap-2">
                      {objective.assignees.map((assignee, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/10 text-accent">
                          👤 {assignee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}