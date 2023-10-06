import { IRequest } from 'itty-router';

type timesOfDayType = {
  [i: string]: number[] | undefined;
};
const timesOfDay: timesOfDayType = {
  morning: [3, 4, 5, 6, 7, 8, 9, 10],
  day: [11, 12, 13, 14, 15, 16, 17, 18],
  night: [19, 20, 21, 22, 23, 0, 1, 2],
};

/**
 * Get the current hour in the given timezone.
 */
function getLocalHour(timezone: string): number {
  const localized_date = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
  return localized_date.getHours();
}

function timeMatches(timezone: string, condition: string): boolean {
  // eslint-disable-next-line no-console
  console.log(timezone);
  const hour = getLocalHour(timezone);
  const timeRange = timesOfDay[condition] || [];
  return timeRange.includes(hour);
}

/**
 * Return response if current local hour matches the override condition.
 *
 * @returns A redirect response or undefined.
 */
function handleTimeOfDay(request: IRequest, override: OverrideType) {
  const timezone = request?.cf?.timezone as string | undefined;
  if (!timezone) {
    return;
  }

  if (timeMatches(timezone, override.condition)) {
    return Response.redirect(override.location, 302);
  }
}

export default handleTimeOfDay;
