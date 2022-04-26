/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
export default function ({ store, redirect, req, router, app: { $axios } }) {
    // 数据访问前缀
    $axios.defaults.baseURL = '/api';
    $axios.timeout = 5000,
        // request拦截器
        $axios.onRequest(config => {


        });
    // response拦截器，数据返回后，可以先在这里进行一个简单的判断
    $axios.interceptors.response.use(
        response => {
            //拦截响应，做统一处理 
            // switch (response.status) {

            // }

            return response
        },
        error => {
            let msg = error.response
            if (msg.status === undefined) {
                console.log('后端未部署');
                // Message({
                // 	showClose: true,
                // 	message: '后端未部署',
                // 	type: "error"
                // });
            } else {
                switch (msg.status) {
                    case 400:
                        console.log('发送数据错误');
                        // Message({
                        // 	showClose: true,
                        // 	message: '发送数据错误',
                        // 	type: "error"
                        // });
                        break;
                    case 480:
                        console.log('登录信息超时，请重新登录!');
                        // MessageBox.alert('登录信息超时，请重新登录!', '登录超时', {
                        // 	confirmButtonText: '跳至登录界面',
                        // 	callback: action => {
                        // 		let url = window.location.href;
                        // 		if (url.indexOf('/admin/login') === -1) {
                        // 			let prefix = process.env.NODE_ENV === "production" ? "/blog" : "";
                        // 			window.location.href = prefix + '/admin/login'
                        // 		}
                        // 	}
                        // })
                        break;
                    case 500:
                        console.log('后端出错');
                        // Message({
                        // 	showClose: true,
                        // 	message: '后端出错',
                        // 	type: "error"
                        // });
                        break;
                }
            }
            return error
        })
}