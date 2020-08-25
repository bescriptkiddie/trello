import {Controller, Get, Params, Query, Post, Body, Header} from 'koa-ts-controllers';
import {IsNumberString} from 'class-validator'
import Boom from '@hapi/Boom'
class GetUserQuery {
    @IsNumberString()
    page:number
}

@Controller('/test')
class TestController {

    @Get('/hello')
    async hello(a: any) {
        console.log(a.b)
        return 'Hello Test!';
    }

    @Get('/user/:id(\\d+)') // 利用正则验证id是否是number, \\d 就是判断是否为数字
    async getUser(
        // @Params() p: {id:number} // p是自己定的
        @Params('id') id: number
    ) {
        // return `当前params中的用户id是${p.id}`
        return `当前params中的用户id是${id}`
    }

    @Get('/user')
    async getUser2(
        @Query() q: { id: number }
    ) {
        return `当前params中的用户id是${q.id}`
    }

    @Post('/user')
    async postUser(
        @Body() body: {
            name: string,
            password: string
        }, @Header() h: any
    ) {
        console.log('header:', h)
        let data = JSON.stringify(body)
        return `当前提交的数据是${data}`
    }
    @Get('/users')
    async getUsers(
        @Query() q: GetUserQuery
    ){
        // 业务逻辑出现错误,比如用户不存在,用户名已经被注册
        if(true){
            throw Boom.notFound('注册失败','用户名已经存在')
        }
        return `传过来的query:${q}`
    }
}
