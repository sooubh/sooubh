import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
    isOn: boolean;
    onToggle: () => void;
    label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, label }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div className="flex items-center gap-3">
            {label && <span className="text-sm font-medium text-gray-400">{label}</span>}
            <div 
                role="switch"
                aria-checked={isOn}
                aria-label={label || "Toggle switch"}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onClick={onToggle}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-google-blue transition-colors duration-300 ${isOn ? 'bg-google-blue' : 'bg-white/10'}`}
            >
                <motion.div 
                    className="w-4 h-4 bg-white rounded-full shadow-md pointer-events-none"
                    animate={{ x: isOn ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );
};
