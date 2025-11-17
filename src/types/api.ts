export interface ResultData<T> {
  list: T[]
  page: {
    pageNum: number | 0
    pageSize: number
    total: number
  }
}

export interface ILoginParams {
  username: string
  password: string
}

export interface IDeptSearchParams {
  deptName?: string
}

export interface IDept {
  id: string
  createTime: string
  updateTime: string
  deptName: string
  parentId: string
  useName: string
  children: IDept[]
}

//用户列表
export interface IUser {
  id: string
  userId: string
  userName: string
  userEmail: string
  deptId: string
  deptName: string
  state: number
  mobile: string
  job: string
  role: string
  roleList: string[]
  createId: string
  userImg: string
}

//菜单模块

//搜索参数
export interface ISearchParams {
  menuName?: string
  menuState?: number
}

//创建菜单参数
export interface ICreateParams {
  menuName: string // 菜单名称
  icon?: string // 菜单图标
  path: string // 菜单路径
  menuType: number // 菜单类型 1-菜单 2-按钮 3-页面
  menuCode: string // 菜单权限
  parentId?: string // 上级菜单ID
  component?: string // 组件名称
  menuStatus: number // 菜单状态 1-启用 0-禁用
}

export interface IUpdateParams extends ICreateParams {
  id: string
}

export interface IMenu extends ICreateParams {
  id: string
  createTime: string
  buttons?: IMenu[] // 按钮权限
  children?: IMenu[]
}

export interface IPageParams {
  pageNum: number
  pageSize: number
}

export interface IRole {
  id: string
  roleName: string
  remark: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
  createTime: string
  updateTime: string
}

export interface IRoleSearchParams extends IPageParams {
  roleName: string
}

export interface IRoleCreateParams {
  roleName: string
  remark: string
}

export interface IRoleEditParams extends IRoleCreateParams {
  id: string
}
export interface IPremission {
  id: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
}
