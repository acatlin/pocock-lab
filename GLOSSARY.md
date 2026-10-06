# Rides dashboard

A static site that summarises daily ride counts for a handful of cities, so a
reader can compare activity by city and over time.

## Language

**Ride row**:
One record of the dataset: the number of rides in one city on one date.
_Avoid_: entry, record, data point

**City**:
A place rides are counted for, identified by its name.
_Avoid_: location, region

**Month**:
A calendar month in a specific year, such as July 2026. July 2026 and July 2027
are different months.
_Avoid_: period

**Span**:
The run of consecutive months from the earliest to the latest month that has a
ride row. Every month in the span counts, including months with no ride rows.
_Avoid_: range, date range

**Rides**:
The total number of rides across a set of ride rows, such as all rows for one
city or one month.
_Avoid_: count, volume, trips
