import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { ChatInterface } from "@/components/workspace/ChatInterface";
import { ObjectivesView } from "@/components/workspace/ObjectivesView";
import { KanbanView } from "@/components/workspace/KanbanView";
import { DocumentsView } from "@/components/workspace/DocumentsView";
import { CalendarView } from "@/components/workspace/CalendarView";
import { ReportsView } from "@/components/workspace/ReportsView";
import { 
  MessageSquare, 
  Target, 
  CheckSquare, 
  FileText, 
  Calendar,
  BarChart3,
  Bot,
  Sparkles
} from "lucide-react";

interface WorkspaceLayoutProps {
  departmentName: string;
  departmentIcon: string;
  departmentColor: string;
}

type ViewType = 'chat' | 'objectives' | 'tasks' | 'documents' | 'calendar' | 'reports';

const navigationItems = [
  { key: 'chat' as ViewType, label: 'Chat IA', icon: MessageSquare },
  { key: 'objectives' as ViewType, label: 'Objetivos', icon: Target },
  { key: 'tasks' as ViewType, label: 'Tareas', icon: CheckSquare },
  { key: 'documents' as ViewType, label: 'Documentos', icon: FileText },
  { key: 'calendar' as ViewType, label: 'Calendario', icon: Calendar },
  { key: 'reports' as ViewType, label: 'Reportes', icon: BarChart3 },
];

export function WorkspaceLayout({ 
  departmentName, 
  departmentIcon, 
  departmentColor 
}: WorkspaceLayoutProps) {
  const [activeView, setActiveView] = useState<ViewType>('chat');

  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return <ChatInterface departmentName={departmentName} departmentColor={departmentColor} />;
      case 'objectives':
        return <ObjectivesView departmentName={departmentName} />;
      case 'tasks':
        return <KanbanView departmentName={departmentName} />;
      case 'documents':
        return <DocumentsView departmentName={departmentName} />;
      case 'calendar':
        return <CalendarView departmentName={departmentName} />;
      case 'reports':
        return <ReportsView departmentName={departmentName} />;
      default:
        return <ChatInterface departmentName={departmentName} departmentColor={departmentColor} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r border-border/50">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${departmentColor}20` }}
              >
                {departmentIcon}
              </div>
              <div>
                <h1 className="text-lg font-bold">{departmentName}</h1>
                <p className="text-xs text-muted-foreground">Workspace</p>
              </div>
            </div>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton 
                        onClick={() => setActiveView(item.key)}
                        isActive={activeView === item.key}
                        className="w-full justify-start"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border-0 border-b border-border/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div>
                  <h2 className="text-xl font-bold">
                    {navigationItems.find(item => item.key === activeView)?.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {departmentName} - Espacio de trabajo inteligente
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <Bot className="w-3 h-3 mr-1" />
                  IA Activa
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Active View Content */}
          <div className="flex-1 overflow-hidden">
            {renderActiveView()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}