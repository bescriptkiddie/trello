import Vue from 'vue';
import TMessage from './TMessage.vue';

// 将对象变成构造函数

const TMessageClass = Vue.extend(TMessage);

/*
* 工厂函数
*   创建一个TMessage组件对象
*   管理TMessage组件对象队列
* */

let instances = [];

function Message(data) {
    data = data || {};
    if (typeof data === 'string') {
        data = {
            message: data,
        };
    }
    data.onClose = function() {
        // console.log('onClose');
        Message.close(instance);
    };
    let instance = new TMessageClass({
        data,
    });
    instance.$mount(); // 调用了$mount之后TMessage组件才会被渲染 => $el -> 组件根节点
    // console.log(instance.$el);
    document.body.appendChild(instance.$el);

    let offset = data.offset || 20;
    let offsetTop = offset;

    instances.forEach(item => {
        offsetTop += item.$el.offsetHeight + offset;
    });
    instance.$el.style.top = offsetTop + 'px';
    instances.push(instance);
}
// 批量添加一些扩展
['info','success','error','warning'].forEach(type =>{
    Message[type] = data =>{
        if (typeof data === 'string') {
            data = {
                message: data,
            };
        };
        data.type = type
        return Message(data)
        // return Message({
        //     ...data,
        //     type
        // })
    }
})


// 关闭box
Message.close = function(instance) {
    /*
    *  获取当前这个instance的高度
    *  把这个instance后面的所有实例的top减去这个高度,再减去偏移
    * */
    let removeHeight = instance.$el.offsetHeight + instance.offset;
    let index = instances.findIndex(item => item === instance); // 找在数组中对应的下标
    instances = instances.filter(item => item !== instance); // 过滤掉当前实例
    // 下表以下的box都要往上走
    for (let i = index; i < instances.length; i++) {
        instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) -
            removeHeight + 'px';
    }
};
export default Message;
