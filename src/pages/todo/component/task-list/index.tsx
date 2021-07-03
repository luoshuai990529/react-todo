import React, { useEffect, useState } from 'react';
import './index.less';
import AddSvg from '@/art/addSvg';
import DateSvg from '@/art/dateSvg';
import EditSvg from '@/art/editSvg';
import MoreSvg from '@/art/moreSvg';
import ExtendSvg from '@/art/extendSvg';
import Input from '../input/index';
import { DatePicker } from 'lewis-todo-components';

export interface TaskItemType {
    id: number; // 唯一ID
    sequence: number; // 序号
    parentModule?: number; // 所属父模块
    status: number; // 任务状态
    taskDesc: string; // 任务描述
    deadline: string; // 截止日期
    createTime?: string; // 创建时间
    updateTime?: string; // 更新时间
}

interface PropsType {
    moduleId?: number; //模块Id
    taskList: Array<TaskItemType>; // 任务列表
    confirmAddTask: (moduleId: any) => void; // 确认添加任务回调
}

function AddTask(props: PropsType) {
    const [showTask, setShowTask] = useState(false);
    const [taskDesc, setTaskDesc] = useState('');
    const { confirmAddTask, moduleId, taskList } = props;
    useEffect(() => {
        console.log('addTask useEffect');
    }, []);
    return (
        <React.Fragment>
            <div className="task-list">
                {taskList.map((task) => {
                    return (
                        <div key={task.id} className="task-item">
                            <div className="task-desc">{task.taskDesc}</div>
                            <DatePicker btnType="simple" />
                            <div className="btn-action">
                                <div className="editor">
                                    <EditSvg />
                                </div>
                                <div className="more">
                                    <ExtendSvg />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="add-evnet">
                {!showTask && (
                    <div className="add-evnet-action" onClick={() => setShowTask(true)}>
                        <span className="add-svg">
                            <AddSvg />
                        </span>
                        <span className="desc">添加任务</span>
                    </div>
                )}
                {showTask && (
                    <div className="add-event-content">
                        <Input
                            type="add-task"
                            onChange={(x) => setTaskDesc(x)}
                            confirmHandle={() => confirmAddTask(moduleId)}
                            cancelHandle={() => setShowTask(false)}
                            value={taskDesc}
                            confirmText="添加任务"
                            cancelText="取消"
                            placeholder="例如：每天练习一道力扣算法题 #算法"
                        />
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default AddTask;
