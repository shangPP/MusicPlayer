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
