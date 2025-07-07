import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag
} from "lucide-react";

interface DocumentsViewProps {
  departmentName: string;
}

const mockDocuments = [
  {
    id: "doc-1",
    title: "Plan de Marketing Q1 2025",
    type: "PDF",
    size: "2.4 MB",
    createdBy: "María García",
    createdAt: "2025-01-15",
    tags: ["Marketing", "Q1", "Estrategia"],
    description: "Estrategia completa de marketing para el primer trimestre"
  },
  {
    id: "doc-2",
    title: "Dashboard Analytics - Febrero",
    type: "HTML",
    size: "145 KB", 
    createdBy: "IA Assistant",
    createdAt: "2025-02-20",
    tags: ["Analytics", "Dashboard", "IA Generated"],
    description: "Dashboard interactivo generado automáticamente por IA"
  },
  {
    id: "doc-3",
    title: "Presentación Resultados Q4",
    type: "PPT",
    size: "8.7 MB",
    createdBy: "Carlos López", 
    createdAt: "2025-01-08",
    tags: ["Presentación", "Q4", "Resultados"],
    description: "Presentación ejecutiva con resultados del último trimestre"
  },
  {
    id: "doc-4",
    title: "Base de Datos Leads",
    type: "Excel",
    size: "1.2 MB",
    createdBy: "Ana Martín",
    createdAt: "2025-02-18",
    tags: ["Leads", "Base de Datos", "CRM"],
    description: "Exportación actualizada de todos los leads calificados"
  },
  {
    id: "doc-5",
    title: "Notas Reunión Semanal",
    type: "Markdown",
    size: "89 KB",
    createdBy: "Pedro Ruiz",
    createdAt: "2025-02-22",
    tags: ["Reunión", "Notas", "Semanal"],
    description: "Resumen y acuerdos de la reunión de equipo"
  }
];

const typeColors = {
  "PDF": "bg-destructive/10 text-destructive",
  "HTML": "bg-primary/10 text-primary",
  "PPT": "bg-warning/10 text-warning",
  "Excel": "bg-success/10 text-success",
  "Markdown": "bg-accent/10 text-accent"
};

const typeIcons = {
  "PDF": "📄",
  "HTML": "🌐", 
  "PPT": "📊",
  "Excel": "📈",
  "Markdown": "📝"
};

export function DocumentsView({ departmentName }: DocumentsViewProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Documentos - {departmentName}</h1>
          <p className="text-muted-foreground">Gestiona archivos, artifacts y knowledge base</p>
        </div>
        <Button className="btn-vibework">
          <Upload className="w-4 h-4 mr-2" />
          Subir Archivo
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar documentos, artifacts, notas..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Todos los tipos
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Recientes
          </Badge>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">
                      {typeIcons[doc.type as keyof typeof typeIcons]}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold line-clamp-2">
                        {doc.title}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs mt-1 ${typeColors[doc.type as keyof typeof typeColors]}`}
                      >
                        {doc.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {doc.description}
                </p>
                
                {/* Document Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{doc.createdBy}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">
                      {new Date(doc.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{doc.size}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-destructive/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockDocuments.length}</div>
            <div className="text-xs text-muted-foreground">Total Documentos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {mockDocuments.filter(doc => doc.createdBy === 'IA Assistant').length}
            </div>
            <div className="text-xs text-muted-foreground">Generados por IA</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {mockDocuments.filter(doc => 
                new Date(doc.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
              ).length}
            </div>
            <div className="text-xs text-muted-foreground">Esta Semana</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {mockDocuments.reduce((total, doc) => 
                total + parseFloat(doc.size.replace(/[^\d.]/g, '')), 0
              ).toFixed(1)} MB
            </div>
            <div className="text-xs text-muted-foreground">Almacenamiento</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}