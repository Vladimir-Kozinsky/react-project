import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/formsControls/FormsControls';
import s from './profileForm.module.css';

type ProfileInfoFormOwnProps = {
    setEditMode: (editMode: boolean) => void
    initialValues: any
}
type FormDataValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: {
        facebook: string
        vk: string
        instagram: string
        website: string
    }

}
const ProfileInfoForm: React.FC<InjectedFormProps<FormDataValuesType, ProfileInfoFormOwnProps> & ProfileInfoFormOwnProps> = ({ handleSubmit, setEditMode, error, reset }) => {
    return (
        <form className={s.profileform} onSubmit={handleSubmit} >
            <div>
                <div className={s.FullNameDiv}>FullName:</div>
                <div className={s.FullNameText}>
                    <Field placeholder='FullName' name="fullName" component={Input} />
                </div>
            </div>
            <div>
                <div className={s.lookingForAJobDiv}>LookingForAJob:</div>
                <div className={s.lookingForAJobText}>
                    <Field type="checkbox" name="lookingForAJob" component={Input} />
                </div>
            </div>

        <div>
             <div className={s.lookingForAJobDescription}>
                <div className={s.lookingForAJobDescriptionDiv}>Job Description:</div>
                <Field placeholder='Enter Job description' name="lookingForAJobDescription" component={Textarea} />
            </div>
        </div>
           
            <div className={s.contacts}>
                <div className={s.contactsText}>Contacts:</div>
                <div className={s.linkFacebook}>
                    <Field placeholder='facebook' name="contacts.facebook" component={Input} />
                </div>
                <div className={s.linkVk}>
                    <Field placeholder='vk' name="contacts.vk" component={Input} />
                </div>
                <div className={s.linkInsta}>
                    <Field placeholder='instagram' name="contacts.instagram" component={Input} />
                </div>
                <div className={s.linkWeb}>
                    <Field placeholder='website' name="contacts.website" component={Input} />
                </div>
            </div>

            {error && <div>{error}</div>}
            <button>Save</button>
            <button onClick={() => setEditMode(false)} >Cancel</button>
        </form>
    )
}

export const ProfileInfoReduxForm = reduxForm<FormDataValuesType, ProfileInfoFormOwnProps>({ form: 'profileInfo' })(ProfileInfoForm)


export default ProfileInfoForm;