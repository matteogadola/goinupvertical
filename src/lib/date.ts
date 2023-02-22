import dayjs from 'dayjs'
import 'dayjs/locale/it'
import utc from 'dayjs/plugin/utc'

dayjs.locale('it')
dayjs.extend(utc)

export function getReadableDate(date: string, capitalize = true) {
  const data = dayjs(date).format('dddd DD MMMM')

  return capitalize ? `${data.charAt(0).toUpperCase()}${data.slice(1)}` : data

  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  //return dayjs(date).format('ddd DD MMMM').charAt(0).toUpperCase();
}

export function getSubOpeningDate(date: string) {
  return dayjs(date).subtract(20, 'days').format('dddd DD MMMM YYYY')
}

export function getDate(date: string) {
  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  return dayjs(date).format('DD MMM')
}

export function getTime(date: string) {
  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  return dayjs(date).format('ddd HH:mm')
}

export const dt = dayjs