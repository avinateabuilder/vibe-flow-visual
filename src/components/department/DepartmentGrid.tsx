import { motion } from "framer-motion";
import { DepartmentCard } from "./DepartmentCard";
import { CreateDepartmentCard } from "./CreateDepartmentCard";
import { Department } from "@/data/mockData";

interface DepartmentGridProps {
  departments: Department[];
  onEnterDepartment: (departmentId: string) => void;
  onCreateDepartment: () => void;
  showCreateCard?: boolean;
}

export function DepartmentGrid({ 
  departments, 
  onEnterDepartment, 
  onCreateDepartment,
  showCreateCard = true 
}: DepartmentGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {departments.map((department) => (
        <DepartmentCard
          key={department.id}
          {...department}
          onEnter={onEnterDepartment}
        />
      ))}
      
      {showCreateCard && (
        <CreateDepartmentCard onClick={onCreateDepartment} />
      )}
    </motion.div>
  );
}