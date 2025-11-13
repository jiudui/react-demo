import { Layout } from 'antd'
import styles from './index.module.less'
import { Outlet } from 'react-router'
import NavHeader from './header/index'
import Footer from './footer/index'
import useSiderStore from '../store'
import SibelMenu from './menu/index'

const { Sider } = Layout

export default function AppLayout() {
  const { collapsed } = useSiderStore()
  return (
    <Layout style={{ height: `100vh` }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SibelMenu />
      </Sider>
      <Layout>
        <NavHeader />
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <Footer></Footer>
        </div>
      </Layout>
    </Layout>
  )
}
