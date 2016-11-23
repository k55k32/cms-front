import ws from 'ws'
import watch from 'node-watch'
function jsTemp (port) {
  return `<script>
  function initWebsocket() {
    var ws = new window.WebSocket('ws://localhost:${port}')
    ws.onmessage = ({ data }) => {
      console.log(data)
      if (data === 'reload') {
        location.reload()
      }
    }
    ws.onclose = () => {
      setTimeout(() => { initWebsocket() }, 300)
    }
  }
  initWebsocket()
  </script>
  `
}
let connect = 0
let clients = []

function sendToAll() {
  clients.forEach(ws => {
    if (ws.readyState === 1) ws.send('reload')
  })
}

function createWs(port) {
  const wsServer = ws.Server({ port: port })
  wsServer.on('connection', ws => {
    clients.push(ws)
    if (connect === 0) {
      connect++
      sendToAll()
    }
  })
}

function filter (pattern, fn) {
  return function(filename) {
    if (pattern.test(filename)) {
      fn(filename)
    }
  }
}

export default ({port, app, watchs = []}) => {
  createWs(port)
  if (watchs.length) {
    watch('./', filename => {
        watchs.forEach(prefix => {
          if (filename.endsWith(prefix)) {
            sendToAll()
            return false
          }
        })
    })
  }
  
  return (req, res, next) => {
    res.render = (path) => {
      app.render(path,
        { locals: app.locals },
        (err, str) => {
          let send = str + jsTemp(port)
          res.send(send)
        }
      )
    }
    next()
  }
}
