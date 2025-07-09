export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastActive: string;
  globalRole: 'super-admin' | 'admin' | 'manager' | 'user' | 'readonly';
  departments: Array<{
    id: string;
    name: string;
    role: 'admin' | 'manager' | 'user' | 'readonly';
  }>;
  permissions: Record<string, Record<string, boolean>>;
  createdAt: string;
  phone?: string;
  isTemporary?: boolean;
  requirePasswordChange?: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  userCount: number;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  department: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  success: boolean;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
  userCount: number;
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "María González",
    email: "maria@company.com",
    position: "Marketing Manager",
    avatar: "/avatars/maria.jpg",
    status: "active",
    lastActive: "2024-01-15T10:30:00Z",
    globalRole: "admin",
    departments: [
      { id: "marketing", name: "Marketing", role: "admin" },
      { id: "general", name: "General", role: "manager" }
    ],
    permissions: {
      marketing: {
        chat_agent: true,
        create_objectives: true,
        manage_tasks: true,
        view_artifacts: true,
        manage_team: true,
        edit_objectives: true,
        delete_objectives: false
      },
      general: {
        view_objectives: true,
        create_objectives: true,
        view_reports: true,
        export_data: true
      }
    },
    createdAt: "2023-06-15T09:00:00Z",
    phone: "+34 612 345 678"
  },
  {
    id: "user-2", 
    name: "Carlos Ruiz",
    email: "carlos@company.com",
    position: "Finance Director",
    avatar: "/avatars/carlos.jpg",
    status: "inactive",
    lastActive: "2024-01-10T15:45:00Z",
    globalRole: "admin",
    departments: [
      { id: "finance", name: "Finance", role: "admin" },
      { id: "general", name: "General", role: "user" }
    ],
    permissions: {
      finance: {
        view_reports: true,
        create_reports: true,
        manage_budget: true,
        approve_expenses: true
      },
      general: {
        view_objectives: true,
        view_reports: false
      }
    },
    createdAt: "2023-08-20T14:30:00Z",
    phone: "+34 687 234 567"
  },
  {
    id: "user-3",
    name: "Ana López",
    email: "ana@company.com", 
    position: "HR Specialist",
    avatar: "/avatars/ana.jpg",
    status: "active",
    lastActive: "2024-01-15T09:15:00Z",
    globalRole: "manager",
    departments: [
      { id: "hr", name: "HR", role: "manager" },
      { id: "general", name: "General", role: "user" }
    ],
    permissions: {
      hr: {
        manage_employees: true,
        view_payroll: false,
        conduct_interviews: true,
        manage_benefits: true
      },
      general: {
        view_objectives: true,
        create_objectives: false
      }
    },
    createdAt: "2023-09-10T11:00:00Z",
    phone: "+34 654 789 123"
  },
  {
    id: "user-4",
    name: "Roberto Sánchez",
    email: "roberto@company.com",
    position: "Sales Executive", 
    avatar: "/avatars/roberto.jpg",
    status: "suspended",
    lastActive: "2024-01-08T16:20:00Z",
    globalRole: "user",
    departments: [
      { id: "sales", name: "Sales", role: "user" }
    ],
    permissions: {
      sales: {
        view_leads: true,
        create_leads: true,
        manage_pipeline: false,
        view_reports: true
      }
    },
    createdAt: "2023-11-05T10:30:00Z",
    phone: "+34 678 901 234"
  },
  {
    id: "user-5",
    name: "Laura Martín",
    email: "laura@company.com",
    position: "IT Administrator",
    avatar: "/avatars/laura.jpg", 
    status: "active",
    lastActive: "2024-01-15T11:45:00Z",
    globalRole: "super-admin",
    departments: [
      { id: "it", name: "IT", role: "admin" },
      { id: "general", name: "General", role: "admin" }
    ],
    permissions: {
      it: {
        system_access: true,
        manage_users: true,
        backup_data: true,
        security_config: true
      },
      general: {
        view_objectives: true,
        create_objectives: true,
        manage_users: true,
        system_config: true
      }
    },
    createdAt: "2023-05-01T08:00:00Z",
    phone: "+34 645 123 789"
  }
];

export const mockRoles: Role[] = [
  {
    id: "super-admin",
    name: "Super Admin", 
    description: "Acceso total al sistema",
    color: "#ef4444",
    permissions: ["*"],
    userCount: 2
  },
  {
    id: "admin",
    name: "Admin",
    description: "Control total del departamento", 
    color: "#6366f1",
    permissions: [
      "manage_objectives",
      "manage_tasks",
      "manage_team", 
      "view_reports",
      "create_artifacts",
      "edit_objectives",
      "delete_objectives"
    ],
    userCount: 8
  },
  {
    id: "manager", 
    name: "Manager",
    description: "Gestión de equipo y tareas",
    color: "#8b5cf6", 
    permissions: [
      "manage_tasks",
      "create_objectives",
      "view_reports", 
      "assign_tasks",
      "view_artifacts"
    ],
    userCount: 12
  },
  {
    id: "user",
    name: "User",
    description: "Usuario estándar del sistema",
    color: "#06b6d4",
    permissions: [
      "view_objectives",
      "create_tasks",
      "view_artifacts",
      "update_profile"
    ],
    userCount: 18
  },
  {
    id: "readonly",
    name: "ReadOnly", 
    description: "Solo lectura",
    color: "#64748b",
    permissions: [
      "view_objectives",
      "view_reports"
    ],
    userCount: 4
  }
];

export const mockActivity: Activity[] = [
  {
    id: "act-1",
    userId: "user-1",
    userName: "María González",
    action: "Creó objetivo",
    target: "Aumentar CTR 25%",
    department: "Marketing",
    timestamp: "2024-01-15T10:25:00Z",
    ip: "192.168.1.45", 
    userAgent: "Chrome/120 Windows",
    success: true
  },
  {
    id: "act-2",
    userId: "user-2",
    userName: "Carlos Ruiz",
    action: "Editó dashboard",
    target: "Dashboard financiero",
    department: "Finance", 
    timestamp: "2024-01-15T10:18:00Z",
    ip: "192.168.1.67",
    userAgent: "Safari/iOS",
    success: true
  },
  {
    id: "act-3",
    userId: "user-3",
    userName: "Ana López",
    action: "Intento de acceso fallido",
    target: "Departamento IT",
    department: "IT",
    timestamp: "2024-01-15T09:30:00Z",
    ip: "203.45.12.89",
    userAgent: "Firefox/Linux", 
    success: false
  },
  {
    id: "act-4", 
    userId: "user-5",
    userName: "Laura Martín",
    action: "Actualizó permisos",
    target: "Usuario Roberto Sánchez",
    department: "General",
    timestamp: "2024-01-15T08:45:00Z",
    ip: "192.168.1.23",
    userAgent: "Chrome/120 Windows",
    success: true
  },
  {
    id: "act-5",
    userId: "user-1", 
    userName: "María González",
    action: "Exportó datos",
    target: "Reporte de marketing Q1",
    department: "Marketing",
    timestamp: "2024-01-15T08:15:00Z",
    ip: "192.168.1.45",
    userAgent: "Chrome/120 Windows", 
    success: true
  }
];

export const mockDepartments: Department[] = [
  {
    id: "general",
    name: "General", 
    icon: "🏢",
    color: "#6366f1",
    userCount: 24
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📈", 
    color: "#10b981",
    userCount: 8
  },
  {
    id: "finance",
    name: "Finance",
    icon: "💰",
    color: "#f59e0b", 
    userCount: 5
  },
  {
    id: "sales", 
    name: "Sales",
    icon: "🎯",
    color: "#ef4444",
    userCount: 12
  },
  {
    id: "hr",
    name: "HR",
    icon: "👥",
    color: "#8b5cf6",
    userCount: 6
  },
  {
    id: "it",
    name: "IT", 
    icon: "🔧",
    color: "#06b6d4",
    userCount: 4
  }
];