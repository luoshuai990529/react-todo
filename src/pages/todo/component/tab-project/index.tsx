import { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
export default function IndexPage() {
    useEffect(() => {
        console.log('请求Project数据', history.location.query);
    }, [history.location.query]);
    return (
        <div>
            <h1>PREVIEW</h1>
        </div>
    );
}
