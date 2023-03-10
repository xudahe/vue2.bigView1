//登陆信息
const loginModule = {
  loginModule: {
    url: 'GNPS/api/YW/login',
    method: 'post'
  },
  GetServerToken: {
    url: 'ArcGISServer/api/GISServer/GetGISToken',
    method: 'get'
  },
}

const ApiSetting = {
  ...loginModule,
}

export default ApiSetting