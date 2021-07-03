export interface TodoMenuType<T> {
    SUNDRY: T;
    TODAY: T;
    PREVIEW: T;
}

// 标题
export const TITLE = "Lewis ROM's Front-End Notes";

export type MenuItem = { id: number; url: string };
export const TODO_MENU_MAP: TodoMenuType<MenuItem> = {
    SUNDRY: { id: 1, url: '/todo/sundry' }, // 杂项
    TODAY: { id: 2, url: '/todo/today' }, // 今天
    PREVIEW: { id: 3, url: '/todo/preview' }, // 预览
};
