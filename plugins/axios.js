/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import { Message } from "element-ui";
import { MessageBox } from "element-ui";
export default function ({store, route, redirect, $axios,req}) {
    // Request拦截器：设置Token
    $axios.onRequest((config) => {
      // TODO 使用Vuex存储Token，并做持久化处理
      // config.headers.common['X-Token'] = store.state.token
    })
    // Error拦截器：出现错误的时候被调用，根据状态码做对应判断并显示全局Message
    $axios.onError((error) => {
      // console.log('erro statusr =', error.response.status);
      switch (parseInt(error.response.status)) {
        case 400: Message({
					showClose: true,
					message: '发送数据错误',
					type: "error"
        });
          break;
        case 402: Message({
					showClose: true,
					message: '江湖中查无此人！',
					type: "error"
        });
          break;
          // 密码错误
				case 403: Message({
					showClose: true,
					message: '密令错误！',
					type: "error"
				});
					break;
            // 密码错误
				case 405: Message({
					showClose: true,
					message: '口令错误！',
					type: "error"
				});
					break;
				case 480: // 未登录
          console.log('480!!');
          redirect(redirectURL(route,req))

          // route.replace('/admin/login')
					// MessageBox.alert('登录信息超时，请重新登录!', '登录超时', {
					// 	confirmButtonText: '跳至登录界面',
					// 	callback: action => {
          //     window.location.href = '/admin/login'
					// 		// let url = window.location.href;
					// 		// if (url.indexOf('/admin/login') === -1) {
					// 		// 	let prefix = process.env.NODE_ENV === "production" ? "/blog" : "";
					// 		// 	window.location.href = prefix + '/admin/login'
					// 		// }
					// 	}
					// })
					break;
				case 500: Message({
					showClose: true,
					message: '后端出错',
					type: "error"
				}); break;
			}
    })
    // Response拦截器：对正常返回的数据进行处理
    $axios.onResponse((response) => {
      return response.data 
    })
  }

// 获取重定向地址
const redirectURL = (route,req) => {
  // 客户端
  if(process.client) {
      return '/admin/login'
  } else{
    return '/admin/login'
  }
 
}