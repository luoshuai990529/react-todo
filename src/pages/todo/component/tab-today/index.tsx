import { useEffect } from 'react';
import styles from './index.less';

export default function IndexPage() {
    useEffect(() => {
        console.log('请求today数据');
    }, []);
    return (
        <div>
            <h1>TODAY</h1>
        </div>
    );
}
