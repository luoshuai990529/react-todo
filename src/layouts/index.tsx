import { useEffect, useState } from 'react';
import { history } from 'umi';
import './index.less';
import { TITLE } from '@/utils/constant';
import LOGO from '@/assets/avatar.png';
import { Menu, Row, Col } from 'antd';
import { SnippetsOutlined, BankOutlined, FormOutlined } from '@ant-design/icons';

interface PropsType {
    children: React.ReactNode;
}

export default function LayoutPro(props: PropsType) {
    const { children } = props;
    const [currentMenu, setCurrentMenu] = useState<string>(history.location.pathname);
    useEffect(() => {
        document.title = TITLE;
    }, []);

    const menuClick = (v: { key: string; keyPath: Array<string> }) => {
        if (history.location.pathname.indexOf(v.key) !== -1) {
            return;
        }
        history.push(v.key);
        setCurrentMenu(v.key);
    };
    return (
        <div className="layout-container" style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="layout-header">
                <Row align="middle" justify="space-around" style={{ width: '100%' }}>
                    <Col xs={0} md={3} lg={2} xl={2} push="1">
                        <img className="logo" src={LOGO} alt="" />
                    </Col>
                    <Col xs={20} md={7} lg={6} xl={4}>
                        <div className="title">{TITLE}</div>
                    </Col>
                    <Col xs={4} md={14} lg={16} xl={18}>
                        <div className="menu">
                            <Menu theme={'dark'} style={{ height: '40' }} onClick={(v) => menuClick(v)} selectedKeys={[currentMenu]} mode="horizontal">
                                {/* <Menu.Item key="/home" icon={<BankOutlined />}>
                                    HOME
                                </Menu.Item>
                                <Menu.Item key="/todo" icon={<SnippetsOutlined />}>
                                    TODO
                                </Menu.Item>
                                <Menu.Item key="/notes" icon={<FormOutlined />}>
                                    NOTES
                                </Menu.Item> */}
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="layout-content">{children}</div>
        </div>
    );
}
