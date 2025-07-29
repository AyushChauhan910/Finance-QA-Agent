"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(59,130,246,${0.1 + i * 0.02})`, // Financial blue theme
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-primary/30"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Financial Data Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function FinancialBackgroundPaths({
    title = "Financial Intelligence",
    subtitle = "Powered by AI",
    onGetStarted,
}: {
    title?: string;
    subtitle?: string;
    onGetStarted?: () => void;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Animated background paths */}
            <div className="absolute inset-0 opacity-60">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/90" />

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Main title with financial theme */}
                    <div className="flex items-center justify-center mb-8">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                delay: 0.5, 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 20 
                            }}
                            className="p-4 bg-gradient-primary rounded-2xl shadow-glow mr-6"
                        >
                            <TrendingUp className="h-12 w-12 text-primary-foreground" />
                        </motion.div>
                        
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay:
                                                    wordIndex * 0.1 +
                                                    letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text 
                                            bg-gradient-financial"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium"
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Button with enhanced design */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.6 }}
                        className="inline-block group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-financial rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                        
                        <Button
                            onClick={onGetStarted}
                            size="lg"
                            className="relative rounded-2xl px-12 py-6 text-lg font-semibold 
                            bg-gradient-primary hover:shadow-financial transition-all duration-300 
                            group-hover:-translate-y-1 border-0 shadow-glow
                            hover:shadow-2xl transform-gpu"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Start Financial Analysis
                            </span>
                            <ArrowRight className="ml-3 h-5 w-5 opacity-70 group-hover:opacity-100 
                                group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                    </motion.div>

                    {/* Feature metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5, duration: 0.8 }}
                        className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { metric: "<500ms", label: "Query Speed" },
                            { metric: "95%+", label: "Accuracy" },
                            { metric: "Real-time", label: "Processing" }
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.7 + index * 0.2 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-2 animate-pulse-glow">
                                    {item.metric}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {item.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}