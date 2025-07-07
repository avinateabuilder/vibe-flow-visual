export interface Department {
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
}

export const mockDepartments: Department[] = [
  {
    id: "general",
    name: "General", 
    icon: "📊",
    color: "#6366f1",
    objectives: 5,
    progress: 80,
    description: "Objetivos corporativos estratégicos y metas de crecimiento empresarial",
    members: 12,
    metrics: "25%"
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📈", 
    color: "#8b5cf6",
    objectives: 12,
    progress: 67,
    description: "Campañas de marketing digital, generación de leads y crecimiento de marca",
    tasks: 24,
    members: 8,
    metrics: "40%"
  },
  {
    id: "finance",
    name: "Finanzas",
    icon: "💰",
    color: "#06b6d4",
    objectives: 3,
    progress: 90,
    description: "Control financiero, reportes contables y gestión presupuestaria",
    tasks: 7,
    members: 5,
    metrics: "15%"
  },
  {
    id: "sales",
    name: "Ventas",
    icon: "🎯",
    color: "#10b981",
    objectives: 8,
    progress: 45,
    description: "Pipeline de ventas, gestión de clientes y cumplimiento de cuotas",
    tasks: 18,
    members: 15,
    metrics: "8 leads"
  },
  {
    id: "hr",
    name: "Recursos Humanos",
    icon: "👥",
    color: "#f59e0b",
    objectives: 4,
    progress: 78,
    description: "Gestión de talento, contratación y desarrollo profesional del equipo",
    tasks: 11,
    members: 6,
    metrics: "4 candidatos"
  },
  {
    id: "tech",
    name: "Tecnología",
    icon: "⚡",
    color: "#ef4444",
    objectives: 15,
    progress: 62,
    description: "Desarrollo de productos, infraestructura tecnológica y innovación digital",
    tasks: 32,
    members: 20,
    metrics: "12 releases"
  }
];

export interface Objective {
  id: string;
  title: string;
  progress: number;
  target: number;
  current: number;
  deadline: string;
  tasks: { completed: number; total: number };
  department: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export const mockObjectives: Objective[] = [
  {
    id: "obj-1",
    title: "Aumentar leads calificados 40%",
    progress: 78,
    target: 10000,
    current: 7800,
    deadline: "2025-12-31",
    tasks: { completed: 12, total: 15 },
    department: "marketing",
    priority: "high",
    description: "Incrementar la generación de leads calificados a través de campañas digitales optimizadas"
  },
  {
    id: "obj-2",
    title: "Reducir costos operativos 15%",
    progress: 90,
    target: 15,
    current: 13.5,
    deadline: "2025-06-30",
    tasks: { completed: 8, total: 9 },
    department: "finance",
    priority: "high",
    description: "Optimizar procesos y reducir gastos operativos sin afectar la calidad del servicio"
  },
  {
    id: "obj-3",
    title: "Implementar sistema CRM",
    progress: 62,
    target: 100,
    current: 62,
    deadline: "2025-09-15",
    tasks: { completed: 18, total: 29 },
    department: "tech",
    priority: "medium",
    description: "Desarrollar e implementar un sistema CRM personalizado para mejorar la gestión de clientes"
  }
];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  objectiveId: string;
  tags: string[];
}

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "A/B Test Headlines",
    description: "Crear y ejecutar pruebas A/B para optimizar headlines de landing pages",
    status: "todo",
    assignee: "María García",
    priority: "high",
    deadline: "2025-03-15",
    objectiveId: "obj-1",
    tags: ["marketing", "a/b-test", "landing-page"]
  },
  {
    id: "task-2",
    title: "Redesign Landing Page",
    description: "Rediseñar la página principal para mejorar conversión y experiencia de usuario",
    status: "in-progress",
    assignee: "Carlos Rodríguez",
    priority: "high",
    deadline: "2025-03-20",
    objectiveId: "obj-1",
    tags: ["design", "ux", "conversion"]
  },
  {
    id: "task-3",
    title: "Analytics Setup",
    description: "Configurar Google Analytics 4 y eventos de conversión avanzados",
    status: "done",
    assignee: "Ana López",
    priority: "medium",
    deadline: "2025-02-28",
    objectiveId: "obj-1",
    tags: ["analytics", "tracking", "ga4"]
  }
];