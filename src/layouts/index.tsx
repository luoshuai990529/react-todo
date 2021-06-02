import {useEffect,useState} from 'react'
import {history} from 'umi'
import './index.less'
import {TITLE} from '@/utils/constant'
import LOGO from '@/assets/avatar.png'
import { Menu, Row, Col } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

interface PropsType {
  children: React.ReactNode;
}

export default function LayoutPro(props: PropsType) {
  const { children } = props;
  const [currentMenu,setCurrentMenu] = useState('/home')
  useEffect(()=>{
      document.title = TITLE
  },[])

  const menuClick = (v:{key:string,keyPath:Array<string>})=>{
    history.push(v.key)
    setCurrentMenu(v.key)
  }
  return (
    <div className='layout-container' style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="layout-header">
            {/* <div className="logo"></div> */}
            <Row >
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                    Col
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                    Col
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                    Col
                </Col>
            </Row>
            <img className='logo' src={LOGO} alt="" />
            <div className="title">{TITLE}</div>
            <div className="menu">
                <Menu 
                    theme={'dark'} 
                    style={{height:"40"}}
                    onClick={(v)=>menuClick(v)} 
                    selectedKeys={[currentMenu]}
                    mode="horizontal">
                    <Menu.Item key="/home" icon={<MailOutlined />}>
                        HOME
                    </Menu.Item>
                    <Menu.Item key="/todo"  icon={<AppstoreOutlined />}>
                        TODO
                    </Menu.Item>
                </Menu>
            </div>
        </div>
        <div className="layout-content">
            {children}
        </div>
    </div>
  );
}
