/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
export default function ({ store, redirect, app: { $axios } }) {
    // Request拦截器：设置Token
    $axios.onRequest((config) => {
      // TODO 使用Vuex存储Token，并做持久化处理
      // config.headers.common['X-Token'] = store.state.token
    })
    // Error拦截器：出现错误的时候被调用，根据状态码做对应判断并显示全局Message
    $axios.onError((error) => {
      console.log(error);
    })
    // Response拦截器：对正常返回的数据进行处理
    $axios.onResponse((response) => {
      return response.data 
    })
  }