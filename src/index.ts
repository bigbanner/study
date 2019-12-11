
import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as server from 'koa-static'
import * as path from 'path'

const app = new Koa()
app.use(server(path.join(__dirname, './static')))
import * as bodyParser from 'koa-bodyparser'
app.use(bodyParser());
import { router } from './routes/user'
app.use(router.routes())
app.listen(3000)
