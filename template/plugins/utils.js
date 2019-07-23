export function formatUrl(url, params = {}) {
  let paramArr = []
  for (const key of Object.keys(params)) {
    paramArr.push(key + '=' + params[key])
  }
  if (paramArr.length == 0) {
    return url
  }
  const split = url.indexOf('?') === -1 ? '?' : '&'
  return url + split + paramArr.join('&')
}
