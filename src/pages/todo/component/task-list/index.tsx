import React, { useState } from 'react';
import './index.less';
import AddSvg from '@/art/addSvg';
import DateSvg from '@/art/dateSvg';
import EditSvg from '@/art/editSvg';
import MoreSvg from '@/art/moreSvg';
import ExtendSvg from '@/art/extendSvg';
import Input from '../input/index';

export interface TaskItemType {
    id: number;
    sequence: number;
    parentModule?: number;
    status: number;
    taskDesc: string;
    deadline: string;
    createTime?: string;
    updateTime?: string;
}

interface PropsType {
    moduleId?: number;
    taskList: Array<TaskItemType>;
    confirmAddTask: (moduleId: any) => void;
}

function AddTask(props: PropsType) {
    const [showTask, setShowTask] = useState(false);
    const [taskDesc, setTaskDesc] = useState('');
    const { confirmAddTask, moduleId, taskList } = props;
    return (
        <React.Fragment>
            <div className="task-list">
                {taskList.map((task) => {
                    let className;
                    switch (task.deadline) {
                        case '明天':
                            className = 'tomorrow';
                            break;
                        case '今天':
                            className = 'today';
                            break;
                        case '昨天':
                            className = 'yesterday';
                            break;
                        default:
                            break;
                    }
                    return (
                        <div key={task.id} className="task-item">
                            <div className="task-desc">{task.taskDesc}</div>
                            <div className={`task-time ${className}`}>
                                <DateSvg />
                                <span className="date">{task.deadline}</span>
                            </div>
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
