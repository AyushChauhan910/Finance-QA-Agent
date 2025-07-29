import { BackgroundPaths } from "@/components/ui/background-paths";
import { FinancialBackgroundPaths } from "@/components/FinancialBackgroundPaths";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Demo = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-4 z-50"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
          className="bg-card/80 backdrop-blur-sm border-border"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to App
        </Button>
      </motion.div>

      {/* Demo Content */}
      <div className="space-y-0">
        {/* Original BackgroundPaths Component */}
        <section>
          <BackgroundPaths title="Background Paths" />
        </section>

        {/* Financial Themed Version */}
        <section>
          <FinancialBackgroundPaths 
            title="Financial Intelligence"
            subtitle="AI-Powered Document Analysis"
            onGetStarted={() => {
              console.log("Get Started clicked!");
              window.history.back();
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Demo;