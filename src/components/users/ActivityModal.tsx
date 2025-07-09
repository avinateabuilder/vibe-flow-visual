import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Activity, 
  Search, 
  Calendar,
  Monitor,
  MapPin,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Eye,
  X
} from "lucide-react";
import { User as UserType, mockActivity, Activity as ActivityType } from "@/data/usersData";
import { cn } from "@/lib/utils";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType | null;
}

export function ActivityModal({ isOpen, onClose, user }: ActivityModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("7days");

  // Filtrar actividad del usuario
  const userActivity = useMemo(() => {
    return mockActivity.filter(activity => activity.userId === user?.id);
  }, [user?.id]);

  const filteredActivity = useMemo(() => {
    return userActivity.filter(activity => {
      const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           activity.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = departmentFilter === "all" || 
                               activity.department.toLowerCase() === departmentFilter.toLowerCase();
      
      const matchesStatus = statusFilter === "all" || 
                           (statusFilter === "success" && activity.success) ||
                           (statusFilter === "failed" && !activity.success);

      // Filtro de tiempo
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let matchesTime = true;
      switch (timeFilter) {
        case "24h":
          matchesTime = diffDays === 0;
          break;
        case "7days":
          matchesTime = diffDays <= 7;
          break;
        case "30days":
          matchesTime = diffDays <= 30;
          break;
      }

      return matchesSearch && matchesDepartment && matchesStatus && matchesTime;
    });
  }, [userActivity, searchQuery, departmentFilter, statusFilter, timeFilter]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: diffDays > 365 ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (action: string, success: boolean) => {
    if (!success) return <XCircle className="w-4 h-4 text-error" />;
    
    if (action.toLowerCase().includes('creó') || action.toLowerCase().includes('create')) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    }
    if (action.toLowerCase().includes('editó') || action.toLowerCase().includes('edit')) {
      return <Activity className="w-4 h-4 text-warning" />;
    }
    if (action.toLowerCase().includes('eliminó') || action.toLowerCase().includes('delete')) {
      return <XCircle className="w-4 h-4 text-error" />;
    }
    return <Eye className="w-4 h-4 text-primary" />;
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Marketing': 'bg-success/10 text-success border-success/20',
      'Finance': 'bg-warning/10 text-warning border-warning/20',
      'Sales': 'bg-error/10 text-error border-error/20',
      'HR': 'bg-secondary/10 text-secondary border-secondary/20',
      'IT': 'bg-accent/10 text-accent border-accent/20',
      'General': 'bg-primary/10 text-primary border-primary/20'
    };
    return colors[department] || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  const stats = useMemo(() => {
    const total = userActivity.length;
    const successful = userActivity.filter(a => a.success).length;
    const failed = userActivity.filter(a => !a.success).length;
    const departments = new Set(userActivity.map(a => a.department)).size;

    return { total, successful, failed, departments };
  }, [userActivity]);

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Actividad de Usuario - {user.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total acciones</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">{stats.successful}</div>
                <div className="text-sm text-muted-foreground">Exitosas</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-error">{stats.failed}</div>
                <div className="text-sm text-muted-foreground">Fallidas</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">{stats.departments}</div>
                <div className="text-sm text-muted-foreground">Departamentos</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar actividad..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Últimas 24h</SelectItem>
                    <SelectItem value="7days">Últimos 7 días</SelectItem>
                    <SelectItem value="30days">Últimos 30 días</SelectItem>
                    <SelectItem value="all">Todo el tiempo</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="success">Exitosas</SelectItem>
                    <SelectItem value="failed">Fallidas</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Actividad */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Actividad Reciente</span>
                <Badge variant="outline">
                  {filteredActivity.length} {filteredActivity.length === 1 ? 'registro' : 'registros'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredActivity.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No se encontró actividad
                  </h3>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/5 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getActionIcon(activity.action, activity.success)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {activity.action}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.target}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{activity.ip}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Monitor className="w-3 h-3" />
                                <span>{activity.userAgent}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={cn("text-xs", getDepartmentColor(activity.department))}>
                              {activity.department}
                            </Badge>
                            <div className="text-xs text-muted-foreground text-right">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {formatTimestamp(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}