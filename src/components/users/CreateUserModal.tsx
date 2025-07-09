import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Building,
  Save,
  X
} from "lucide-react";
import { User as UserType, mockRoles, mockDepartments } from "@/data/usersData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  globalRole: string;
  departments: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  sendInvitation: boolean;
  requirePasswordChange: boolean;
  isTemporary: boolean;
}

export function CreateUserModal({ isOpen, onClose, user }: CreateUserModalProps) {
  const { toast } = useToast();
  const isEdit = !!user;
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    globalRole: "",
    departments: [],
    sendInvitation: true,
    requirePasswordChange: true,
    isTemporary: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        position: user.position,
        globalRole: user.globalRole,
        departments: user.departments,
        sendInvitation: false,
        requirePasswordChange: user.requirePasswordChange || false,
        isTemporary: user.isTemporary || false
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        globalRole: "",
        departments: [],
        sendInvitation: true,
        requirePasswordChange: true,
        isTemporary: false
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.position.trim()) {
      newErrors.position = "La posición es requerida";
    }

    if (!formData.globalRole) {
      newErrors.globalRole = "El rol global es requerido";
    }

    if (formData.departments.length === 0) {
      newErrors.departments = "Debe seleccionar al menos un departamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDepartmentToggle = (department: typeof mockDepartments[0]) => {
    const exists = formData.departments.find(d => d.id === department.id);
    
    if (exists) {
      setFormData(prev => ({
        ...prev,
        departments: prev.departments.filter(d => d.id !== department.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, {
          id: department.id,
          name: department.name,
          role: "user"
        }]
      }));
    }
  };

  const handleDepartmentRoleChange = (departmentId: string, role: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.map(d =>
        d.id === departmentId ? { ...d, role } : d
      )
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Simular guardado
    toast({
      title: isEdit ? "Usuario actualizado" : "Usuario creado",
      description: isEdit 
        ? `Los datos de ${formData.name} han sido actualizados.`
        : `Se ha creado el usuario ${formData.name} exitosamente.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Información Personal */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: María González"
                    className={cn(errors.name && "border-error")}
                  />
                  {errors.name && <p className="text-sm text-error">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email corporativo *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Ej: maria@company.com"
                    className={cn(errors.email && "border-error")}
                  />
                  {errors.email && <p className="text-sm text-error">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Ej: +34 612 345 678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Posición/Cargo *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Ej: Marketing Manager"
                    className={cn(errors.position && "border-error")}
                  />
                  {errors.position && <p className="text-sm text-error">{errors.position}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Acceso */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="w-5 h-5" />
                Configuración de Acceso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Rol Global *</Label>
                <Select
                  value={formData.globalRole}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, globalRole: value }))}
                >
                  <SelectTrigger className={cn(errors.globalRole && "border-error")}>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: role.color }}
                          />
                          {role.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.globalRole && <p className="text-sm text-error">{errors.globalRole}</p>}
              </div>

              <div className="space-y-3">
                <Label>Acceso a Departamentos *</Label>
                {errors.departments && <p className="text-sm text-error">{errors.departments}</p>}
                
                <div className="grid gap-3">
                  {mockDepartments.map(department => {
                    const isSelected = formData.departments.find(d => d.id === department.id);
                    
                    return (
                      <div key={department.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={!!isSelected}
                            onCheckedChange={() => handleDepartmentToggle(department)}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{department.icon}</span>
                            <span className="font-medium">{department.name}</span>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <Select
                            value={isSelected.role}
                            onValueChange={(role) => handleDepartmentRoleChange(department.id, role)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="user">Usuario</SelectItem>
                              <SelectItem value="readonly">Solo Lectura</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuraciones Adicionales */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Configuraciones Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendInvitation"
                  checked={formData.sendInvitation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, sendInvitation: !!checked }))
                  }
                />
                <Label htmlFor="sendInvitation">Enviar email de invitación</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requirePasswordChange"
                  checked={formData.requirePasswordChange}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, requirePasswordChange: !!checked }))
                  }
                />
                <Label htmlFor="requirePasswordChange">
                  Requerir cambio de contraseña en primer login
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isTemporary"
                  checked={formData.isTemporary}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isTemporary: !!checked }))
                  }
                />
                <Label htmlFor="isTemporary">
                  Usuario temporal (acceso por 30 días)
                </Label>
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
          <Button onClick={handleSubmit} className="btn-vibework">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? "Actualizar Usuario" : "Crear Usuario"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}