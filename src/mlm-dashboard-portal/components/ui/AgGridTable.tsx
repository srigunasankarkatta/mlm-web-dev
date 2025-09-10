import React, { useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  RowSelectedEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

// Import ag-grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/agGridAlpineFont.css";

// Import custom styles
import styles from "./AgGridTable.module.scss";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

export interface AgGridTableProps {
  // Data
  rowData: any[];

  // Column definitions
  columnDefs: ColDef[];

  // Grid options
  gridOptions?: Partial<GridOptions>;

  // Callbacks
  onGridReady?: (event: GridReadyEvent) => void;
  onRowSelected?: (event: RowSelectedEvent) => void;
  onCellClicked?: (event: any) => void;
  onRowDoubleClicked?: (event: any) => void;

  // Styling
  className?: string;
  height?: string | number;
  width?: string | number;

  // Features
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableFloatingFilter?: boolean;
  enableSelection?: boolean;
  enableResizing?: boolean;
  enableColumnMoving?: boolean;

  // Pagination
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];

  // Selection
  selectionType?: "single" | "multiple";
  selectedRows?: any[];

  // Loading
  loading?: boolean;

  // Custom components
  customComponents?: any;
}

const AgGridTable: React.FC<AgGridTableProps> = ({
  rowData,
  columnDefs,
  gridOptions = {},
  onGridReady,
  onRowSelected,
  onCellClicked,
  onRowDoubleClicked,
  className = "",
  height = 500,
  width = "100%",
  enablePagination = false,
  enableSorting = true,
  enableFiltering = false,
  enableFloatingFilter = false,
  enableSelection = false,
  enableResizing = true,
  enableColumnMoving = true,
  paginationPageSize = 25,
  paginationPageSizeSelector = [10, 25, 50, 100],
  selectionType = "single",
  selectedRows = [],
  loading = false,
  customComponents = {},
}) => {
  const gridRef = useRef<AgGridReact>(null);

  // Default grid options
  const defaultGridOptions: GridOptions = useMemo(
    () => ({
      // Pagination
      pagination: enablePagination,
      paginationPageSize: paginationPageSize,
      paginationPageSizeSelector: enablePagination
        ? paginationPageSizeSelector
        : undefined,

      // Sorting
      defaultColDef: {
        sortable: enableSorting,
        filter: enableFiltering,
        resizable: enableResizing,
        floatingFilter: enableFloatingFilter,
        minWidth: 100,
        flex: 1,
      },

      // Selection
      rowSelection: enableSelection ? selectionType : undefined,
      suppressRowClickSelection: !enableSelection,

      // Column features
      suppressColumnMove: !enableColumnMoving,
      suppressColumnResize: !enableResizing,

      // Performance
      rowBuffer: 10,
      rowModelType: "clientSide",

      // Styling
      headerHeight: 56,
      rowHeight: 64,

      // Loading
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">Loading...</span>',
      overlayNoRowsTemplate:
        '<span class="ag-overlay-no-rows-center">No data available</span>',

      // Events
      onGridReady,
      onRowSelected,
      onCellClicked,
      onRowDoubleClicked,

      // Components
      components: customComponents,
    }),
    [
      enablePagination,
      paginationPageSize,
      paginationPageSizeSelector,
      enableSorting,
      enableFiltering,
      enableFloatingFilter,
      enableSelection,
      enableResizing,
      enableColumnMoving,
      selectionType,
      onGridReady,
      onRowSelected,
      onCellClicked,
      onRowDoubleClicked,
      customComponents,
    ]
  );

  // Merge custom grid options with defaults
  const finalGridOptions = useMemo(
    () => ({
      ...defaultGridOptions,
      ...gridOptions,
    }),
    [defaultGridOptions, gridOptions]
  );

  // Handle row selection
  const handleRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      if (onRowSelected) {
        onRowSelected(event);
      }
    },
    [onRowSelected]
  );

  // Handle grid ready
  const handleGridReady = useCallback(
    (event: GridReadyEvent) => {
      // Ensure the grid API is available
      if (event.api) {
        console.log("Grid API ready:", event.api);
      }
      if (onGridReady) {
        onGridReady(event);
      }
    },
    [onGridReady]
  );

  // Handle cell click
  const handleCellClicked = useCallback(
    (event: any) => {
      if (onCellClicked) {
        onCellClicked(event);
      }
    },
    [onCellClicked]
  );

  // Handle row double click
  const handleRowDoubleClicked = useCallback(
    (event: any) => {
      if (onRowDoubleClicked) {
        onRowDoubleClicked(event);
      }
    },
    [onRowDoubleClicked]
  );

  // Set selected rows when prop changes
  React.useEffect(() => {
    if (
      gridRef.current &&
      gridRef.current.api &&
      enableSelection &&
      selectedRows.length > 0
    ) {
      gridRef.current.api.setRowSelection(selectedRows);
    }
  }, [selectedRows, enableSelection]);

  // Set loading state
  React.useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      if (loading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [loading]);

  return (
    <div
      className={`${styles.agGridContainer} ag-theme-alpine ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: typeof width === "number" ? `${width}px` : width,
      }}
    >
      {rowData && columnDefs ? (
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={finalGridOptions}
          onGridReady={handleGridReady}
          onRowSelected={handleRowSelected}
          onCellClicked={handleCellClicked}
          onRowDoubleClicked={handleRowDoubleClicked}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading grid...</div>
        </div>
      )}
    </div>
  );
};

export default AgGridTable;
