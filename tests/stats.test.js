import { test } from "node:test";
import assert from "node:assert/strict";
import { totalRides, ridesByCity, ridesByMonth, formatMonth } from "../site/src/stats.js";

const rows = [
  { date: "2026-07-01", city: "Miami", rides: "10" },
  { date: "2026-07-01", city: "Boston", rides: "20" },
  { date: "2026-07-02", city: "Boston", rides: 30 },
];

test("totalRides sums the rides column", () => {
  assert.equal(totalRides(rows), 60);
});

test("ridesByCity totals per city in alphabetical order", () => {
  assert.deepEqual(ridesByCity(rows), [
    { city: "Boston", rides: 50 },
    { city: "Miami", rides: 10 },
  ]);
});

test("ridesByMonth totals rides across cities per month in chronological order", () => {
  const unordered = [
    { date: "2026-09-03", city: "Miami", rides: "5" },
    { date: "2026-07-01", city: "Miami", rides: "10" },
    { date: "2026-07-01", city: "Boston", rides: 20 },
    { date: "2026-08-15", city: "Denver", rides: "7" },
    { date: "2026-07-02", city: "Boston", rides: 30 },
  ];
  assert.deepEqual(ridesByMonth(unordered), [
    { month: "2026-07", rides: 60 },
    { month: "2026-08", rides: 7 },
    { month: "2026-09", rides: 5 },
  ]);
});

test("ridesByMonth returns an empty array for no ride rows", () => {
  assert.deepEqual(ridesByMonth([]), []);
});

test("formatMonth labels a single-digit month with its abbreviated name and year", () => {
  assert.equal(formatMonth("2026-07"), "Jul 2026");
});

test("formatMonth labels December", () => {
  assert.equal(formatMonth("2027-12"), "Dec 2027");
});

test("ridesByMonth sums ride counts given as strings and as numbers", () => {
  assert.deepEqual(
    ridesByMonth([
      { date: "2026-07-01", city: "Boston", rides: "4" },
      { date: "2026-07-02", city: "Boston", rides: 6 },
    ]),
    [{ month: "2026-07", rides: 10 }],
  );
});
