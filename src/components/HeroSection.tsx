import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, Zap, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const HeroSection = () => {
  const features = [
    {
      icon: Search,
      title: "Instant Search",
      description: "Sub-500ms query processing",
      metric: "<500ms"
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Precise financial analysis",
      metric: "95%+"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Live document analysis",
      metric: "Real-time"
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl font-bold mb-6 bg-gradient-financial bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            Financial Intelligence
            <br />
            <span className="text-4xl text-foreground">Powered by AI</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Transform hours of financial document analysis into seconds of automated query processing. 
            Get instant, accurate answers from complex SEC filings with our advanced RAG system.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Ask about any financial document..."
                className="pl-10 h-12 bg-card border-border focus:shadow-glow transition-all duration-300"
              />
            </div>
            <Button 
              className="h-12 px-8 bg-gradient-primary hover:shadow-financial transition-all duration-300"
              size="lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload & Analyze
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-500 h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-3 bg-gradient-primary rounded-xl shadow-glow">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="text-2xl font-bold text-accent animate-pulse-glow">
                    {feature.metric}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};