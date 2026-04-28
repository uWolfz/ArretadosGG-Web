import {
  formatLongDayMonthYearHourMinPtBr,
  formatNumericDateShortYearHourMinPtBr,
  formatWeekdayLongDateTimePtBr,
  formatWeekdayShortDateTimePtBr,
} from "@/lib/format-date";

export function formatTournamentStartsAt(iso: string): string {
  return formatNumericDateShortYearHourMinPtBr(iso);
}

export function formatTournamentStartsAtShort(iso: string): string {
  return formatWeekdayShortDateTimePtBr(iso);
}

export function formatTournamentStartsAtLong(iso: string): string {
  return formatWeekdayLongDateTimePtBr(iso);
}

export function formatTournamentDeadline(iso: string): string {
  return formatLongDayMonthYearHourMinPtBr(iso);
}
