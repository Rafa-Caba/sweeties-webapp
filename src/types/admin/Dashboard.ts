export interface DashboardStats {
    userCount: number;
    itemCount: number;

    ordersTotal: number;
    ordersPending: number;
    ordersShipped: number;
    ordersDelivered: number;

    failedEmailsCount: number;

    totalRevenue: number;
}