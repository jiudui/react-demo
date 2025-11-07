import request from '../utils/request'
import { ILoginParams } from '../types/api'

export default {
  login(params: ILoginParams) {
    return request.post('/login', params)
  },
}
