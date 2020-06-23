import originAxios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default function axios(option, baseurl, pureRes) { //purRes: Boolean 表示请求获取的返回值是否是完整的response，默认false，返回给response.data
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({
      baseURL: baseurl,
      // baseURL: '/api',
      timeout: 15000
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(config => {
      // console.log('来到了request拦截success中');
      // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

      // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
      const isToken = (config.headers || {}).isToken === false
      if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }

      // 3.对请求的参数进行序列化(看服务器是否需要序列化)
      // config.data = qs.stringify(config.data)
      // console.log(config);

      // 4.等等

      let url = config.url
        // get参数编码
      if (config.method === 'get' && config.params) {
        url += '?'
        let keys = Object.keys(config.params)
        for (let key of keys) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
        url = url.substring(0, url.length - 1)
        config.params = {}
      }
      config.url = url

      return config
    }, err => {;
      return err
    })

    instance.interceptors.response.use(res => {
      const code = res.data.code || 200;
      // console.log(code);
      // 获取错误信息
      const message = res.data.message
      if (code === 401) {
        MessageBox.confirm(
          '登录状态已过期，请重新登录',
          '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (code === 500) {
        Message.error(message);
        return Promise.reject(new Error(message))
      } else if (code !== 200 && code !== 20000) {//临时加的20000判断，到时候后台对接时需要改回来
        Message.error(message);
        return Promise.reject('error')
      }

      if (pureRes) {
        return res;
      }
      return res.data
    }, err => {
      console.log('来到了response拦截failure中');
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            Message.error((err.message));
            break
          case 401:
            MessageBox.confirm(
              '登录状态已过期，是否重新登录',
              '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            })
            break
          case 403:
            err.message = '没有操作权限,请联系管理员！'
            Message.error(err.message);
            break
          case 500:
            err.message = '请求被拒绝'
            Message.error(err.message);
            break
        }
      }
      return Promise.reject(new Error(err.message))
    })

    // 2.传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
