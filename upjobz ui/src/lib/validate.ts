export const isNullOrEmpty = (value: unknown): value is null | undefined | '' | [] => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  )
}
