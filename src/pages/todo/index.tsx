import React, { useEffect, useRef, useState } from 'react';
// import {Motion, spring,presets} from 'react-motion';
import './index.less';
import { Tooltip, Badge, Collapse, Drawer } from 'antd';
import { MenuOutlined, PlusOutlined, MessageOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { configResponsive, useResponsive, useFullscreen, useSize } from 'ahooks';
import TodaySvg from '@/art/todaySvg';
import SundrySvg from '@/art/sundrySvg';
import PreviewSvg from '@/art/previewSvg';
import ExtendSvg from '@/art/extendSvg';
import ArrowRightSvg from '@/art/arrowRightSvg';
import { TODO_MENU_MAP } from '@/utils/constant';
import ResponseShowDrawer from './component/response-show-drawer';
import TabSundry from './component/tab-sundry/index';
const { Panel } = Collapse;

configResponsive({
    small: 0,
    middle: 768,
});

const unfoldmenuTips = <span>展开菜单</span>;
const addtaskTips = <span>快速添加一个任务</span>;
const fullTips = <span>全屏展示</span>;

const projectList = [
    {
        name: '智鸽服务',
        projectId: 10086,
        color: 'green',
        showChildren: false,
        childrens: [
            { parentId: 10086, name: '1-高德地图', projectId: 10087, color: '#0094ff' },
            { parentId: 10086, name: '1-拖拽组件', projectId: 10088, color: 'hotpink' },
        ],
    },
    { name: '微服务中台', projectId: 10000, color: 'geekblue' },
];

export default function IndexPage() {
    const menuRef = useRef(null);
    const todoContainerRef = useRef(null);
    const responsive = useResponsive(); // 页面响应式数据
    const [isFullscreen, { setFull, exitFull }] = useFullscreen(todoContainerRef); // 全屏hooks
    const [unfoldMenu, setUnfoldMenu] = useState(responsive.middle); // 展开菜单
    const [startDrag, setStartDrag] = useState(false); // 是否正在拖拽
    const [menuWidth, setMenuWidth] = useState(210); // 菜单宽度
    const [secMenu, setSecMenu] = useState(TODO_MENU_MAP.SUNDRY); // 选择菜单
    const [projectMenu, setProjectList] = useState(projectList); // 项目列表

    const [showMobileStyle, setShowMobileStyle] = useState(!responsive.middle);

    useEffect(() => {
        const isMobile = !responsive.middle;
        setShowMobileStyle(isMobile);
        setUnfoldMenu(!isMobile);
        isMobile ? setMenuWidth(0) : setMenuWidth(210);
    }, [responsive.middle]);

    //  展开收起菜单
    const unfoldMenuHandle = () => {
        setUnfoldMenu(!unfoldMenu);
        unfoldMenu ? setMenuWidth(0) : setMenuWidth(210);
    };
    // 鼠标移动
    const resizeMouseMove = (e: any) => {
        if (startDrag && e.pageX > 221 && e.pageX < 381) {
            setMenuWidth(e.pageX - 11);
        }
    };
    // 鼠标按下
    const resizeMouseDowm = (e: any) => {
        setStartDrag(true);
        setMenuWidth(e.pageX - 11);
    };
    // 鼠标松开
    const resizeMouseUp = (e: any) => {
        setStartDrag(false);
    };
    const selectMenu = (menutype: number) => {
        setSecMenu(menutype);
    };
    const addProject = (e: React.MouseEvent) => {
        console.log('添加项目');
        e.preventDefault();
        e.stopPropagation();
    };
    const addTags = (e: React.MouseEvent) => {
        console.log('添加标签');
        e.preventDefault();
        e.stopPropagation();
    };
    const unfoldChildren = (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        const newProjectMenu = projectMenu.map((item) => {
            if (item.projectId === projectId) {
                item.showChildren = !item.showChildren;
            }
            return item;
        });
        setProjectList(newProjectMenu);
    };
    const operatorProject = (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        console.log('编辑project', projectId);
    };
    return (
        <div className="todo-page" onMouseUp={resizeMouseUp} ref={todoContainerRef}>
            <div className="header">
                <div className="left">
                    <Tooltip placement="right" title={unfoldmenuTips}>
                        <div className="btn-unfoldmenu" onClick={() => unfoldMenuHandle()}>
                            <MenuOutlined style={{ color: '#fff' }} />
                        </div>
                    </Tooltip>
                </div>
                <div className="right">
                    <Tooltip placement="bottom" title={fullTips}>
                        <div className="btn-full" onClick={isFullscreen ? exitFull : setFull}>
                            {!isFullscreen ? <FullscreenOutlined style={{ color: '#fff' }} /> : <FullscreenExitOutlined style={{ color: '#fff' }} />}
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title={addtaskTips}>
                        <div className="btn-addtask">
                            <PlusOutlined style={{ color: '#fff' }} />
                        </div>
                    </Tooltip>
                    <div className="btn-mymessage">
                        <MessageOutlined style={{ color: '#fff' }} />
                    </div>
                </div>
            </div>
            <div className="content" onMouseMove={resizeMouseMove}>
                <ResponseShowDrawer {...{ unfoldMenu, setUnfoldMenu, showMobileStyle }}>
                    <div className={unfoldMenu ? 'left-menu' : 'left-menu hidden'} ref={menuRef} style={startDrag ? { width: `${menuWidth}px`, transition: 'none' } : { width: `${menuWidth}px` }}>
                        <div className="resize-handle" style={showMobileStyle ? { display: 'none' } : {}} id="left-menu-resize" onMouseDown={resizeMouseDowm}></div>
                        <div className={showMobileStyle ? 'list show-mobile' : 'list'}>
                            <div className={secMenu === TODO_MENU_MAP.SUNDRY ? 'sundry sec-active' : 'sundry'} onClick={() => selectMenu(TODO_MENU_MAP.SUNDRY)}>
                                <SundrySvg /> <span className="menu-text">杂事箱</span>
                                <Badge size="small" count={0}></Badge>
                            </div>
                            <div className={secMenu === TODO_MENU_MAP.TODAY ? 'today sec-active' : 'today'} onClick={() => selectMenu(TODO_MENU_MAP.TODAY)}>
                                <TodaySvg day={'05'} /> <span className="menu-text">今天</span>
                                <Badge size="small" count={0}></Badge>
                            </div>
                            <div className={secMenu === TODO_MENU_MAP.PREVIEW ? 'preview sec-active' : 'preview'} onClick={() => selectMenu(TODO_MENU_MAP.PREVIEW)}>
                                <PreviewSvg />
                                <span className="menu-text">预览</span>
                            </div>
                            <Collapse bordered={false} style={{ width: `calc(${menuWidth}px - 27px)` }}>
                                <Panel header={<PanelHeader onClick={addProject} text="项目" />} key="project">
                                    {projectMenu.map((item) => (
                                        <React.Fragment key={item.projectId}>
                                            <div className={secMenu === item.projectId ? 'project-item sec-active' : 'project-item'} onClick={() => setSecMenu(item.projectId)}>
                                                {item.childrens && item.childrens.length > 0 && (
                                                    <i className={item.showChildren ? 'arrow down' : 'arrow right'} onClick={(e: React.MouseEvent) => unfoldChildren(e, item.projectId)}>
                                                        <ArrowRightSvg />
                                                    </i>
                                                )}
                                                <Badge size="small" color={item.color}></Badge>
                                                {item.name}
                                                <i className="extend" onClick={(e: React.MouseEvent) => operatorProject(e, item.projectId)}>
                                                    <ExtendSvg />
                                                </i>
                                            </div>
                                            {item.childrens && item.childrens.length > 0 && item.showChildren && (
                                                <>
                                                    {item.childrens.map((child) => {
                                                        return (
                                                            <div
                                                                key={child.projectId}
                                                                className={secMenu === child.projectId ? 'project-item-children sec-active' : 'project-item-children'}
                                                                onClick={() => setSecMenu(child.projectId)}
                                                            >
                                                                <Badge size="small" color={child.color}></Badge>
                                                                {child.name}
                                                                <i className="extend" onClick={(e: React.MouseEvent) => operatorProject(e, child.projectId)}>
                                                                    <ExtendSvg />
                                                                </i>
                                                            </div>
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Panel>
                                <Panel header={<PanelHeader onClick={addTags} text="标签" />} key="tags"></Panel>
                            </Collapse>
                        </div>
                    </div>
                </ResponseShowDrawer>
                <div className="right-list">
                    {secMenu === TODO_MENU_MAP.SUNDRY && <TabSundry />}
                    {secMenu === TODO_MENU_MAP.TODAY && '今天'}
                    {secMenu === TODO_MENU_MAP.PREVIEW && '预览'}
                </div>
            </div>
        </div>
    );
}

interface PanelType {
    text: string;
    onClick: (e: React.MouseEvent) => void;
}
function PanelHeader(props: PanelType) {
    return (
        <span className="panel-header">
            {props.text}
            <i>
                <PlusOutlined onClick={(e) => props.onClick(e)} />
            </i>
        </span>
    );
}
