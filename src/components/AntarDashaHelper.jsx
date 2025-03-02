export const digital_root1 = (n) => {
    // Base case: if the number is less than 10, return the number
    if (n < 10) {
        return n;
    }

    // Convert the number to a string to extract individual digits
    let digits = n.toString().split('').map(Number);

    // Calculate the sum of the digits
    let sum = digits.reduce((acc, curr) => acc + curr, 0);

    // Recursively call digital_root1 with the sum until it's a single-digit number
    return digital_root1(sum);
};

export const digital_root = (n) => {
    if (isNaN(n) || n === undefined) return 0; // Prevent infinite recursion

    if (n < 10) {
        return n;
    }

    let digits = n.toString().split('').map(Number);
    let sum = digits.reduce((acc, curr) => acc + curr, 0);

    return digital_root(sum);
};

export const compareWithToday = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component for accurate comparison

    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0); // Remove time component

    return givenDate >= today;
};

export const getYearBasedOnDate = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component for accurate comparison

    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0); // Remove time component

    return givenDate > today ? today.getFullYear()-1 : today.getFullYear();
};

const formatDate = (date) => {
    // Format date as 'YYYY-MM-DD'
    return date ? date.toISOString().split('T')[0] : '';
};

export const getYesterdayNextYear = (antarDashaValue, date) => {
    const nextYear = date.getFullYear() + 1; // Get next year

    // Ensure yesterday's date does not go out of bounds
    let newDate = new Date(nextYear, date.getMonth(), date.getDate());
    newDate.setDate(newDate.getDate() - 1); // Move back one day safely

    // Return the antarDash object with the necessary values
    return { 
        antarDashaValue, 
        antarDashaFromYear: formatDate(date), // Original date
        antarDashaToYear: formatDate(newDate), // New date (next year, previous day)
    };
};

export const getHalfYear = (date) => {
    const year = date.getFullYear();
    const halfYear = (year > 1999) 
        ? (year - 2000).toString().padStart(2, '0') 
        : (year - 1900).toString().padStart(2, '0');

    console.log("????? date, halfYear ", date, halfYear);
    return parseInt(halfYear, 10); // Ensure it returns a number, not a string
};
