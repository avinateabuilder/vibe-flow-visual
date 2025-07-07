import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  PanelRightOpen, 
  PanelRightClose, 
  Bot, 
  Code, 
  BarChart3, 
  FileText,
  Sparkles
} from "lucide-react";

interface WorkspaceLayoutProps {
  departmentName: string;
  departmentIcon: string;
  departmentColor: string;
}

export function WorkspaceLayout({ 
  departmentName, 
  departmentIcon, 
  departmentColor 
}: WorkspaceLayoutProps) {
  const [isArtifactsPanelOpen, setIsArtifactsPanelOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Department Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-0 border-b border-border/50 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${departmentColor}20` }}
              >
                {departmentIcon}
              </div>
              <div>
                <h1 className="text-xl font-bold">{departmentName}</h1>
                <p className="text-sm text-muted-foreground">Espacio de trabajo inteligente</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Bot className="w-3 h-3 mr-1" />
                IA Activa
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsArtifactsPanelOpen(!isArtifactsPanelOpen)}
                className="hover:bg-primary/10"
              >
                {isArtifactsPanelOpen ? 
                  <PanelRightClose className="w-5 h-5" /> : 
                  <PanelRightOpen className="w-5 h-5" />
                }
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Welcome Message */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Agente IA - {departmentName}</h3>
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      ¡Hola! Soy tu asistente inteligente para el departamento de {departmentName}. 
                      Puedo ayudarte a analizar objetivos, crear reportes, generar dashboards y 
                      mucho más. ¿En qué te gustaría trabajar hoy?
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm" className="btn-ghost">
                        📊 Crear dashboard
                      </Button>
                      <Button variant="outline" size="sm" className="btn-ghost">
                        📈 Analizar métricas
                      </Button>
                      <Button variant="outline" size="sm" className="btn-ghost">
                        📋 Generar reporte
                      </Button>
                      <Button variant="outline" size="sm" className="btn-ghost">
                        🎯 Revisar objetivos
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Chat Messages */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">TU</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">
                      Crea un dashboard para analizar el rendimiento de nuestras campañas de marketing digital
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 border-t border-border/50"
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card border-0 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje para el agente IA..."
                    className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="btn-vibework">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Artifacts Panel */}
      {isArtifactsPanelOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3 }}
          className="w-96 bg-surface border-l border-border/50 flex flex-col"
        >
          <div className="p-4 border-b border-border/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Artifacts Panel
            </h2>
            <p className="text-sm text-muted-foreground">
              Dashboards y reportes generados
            </p>
          </div>

          <div className="flex-1 p-4 space-y-4">
            {/* Sample Artifacts */}
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-success" />
                  Dashboard Marketing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Dashboard interactivo con métricas de campañas
                </p>
                <div className="h-20 bg-gradient-to-br from-success/20 to-accent/20 rounded-lg border border-success/20 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-success" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 btn-ghost">
                  Abrir Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-warning" />
                  Reporte Mensual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Análisis de performance Febrero 2025
                </p>
                <div className="h-20 bg-gradient-to-br from-warning/20 to-secondary/20 rounded-lg border border-warning/20 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-warning" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 btn-ghost">
                  Ver Reporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}