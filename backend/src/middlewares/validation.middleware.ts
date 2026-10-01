export function validationDetails(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  return error.issues.map((issue) => ({ campo: issue.path.join('.'), mensaje: issue.message }));
}
