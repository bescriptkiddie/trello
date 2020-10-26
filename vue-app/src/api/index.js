import axios from 'axios'
import TMessage from '../components/TMessage/TMessage';
axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;
// 利用axios的拦截器拦截一些ajax的错误
axios.interceptors.response.use( response =>{
    return response
}, error => {
    // console.dir(error);
    let {message,errorDetails} = error.response.data
    if(errorDetails){
        message+=':'+ errorDetails
    }
    TMessage.error(message);
    throw error
})

// 注册
export const register = data =>{
    return axios({
        method:'post',
        url:'/user/register',
        data
    })
}

