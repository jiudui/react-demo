import type {
  IPremission,
  IRole,
  IRoleCreateParams,
  IRoleEditParams,
  IRoleSearchParams,
  ResultData,
} from '../types/api'
import request from '../utils/request'

export default {
  //获取角色列表
  getRoleList(params: Partial<IRoleSearchParams>) {
    return request.get<ResultData<IRole>>('/roles/list', params)
  },
  // 删除角色
  deleteRole(params: Partial<{ id: string }>) {
    return request.delete('/roles/delete', params)
  },
  //更新角色权限
  updatePremisssion(params: Partial<IPremission>) {
    return request.put('/roles/update/permission', params)
  },
  //创建角色
  createRole(params: Partial<IRoleCreateParams>) {
    return request.post('/roles/create', params)
  },
  //创建角色
  updateRole(params: Partial<IRoleEditParams>) {
    return request.post('/roles/edit', params)
  },
}
