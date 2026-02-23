import React, { useState } from 'react';
import { CloudOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineIndicator() {
    // In a real app, this would use navigator.onLine or a hook
    const [isOffline, setIsOffline] = useState(false);

    // For prototype demonstration, we'll manually toggle it or leave it hidden
    // You can set it to true to see the UI.

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-amber-800 text-xs font-medium z-50 relative shadow-sm"
                >
                    <CloudOff size={14} />
                    <span>You are offline. Changes will sync when reconnected.</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
