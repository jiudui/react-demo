import { Button, Space, Table, Form, Input, Modal, Select } from 'antd'
// import styles from './index.module.less'
import type { TableColumnsType } from 'antd'
import api from '../../api'
import type { IMenu } from '../../types/api'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils/index'
import CreateMenu, { CreateMenuRef } from './CreateMenu'
export default function Menu() {
  const menuRef = useRef<CreateMenuRef>(null)
  const [menuData, setMenuData] = useState<IMenu[]>([])

  useEffect(() => {
    getMenuData()
  }, [])
  const getMenuData = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setMenuData(data)
  }

  const [form] = Form.useForm()
  const handleSubCreate = (id: string) => {
    menuRef.current?.openModal('create', { parentId: id })
  }

  const handleEdit = (id: string) => {
    menuRef.current?.openModal('edit', { parentId: id })
  }

  const handleDelete = (id: string) => {
    console.log('删除', id)
    Modal.confirm({
      title: '删除菜单',
      content: '此操作将永久删除该菜单，是否继续？',
      okText: '确认',
      cancelText: '取消',

      onOk: async () => {
        handleDelOk(id)
      },
    })
  }

  const handleDelOk = async (id: string) => {
    await api.deleteMenu({ _id: id })
    getMenuData()
  }

  const columns: TableColumnsType<IMenu> = [
    { title: '菜单名称', dataIndex: 'menuName', key: 'menuName', width: 200 },
    { title: '菜单图标', dataIndex: 'icon', key: 'icon' },
    { title: '菜单类型', dataIndex: 'menuType', key: 'menuType' },
    { title: '菜单类型', dataIndex: 'menuType', key: 'menuType' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      //       render:
      //         (text) => {
      //         return [
      //           1: '菜单'
      //           2: '按钮'
      //           3: '页面'
      //         ][text]
      // },
    },
    { title: '权限标识', dataIndex: 'menuCode', key: 'menuCode' },
    { title: '路由地址', dataIndex: 'path', key: 'path' },
    { title: '组件名称', dataIndex: 'component', key: 'component' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
                handleSubCreate(record.id)
              }}
            >
              新增
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record.id)
              }}
            >
              编辑
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

  const handleReset = () => {
    form.resetFields()
    getMenuData()
  }

  const handleCreateMenu = () => {
    menuRef.current?.openModal('create')
  }

  return (
    <div>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="菜单名称" name="menuName">
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="菜单状态" name="menuName">
          <Select placeholder="请选择菜单状态">
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={2}>禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getMenuData}>
            查询
          </Button>
          <Button type="primary" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="wrap-tatle">
        <div className="header">
          <div className="title">菜单列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreateMenu}>
              新增
            </Button>
          </div>
        </div>
        <Table<IMenu>
          rowKey="id"
          columns={columns}
          expandable={{}}
          dataSource={menuData}
        />
      </div>
      <CreateMenu ref={menuRef} update={getMenuData} />
    </div>
  )
}
