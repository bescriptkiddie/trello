import {
    Table,
    Column,
    Model,
    AutoIncrement,
    AllowNull,
    DataType,
    Unique,
    PrimaryKey,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';

const crypto = require('crypto')

@Table({
    tableName: 'User',
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false) //不为空
    @Unique // 唯一
    @Column({
        type: DataType.STRING(50)
    })
    name: string;

    @Column
    set password(val: string) {
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(`${val}`).digest('hex');
        this.setDataValue('password', newPassword); // 最后把数据存到数据库中
    }

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
