import s from './Preloader.module.css';
import preloader from './img/preloader.svg';

const Preloader = (props) => {
    return (
        <div className={s.preloader}>
            <img className={s.loader} src={preloader} alt="loading" />
        </div>
    )
}

export default Preloader;