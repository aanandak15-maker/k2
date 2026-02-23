export const exportToCsv = (filename: string, rows: any[]) => {
    if (!rows || !rows.length) {
        return;
    }

    const separator = ',';
    const keys = Object.keys(rows[0]);

    const csvContent =
        keys.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                // Escape double quotes and enclose in double quotes if it contains a comma or newline or double quote
                cell = cell instanceof Date
                    ? cell.toISOString()
                    : cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(separator);
        }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Helper for exporting multiple sections (e.g., zip or individual files)
// For simplicity, we just trigger multiple downloads
export const exportFullSystemData = (state: any) => {
    if (state.farmers && state.farmers.length > 0) exportToCsv('fpo_farmers_export', state.farmers);
    if (state.orders && state.orders.length > 0) exportToCsv('fpo_sales_orders_export', state.orders);
    if (state.payments && state.payments.length > 0) exportToCsv('fpo_payments_ledger_export', state.payments);
    if (state.inventory && state.inventory.length > 0) exportToCsv('fpo_inventory_export', state.inventory);
    if (state.staff && state.staff.length > 0) exportToCsv('fpo_staff_export', state.staff);
};
