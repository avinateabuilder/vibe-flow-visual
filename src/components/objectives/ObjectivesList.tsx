import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Target, TrendingUp, Clock } from "lucide-react";
import { Objective, mockObjectives } from "@/data/mockData";

export function ObjectivesList() {
  const priorityColors = {
    high: "bg-error/10 text-error border-error/20",
    medium: "bg-warning/10 text-warning border-warning/20", 
    low: "bg-success/10 text-success border-success/20"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Objetivos Prioritarios
        </h2>
        <Button variant="outline" className="btn-ghost">
          Ver todos
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {mockObjectives.map((objective) => (
          <motion.div key={objective.id} variants={itemVariants}>
            <Card className="glass-card hover-lift border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{objective.title}</CardTitle>
                      <Badge className={priorityColors[objective.priority]}>
                        {objective.priority === 'high' ? 'Alta' : 
                         objective.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{objective.progress}%</span>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">
                        {objective.current.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        de {objective.target.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-warning" />
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(objective.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">deadline</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-sm font-medium">
                        {objective.tasks.completed}/{objective.tasks.total}
                      </p>
                      <p className="text-xs text-muted-foreground">tareas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {objective.department}
                      </p>
                      <p className="text-xs text-muted-foreground">departamento</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}