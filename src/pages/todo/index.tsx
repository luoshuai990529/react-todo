import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { Tooltip, Badge, Collapse, Drawer } from 'antd';
import { MenuOutlined, PlusOutlined, MessageOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { configResponsive, useResponsive, useFullscreen } from 'ahooks';
import TodaySvg from '@/art/todaySvg';
import SundrySvg from '@/art/sundrySvg';
import PreviewSvg from '@/art/previewSvg';
import ExtendSvg from '@/art/extendSvg';
import ArrowRightSvg from '@/art/arrowRightSvg';
import { TODO_MENU_MAP, TodoMenuType, MenuItem } from '@/utils/constant';
import ResponseShowDrawer from './component/response-show-drawer';
import TabSundry from './component/tab-sundry/index';
import TabToday from './component/tab-today/index';
import TbaProject from './component/tab-project/index';
import TabPreview from './component/tab-preview/index';
const { Panel } = Collapse;
import produce from 'immer'; // 不可变数据处理库
import { history, Route, Router, Redirect } from 'umi';
//hash模式
// import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

export interface ProjectItem {
    name: string;
    projectId: number;
    color: string;
    showChildren?: boolean;
    childrens?: Array<any>;
}
export interface TagsItem {
    name: string;
    tagId: number;
    color: string;
}
interface PropsType {
    children?: React.ReactNode;
}
configResponsive({
    small: 0,
    middle: 768,
});

const unfoldmenuTips = <span>展开菜单</span>;
const addtaskTips = <span>快速添加一个任务</span>;
const fullTips = <span>全屏展示</span>;
const NotUpdate = React.memo(
    ({ children }: any) => (typeof children === 'function' ? children() : children),
    () => true,
);

const tagList = [
    { name: '运动', tagId: 1, color: 'geekblue' },
    { name: '学习', tagId: 2, color: 'geekblue' },
];
let activeKeyArr: Array<any> = [];
export default function IndexPage(props: PropsType) {
    const projectId = history.location.query ? history.location.query.projectId : '';
    const tagId = history.location.query ? history.location.query.tagId : '';
    const menuRef = useRef(null);
    const todoContainerRef = useRef(null);
    const responsive = useResponsive(); // 页面响应式数据
    const [isFullscreen, { setFull, exitFull }] = useFullscreen(todoContainerRef); // 全屏hooks
    const [unfoldMenu, setUnfoldMenu] = useState(responsive.middle); // 展开菜单
    const [startDrag, setStartDrag] = useState(false); // 是否正在拖拽
    const [menuWidth, setMenuWidth] = useState(210); // 菜单宽度
    const [projectMenu, setProjectList] = useState<Array<ProjectItem>>([]); // 项目列表

    const [showMobileStyle, setShowMobileStyle] = useState(!responsive.middle);

    useEffect(() => {
        // 请求数据
        // const projectList = [
        //     {
        //         name: '智鸽服务',
        //         projectId: 10086,
        //         color: 'green',
        //         showChildren:false,
        //         childrens: [
        //             { parentId: 10086, name: '1-高德地图', projectId: 10087, color: '#0094ff' },
        //             { parentId: 10086, name: '1-拖拽组件', projectId: 10088, color: 'hotpink' },
        //         ],
        //     },
        //     { name: '微服务中台', projectId: 10000, color: 'geekblue' },
        //     { name: '送餐倒车', projectId: 10010, color: 'geekblue' },
        // ];
        // console.log('请求数据：',projectList);
        // setProjectList(projectList)
    }, []);

    useEffect(() => {
        const isMobile = !responsive.middle;
        const width = isMobile ? 0 : 210;
        setShowMobileStyle(isMobile);
        setUnfoldMenu(!isMobile);
        setMenuWidth(width);
    }, [responsive.middle]);

    //  展开收起菜单
    const unfoldMenuHandle = () => {
        const width = unfoldMenu ? 0 : 210;
        setUnfoldMenu(!unfoldMenu);
        setMenuWidth(width);
    };
    // 鼠标移动
    const resizeMouseMove = (e: any) => {
        if (startDrag && e.pageX > 221 && e.pageX < 381) {
            setMenuWidth(e.pageX - 2);
        }
    };
    // 鼠标按下
    const resizeMouseDowm = (e: any) => {
        setStartDrag(true);
        setMenuWidth(e.pageX - 2);
    };
    // 鼠标松开
    const resizeMouseUp = (e: any) => {
        setStartDrag(false);
    };
    // 跳转对应路由
    const selectMenu = (item: MenuItem) => {
        if (history.location.pathname.indexOf(item.url) !== -1) {
            return;
        }
        history.push(item.url);
    };
    // 跳转对应项目路由
    const selectProject = (item: ProjectItem) => {
        const projectId = history.location.query ? history.location.query.projectId : '';
        if (projectId === String(item.projectId)) {
            return;
        }
        history.push(`/todo/project?projectId=${item.projectId}`);
    };
    // 跳转对应标签路由
    const selectTags = (item: TagsItem) => {
        const tagId = history.location.query ? history.location.query.tagId : '';
        if (tagId === String(item.tagId)) {
            return;
        }
        history.push(`/todo/tags?tagId=${item.tagId}`);
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
    // 展开子项目
    const unfoldChildren = (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        const nextMenu = produce(projectMenu, (draftState) => {
            draftState.forEach((item) => {
                if (item.projectId === projectId) {
                    item.showChildren = !item.showChildren;
                }
            });
        });
        setProjectList(nextMenu);
    };

    // 编辑项目
    const operatorProject = (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        console.log('编辑project', projectId);
    };
    // 编辑标签
    const operatorTags = (e: React.MouseEvent, tagId: number) => {
        console.log('编辑标签：', tagId);
    };
    // 头部内容渲染
    const HeaderRender = () => (
        <div className="header">
            <div className="left">
                <Tooltip placement="right" title={unfoldmenuTips}>
                    <div className="btn-unfoldmenu" onClick={unfoldMenuHandle}>
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
    );

    // 路由是否包含某个路径
    const includingPath = (path: string) => {
        return history.location.pathname.indexOf(path) !== -1;
    };

    const activeKey = useMemo(
        () => () => {
            const query = history.location.query ? history.location.query : {};
            if (Object.keys(query).includes('projectId')) {
                activeKeyArr = [...new Set([...activeKeyArr, 'project'])];
            }
            if (Object.keys(query).includes('tagId')) {
                activeKeyArr = [...new Set([...activeKeyArr, 'tags'])];
            }
            return activeKeyArr;
        },
        [],
    );
    // 折叠面板展开收起回调
    const collapseChange = (value: any) => {
        activeKeyArr = value;
    };
    return (
        <Router history={history}>
            <div className="todo-page" onMouseUp={resizeMouseUp} ref={todoContainerRef}>
                {useMemo(
                    () => (
                        <HeaderRender />
                    ),
                    [isFullscreen, unfoldMenu],
                )}
                <div className="content" onMouseMove={resizeMouseMove}>
                    <ResponseShowDrawer {...{ unfoldMenu, setUnfoldMenu, showMobileStyle }}>
                        <div className={unfoldMenu ? 'left-menu' : 'left-menu hidden'} ref={menuRef} style={startDrag ? { width: `${menuWidth}px`, transition: 'none' } : { width: `${menuWidth}px` }}>
                            <div className="resize-handle" style={showMobileStyle ? { display: 'none' } : {}} id="left-menu-resize" onMouseDown={resizeMouseDowm}></div>
                            <div className={showMobileStyle ? 'list show-mobile' : 'list'}>
                                {useMemo(
                                    () => (
                                        <React.Fragment>
                                            <div className={includingPath('sundry') ? 'sundry sec-active' : 'sundry'} onClick={() => selectMenu(TODO_MENU_MAP.SUNDRY)}>
                                                <SundrySvg /> <span className="menu-text">杂事箱</span>
                                                <Badge size="small" count={0}></Badge>
                                            </div>
                                            <div className={includingPath('today') ? 'today sec-active' : 'today'} onClick={() => selectMenu(TODO_MENU_MAP.TODAY)}>
                                                <TodaySvg day={'05'} /> <span className="menu-text">今天</span>
                                                <Badge size="small" count={0}></Badge>
                                            </div>
                                            <div className={includingPath('preview') ? 'preview sec-active' : 'preview'} onClick={() => selectMenu(TODO_MENU_MAP.PREVIEW)}>
                                                <PreviewSvg />
                                                <span className="menu-text">预览</span>
                                            </div>
                                        </React.Fragment>
                                    ),
                                    [],
                                )}
                                <Collapse onChange={collapseChange} bordered={false} defaultActiveKey={activeKey()} style={{ width: `100%`, paddingRight: '13px' }}>
                                    <Panel header={<PanelHeader onClick={addProject} text="项目" />} key="project">
                                        {projectMenu.map((item) => (
                                            <React.Fragment key={item.projectId}>
                                                <div className={projectId === String(item.projectId) ? 'project-item sec-active' : 'project-item'} onClick={() => selectProject(item)}>
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
                                                                    className={projectId === String(child.projectId) ? 'project-item-children sec-active' : 'project-item-children'}
                                                                    onClick={() => selectProject(child)}
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
                                    <Panel header={<PanelHeader onClick={addTags} text="标签" />} key="tags">
                                        {tagList.map((item) => (
                                            <div className={tagId === String(item.tagId) ? 'tag-item sec-active' : 'tag-item'} key={item.tagId} onClick={() => selectTags(item)}>
                                                <Badge size="small" color={item.color}></Badge>
                                                {item.name}
                                                <i className="extend" onClick={(e: React.MouseEvent) => operatorTags(e, item.tagId)}>
                                                    <ExtendSvg />
                                                </i>
                                            </div>
                                        ))}
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </ResponseShowDrawer>
                    {useMemo(
                        () => (
                            <div className="right-list">
                                {/* <Redirect from='/todo' to='/todo/sundry'></Redirect> */}
                                <Route key={'/todo/today'} path={'/todo/today'} exact component={TabToday}></Route>
                                <Route key={'/todo/sundry'} path={'/todo/sundry'} exact component={TabSundry}></Route>
                                <Route key={'/todo/preview'} path={'/todo/preview'} exact component={TabPreview}></Route>
                                <Route key={'/todo/project'} path={'/todo/project'} exact component={TbaProject}></Route>
                            </div>
                        ),
                        [],
                    )}
                </div>
            </div>
        </Router>
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
