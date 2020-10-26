import {
    Controller,
    Post,
    Body,
    Ctx,
} from 'koa-ts-controllers';
import {RegisterBody, LoginBody} from '../validators/User';
import {User as UserModel} from '../models/User';
import Boom from "@hapi/Boom";
import {Context} from "koa";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configs from '../configs/index';


@Controller('/user')
export class UserController {
    /*
    * 用户注册
    * */
    @Post('/register')
    async register(
        @Ctx() ctx: Context,
        @Body() body: RegisterBody
    ) {
        let {name, password} = body;
        // 验证数据库中是否已经存在要注册的用户
        // SELECT `id`, `name`, `password`, `createdAt`, `updatedAt` FROM `User` AS `User` WHERE `User`.`name` = 'Lily74';
        let user = await UserModel.findOne({
            where: {
                name
            }
        })
        console.log(user) // 没有注册的时候 user == null
        if (user) {
            throw Boom.conflict('注册失败', '用户名已经被注册')
        }
        let newUser = new UserModel()
        newUser.name = name;
        newUser.password = password;
        // 同步数据库
        // INSERT INTO `User` (`id`,`name`,`password`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);
        await newUser.save()
        ctx.status = 201
        return {
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt
        }
    }

    /*
    * 用户登录
    * */
    @Post('/login')
    async login(
        @Ctx() ctx: Context,
        @Body() body: LoginBody
    ) {
        let {name, password} = body; //  获取到的password是明文的,需要转换成md5
        let user = await UserModel.findOne({
            where: {name}
        });
        let md5 = crypto.createHash('md5')
        password = md5.update(password).digest('hex')
        if (password !== user.password) {
            throw Boom.forbidden('登录失败', '密码错误或者用户不存在')
        }
        let userInfo = {
            id: user.id,
            name: user.name,
        }
        let token = jwt.sign(userInfo,configs.jwt.privateKey)
        // console.log(token)
        // 设置头信息
        ctx.set('authorization',token)
        return userInfo
    }
}
