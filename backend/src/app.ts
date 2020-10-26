import configs from './configs'
import Koa, {Context, Next} from 'koa'
import {bootstrapControllers} from 'koa-ts-controllers'
import KoaRouter from 'koa-router'
import KoaBodyParser from 'koa-bodyparser'
import Boom from '@hapi/Boom'
import path from "path";
import {Sequelize} from "sequelize-typescript";
import jwt from 'jsonwebtoken'

(async () => {
    const app = new Koa();
    const router = new KoaRouter();
    // 连接数据库
    const db = new Sequelize({
        ...configs.database,
        models: [__dirname + '/models/**/*']
    });

    // 统一处理头信息 -> 将token信息保存进来
    app.use( async (ctx :Context,next:Next)=>{
        let token = ctx.headers['authorization'];
        if(token){
            ctx.userInfo = jwt.verify(token,configs.jwt.privateKey) as UserInfo
        }
        await next()
    })

    // 注册路由组件
    await bootstrapControllers(app, {
        // router:router, -> 同名可省略
        router,
        basePath: '/api',
        versions: [1],
        // 注意这里的格式
        controllers: [
            __dirname + '/controllers/**/*'
        ],
        errorHandler: async (err: any, ctx: Context) => {
            // console.log(err)
            let status = 500;
            let body: any = {
                statusCode: status,
                error: "Internal Server error",
                message: "An internal server error occurred"
            };
            if (err.output) {
                status = err.output.statusCode
                body = {...err.output.payload}
                if (err.data) {
                    body.errorDetails = err.data
                }
            }
            ctx.status = status;
            ctx.body = body;
        }
    });

    router.all('/', async ctx => {
        throw Boom.notFound('没有该路由~')
    })

    app.use(KoaBodyParser())
    app.use(router.routes())
    app.listen(configs.server.port, configs.server.host, () => {
        console.log(`服务启动成功:http://${configs.server.host}:${configs.server.port}`)
    })
})();
