import { useEffect } from 'react';
import styles from './index.less';

export default function IndexPage() {
    useEffect(() => {
        console.log('请求PREVIEW数据');
    }, []);
    return (
        <div>
            <h1>PREVIEW</h1>
        </div>
    );
}
