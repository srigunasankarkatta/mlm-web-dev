import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { Transaction } from "../api-services";
import styles from "./TransactionsTable.module.scss";

interface TransactionsTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onTransactionSelect?: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  loading = false,
  onTransactionSelect,
}) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  // Column definitions for AG Grid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Transaction ID",
        field: "transaction_id",
        width: 150,
        pinned: "left",
        cellRenderer: (params: any) => (
          <span className={styles.transactionId}>{params.value}</span>
        ),
      },
      {
        headerName: "Type",
        field: "type",
        width: 120,
        cellRenderer: (params: any) => {
          const type = params.value;
          const typeClass = styles[`type-${type}`] || styles.typeDefault;
          return (
            <span className={`${styles.typeBadge} ${typeClass}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          );
        },
      },
      {
        headerName: "Amount",
        field: "amount",
        width: 120,
        cellRenderer: (params: any) => (
          <span className={styles.amount}>
            ₹{parseFloat(params.value).toFixed(2)}
          </span>
        ),
      },
      {
        headerName: "Status",
        field: "status",
        width: 120,
        cellRenderer: (params: any) => {
          const status = params.value;
          const statusClass =
            styles[`status-${status}`] || styles.statusDefault;
          return (
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
      {
        headerName: "Package",
        field: "package.name",
        width: 150,
        cellRenderer: (params: any) => (
          <div className={styles.packageInfo}>
            <span className={styles.packageName}>{params.value}</span>
            <span className={styles.packageLevel}>
              Level {params.data.package.level_unlock}
            </span>
          </div>
        ),
      },
      {
        headerName: "Payment Method",
        field: "payment_method",
        width: 140,
        cellRenderer: (params: any) => {
          const method = params.value;
          const methodClass =
            styles[`method-${method}`] || styles.methodDefault;
          return (
            <span className={`${styles.methodBadge} ${methodClass}`}>
              {method.replace("_", " ").toUpperCase()}
            </span>
          );
        },
      },
      {
        headerName: "Description",
        field: "description",
        width: 200,
        cellRenderer: (params: any) => (
          <span className={styles.description} title={params.value}>
            {params.value}
          </span>
        ),
      },
      {
        headerName: "Date",
        field: "created_at",
        width: 150,
        cellRenderer: (params: any) => {
          const date = new Date(params.value);
          return (
            <div className={styles.dateInfo}>
              <span className={styles.date}>{date.toLocaleDateString()}</span>
              <span className={styles.time}>
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  // Default column properties
  const defaultColDef: ColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );

  // Grid ready handler
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  // Row selection handler
  const onRowClicked = (event: any) => {
    if (onTransactionSelect) {
      onTransactionSelect(event.data);
    }
  };

  // Export functions
  const exportToCsv = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `transactions-${new Date().toISOString().split("T")[0]}.csv`,
      });
    }
  };

  const exportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: `transactions-${new Date().toISOString().split("T")[0]}.xlsx`,
      });
    }
  };

  return (
    <div className={styles.transactionsTableContainer}>
      {/* Table Actions */}
      <div className={styles.tableActions}>
        <div className={styles.tableInfo}>
          <h3>Transactions</h3>
          <span className={styles.transactionCount}>
            {transactions.length} transactions
          </span>
        </div>
        <div className={styles.exportButtons}>
          <button
            className={styles.exportButton}
            onClick={exportToCsv}
            disabled={!gridApi || transactions.length === 0}
          >
            Export CSV
          </button>
          <button
            className={styles.exportButton}
            onClick={exportToExcel}
            disabled={!gridApi || transactions.length === 0}
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* AG Grid */}
      <div className={`ag-theme-alpine ${styles.agGridContainer}`}>
        <AgGridReact
          rowData={transactions}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          rowSelection="single"
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 15, 20]}
          loading={loading}
          overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Loading transactions...</span>"
          overlayNoRowsTemplate="<span class='ag-overlay-no-rows-center'>No transactions found</span>"
          suppressRowClickSelection={false}
          rowClass={styles.tableRow}
          headerHeight={40}
          rowHeight={45}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
