import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  confidence?: number;
}

export const QueryInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your financial AI assistant. Ask me anything about your uploaded SEC documents, financial metrics, or investment analysis.',
      timestamp: new Date(),
      confidence: 99
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQueries = [
    "What was the revenue growth in Q4?",
    "Analyze the debt-to-equity ratio",
    "Show me the cash flow statement highlights",
    "What are the main risk factors mentioned?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Based on the financial documents, here's my analysis of "${inputValue}": The data shows significant trends that indicate strong performance metrics. Revenue has increased by 15.3% year-over-year, with particularly strong growth in the technology sector. The company maintains a healthy cash position and has reduced operational costs by 8.2%.`,
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 80
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-card border-border shadow-card h-[600px] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <MessageSquare className="h-5 w-5 text-primary" />
            Financial Analysis Chat
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-secondary-foreground" />
                      )}
                    </div>
                    
                    <motion.div
                      className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-gradient-primary text-primary-foreground' 
                          : 'bg-gradient-glass border border-border'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                        
                        {message.confidence && (
                          <Badge variant="outline" className="text-xs">
                            {message.confidence}% confidence
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <Bot className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="bg-gradient-glass border border-border rounded-lg p-4">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested Queries */}
          <div className="p-4 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQueries.map((query, index) => (
                <motion.button
                  key={query}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestedQuery(query)}
                  className="text-xs px-3 py-1 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-full border border-border transition-all duration-200 hover:scale-105"
                >
                  {query}
                </motion.button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about financial metrics, ratios, or trends..."
                className="flex-1 bg-background border-border focus:shadow-glow"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};