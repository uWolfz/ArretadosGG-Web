const monthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

const shortMonthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  year: "numeric",
});

const dayMonthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dayMonthHourMinFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const dayMonthYearHourMinFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const longDayMonthYearHourMinFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const numericDateShortYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const hourMinFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

const weekdayShortDateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const weekdayLongDateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR");

export function formatMonthYearPtBr(iso: string): string {
  return monthYearFormatter.format(new Date(iso));
}

export function formatDayMonthYearPtBr(iso: string): string {
  return dayMonthYearFormatter.format(new Date(iso));
}

export function formatDayMonthHourMinPtBr(iso: string): string {
  return dayMonthHourMinFormatter.format(new Date(iso));
}

export function formatDayMonthYearHourMinPtBr(iso: string): string {
  return dayMonthYearHourMinFormatter.format(new Date(iso));
}

export function formatLongDayMonthYearHourMinPtBr(iso: string): string {
  return longDayMonthYearHourMinFormatter.format(new Date(iso));
}

export function formatShortDatePtBr(iso: string): string {
  return shortDateFormatter.format(new Date(iso));
}

export function formatNumericDateShortYearHourMinPtBr(iso: string): string {
  const d = new Date(iso);
  return `${numericDateShortYearFormatter.format(d)} · ${hourMinFormatter.format(d)}`;
}

export function formatWeekdayShortDateTimePtBr(iso: string): string {
  return weekdayShortDateTimeFormatter.format(new Date(iso));
}

export function formatWeekdayLongDateTimePtBr(iso: string): string {
  return weekdayLongDateTimeFormatter.format(new Date(iso));
}

export function formatShortMonthYearRangePtBr(
  fromIso: string,
  toIso: string,
): string {
  const fmt = (iso: string) =>
    shortMonthYearFormatter.format(new Date(iso)).replace(".", "");
  return `${fmt(fromIso)} — ${fmt(toIso)}`;
}

export function formatCountdownFromNow(iso: string): string | null {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalMinutes = Math.floor(diff / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  if (days > 30) return null;
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  if (days >= 1) return `em ${days}d ${hours}h`;
  if (hours >= 1) return `em ${hours}h ${minutes}m`;
  if (minutes >= 1) return `em ${minutes}m`;
  return "começando";
}
