import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from './ProfileStatus.module.css';


const ProfileStatus = (props) => {


    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    const changeStatusText = (e) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={s.userStatus}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{!status
                        ? "no status"
                        : status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        onChange={changeStatusText}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        type="text" />
                </div>
            }
        </div>

    )
}



export default ProfileStatus;