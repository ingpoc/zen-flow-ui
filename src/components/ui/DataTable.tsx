import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Table variants
const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: 'border-collapse',
        bordered: 'border border-zen-cloud rounded-lg overflow-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableHeaderVariants = cva(
  'h-12 px-4 text-left align-middle font-medium text-zen-mist',
  {
    variants: {
      variant: {
        default: 'border-b border-zen-cloud',
        bordered: 'border-b border-zen-cloud bg-zen-cloud/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableCellVariants = cva(
  'p-4 align-middle',
  {
    variants: {
      variant: {
        default: 'border-b border-zen-cloud',
        bordered: 'border-b border-zen-cloud',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Types
export interface ColumnDef<T> {
  id: string;
  header: string | React.ReactNode;
  accessor: keyof T | ((row: T) => any);
  cell?: (props: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
}

export interface DataTableProps<T> extends VariantProps<typeof tableVariants> {
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: boolean;
  filtering?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  loadingState?: 'skeleton' | 'shimmer' | 'pulse';
  emptyState?: React.ReactNode;
  className?: string;
}

// Skeleton row component
const SkeletonRow = ({ columns }: { columns: number }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className={cn(tableCellVariants())}>
        <div className="h-4 bg-zen-cloud/50 rounded w-3/4"></div>
      </td>
    ))}
  </tr>
);

// Sort icon component
const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | null }) => {
  if (!direction) {
    return (
      <svg className="w-4 h-4 text-zen-mist/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  
  return (
    <svg className="w-4 h-4 text-zen-water" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );
};

// Main DataTable component
function DataTableInner<T>(
  {
    data,
    columns,
    sorting = false,
    filtering = false,
    pagination = false,
    pageSize = 10,
    onRowClick,
    loadingState,
    emptyState,
    className,
    variant,
  }: DataTableProps<T>,
  ref: React.Ref<HTMLTableElement>
) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Sorting logic
  const handleSort = useCallback((columnId: string) => {
    if (sortColumn === columnId) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (filtering && filterValue) {
      result = result.filter((row) => {
        return columns.some((col) => {
          const value = typeof col.accessor === 'function' 
            ? col.accessor(row) 
            : row[col.accessor as keyof T];
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }

    // Sort
    if (sorting && sortColumn && sortDirection) {
      const column = columns.find((col) => col.id === sortColumn);
      if (column) {
        result.sort((a, b) => {
          const aValue = typeof column.accessor === 'function' 
            ? column.accessor(a) 
            : a[column.accessor as keyof T];
          const bValue = typeof column.accessor === 'function' 
            ? column.accessor(b) 
            : b[column.accessor as keyof T];
          
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    return result;
  }, [data, columns, filtering, filterValue, sorting, sortColumn, sortDirection]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return processedData.slice(start, end);
  }, [processedData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  // Loading state
  if (loadingState) {
    return (
      <div className={cn('w-full overflow-auto', className)}>
        <table ref={ref} className={cn(tableVariants({ variant }))}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className={cn(tableHeaderVariants({ variant }))}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} columns={columns.length} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (paginatedData.length === 0) {
    return (
      <div className={cn('w-full overflow-auto', className)}>
        <table ref={ref} className={cn(tableVariants({ variant }))}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className={cn(tableHeaderVariants({ variant }))}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                {emptyState || (
                  <div className="text-zen-mist">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No data available</p>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Filter input */}
      {filtering && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className={cn(
              'flex h-10 w-full max-w-sm rounded-md border border-zen-cloud',
              'bg-zen-light px-3 py-2 text-sm',
              'placeholder:text-zen-mist',
              'focus:outline-none focus:ring-2 focus:ring-zen-water focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
          {filterValue && (
            <button
              onClick={() => setFilterValue('')}
              className="text-zen-mist hover:text-zen-ink"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-auto">
        <table ref={ref} className={cn(tableVariants({ variant }))}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    tableHeaderVariants({ variant }),
                    column.sortable && sorting && 'cursor-pointer select-none'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && sorting && handleSort(column.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable && sorting && (
                      <SortIcon
                        direction={sortColumn === column.id ? sortDirection : null}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'transition-colors hover:bg-zen-cloud/5',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => {
                  const value = typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor as keyof T];
                  
                  return (
                    <td key={column.id} className={cn(tableCellVariants({ variant }))}>
                      {column.cell ? column.cell({ row, value }) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zen-mist">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, processedData.length)} of {processedData.length} results
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={cn(
                'inline-flex items-center justify-center rounded-md',
                'h-8 w-8 border border-zen-cloud',
                'hover:bg-zen-cloud/10',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-zen-stone">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className={cn(
                'inline-flex items-center justify-center rounded-md',
                'h-8 w-8 border border-zen-cloud',
                'hover:bg-zen-cloud/10',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Export with proper typing
export const DataTable = forwardRef(DataTableInner) as (<T>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => ReturnType<typeof DataTableInner>) & { displayName?: string };

(DataTable as any).displayName = 'DataTable';

// Export additional table components for flexibility
export { tableVariants, tableHeaderVariants, tableCellVariants };
