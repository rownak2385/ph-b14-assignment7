const banglaDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatBanglaDate(date = new Date()): string {
  return banglaDateFormatter.format(date);
}

