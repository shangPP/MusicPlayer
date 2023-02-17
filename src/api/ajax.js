/*
 * ajax请求函数模块
 * 返回值：promise对象(异步返回的数据是: response.data)
 * */
// import axios from "axios";
const axios = require("axios");

function ajax(url, data = {}, type = "GET") {
  return new Promise(function (resolve, reject) {
    //    执行异步ajax请求
    let promise;
    if (type === "GET") {
      // 准备 url query 参数数据
      let dataStr = ""; // 数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送 get 请求
      promise = axios.get(url);
    } else {
      // 发送 post 请求
      promise = axios.post(url, data);
    }
    promise
      .then(function (response) {
        //  成功了调用resolve()
        resolve(response.data);
      })
      .catch(function (error) {
        //  失败了调用reject()
        reject(error);
      });
  });
}

// function jsonp(url) {
//   return new Promise((resolve, reject) => {
//     // 这里的 "jsonCallBack" ，和调用的 jsonp 的 url 中的 callback 值相对应（见粗体字）
//     global.jQuery19108001866002482712_1600062977462 = (result) => {
//       resolve(result)
//     }
//     const JSONP = document.createElement('script');
//     JSONP.type = 'text/javascript';
//     JSONP.src = url;
//     document.getElementsByTagName('head')[0].appendChild(JSONP);
//     setTimeout(() => {
//       document.getElementsByTagName('head')[0].removeChild(JSONP)
//     }, 500)

//   })

// }

module.exports = {
  ajax,
  // jsonp,
}
