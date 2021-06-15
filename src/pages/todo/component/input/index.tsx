import React, { useRef, useState } from 'react';
import './index.less';
interface PropsType {
    onChange: (x: any) => void;
    confirmHandle: () => void;
    cancelHandle: () => void;
    confirmText?: string;
    cancelText?: string;
    placeholder?: string;
    value?: string;
    type?: string; // 类型 'add-taks' 'add-module'(默认)
}

function Input(props: PropsType) {
    const { onChange, confirmHandle, cancelHandle, confirmText = '确定', cancelText = '取消', placeholder = '请输入', value = '', type = 'add-module' } = props;
    const [isFocus, setIsFocus] = useState(false);
    const [isInput, setIsInput] = useState(false);
    return (
        <div className="todo-input">
            {type === 'add-module' && (
                <React.Fragment>
                    <input placeholder={placeholder} type="text" onChange={(x) => onChange(x.target.value)} />
                    <div className="btn-action">
                        <button className={value.trim() === '' ? 'confirm disable' : 'confirm'} disabled={value.trim() === ''} onClick={confirmHandle}>
                            {confirmText}
                        </button>
                        <button className="cancel" onClick={cancelHandle}>
                            {cancelText}
                        </button>
                    </div>
                </React.Fragment>
            )}
            {type === 'add-task' && (
                <React.Fragment>
                    <div className="add-task">
                        <div className="editor-task" style={isFocus ? { borderColor: '#3d3d3d' } : {}}>
                            <div
                                className="input"
                                onKeyDown={(x) => setIsInput(true)}
                                onKeyUp={(x) => {
                                    setIsInput(false);
                                    onChange(x.currentTarget.innerText);
                                }}
                                onFocus={(x) => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                suppressContentEditableWarning
                                contentEditable
                            ></div>
                            {!value && !isInput && <span className="placeholder">{placeholder}</span>}
                        </div>
                    </div>
                    <div className="btn-action">
                        <button className={value.trim() === '' ? 'confirm disable' : 'confirm'} disabled={value.trim() === ''} onClick={confirmHandle}>
                            {confirmText}
                        </button>
                        <button className="cancel" onClick={cancelHandle}>
                            {cancelText}
                        </button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Input;
