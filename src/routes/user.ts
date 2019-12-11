
import * as KoaRouter from 'koa-router'
import * as Koa from 'koa'
const myrouter = new KoaRouter()
const method = methodType => path => {
  return (target, property, descriptor) => {
    myrouter[methodType](path, ctx => {
      // 这里有上下文，对接口进行校验
      const params = methodType === 'get' ? ctx.query : ctx.request.body
      if (Number(params.id)||Number(params.id)===0) {
        descriptor.value(ctx)
      } else {
        ctx.body = {
          result: false,
          status: 200,
          message: '请输入合法的ID'
        }
      }
    })
  }
}
const get = method('get')
const post = method('post')

const userList = [
  {
    name: 'tom',
    id: 0
  }
]
export class User {
  @get('index')
  index(ctx: Koa.Context) {
    ctx.redirect('/pages/login.html');
  }
  @post('/adduser')
  addOne(ctx: Koa.Context) {
    let params = ctx.request.body
    const tar = userList.filter(obj => {
      return obj.id == params.id
    })
    if (tar.length) {
      ctx.body = {
        result: false,
        status: 200,
        message: `已有ID为${params.id}的人`
      }
    } else {
      const newUser = {
        name: params.name,
        id: params.id
      }
      userList.push(newUser)
      ctx.body = {
        result: true,
        status: 200,
        message: '新增成功'
      }
    }
  }

  @get('/finduser')
  findOne(ctx: Koa.Context) {
    const params = ctx.query.id
    const tar = userList.filter(obj => {
      return obj.id == params
    })
    if (tar.length) {
      ctx.body = {
        result: true,
        data: tar[0]
      }
    } else {
      ctx.body = {
        result: false,
        data: {},
        message: `未找到编号为${params}的人`
      }
    }
  }
}

export const router = myrouter