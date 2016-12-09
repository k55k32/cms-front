import dateformat from 'dateformat'

exports.dateformat = (date, format) => {
  return dateformat(new Date(date), format)
}
