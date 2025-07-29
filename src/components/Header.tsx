import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, FileText, Brain } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 flex items-center justify-between p-6 bg-gradient-glass backdrop-blur-sm border-b border-border"
    >
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
          <TrendingUp className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">FinanceAI</h1>
          <p className="text-sm text-muted-foreground">Financial Q&A Agent</p>
        </div>
      </motion.div>

      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <FileText className="h-4 w-4 mr-2" />
          Documents
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Brain className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
          Get Started
        </Button>
      </nav>
    </motion.header>
  );
};