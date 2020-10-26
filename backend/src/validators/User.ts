import {IsNotEmpty, Length, ValidateIf} from 'class-validator';
import {IsSameValue} from './CustomValidationDecorators'; // 自定义检验装饰器

class UserBody{
    @Length(1, 50, {
        message: '用户名不能为空或者大于50个字符长度'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;
}

export class RegisterBody extends UserBody{
    @ValidateIf(o => o.password)
    // 与 password 比较，必须拥有相同的值 ，自定义验证装饰器
    @IsSameValue('password', {
        message: '两次输入密码不一致'
    })
    rePassword: string;
}
export class LoginBody extends UserBody{
}
