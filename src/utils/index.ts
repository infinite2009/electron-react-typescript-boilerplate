import DynamicObject from '@/interfaces/dynamic-object';

/*
 * 获取 app 启动参数
 * return null or object
 */
export function getStartUpParams() {
  // 先从参数数组里边过滤出来启动桌面端 app 时传入的启动参数
  const paramsArr = process.argv.filter((item: string) => {
    return item.includes('=');
  });

  if (!paramsArr || !paramsArr.length) {
    return null;
  }

  // 以键值对形式输出启动参数结果，方便取用
  const result: DynamicObject = {};

  paramsArr.forEach((item: string) => {
    const kvPair = item.split('=');
    result[kvPair[0]] = kvPair[1];
  });

  return result;
}
