import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Plus,
  Calendar,
  Target,
  Users,
  Zap
} from "lucide-react";

interface ReportsViewProps {
  departmentName: string;
}

const mockReports = [
  {
    id: "report-1",
    title: "Dashboard Marketing Q1",
    type: "Interactive Dashboard",
    createdAt: "2025-02-20",
    createdBy: "IA Assistant",
    description: "Métricas en tiempo real de campañas y conversiones",
    metrics: {
      views: 847,
      conversions: 23.4,
      engagement: 67
    },
    status: "active"
  },
  {
    id: "report-2", 
    title: "Análisis de Performance Febrero",
    type: "Monthly Report",
    createdAt: "2025-02-28",
    createdBy: "Carlos López",
    description: "Resumen ejecutivo de resultados y KPIs del mes",
    metrics: {
      objectives: 78,
      tasks: 89,
      efficiency: 92
    },
    status: "completed"
  },
  {
    id: "report-3",
    title: "Presentación Resultados Trimestrales",
    type: "Presentation",
    createdAt: "2025-01-31",
    createdBy: "María García",
    description: "Presentación para stakeholders con resultados Q4",
    metrics: {
      revenue: 125,
      growth: 18,
      satisfaction: 94
    },
    status: "published"
  }
];

const mockDashboards = [
  {
    title: "Métricas de Conversión",
    value: "23.4%",
    change: "+12.3%",
    trend: "up",
    color: "text-success"
  },
  {
    title: "Leads Generados",
    value: "7,832",
    change: "+45.2%", 
    trend: "up",
    color: "text-primary"
  },
  {
    title: "Costo por Adquisición",
    value: "$42.50",
    change: "-8.7%",
    trend: "down",
    color: "text-success"
  },
  {
    title: "ROI Campañas",
    value: "340%",
    change: "+23.1%",
    trend: "up",
    color: "text-warning"
  }
];

const statusColors = {
  "active": "bg-success/10 text-success border-success/20",
  "completed": "bg-primary/10 text-primary border-primary/20", 
  "published": "bg-warning/10 text-warning border-warning/20"
};

export function ReportsView({ departmentName }: ReportsViewProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Reportes - {departmentName}</h1>
          <p className="text-muted-foreground">Dashboards, métricas y análisis de performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="btn-ghost">
            <Zap className="w-4 h-4 mr-2" />
            Generar con IA
          </Button>
          <Button className="btn-vibework">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Reporte
          </Button>
        </div>
      </motion.div>

      {/* Quick Metrics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Dashboard en Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockDashboards.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + (index * 0.05) }}
                  className="bg-surface/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-muted-foreground">{metric.title}</h4>
                    <TrendingUp className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className={`text-sm ${metric.color}`}>
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Reportes y Dashboards</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <Card className="glass-card border-0 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge 
                          variant="secondary"
                          className={statusColors[report.status as keyof typeof statusColors]}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  
                  {/* Report Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Creado: {new Date(report.createdAt).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Por: {report.createdBy}</span>
                    </div>
                  </div>

                  {/* Metrics Preview */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Métricas Clave</h4>
                    {Object.entries(report.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-muted-foreground">{key}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={value} className="w-16 h-2" />
                          <span className="text-sm font-semibold w-12 text-right">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI-Generated Reports Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Reportes Automáticos con IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Genera reportes inteligentes automáticamente basados en tus objetivos y métricas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-surface/30">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold mb-1">Dashboard Ejecutivo</h4>
                <p className="text-xs text-muted-foreground">Vista general de KPIs</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-surface/30">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-semibold mb-1">Análisis de Tendencias</h4>
                <p className="text-xs text-muted-foreground">Predicciones y patrones</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-surface/30">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-1">Progreso de Objetivos</h4>
                <p className="text-xs text-muted-foreground">Estado y recomendaciones</p>
              </div>
            </div>
            
            <Button className="w-full mt-4 btn-vibework">
              <Zap className="w-4 h-4 mr-2" />
              Generar Reporte Inteligente
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}