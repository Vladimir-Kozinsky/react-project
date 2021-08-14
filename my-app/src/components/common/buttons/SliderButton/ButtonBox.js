import s from './buttonBox.module.css'
import RightBtn from './RightBtn'
import LeftBtn from './leftBtn'

const ButtonBox = (props) => {
    return (
        <div className={s.buttonBox}>
            <div className={s.leftBox} >
                <LeftBtn currentPage={props.currentPage} getFriends={props.getFriends} />
            </div>
            <div className={s.rightBox} >
                <RightBtn currentPage={props.currentPage} getFriends={props.getFriends} />
            </div>
        </div>
    )
}

export default ButtonBox