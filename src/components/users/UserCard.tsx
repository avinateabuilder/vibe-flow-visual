import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, 
  Lock, 
  Activity, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  MapPin
} from "lucide-react";
import { User } from "@/data/usersData";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onPermissions: (user: User) => void;
  onActivity: (user: User) => void;
  onDelete: (user: User) => void;
}

const getStatusConfig = (status: User['status']) => {
  switch (status) {
    case 'active':
      return {
        label: 'Activo',
        color: 'bg-success text-white',
        dot: 'animate-pulse bg-success'
      };
    case 'inactive':
      return {
        label: 'Inactivo', 
        color: 'bg-warning text-white',
        dot: 'bg-warning'
      };
    case 'suspended':
      return {
        label: 'Suspendido',
        color: 'bg-error text-white', 
        dot: 'bg-error'
      };
    case 'pending':
      return {
        label: 'Pendiente',
        color: 'bg-secondary text-white',
        dot: 'bg-secondary'
      };
    default:
      return {
        label: 'Desconocido',
        color: 'bg-muted text-muted-foreground',
        dot: 'bg-muted'
      };
  }
};

const getRoleConfig = (role: User['globalRole']) => {
  switch (role) {
    case 'super-admin':
      return { label: 'Super Admin', color: 'bg-error text-white' };
    case 'admin':
      return { label: 'Admin', color: 'bg-primary text-white' };
    case 'manager':
      return { label: 'Manager', color: 'bg-secondary text-white' };
    case 'user':
      return { label: 'Usuario', color: 'bg-accent text-white' };
    case 'readonly':
      return { label: 'Solo Lectura', color: 'bg-muted text-muted-foreground' };
    default:
      return { label: 'Sin Rol', color: 'bg-muted text-muted-foreground' };
  }
};

const formatLastActive = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Hace menos de 1 hora';
  if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short',
    year: diffDays > 365 ? 'numeric' : undefined
  });
};

export function UserCard({ user, onEdit, onPermissions, onActivity, onDelete }: UserCardProps) {
  const statusConfig = getStatusConfig(user.status);
  const roleConfig = getRoleConfig(user.globalRole);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="glass-card h-full hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          {/* Header con Avatar y Estado */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                  statusConfig.dot
                )} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.position}</p>
              </div>
            </div>
            <Badge className={cn("text-xs font-medium", statusConfig.color)}>
              {statusConfig.label}
            </Badge>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>

          {/* Role Badge */}
          <div className="mb-4">
            <Badge className={cn("text-xs font-medium", roleConfig.color)}>
              {roleConfig.label}
            </Badge>
          </div>

          {/* Departamentos */}
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">Departamentos:</p>
            <div className="flex flex-wrap gap-1">
              {user.departments.map((dept) => (
                <Badge 
                  key={dept.id} 
                  variant="outline" 
                  className="text-xs bg-primary/10 border-primary/20 text-primary"
                >
                  {dept.name} ({dept.role})
                </Badge>
              ))}
            </div>
          </div>

          {/* Último Acceso */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4" />
            <span>{formatLastActive(user.lastActive)}</span>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="hover:bg-primary/10 text-primary"
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => onPermissions(user)}
              className="hover:bg-secondary/10 text-secondary"
            >
              <Lock className="w-4 h-4 mr-1" />
              Permisos
            </Button>
            <Button
              variant="ghost"
              size="sm" 
              onClick={() => onActivity(user)}
              className="hover:bg-accent/10 text-accent"
            >
              <Activity className="w-4 h-4 mr-1" />
              Actividad
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user)}
              className="hover:bg-error/10 text-error ml-auto"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}