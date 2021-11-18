//check if field exist
export const validateNestedField = (obj, level, ...rest) => {
  if (obj === undefined) return null
  if (rest.length === 0 && obj.hasOwnProperty(level)) return obj[level]
  return validateNestedField(obj[level], ...rest)
}

export default { validateNestedField }