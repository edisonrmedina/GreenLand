export default function Validation(formData) {
  const errors = {}

  if (!/^[A-Za-z\s]+$/.test(formData.name) || formData.name.trim() === "") {
    errors.name = "You must enter a valid name"
  }

  if (formData.name.length > 90) {
    errors.name = "You cannot exceed 90 characters"
  }

  if (formData.genre === "None") {
    errors.genre = "You must select one option"
  }

  if (!/^\d+$/.test(formData.phone_number)) {
    errors.phone_number = "Please enter a phone number"
  }

  if (formData.country === "None") {
    errors.country = "You must select a country"
  }

  if (formData.address.length > 90) {
    errors.address = "You cannot exceed 90 characters"
  }

  if (formData.address.length === 0) {
    errors.address = "You must enter a valid address"
  }

  if (formData.birth_date) {
    const hoy = new Date()
    const cumpleanos = new Date(formData.birth_date)
    const edad = hoy.getFullYear() - cumpleanos.getFullYear()
    const m = hoy.getMonth() - cumpleanos.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--
    }
    if (edad < 18) {
      errors.birth_date = "You must be at least 18 years old"
    }
    if (edad > 90) {
      errors.birth_date = "You cannot be older than 90 years"
    }
  }

  return errors
}
