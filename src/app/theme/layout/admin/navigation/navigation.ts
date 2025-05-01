export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'group-order-management',
    title: 'Order Management',
    type: 'group',
    icon: 'icon-order-management',
    children: [
      {
        id: 'orders-overview',
        title: 'Order Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/orders/overview',
        icon: 'ti ti-shopping-cart',
        breadcrumbs: false
      },
      {
        id: 'order-status',
        title: 'Order Status',
        type: 'item',
        classes: 'nav-item',
        url: '/orders/status',
        icon: 'ti ti-check-circle',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'group-truck-management',
    title: 'Truck Management',
    type: 'group',
    icon: 'icon-truck-management',
    children: [
      {
        id: 'truck-overview',
        title: 'Truck Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/trucks/overview',
        icon: 'ti ti-truck',
        breadcrumbs: false
      },
      {
        id: 'truck-expenses',
        title: 'Truck Expenses',
        type: 'item',
        classes: 'nav-item',
        url: '/trucks/expenses',
        icon: 'ti ti-wallet',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'group-driver-management',
    title: 'Driver Management',
    type: 'group',
    icon: 'icon-driver-management',
    children: [
      {
        id: 'drivers-overview',
        title: 'Driver Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/drivers/overview',
        icon: 'ti ti-user',
        breadcrumbs: false
      },
      {
        id: 'driver-performance',
        title: 'Driver Performance',
        type: 'item',
        classes: 'nav-item',
        url: '/drivers/performance',
        icon: 'ti ti-stats',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'group-expense-management',
    title: 'Expense Management',
    type: 'group',
    icon: 'icon-expense-management',
    children: [
      {
        id: 'expense-overview',
        title: 'Expense Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/expenses/overview',
        icon: 'ti ti-credit-card',
        breadcrumbs: false
      },
      {
        id: 'expense-report',
        title: 'Expense Report',
        type: 'item',
        classes: 'nav-item',
        url: '/expenses/report',
        icon: 'ti ti-file',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'group-trip-tracking',
    title: 'Trip Tracking',
    type: 'group',
    icon: 'icon-trip-tracking',
    children: [
      {
        id: 'trip-overview',
        title: 'Trip Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/trips/overview',
        icon: 'ti ti-map',
        breadcrumbs: false
      },
      {
        id: 'trip-details',
        title: 'Trip Details',
        type: 'item',
        classes: 'nav-item',
        url: '/trips/details',
        icon: 'ti ti-map-pin',
        breadcrumbs: false
      }
    ]
  }
];
