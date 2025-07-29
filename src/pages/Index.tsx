import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { FinancialBackgroundPaths } from '@/components/FinancialBackgroundPaths';
import { DocumentUpload } from '@/components/DocumentUpload';
import { QueryInterface } from '@/components/QueryInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const handleGetStarted = () => {
    const uploadSection = document.getElementById('main-content');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <FinancialBackgroundPaths 
        title="Financial Intelligence"
        subtitle="Transform hours of manual document review into seconds of automated query processing"
        onGetStarted={handleGetStarted}
      />
      
      {/* Main Content */}
      <motion.div
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 container mx-auto px-6 py-16"
      >
        <Tabs defaultValue="upload" className="w-full">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-card border border-border">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Upload Documents
              </TabsTrigger>
              <TabsTrigger 
                value="query"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Query Analysis
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="upload" className="mt-8">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="query" className="mt-8">
            <QueryInterface />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 mt-20 border-t border-border bg-gradient-glass backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">
              © 2024 FinanceAI. Advanced Financial Document Analysis.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                API Docs
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;