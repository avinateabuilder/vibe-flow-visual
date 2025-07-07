import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateDepartmentCardProps {
  onClick: () => void;
}

export function CreateDepartmentCard({ onClick }: CreateDepartmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className="h-full border-2 border-dashed border-primary/30 bg-transparent hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
        <CardContent className="flex flex-col items-center justify-center h-[320px] text-center p-6">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ 
              scale: 1.1,
              rotate: 90 
            }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Crear Nuevo Departamento
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Organiza tu equipo y objetivos en un nuevo espacio de trabajo colaborativo
          </p>
          
          <Button 
            onClick={onClick}
            variant="outline"
            className="btn-ghost"
            size="lg"
          >
            <Plus className="mr-2 w-4 h-4" />
            Crear Departamento
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}