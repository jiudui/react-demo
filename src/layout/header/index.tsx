import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import styles from './index.module.less'
import storage from '../../utils/storage'
import useSiderStore from '../../store'

export default function Header() {
  const { collapsed, updateCollapsed } = useSiderStore()

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱asdfa.com',
    },
    {
      key: 'logout',
      label: '退出',
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      // 退出登录的逻辑
      storage.remove('token')
      window.location.href = '/login'
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => updateCollapsed()}
          />
        </div>
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>
            欢迎您，<em>asdfa.com</em>
          </span>
        </Dropdown>
      </div>
    </div>
  )
}
