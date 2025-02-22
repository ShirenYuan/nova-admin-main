/** 不同请求服务的环境配置 */
export const serviceConfig: Record<ServiceEnvType, Record<string, string>> = {
  dev: {
    // url: 'https://mock.apifox.cn/m1/4071143-0-default',
    url: 'http://localhost:3000',
    // url: 'http://novenest:3000',
  },
  test: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
  prod: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
}
