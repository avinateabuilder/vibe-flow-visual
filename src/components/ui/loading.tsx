import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({ size = "md", text, className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizeClasses[size]} text-primary`} />
      </motion.div>
      {text && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card border-0 h-[320px]"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-primary/10 rounded-xl animate-pulse" />
          <div className="w-20 h-6 bg-primary/10 rounded-full animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-primary/10 rounded animate-pulse" />
          <div className="w-full h-4 bg-primary/10 rounded animate-pulse" />
          <div className="w-2/3 h-4 bg-primary/10 rounded animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="w-1/2 h-4 bg-primary/10 rounded animate-pulse" />
          <div className="w-full h-2 bg-primary/10 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-primary/10 rounded animate-pulse" />
          <div className="h-10 bg-primary/10 rounded animate-pulse" />
        </div>

        <div className="w-full h-11 bg-primary/10 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  );
}