import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from './ProfileStatus.module.css';

type PropsType = {
    status: string
    setStatus: (status: string) => void
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ status, setStatus, updateStatus }) => {


    let [editMode, setEditMode] = useState(false);
    let [localStatus, localSetStatus] = useState(status);


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(localStatus);
    }
    const changeStatusText = (e: any) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        localSetStatus(status)
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
                        value={status}
                        type="text" />
                </div>
            }
        </div>

    )
}



export default ProfileStatus;