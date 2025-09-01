# MLM Dashboard Portal

A comprehensive MLM (Multi-Level Marketing) dashboard portal built with React, TypeScript, and ag-Grid for efficient data management and visualization.

## Features

### 🎯 **Dashboard Components**
- **Overview**: Main dashboard with key metrics, stats cards, and recent activity
- **Statistics**: Detailed analytics with performance metrics and demographics
- **Recent Activity**: Activity timeline with filters and comprehensive tracking

### 👥 **User Management**
- **All Users**: Complete user management with ag-grid table
- **Network Tree**: Network hierarchy visualization with tree/list views
- **User Stats**: Performance analytics and user insights

### 📦 **Package Management**
- **All Packages**: Package management with detailed feature cards
- **Package Configuration**: MLM package setup and management

### ⚙️ **Rule Sets**
- **All Rules**: Rule management system for commissions and business rules
- **Commission Structure**: Configurable commission and bonus rules

### 🔧 **Advanced Features**
- **ag-Grid Integration**: High-performance data tables with sorting, filtering, and pagination
- **Custom Cell Renderers**: Specialized components for different data types
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **TypeScript**: Full type safety and IntelliSense support

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mlm-dashboard-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Dependencies

### Core Dependencies
- **React 18.2.0**: Modern React with hooks and concurrent features
- **TypeScript 5.2.2**: Type-safe JavaScript development
- **ag-Grid 30.2.1**: Enterprise-grade data grid (stable version)

### UI Framework
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **Vite 5.0.8**: Fast build tool and dev server

### ag-Grid Packages
```json
{
  "ag-grid-community": "^30.2.1",
  "ag-grid-react": "^30.2.1",
  "ag-grid-enterprise": "^30.2.1"
}
```

## Usage

### Basic Ag-Grid Table

```tsx
import AgGridTable from '../components/ui/AgGridTable';
import { ColDef } from 'ag-grid-community';

const MyComponent = () => {
  const columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Status', field: 'status' }
  ];

  const rowData = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
  ];

  return (
    <AgGridTable
      rowData={rowData}
      columnDefs={columnDefs}
      height={500}
      enablePagination={true}
      enableSorting={true}
      enableFiltering={true}
    />
  );
};
```

### Custom Cell Renderers

```tsx
// User Avatar Cell
const UserAvatarCell = ({ value, data }) => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-sm font-medium text-blue-600">
        {value.split(' ').map(n => n[0]).join('')}
      </span>
    </div>
    <div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{data.email}</div>
    </div>
  </div>
);

// Use in column definition
{
  headerName: 'User',
  field: 'name',
  cellRenderer: UserAvatarCell,
  width: 250
}
```

### Advanced Configuration

```tsx
<AgGridTable
  rowData={data}
  columnDefs={columns}
  height={600}
  enablePagination={true}
  enableSorting={true}
  enableFiltering={true}
  enableSelection={true}
  enableResizing={true}
  enableColumnMoving={true}
  paginationPageSize={25}
  paginationPageSizeSelector={[10, 25, 50, 100]}
  selectionType="multiple"
  onGridReady={handleGridReady}
  onRowSelected={handleRowSelected}
  onCellClicked={handleCellClicked}
  customComponents={{
    // Custom components
  }}
/>
```

## Component Architecture

### UI Components
```
src/mlm-dashboard-portal/components/ui/
├── AgGridTable.tsx          # Main ag-grid wrapper
├── UserAvatarCell.tsx       # User avatar cell renderer
├── StatusBadgeCell.tsx      # Status badge cell renderer
└── ActionsCell.tsx          # Action buttons cell renderer
```

### Feature Components
```
src/mlm-dashboard-portal/features/
├── dashboard/
│   ├── Overview.tsx         # Dashboard overview
│   ├── Statistics.tsx       # Analytics dashboard
│   └── RecentActivity.tsx   # Activity timeline
├── user-management/
│   ├── AllUsers.tsx         # User management with ag-grid
│   └── NetworkTree.tsx      # Network visualization
├── package-management/
│   └── AllPackages.tsx      # Package management
└── rule-sets/
    └── AllRules.tsx         # Rule management
```

## Ag-Grid Features

### Built-in Functionality
- ✅ **Sorting**: Click column headers to sort
- ✅ **Filtering**: Built-in filters for each column
- ✅ **Pagination**: Configurable page sizes
- ✅ **Column Resizing**: Drag column borders to resize
- ✅ **Column Moving**: Drag columns to reorder
- ✅ **Row Selection**: Single or multiple row selection
- ✅ **Export**: Built-in export functionality
- ✅ **Keyboard Navigation**: Full keyboard support

### Performance Features
- **Virtual Scrolling**: Handles large datasets efficiently
- **Row Buffering**: Optimized rendering for smooth scrolling
- **Lazy Loading**: Load data on demand
- **Column Virtualization**: Efficient column rendering

### Customization
- **Cell Renderers**: Custom cell content and styling
- **Header Components**: Custom header styling and behavior
- **Row Components**: Custom row styling and interactions
- **Theme Support**: Multiple built-in themes

## Styling

### Tailwind CSS Integration
The portal uses Tailwind CSS for consistent styling:

```tsx
// Example styling classes
className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
```

### Ag-Grid Themes
Available themes:
- `ag-theme-alpine` (default)
- `ag-theme-balham`
- `ag-theme-material`

### Custom CSS
```css
/* Custom ag-grid styling */
.ag-header-cell-custom {
  background-color: #f8fafc;
  font-weight: 600;
}

.ag-cell-custom {
  padding: 8px;
}
```

## Best Practices

### Performance
1. **Use useMemo for column definitions** to prevent unnecessary re-renders
2. **Implement proper filtering** at the data level when possible
3. **Use row virtualization** for large datasets
4. **Optimize cell renderers** to avoid expensive operations

### Data Management
1. **Implement proper state management** for large datasets
2. **Use pagination** for better performance
3. **Implement server-side operations** for very large datasets
4. **Cache filtered results** when appropriate

### User Experience
1. **Provide clear feedback** for user actions
2. **Implement loading states** for async operations
3. **Use consistent styling** across all components
4. **Provide keyboard shortcuts** for power users

## Troubleshooting

### Common Issues

1. **Grid not rendering**
   - Check if ag-grid CSS is imported
   - Verify column definitions are correct
   - Ensure rowData is not undefined

2. **Performance issues**
   - Reduce column count for large datasets
   - Implement proper filtering
   - Use row virtualization

3. **Styling conflicts**
   - Check Tailwind CSS conflicts
   - Verify ag-grid theme is applied
   - Use CSS specificity to override styles

### Debug Mode
Enable debug mode for development:

```tsx
<AgGridTable
  // ... other props
  gridOptions={{
    debug: true
  }}
/>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the ag-Grid documentation
- Review the component examples
- Open an issue in the repository

## Version History

- **v1.0.0**: Initial release with ag-grid integration
- **v1.1.0**: Added custom cell renderers and advanced features
- **v1.2.0**: Performance optimizations and additional components

---

Built with ❤️ using React, TypeScript, and ag-Grid
