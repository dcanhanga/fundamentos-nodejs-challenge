export function buildRoutePath(path) {
  const routesParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routesParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
}