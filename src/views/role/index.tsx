/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  type TableColumnsType,
} from 'antd'
import type { IRole, IRoleSearchParams } from '../../types/api'
import { formatDate } from '../../utils/index'
import { useRef } from 'react'
import api from '../../api/roleApi'
import { useAntdTable } from 'ahooks'
import CreateRole from './CreateRole'
import type { CreateRoleRef } from './CreateRole'
import SetPermission from './SetPermission'
import type { SetPermissionRef } from './SetPermission'

export default function Role() {
  const [form] = Form.useForm()
  const roleRef = useRef<CreateRoleRef>(null)
  const preRef = useRef<SetPermissionRef>(null)

  const getRoleData = async (
    {
      current,
      pageSize,
    }: {
      current: number
      pageSize: number
    },
    formData: IRoleSearchParams,
  ) => {
    return api
      .getRoleList({ ...formData, pageNum: current, pageSize })
      .then((res: any) => {
        return {
          list: res.data,
          total: res.page.total,
        }
      })
  }

  const { tableProps, search } = useAntdTable(getRoleData, {
    form,
    defaultPageSize: 10,
  })

  const handleSetPermission = () => {
    preRef.current?.openModal('create')
  }

  const handleEdit = (id: string) => {
    roleRef.current?.openModal('edit', { parentId: id })
  }

  const handleDelete = (id: string) => {
    console.log('删除', id)
    Modal.confirm({
      title: '删除菜单',
      content: '此操作将永久删除该菜单，是否继续？',
      okText: '确认',
      cancelText: '取消',

      onOk: async () => {
        await api.deleteRole({ id })
        Modal.success({
          title: '删除成功',
        })
        search.submit()
      },
    })
  }

  const columns: TableColumnsType<IRole> = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
    { title: '备注', dataIndex: 'remarks', key: 'remarks' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => formatDate(new Date(text)),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record.id)
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleSetPermission()
              }}
            >
              设置权限
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(record.id)
              }}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  const handleCreateRole = () => {
    roleRef.current?.openModal('create')
  }

  return (
    <div className="role-wrap">
      <Form form={form} className="search-form" layout="inline">
        <Form.Item name="roleName" label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={search.submit}>
              查询
            </Button>
            <Button onClick={search.reset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="wrap-tatle">
        <div className="header">
          <div className="title">角色列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreateRole}>
              新增
            </Button>
          </div>
        </div>
        <Table<IRole>
          rowKey="id"
          columns={columns}
          expandable={{}}
          {...tableProps}
        />
      </div>
      {/* 创建菜单 */}

      <CreateRole ref={roleRef} update={search.submit} />
      <SetPermission ref={preRef} update={search.submit} />
    </div>
  )
}
