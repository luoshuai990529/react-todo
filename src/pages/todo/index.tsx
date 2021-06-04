import React, { useEffect, useRef, useState } from 'react';
// import {Motion, spring,presets} from 'react-motion';
import './index.less';
import { Tooltip } from 'antd';
import { MenuOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import { configResponsive, useResponsive } from 'ahooks';

configResponsive({
  small: 0,
  middle: 768,
});

const unfoldmenuTips = <span>展开菜单</span>;
const addtaskTips = <span>快速添加一个任务</span>;

export default function IndexPage() {
  const menuRef = useRef(null);
  const responsive = useResponsive(); // 页面响应式数据
  const [unfoldMenu, setUnfoldMenu] = useState(responsive.middle);
  const [startDrag, setStartDrag] = useState(false); // 是否正在拖拽
  const [menuWidth, setMenuWidth] = useState(210);

  const unfoldMenuHandle = () => {
    setUnfoldMenu(!unfoldMenu);
    unfoldMenu ? setMenuWidth(0) : setMenuWidth(menuWidth);
  };
  // 鼠标移动
  const resizeMouseMove = (e: any) => {
    if (startDrag) {
      setMenuWidth(e.pageX - 5);
    }
  };
  // 鼠标按下
  const resizeMouseDowm = (e: any) => {
    setStartDrag(true);
    setMenuWidth(e.pageX - 5);
  };
  // 鼠标松开
  const resizeMouseUp = (e: any) => {
    setStartDrag(false);
  };
  return (
    <div className="todo-page" onMouseUp={resizeMouseUp}>
      <div className="header">
        <div className="left">
          <Tooltip placement="right" title={unfoldmenuTips}>
            <div className="btn-unfoldmenu" onClick={() => unfoldMenuHandle()}>
              <MenuOutlined style={{ color: '#fff' }} />
            </div>
          </Tooltip>
        </div>
        <div className="right">
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
        <div
          className={unfoldMenu ? 'left-menu' : 'left-menu hidden'}
          ref={menuRef}
          style={
            startDrag
              ? { width: `${menuWidth}px`, transition: 'none' }
              : { width: `${menuWidth}px` }
          }
        >
          <div
            className="resize-handle"
            id="left-menu-resize"
            onMouseDown={resizeMouseDowm}
          ></div>
          菜单
        </div>
        <div className="right-list">列表</div>
      </div>
    </div>
  );
}
