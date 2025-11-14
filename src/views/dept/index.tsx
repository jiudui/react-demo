import { Button, Space, Table, Form, Input, Modal } from 'antd'
// import styles from './index.module.less'
import type { TableColumnsType } from 'antd'
import api from '../../api'
import type { IDept } from '../../types/api'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils/index'
import CreateDept, { CreateDeptRef } from './CreateDept'

export default function Dept() {
  const deptRef = useRef<CreateDeptRef>(null)
  const [deptData, setDeptData] = useState<IDept[]>([])

  useEffect(() => {
    getDeptData()
  }, [])
  const getDeptData = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setDeptData(data)
  }

  const [form] = Form.useForm()
  const handleSubCreate = (id: string) => {
    deptRef.current?.openModal('create', { parentId: id })
  }

  const handleEdit = (id: string) => {
    deptRef.current?.openModal('edit', { parentId: id })
  }

  const handleDelete = (id: string) => {
    console.log('删除', id)
    Modal.confirm({
      title: '删除部门',
      content: '此操作将永久删除该部门，是否继续？',
      okText: '确认',
      cancelText: '取消',

      onOk: async () => {
        handleDelOk(id)
      },
    })
  }

  const handleDelOk = async (id: string) => {
    await api.deleteDept({ _id: id })
    getDeptData()
  }

  const columns: TableColumnsType<IDept> = [
    { title: '部门名称', dataIndex: 'deptName', key: 'deptName', width: 200 },
    { title: '负责人', dataIndex: 'userName', key: 'userName' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => formatDate(new Date(text)),
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
    getDeptData()
  }

  const handleCreateDept = () => {
    deptRef.current?.openModal('create')
  }

  return (
    <div>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="部门名称" name="deptName">
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getDeptData}>
            查询
          </Button>
          <Button type="primary" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="wrap-tatle">
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreateDept}>
              新增
            </Button>
          </div>
        </div>
        <Table<IDept>
          rowKey="id"
          columns={columns}
          expandable={{}}
          dataSource={deptData}
        />
      </div>
      <CreateDept ref={deptRef} update={getDeptData} />
    </div>
  )
}
