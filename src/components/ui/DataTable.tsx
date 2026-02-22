import React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<T> {
  columns: {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  data: T[];
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("rounded-md border border-slate-200 bg-white shadow-sm", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)} className="h-10 px-4 text-xs font-medium uppercase tracking-wider text-slate-500 bg-slate-50/50">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
              {columns.map((col) => (
                <TableCell key={`${item.id}-${String(col.key)}`} className="px-4 py-3 text-sm text-slate-700">
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
