import moment from 'moment'

export default (date) => {
  const a = new Date(date)
  const d = a.getTime() + Math.abs(a.getTimezoneOffset() * 60_000)
  return moment(d).format('DD MMMM, YYYY')
}
