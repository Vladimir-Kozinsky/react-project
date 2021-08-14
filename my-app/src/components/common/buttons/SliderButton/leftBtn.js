import s from './leftBtn.module.css'
import leftBtnImg from './leftBtn.png'

const LeftBtn = (props) => {
    return (
        <div className={s.buttonContainer} >
            <img onClick={() => { props.getFriends(true, props.currentPage - 1) }} src={leftBtnImg} />
        </div>
    )
}

export default LeftBtn