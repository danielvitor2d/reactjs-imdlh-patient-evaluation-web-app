import moment from "moment";

export function calculateAge(from: string) {
  const birth = moment(from);
  const now = moment(new Date());
  const duration = moment.duration(now.diff(birth));
  const age = duration.asYears().toFixed(0);
  return age
}