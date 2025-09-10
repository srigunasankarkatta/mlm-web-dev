import React, { useState, useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { FiEye, FiEdit2, FiUser, FiDollarSign, FiCreditCard, FiArrowUp, FiArrowDown, FiRefreshCw } from "react-icons/fi";
import AgGridTable from "../../../components/ui/AgGridTable";
import ServerPagination from "../../../components/ui/ServerPagination";
import type {
  AdminWalletTransactionsParams,
  AdminWalletTransaction,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWalletTransactions,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletTransactions.module.scss";

const AdminWalletTransactions: React.FC = () => {
  const {
    formatCurrency,
    getTransactionTypeIcon,
    getTransactionTypeColor,
    getWalletTypeIcon,
  } = useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [filters, setFilters] = useState<
    Partial<AdminWalletTransactionsParams>
  >({});

  const transactions = useAdminWalletTransactions(filters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
    setFilters({ ...filters, type: type || undefined, page: 1 });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFilters({ ...filters, category: category || undefined, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setFilters({ ...filters, status: status || undefined, page: 1 });
  };

  const handleDateFilter = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
    setFilters({
      ...filters,
      from_date: from || undefined,
      to_date: to || undefined,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCategory("");
    setSelectedStatus("");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({ ...filters, page });
  };

  // Column definitions for AgGrid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "User",
        field: "user_name",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <FiUser className={styles.userIcon} />
              </div>
              <div className={styles.userDetails}>
                <h4>{transaction.user_name}</h4>
                <p>{transaction.user_email}</p>
              </div>
            </div>
          );
        },
        width: 200,
        pinned: "left",
      },
      {
        headerName: "Wallet",
        field: "wallet_display_name",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className={styles.walletInfo}>
              <div className={styles.walletIcon}>
                <FiDollarSign className={styles.walletIconSvg} />
              </div>
              <span>{transaction.wallet_display_name}</span>
            </div>
          );
        },
        width: 150,
      },
      {
        headerName: "Type",
        field: "type",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          const getTypeIcon = (type: string) => {
            switch (type) {
              case 'credit':
              case 'transfer_in':
                return <FiArrowUp className={styles.typeIconSvg} />;
              case 'debit':
              case 'transfer_out':
                return <FiArrowDown className={styles.typeIconSvg} />;
              default:
                return <FiRefreshCw className={styles.typeIconSvg} />;
            }
          };
          
          return (
            <div className={styles.transactionType}>
              <div className={styles.typeIcon}>
                {getTypeIcon(transaction.type)}
              </div>
              <span className={styles.typeLabel}>
                {transaction.type.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          );
        },
        width: 120,
      },
      {
        headerName: "Amount",
        field: "amount",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          const isCredit = transaction.type === 'credit' || transaction.type === 'transfer_in';
          return (
            <div className={styles.amountInfo}>
              <span className={`${styles.amount} ${isCredit ? styles.credit : styles.debit}`}>
                {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>
          );
        },
        width: 120,
      },
      {
        headerName: "Balance",
        field: "balance_after",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className={styles.balanceInfo}>
              <span className={styles.balanceAfter}>
                {formatCurrency(transaction.balance_after)}
              </span>
              <span className={styles.balanceBefore}>
                Before: {formatCurrency(transaction.balance_before)}
              </span>
            </div>
          );
        },
        width: 150,
      },
      {
        headerName: "Reference",
        field: "reference_id",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className={styles.referenceId}>
              {transaction.reference_id}
            </span>
          );
        },
        width: 150,
      },
      {
        headerName: "Description",
        field: "description",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className={styles.description}>
              {transaction.description}
            </span>
          );
        },
        width: 200,
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className={`${styles.status} ${styles[transaction.status]}`}>
              {transaction.status}
            </span>
          );
        },
        width: 100,
      },
      {
        headerName: "Date",
        field: "created_at",
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className={styles.transactionDate}>
              {new Date(transaction.created_at).toLocaleString()}
            </span>
          );
        },
        width: 150,
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: () => {
          return (
            <div className={styles.actions}>
              <button className={styles.actionButton} title="View Details">
                <FiEye className={styles.actionIcon} />
              </button>
              <button className={styles.actionButton} title="Edit Transaction">
                <FiEdit2 className={styles.actionIcon} />
              </button>
            </div>
          );
        },
        width: 120,
        pinned: "right",
        sortable: false,
        filter: false,
      },
    ],
    [formatCurrency, getTransactionTypeIcon, getWalletTypeIcon, styles]
  );

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export transactions");
  };

  if (!transactions || transactions.isLoading) {
    return (
      <div className={styles.transactionsList}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (!transactions || transactions.error) {
    return (
      <div className={styles.transactionsList}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error Loading Transactions</h3>
          <p>
            There was an error loading the transaction data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const transactionData = transactions?.data?.transactions || [];
  const pagination = transactions?.data?.pagination;

  // Debug logging
  console.log("AdminWalletTransactions Debug:", {
    transactions,
    transactionData,
    pagination,
    isLoading: transactions?.isLoading,
    error: transactions?.error,
  });

  return (
    <div className={styles.transactionsList}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by reference ID or description..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Type</label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="transfer_in">Transfer In</option>
            <option value="transfer_out">Transfer Out</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Categories</option>
            <option value="direct_income">Direct Income</option>
            <option value="level_income">Level Income</option>
            <option value="club_income">Club Income</option>
            <option value="auto_pool">Auto Pool</option>
            <option value="admin_credit">Admin Credit</option>
            <option value="admin_debit">Admin Debit</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>From Date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateFilter(e.target.value, dateTo)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>To Date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => handleDateFilter(dateFrom, e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterActions}>
          <button
            onClick={handleClearFilters}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </button>
          <button onClick={handleExport} className={styles.exportButton}>
            <i className="icon-download"></i>
            Export CSV
          </button>
        </div>
      </div>

      {/* AgGrid Table */}
      <div className={styles.tableContainer}>
        <AgGridTable
          rowData={transactionData}
          columnDefs={columnDefs}
          loading={transactions?.isLoading || false}
          enablePagination={false}
          enableSorting={true}
          enableFiltering={false}
          enableSelection={false}
          height={600}
          className={styles.agGridTable}
        />
      </div>

      {/* Server-side Pagination */}
      {pagination && pagination.total > 0 && (
        <ServerPagination
          currentPage={currentPage}
          totalPages={pagination.last_page}
          totalItems={pagination.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          loading={transactions?.isLoading || false}
        />
      )}
    </div>
  );
};

export default AdminWalletTransactions;
