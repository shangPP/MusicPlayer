/* 
  用于渲染进程vue中辅助函数 
*/
export const convertDuration = (time) => {
  // 计算分钟
  const minutes = "0" + Math.floor(time / 60);
  // 计算秒
  const second = "0" + Math.floor(time - minutes * 60);
  return minutes.substr(-2) + ":" + second.substr(-2);
};

// "[00:21.35]地面飞鸟掠过" ->["00:21.35", "地面飞鸟掠过"]
export const splitEveryLineLyric = (str) => {
  let index = str.indexOf("]");
  const time = str.slice(0, index + 1);
  const word = str.slice(index + 1);
  return [time, word];
  // return str.split("]");
}
