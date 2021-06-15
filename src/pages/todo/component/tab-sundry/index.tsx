import React, { useEffect, useState } from 'react';
import MoreSvg from '@/art/moreSvg';
import OrderSvg from '@/art/orderSvg';
import Input from '../input/index';
import ModuleList, { ModuleItem } from '../module-list/index';
import TaskList, { TaskItemType } from '../task-list/index';
import './index.less';

function TabSundry() {
    const [showAddModules, setShowAddModules] = useState(false);
    const [editModuleName, setModuleName] = useState('');
    const [moduleList, setModuleList] = useState<Array<ModuleItem>>([]);
    const [taskList, setTaskList] = useState<Array<TaskItemType>>([]);
    useEffect(() => {
        const testTaskList = [{ id: 10011, sequence: 1, status: 0, taskDesc: '睡觉觉', deadline: '昨天', createTime: '2021-06-10 16:00:00', updateTime: '2021-06-10 16:00:00' }];
        const testModuleList: Array<ModuleItem> = [
            { id: 1000, sequence: 1, moduleName: 'React学习计划', taskList: [], createTime: '2021-06-10 16:00:00', updateTime: '2021-06-10 16:00:00' },
            {
                id: 1001,
                sequence: 2,
                moduleName: 'Vue学习计划',
                taskList: [
                    { id: 10086, sequence: 1, parentModule: 1001, status: 0, taskDesc: 'Vue模板编译原理学习', deadline: '今天', createTime: '2021-06-10 16:00:00', updateTime: '2021-06-10 16:00:00' },
                    { id: 10087, sequence: 2, parentModule: 1001, status: 0, taskDesc: 'Vue3新增Api学习', deadline: '明天', createTime: '2021-06-10 16:00:00', updateTime: '2021-06-10 16:00:00' },
                ],
                createTime: '2021-06-10 16:00:00',
                updateTime: '2021-06-10 16:00:00',
            },
        ];
        testModuleList.forEach((item) => {
            item.unfold = false;
        });
        setModuleList(testModuleList);
        setTaskList(testTaskList);
    }, []);

    const confirmAddModules = () => {
        console.log('确认添加模块', editModuleName);
    };
    const confirmAddTask = (moduleId?: number) => {
        console.log('添加任务', moduleId);
    };
    const unfoldModuleItem = (id: number) => {
        const newModuleList = moduleList.map((module: ModuleItem) => {
            if (module.id === id) module.unfold = !module.unfold;
            return module;
        });
        setModuleList(newModuleList);
    };
    return (
        <div className="tab-sundry">
            <div className="tab-header">
                <h1 className="title">
                    <span>杂事箱</span>
                </h1>
                <div className="operator">
                    <OrderSvg />
                    <MoreSvg />
                </div>
            </div>
            <TaskList taskList={taskList} confirmAddTask={confirmAddTask} />
            <div className="add-modules">
                {!showAddModules && (
                    <div className="add-modules-btn" onClick={() => setShowAddModules(true)}>
                        <span className="text">添加模块</span>
                        <span className="line"></span>
                    </div>
                )}
                {showAddModules && (
                    <div className="add-modules-content">
                        <Input
                            onChange={(x) => setModuleName(x)}
                            confirmHandle={() => confirmAddModules()}
                            cancelHandle={() => setShowAddModules(false)}
                            value={editModuleName}
                            confirmText="添加模块"
                            cancelText="取消"
                            placeholder="请给这个模块命名"
                        />
                    </div>
                )}
            </div>
            <ModuleList moduleList={moduleList} unfoldChildren={unfoldModuleItem} confirmAddTask={confirmAddTask} />
        </div>
    );
}

export default TabSundry;
