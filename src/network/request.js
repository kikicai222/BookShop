// import axios from 'axios';

// //配置请求的根路径
// // axios.defaults.baseURL = 'http://1.15.74.74:8888/api/private/v1/'
// // axios.interceptors.request.use(config => {
// //   config.headers.Authorization = window.sessionStorage.getItem('token')

// //   return config
// // })
// export function request (config){
//   const instance= axios.create({
//     timeout:5000,
//     baseURL:'http://1.15.74.74:8888/api/private/v1/',
//   })
//   instance.interceptors.request.use(config=>{
//     config.headers.Authorization = window.sessionStorage.getItem('token')
//     return config
//   },error=>{

//   })
//   instance.interceptors.response.use(
//     result=>{
//       return result.data
//     },error=>{
//     console.log(error);})
//   return instance(config)
// }