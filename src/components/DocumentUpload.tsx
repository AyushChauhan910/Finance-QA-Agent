import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadStatus {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
}

export const DocumentUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    file: null,
    progress: 0,
    status: 'idle'
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus({ file, progress: 0, status: 'uploading' });

    // Simulate upload progress
    const uploadProgress = setInterval(() => {
      setUploadStatus(prev => {
        if (prev.progress >= 100) {
          clearInterval(uploadProgress);
          
          // Simulate processing
          setTimeout(() => {
            setUploadStatus(prev => ({ ...prev, status: 'processing' }));
            
            // Simulate completion
            setTimeout(() => {
              setUploadStatus(prev => ({ ...prev, status: 'completed' }));
              toast({
                title: "Document Processed",
                description: "Your financial document is ready for analysis",
              });
            }, 2000);
          }, 500);
          
          return { ...prev, progress: 100, status: 'uploading' };
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 200);
  };

  const getStatusIcon = () => {
    switch (uploadStatus.status) {
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-accent" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-destructive" />;
      default:
        return <FileText className="h-8 w-8 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus.status) {
      case 'uploading':
        return 'Uploading document...';
      case 'processing':
        return 'Processing with AI...';
      case 'completed':
        return 'Ready for analysis';
      case 'error':
        return 'Upload failed';
      default:
        return 'Upload your SEC filing';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <Upload className="h-5 w-5 text-primary" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={uploadStatus.status === 'processing' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {getStatusIcon()}
              </motion.div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {getStatusText()}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports 10-K, 10-Q, and other SEC filings
                </p>
              </div>

              {uploadStatus.status === 'idle' && (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Choose File
                  </Button>
                </label>
              )}
            </div>
          </motion.div>

          {(uploadStatus.status === 'uploading' || uploadStatus.status === 'processing') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {uploadStatus.file?.name}
                </span>
                <span className="text-foreground">
                  {uploadStatus.progress}%
                </span>
              </div>
              <Progress 
                value={uploadStatus.progress} 
                className="h-2"
              />
            </motion.div>
          )}

          {uploadStatus.status === 'completed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-glass rounded-lg p-4 border border-accent/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-medium">
                    {uploadStatus.file?.name}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  Start Analysis
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};