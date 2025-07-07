import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Users, Activity } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

const statsData: StatCard[] = [
  {
    title: "Objetivos Activos",
    value: "37",
    change: "+12%",
    trend: "up",
    icon: Target,
    color: "text-vibework-primary"
  },
  {
    title: "Progreso Promedio",
    value: "68%",
    change: "+5%",
    trend: "up", 
    icon: TrendingUp,
    color: "text-vibework-success"
  },
  {
    title: "Equipos Activos",
    value: "6",
    change: "0%",
    trend: "neutral",
    icon: Users,
    color: "text-vibework-accent"
  },
  {
    title: "Tareas Completadas",
    value: "124",
    change: "+23%",
    trend: "up",
    icon: Activity,
    color: "text-vibework-secondary"
  }
];

export function StatsOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statsData.map((stat, index) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <Card className="glass-card hover-lift border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}
                  className={`text-xs ${
                    stat.trend === 'up' ? 'bg-success/10 text-success border-success/20' :
                    stat.trend === 'down' ? 'bg-error/10 text-error border-error/20' :
                    'bg-muted/10 text-muted-foreground border-muted/20'
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}