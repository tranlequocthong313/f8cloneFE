import { Link } from 'react-router-dom';
import MainButton from '../../../utils/button/MainButton';
import styles from './Login.module.scss';

const Login = () => {
    return (
        <Link to='/login'>
            <MainButton primary={true} className={styles.button}>
                Đăng nhập
            </MainButton>
        </Link>
    );
};

export default Login;
