import React, { useEffect } from 'react';
import './index.less';
import TaskList, { TaskItemType } from '../task-list/index';
import ArrowRightSvg from '@/art/arrowRightSvg';

export interface ModuleItem {
    id: number;
    sequence: number;
    moduleName: string;
    taskList: Array<TaskItemType>;
    createTime?: string;
    updateTime?: string;
    unfold?: boolean;
}

interface PropsType {
    moduleList: Array<ModuleItem>;
    unfoldChildren: (x: number) => void;
    confirmAddTask: () => void;
}

function ModuleList(props: PropsType) {
    const { moduleList, unfoldChildren, confirmAddTask } = props;
    return (
        <div className="module-list">
            {moduleList.map((module) => {
                return (
                    <div key={module.id} className="module-item">
                        <div className="module-header">
                            <i className={module.unfold ? 'arrow down' : 'arrow right'} onClick={(e: React.MouseEvent) => unfoldChildren(module.id)}>
                                <ArrowRightSvg />
                            </i>
                            <span className="module-name" onClick={(e: React.MouseEvent) => unfoldChildren(module.id)}>
                                {module.moduleName}
                            </span>
                        </div>
                        {module.unfold && <TaskList taskList={module.taskList} confirmAddTask={confirmAddTask} moduleId={module.id} />}
                    </div>
                );
            })}
        </div>
    );
}
export default ModuleList;
