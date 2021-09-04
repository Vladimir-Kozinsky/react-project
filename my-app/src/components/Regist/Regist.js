import { Field, reduxForm } from "redux-form"
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Input } from "../common/formsControls/FormsControls";
import { regist } from "../../redux/profileReduser";

const Regist = (props) => {
    const onSubmit = (formData) => {
        props.regist(formData)
    }
    return (
        <div>
            <h2>Registration Form</h2>
            <RegistReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const RegistForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder='Email' name='email' component={Input} />
            <Field placeholder='Password' name='password' component={Input} />
            <Field placeholder='Confirm password' name='confPassword' component={Input} />
            <Field placeholder='Name' name='fullName' component={Input} />
            <Field placeholder='Status' name='status' component={Input} />
            <Field type='checkbox' name='lookingForAJob' component={Input} />
            <Field placeholder='Job description' name='lookingForAJobDescription' component={Input} />
            <Field placeholder='skype' name='skype' component={Input} />
            <Field placeholder='facebook' name='facebook' component={Input} />
            <Field placeholder='icq' name='icq' component={Input} />
            <Field placeholder='googlePlus' name='googlePlus' component={Input} />
            <Field placeholder='twitter' name='twitter' component={Input} />
            <Field placeholder='instagram' name='instagram' component={Input} />
            <Field placeholder='whatsApp' name='whatsApp' component={Input} />
            <button>Register</button>
        </form>
    )
}

let mapStateToProps = (state) => {

}

const RegistReduxForm = reduxForm({ form: 'regist' })(RegistForm)

export default compose(connect(mapStateToProps, { regist }))(Regist)