import request from '../utils/request'
import type {
  ILoginParams,
  IDeptSearchParams,
  IDept,
  IUser,
  IMenu,
  ISearchParams,
} from '../types/api'

export default {
  login(params: ILoginParams) {
    return request.post('/login', params)
  },

  //获取部门
  getDeptList(params?: IDeptSearchParams) {
    return request.get<IDept[]>('/dept/list', { params })
  },

  //新增部门
  createDept(params: Partial<IDept>) {
    return request.post('/dept/create', params)
  },
  //更新部门
  updateDept(params: Partial<IDept>) {
    return request.post('/dept/edit', params)
  },
  //更新部门
  deleteDept(params: Partial<{ _id: string }>) {
    return request.post('/dept/delete', params)
  },

  //获取用户列表
  getUserList(params?: IDeptSearchParams) {
    return request.get<IUser[]>('/user/list', { params })
  },
  //获取所有用户列表
  getAllUserList(params?: IDeptSearchParams) {
    return request.get<IUser[]>('/user/all/list', { params })
  },

  //菜单模块
  //获取菜单列表
  getMenuList(params?: Partial<ISearchParams>) {
    return request.get<IMenu[]>('/menu/list', { params })
  },
  //创建菜单
  createMenu(params: Partial<IMenu>) {
    return request.post('/menu/create', params)
  },
  //更新菜单
  updateMenu(params: Partial<IMenu>) {
    return request.post('/menu/edit', params)
  },
  //删除菜单
  deleteMenu(params: Partial<{ _id: string }>) {
    return request.post('/menu/delete', params)
  },
}
