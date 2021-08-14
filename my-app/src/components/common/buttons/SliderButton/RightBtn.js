import s from './rightBtn.module.css'
import rightBtnImg from './rightBtn.png'

const RightBtn = (props) => {
    return (
        <div className={s.buttonContainer} >
            <img onClick={() => { props.getFriends(true, props.currentPage + 1) }} src={rightBtnImg} />
        </div>
    )
}

export default RightBtn