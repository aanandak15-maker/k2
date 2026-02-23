import React from 'react';
import { Badge } from './Badge';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    let variant: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' = 'default';

    const lowerStatus = status.toLowerCase();

    // Map common statuses to badge variants
    if (['active', 'completed', 'paid', 'fulfilled', 'in stock', 'low', 'approved'].includes(lowerStatus)) {
        variant = 'success';
    } else if (['pending', 'low stock', 'dormant', 'medium', 'partial', 'partially fulfilled'].includes(lowerStatus)) {
        variant = 'warning';
    } else if (['inactive', 'overdue', 'out of stock', 'high', 'failed', 'cancelled', 'absent'].includes(lowerStatus)) {
        variant = 'danger';
    } else if (['on leave', 'info'].includes(lowerStatus)) {
        variant = 'info';
    } else if (['not marked', 'other'].includes(lowerStatus)) {
        variant = 'secondary';
    }

    return (
        <Badge variant={variant} className={className}>
            {status}
        </Badge>
    );
};
