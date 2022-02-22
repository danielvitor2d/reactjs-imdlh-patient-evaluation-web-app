export default function getFormattedDateNow() {
  const current_date = new Date(Date.now()).toLocaleDateString()
  const arr_current_date = current_date.split('/').reverse()
  const formatted_date = `${arr_current_date[0]}-${arr_current_date[1]}-${arr_current_date[2]}`

  return formatted_date
}
