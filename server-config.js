const isProd = process.env.NODE_ENV === 'production';

exports.isProd = isProd

exports.api = isProd ?
    'http://42.96.203.79:8080/' :
    'http://42.96.203.79:8080/'
    // 'http://127.0.0.1:8889/'

const proxy = {
  protocol: 'http://',
  host: isProd ? '42.96.203.79' : 'localhost',
  port: 3999
}
exports.proxy = proxy

exports.proxyApi = proxy.protocol + proxy.host + ':' + proxy.port + '/'
