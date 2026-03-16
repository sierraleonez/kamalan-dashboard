import React from 'react';
import { cn } from '../lib/utils';
import { Table, TableHeader, TableRow, TableCell, TableBody } from './ui/table';
import { router } from '@inertiajs/react';

export interface TableColumn {
  label: string;
  key: string;
  className?: string;
  renderItem?: (row: Record<string, any>, value: any) => React.ReactNode;
}

export interface MinimalTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  className?: string;
  redirectUrlFn: (row: Record<string, any>) => string;
}

export function MinimalTable({ columns, data, className, redirectUrlFn }: MinimalTableProps) {
  function redirectToDetail(row: Record<string, any>) {
    const url = redirectUrlFn(row);
    if (url) {
      router.visit(url);
    }
  }
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-border bg-card', className)}>
      <Table className="min-w-full text-sm">
        <TableHeader className="bg-muted">
          <TableRow>
            {columns.map((col) => (
              <TableCell as="th" key={col.key} className={cn('px-4 py-2 font-semibold text-left', col.className)}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-6">
                No data
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, i) => (
              <TableRow onClick={() => redirectToDetail(item)} key={i} className="border-t border-border hover:bg-muted/50">
                {columns.map((col) => (
                  <TableCell key={col.key} className={cn('px-4 py-2', col.className)}>
                    {col.renderItem
                      ? col.renderItem(item, item[col.key])
                      : renderBasedOnType(item[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default MinimalTable;

function renderBasedOnType(value: any) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}
