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
// Covers the whole span, so a month inside it with no ride rows has zero rides.
export function ridesByMonth(rows) {
  const totals = new Map();
  for (const row of rows) {
    const month = row.date.slice(0, 7);
    totals.set(month, (totals.get(month) ?? 0) + Number(row.rides));
  }
  if (totals.size === 0) return [];
  const months = [...totals.keys()].sort();
  return span(months[0], months.at(-1)).map((month) => ({
    month,
    rides: totals.get(month) ?? 0,
  }));
}

// Every consecutive year-month key from the first to the last, inclusive.
function span(first, last) {
  const months = [];
  for (let month = first; month <= last; month = nextMonth(month)) {
    months.push(month);
  }
  return months;
}

// The year-month key after the given one: "2026-12" -> "2027-01".
function nextMonth(month) {
  const [year, monthNumber] = month.split("-").map(Number);
  return monthNumber === 12
    ? `${year + 1}-01`
    : `${year}-${String(monthNumber + 1).padStart(2, "0")}`;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Display label for a year-month key: "2026-07" -> "Jul 2026".
export function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return `${MONTH_NAMES[Number(monthNumber) - 1]} ${year}`;
}
