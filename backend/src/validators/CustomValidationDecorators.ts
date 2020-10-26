// 一个自定义装饰器！！

import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

export function IsSameValue(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isSameValue",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            // 验证方法
            validator: {
                validate(value: any, validationArguments: ValidationArguments): Promise<boolean> | boolean {
                    // 根据上面的属性名称获取对应的值
                    const relatedValue = (validationArguments.object as any)[property];
                    console.log(relatedValue)
                    // 比较当前装饰器装饰属性值与传入的第一个参数的值是否相同
                    return relatedValue === value;
                }
            }
        });
    };
}
