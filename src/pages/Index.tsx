import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { HeroBackground } from "@/components/layout/HeroBackground";
import { DepartmentGrid } from "@/components/department/DepartmentGrid";
import { StatsOverview } from "@/components/stats/StatsOverview";
import { ObjectivesList } from "@/components/objectives/ObjectivesList";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { UserManagementDashboard } from "@/components/users/UserManagementDashboard";
import { mockDepartments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Shield, Plus, ArrowLeft, Zap } from "lucide-react";

const Index = () => {
  const [selectedView, setSelectedView] = useState<'departments' | 'objectives'>('departments');
  const [currentDepartment, setCurrentDepartment] = useState<string | null>(null);

  const handleEnterDepartment = (departmentId: string) => {
    setCurrentDepartment(departmentId);
  };

  const handleBackToDashboard = () => {
    setCurrentDepartment(null);
  };

  const handleCreateDepartment = () => {
    console.log('Creating new department');
    // Here would open create department modal
  };

  // Si estamos en un departamento específico, mostrar el workspace
  if (currentDepartment) {
    const department = mockDepartments.find(d => d.id === currentDepartment);
    if (department) {
      return (
        <div className="min-h-screen bg-background">
          <div className="glass-card border-0 border-b border-border/50 p-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToDashboard}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: `${department.color}20` }}
              >
                {department.icon}
              </div>
              <div>
                <h1 className="font-semibold">{department.name}</h1>
                <p className="text-xs text-muted-foreground">Volver al dashboard</p>
              </div>
            </div>
          </div>
          <WorkspaceLayout
            departmentName={department.name}
            departmentIcon={department.icon}
            departmentColor={department.color}
          />
        </div>
      );
    }
  }

  return (
    <HeroBackground>
      <Header userName="Admin Usuario" notifications={3} />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-responsive-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Bienvenido a Vibework
          </h1>
          <p className="text-responsive-lg text-muted-foreground max-w-2xl mx-auto">
            Tu plataforma de inteligencia organizacional. Gestiona departamentos, 
            objetivos y potencia tu productividad con IA.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Button
            variant={selectedView === 'departments' ? 'default' : 'outline'}
            onClick={() => setSelectedView('departments')}
            className={selectedView === 'departments' ? 'btn-vibework' : 'btn-ghost'}
          >
            🏢 Mis Departamentos
          </Button>
          <Button
            variant={selectedView === 'objectives' ? 'default' : 'outline'}
            onClick={() => setSelectedView('objectives')}
            className={selectedView === 'objectives' ? 'btn-vibework' : 'btn-ghost'}
          >
            🎯 Objetivos Prioritarios
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content */}
        {selectedView === 'departments' ? (
          <motion.div
            key="departments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Mis Departamentos
              </h2>
              <div className="text-sm text-muted-foreground">
                {mockDepartments.length} departamentos activos
              </div>
            </div>
            
            <DepartmentGrid
              departments={mockDepartments}
              onEnterDepartment={handleEnterDepartment}
              onCreateDepartment={handleCreateDepartment}
            />
          </motion.div>
        ) : (
          <motion.div
            key="objectives"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ObjectivesList />
          </motion.div>
        )}

        {/* Admin Panel (Only for admins) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card border-0 mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Gestión de Departamentos (Solo Admins)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="btn-ghost">
                  <Plus className="mr-2 w-4 h-4" />
                  Crear Departamento
                </Button>
                <Button variant="outline" className="btn-ghost">
                  <Settings className="mr-2 w-4 h-4" />
                  Configurar Permisos
                </Button>
                <Button variant="outline" className="btn-ghost">
                  <Users className="mr-2 w-4 h-4" />
                  Gestionar Usuarios
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Card className="glass-card border-0 p-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                Acceso Rápido
              </Badge>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 w-10 h-10"
                  title="Crear Objetivo"
                >
                  🎯
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 w-10 h-10"
                  title="Añadir Tarea"
                >
                  ✅
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 w-10 h-10"
                  title="Generar Reporte"
                >
                  📊
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </HeroBackground>
  );
};

export default Index;
