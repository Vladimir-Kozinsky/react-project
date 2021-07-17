import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MaxLengthCreator, RequiredField } from '../../utilits/validation/validation';
import { Input } from '../common/formsControls/FormsControls';
import { login } from './../../redux/authReduser';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { redirectToProfile } from '../hoc/redirectToProfile';

let maxLength = MaxLengthCreator(25);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.login, formData.password, formData.rememberMe)
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder='login' name="login" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div>
        <Field placeholder='password' name="password" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component="input" /> Remember me
      </div>
      {props.error && <div>
        {props.error}
      </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default  compose(connect(null, { login }), 
withRouter,
redirectToProfile
)(Login);