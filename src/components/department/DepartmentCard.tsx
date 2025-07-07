import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Users, Target, TrendingUp } from "lucide-react";

interface DepartmentCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  objectives: number;
  progress: number;
  description: string;
  tasks?: number;
  members?: number;
  metrics?: string;
  onEnter: (departmentId: string) => void;
}

export function DepartmentCard({
  id,
  name,
  icon,
  color,
  objectives,
  progress,
  description,
  tasks,
  members,
  metrics,
  onEnter
}: DepartmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className="glass-card hover-glow h-full relative overflow-hidden border-0">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`
          }}
        />
        
        {/* Content */}
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${color}20` }}
            >
              {icon}
            </div>
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary border-primary/20"
            >
              {progress}% completo
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardHeader>

        <CardContent className="relative space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso general</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{objectives}</p>
                <p className="text-xs text-muted-foreground">objetivos</p>
              </div>
            </div>
            
            {tasks && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <div>
                  <p className="text-sm font-medium">{tasks}</p>
                  <p className="text-xs text-muted-foreground">tareas</p>
                </div>
              </div>
            )}
            
            {members && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-sm font-medium">{members}</p>
                  <p className="text-xs text-muted-foreground">miembros</p>
                </div>
              </div>
            )}
            
            {metrics && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-warning" />
                <div>
                  <p className="text-sm font-medium">{metrics}</p>
                  <p className="text-xs text-muted-foreground">métricas</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => onEnter(id)}
            className="w-full btn-vibework group-hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <span>Entrar al espacio</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}