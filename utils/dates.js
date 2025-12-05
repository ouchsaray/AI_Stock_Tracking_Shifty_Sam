// Utility for generating date ranges for stock API calls

function getDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    
    // Get data for the last 30 days
    startDate.setDate(endDate.getDate() - 30);
    
    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const dates = getDateRange();
