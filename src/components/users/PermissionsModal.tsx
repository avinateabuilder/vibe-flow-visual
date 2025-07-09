import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Lock, 
  Save, 
  X, 
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus,
  Crown,
  Search
} from "lucide-react";
import { User as UserType, mockDepartments } from "@/data/usersData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType | null;
}

interface DepartmentPermissions {
  [key: string]: boolean;
}

interface UserPermissions {
  [departmentId: string]: DepartmentPermissions;
}

const departmentPermissionTemplates = {
  general: {
    view_objectives: "Ver objetivos corporativos",
    create_objectives: "Crear/editar objetivos", 
    delete_objectives: "Eliminar objetivos",
    view_reports: "Ver reportes ejecutivos",
    export_data: "Exportar datos",
    manage_users: "Gestionar usuarios"
  },
  marketing: {
    chat_agent: "Chat con Marketing Agent",
    create_objectives: "Crear/editar objetivos de marketing",
    manage_tasks: "Gestionar tareas del equipo",
    view_artifacts: "Ver/crear artifacts",
    knowledge_base: "Acceso a knowledge base",
    assign_tasks: "Asignar tareas a colaboradores",
    configure_kanban: "Configurar kanban"
  },
  finance: {
    view_reports: "Ver reportes financieros",
    create_reports: "Crear reportes",
    manage_budget: "Gestionar presupuesto",
    approve_expenses: "Aprobar gastos",
    view_analytics: "Ver analytics financieros",
    export_data: "Exportar datos financieros"
  },
  sales: {
    view_leads: "Ver leads",
    create_leads: "Crear leads",
    manage_pipeline: "Gestionar pipeline",
    view_reports: "Ver reportes de ventas",
    manage_team: "Gestionar equipo",
    configure_crm: "Configurar CRM"
  },
  hr: {
    manage_employees: "Gestionar empleados",
    view_payroll: "Ver nóminas",
    conduct_interviews: "Realizar entrevistas",
    manage_benefits: "Gestionar beneficios",
    view_analytics: "Ver analytics de RRHH",
    manage_policies: "Gestionar políticas"
  },
  it: {
    system_access: "Acceso al sistema",
    manage_users: "Gestionar usuarios",
    backup_data: "Respaldo de datos",
    security_config: "Configuración de seguridad",
    monitor_systems: "Monitorear sistemas",
    manage_infrastructure: "Gestionar infraestructura"
  }
};

const specialPermissions = {
  super_admin: "Super Admin (acceso total al sistema)",
  auditor: "Auditor (solo lectura en todos los departamentos)",
  invite_users: "Puede invitar nuevos usuarios",
  bypass_time_restrictions: "Bypass de restricciones de horario"
};

export function PermissionsModal({ isOpen, onClose, user }: PermissionsModalProps) {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<UserPermissions>({});
  const [specialPerms, setSpecialPerms] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      setPermissions(user.permissions || {});
      setSpecialPerms({
        super_admin: user.globalRole === 'super-admin',
        auditor: false,
        invite_users: false,
        bypass_time_restrictions: false
      });
    }
  }, [user, isOpen]);

  const handlePermissionChange = (departmentId: string, permission: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [departmentId]: {
        ...prev[departmentId],
        [permission]: checked
      }
    }));
  };

  const handleSpecialPermissionChange = (permission: string, checked: boolean) => {
    setSpecialPerms(prev => ({
      ...prev,
      [permission]: checked
    }));
  };

  const addDepartmentAccess = (departmentId: string) => {
    const template = departmentPermissionTemplates[departmentId as keyof typeof departmentPermissionTemplates];
    const defaultPermissions: DepartmentPermissions = {};
    
    Object.keys(template).forEach(key => {
      defaultPermissions[key] = false;
    });

    setPermissions(prev => ({
      ...prev,
      [departmentId]: defaultPermissions
    }));
  };

  const removeDepartmentAccess = (departmentId: string) => {
    setPermissions(prev => {
      const newPerms = { ...prev };
      delete newPerms[departmentId];
      return newPerms;
    });
  };

  const handleSave = () => {
    toast({
      title: "Permisos actualizados",
      description: `Los permisos de ${user?.name} han sido actualizados exitosamente.`,
    });
    onClose();
  };

  if (!user) return null;

  const getUserDepartment = (departmentId: string) => {
    return user.departments.find(d => d.id === departmentId);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin': return 'bg-error text-white';
      case 'admin': return 'bg-primary text-white';
      case 'manager': return 'bg-secondary text-white';
      case 'user': return 'bg-accent text-white';
      case 'readonly': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Permisos de Usuario - {user.name}
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{user.email}</span>
            <Badge className={cn("text-xs", getRoleColor(user.globalRole))}>
              Rol Global: {user.globalRole}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Permisos por Departamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Permisos por Departamento
            </h3>

            {mockDepartments.map(department => {
              const userDept = getUserDepartment(department.id);
              const deptPermissions = permissions[department.id];
              const hasAccess = !!deptPermissions;
              const template = departmentPermissionTemplates[department.id as keyof typeof departmentPermissionTemplates];

              return (
                <Card key={department.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{department.icon}</span>
                        <div>
                          <span className="text-lg">{department.name}</span>
                          {userDept && (
                            <Badge className={cn("ml-2 text-xs", getRoleColor(userDept.role))}>
                              {userDept.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {!hasAccess && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addDepartmentAccess(department.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar acceso
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {!hasAccess ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Sin permisos en este departamento</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDepartmentAccess(department.id)}
                            className="text-error hover:bg-error/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remover acceso
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(template).map(([key, label]) => (
                            <div key={key} className="flex items-center space-x-3">
                              <Checkbox
                                checked={deptPermissions[key] || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(department.id, key, !!checked)
                                }
                                disabled={user.globalRole === 'super-admin'}
                              />
                              <label className="text-sm cursor-pointer">
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Permisos Especiales */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Permisos Especiales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(specialPermissions).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox
                      checked={specialPerms[key] || false}
                      onCheckedChange={(checked) => 
                        handleSpecialPermissionChange(key, !!checked)
                      }
                      disabled={key === 'super_admin' && user.globalRole !== 'super-admin'}
                    />
                    <label className="text-sm cursor-pointer">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="btn-vibework">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}