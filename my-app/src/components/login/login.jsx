import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { MaxLengthCreator, RequiredField } from '../../utilits/validation/validation';
import { Input } from '../common/formsControls/FormsControls';

let maxLength = MaxLengthCreator(15);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData)
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
        <Field placeholder='login' name="login" component={Input} validate={[maxLength, RequiredField ]} />
      </div>
      <div>
        <Field placeholder='password' name="password" component={Input} validate={[maxLength, RequiredField ]} />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component="input" /> Remember me
      </div>
      <div>
        <button>Login</button>
      </div>
      <div></div>
    </form>
  )
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default Login;