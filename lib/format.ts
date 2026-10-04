export const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T12:00:00Z`));
