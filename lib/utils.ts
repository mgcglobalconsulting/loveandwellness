import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getNextFriday7PM(): Date {
  const now = new Date();
  const eastern = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const dayOfWeek = eastern.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  const nextFriday = new Date(eastern);
  nextFriday.setDate(eastern.getDate() + daysUntilFriday);
  nextFriday.setHours(19, 0, 0, 0);
  return nextFriday;
}

export function getNextWebinarTime(): Date {
  const now = new Date();
  const eastern = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const hour = eastern.getHours();

  // Sessions run every 2 hours from 9AM–9PM EST
  const sessionHours = [9, 11, 13, 15, 17, 19, 21];
  const nextHour = sessionHours.find((h) => h > hour);

  const nextSession = new Date(eastern);
  if (nextHour) {
    nextSession.setHours(nextHour, 0, 0, 0);
  } else {
    // Next day at 9AM
    nextSession.setDate(eastern.getDate() + 1);
    nextSession.setHours(9, 0, 0, 0);
  }
  return nextSession;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
