export function formatDate(date: string) {
  const current_date = new Date(date)
  return current_date.toLocaleDateString('pt-br')
}

export function getAge(birth_date: string) {
  const current_year = new Date().getFullYear()
  return current_year - new Date(birth_date).getFullYear()
}