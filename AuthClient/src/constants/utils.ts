import { TIME_AGO_LABELS } from './profile'

export const timeAgo = (dateString: string): string => {
  const now = new Date()
  const created = new Date(dateString)
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000)

  if (seconds < 60) return TIME_AGO_LABELS.JUST_NOW
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} ${minutes === 1 ? TIME_AGO_LABELS.MINUTE : TIME_AGO_LABELS.MINUTES} ${TIME_AGO_LABELS.AGO}`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? TIME_AGO_LABELS.HOUR : TIME_AGO_LABELS.HOURS} ${TIME_AGO_LABELS.AGO}`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} ${days === 1 ? TIME_AGO_LABELS.DAY : TIME_AGO_LABELS.DAYS} ${TIME_AGO_LABELS.AGO}`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} ${months === 1 ? TIME_AGO_LABELS.MONTH : TIME_AGO_LABELS.MONTHS} ${TIME_AGO_LABELS.AGO}`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? TIME_AGO_LABELS.YEAR : TIME_AGO_LABELS.YEARS} ${TIME_AGO_LABELS.AGO}`
}
