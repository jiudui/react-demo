import {
  AppstoreOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'
import { Menu, type MenuProps } from 'antd'
import { useNavigate } from 'react-router'
import useSiderStore from '../../store'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '/dashboard', icon: <PieChartOutlined />, label: 'dashbord' },
  {
    key: '/users',
    label: '用户推送',
    icon: <MailOutlined />,
    children: [
      { key: '/roleList', label: '角色管理', icon: <MailOutlined /> },
      { key: '/userList', label: '用户管理', icon: <MailOutlined /> },
      { key: '/menuList', label: '菜单管理', icon: <AppstoreOutlined /> },
      { key: '/deptList', label: '部门管理', icon: <AppstoreOutlined /> },
    ],
  },
]
const SiberMenu = () => {
  const { collapsed, currentMenu, setCurrentMenu } = useSiderStore()

  const nav = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    nav(e.key)
    setCurrentMenu(e.key)
  }

  return (
    <div className={styles.navSider}>
      <div className={styles.logo}>
        <img src="/imgs/logo.png" className={styles.img} alt="" />
        <span>企业中台</span>
      </div>
      <Menu
        defaultSelectedKeys={[currentMenu]}
        defaultOpenKeys={['/users']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onClick}
      />
    </div>
  )
}

export default SiberMenu
