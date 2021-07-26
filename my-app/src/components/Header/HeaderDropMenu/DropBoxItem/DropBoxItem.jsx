import s from './DropBoxItem.module.css';
import { NavLink } from "react-router-dom";

const DropBoxItem = (props) => {
    return (
        <div className={s.dropMenuItem}>
            <div className={s.iconContainer} >
                <img src={props.settingImg} alt="img" />
            </div>
            <div className={s.linkContainer} >
                {props.path 
                ? <NavLink className={s.boxNavLink} to={props.path} >{props.itemName}</NavLink> 
                : <span className={s.boxNavLink} onClick={props.onClickCallback} >{props.itemName}</span>}
            </div>
        </div>
    )
}

export default DropBoxItem;