import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from './ProfileStatus.module.css';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ status, updateStatus }) => {


    let [editMode, setEditMode] = useState(false);
    let [localStatus, localSetStatus] = useState(status);


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        updateStatus(localStatus)
    }
    const changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
        localSetStatus(e.currentTarget.value);
    }

    useEffect(() => {
        localSetStatus(status)
        setEditMode(false)
    }, [status])

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
                        value={localStatus}
                        type="text" />
                </div>
            }
        </div>

    )
}



export default ProfileStatus;