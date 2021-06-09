import React from 'react';
import { Drawer } from 'antd';

interface PropsType {
    children: React.ReactNode;
    unfoldMenu: boolean;
    showMobileStyle: boolean;
    setUnfoldMenu: (x: boolean) => void;
}

function ResponseShowDrawer(props: PropsType) {
    const { children, unfoldMenu, showMobileStyle, setUnfoldMenu } = props;
    return (
        <React.Fragment>
            {showMobileStyle ? (
                <Drawer
                    title="Basic Drawer"
                    getContainer={false}
                    mask
                    style={{ position: 'absolute' }}
                    placement={'left'}
                    closable={false}
                    onClose={() => setUnfoldMenu(false)}
                    visible={unfoldMenu}
                    key={'left'}
                >
                    {props.children}
                </Drawer>
            ) : (
                children
            )}
        </React.Fragment>
    );
}

export default ResponseShowDrawer;