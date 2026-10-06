// Summaries of ride rows: [{ date, city, rides }, ...] with rides as strings or numbers.

export function totalRides(rows) {
  return rows.reduce((sum, row) => sum + Number(row.rides), 0);
}

// Total rides per city, sorted by city name.
export function ridesByCity(rows) {
  const totals = new Map();
  for (const row of rows) {
    totals.set(row.city, (totals.get(row.city) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([city, rides]) => ({ city, rides }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

// Total rides per month across all cities, keyed by ISO year-month and sorted chronologically.
export function ridesByMonth(rows) {
  const totals = new Map();
  for (const row of rows) {
    const month = row.date.slice(0, 7);
    totals.set(month, (totals.get(month) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([month, rides]) => ({ month, rides }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Display label for a year-month key: "2026-07" -> "Jul 2026".
export function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return `${MONTH_NAMES[Number(monthNumber) - 1]} ${year}`;
}
