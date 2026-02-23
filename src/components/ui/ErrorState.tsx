import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    title = "Something went wrong",
    message = "We couldn't load this data. Please try again.",
    onRetry
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6 pb-2">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            )}
        </div>
    );
};
