const Koa = require('koa')
const bodyParser = require('koa-body')
const app = new Koa()
const cors = require('@koa/cors')

const posts = require('./routes/posts')

app.use(cors())
app.use(bodyParser())
app.use(posts.routes())

app.listen(3001, () => {
  console.log('Server running at port 3001')
})