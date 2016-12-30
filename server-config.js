exports.api = 'http://127.0.0.1:8889/'

const proxy = {
  protocol: 'http://',
  host: 'localhost',
  port: 3999
}
exports.proxy = proxy

exports.proxyApi = proxy.protocol + proxy.host + ':' + proxy.port + '/'
