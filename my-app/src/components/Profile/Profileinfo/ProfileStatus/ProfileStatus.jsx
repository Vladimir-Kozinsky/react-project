import React from "react";
import s from './ProfileStatus.module.css';


class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status);
    }
    changeStatusText = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.state.status,
            });
        }
    }

    render() {
        return (
            <div className={s.userStatus}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{!this.state.status
                        ? "no status"
                        : this.state.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.changeStatusText} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} type="text" />
                    </div>
                }
            </div>

        )
    }

}


export default ProfileStatus;