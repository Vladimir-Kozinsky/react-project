import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MaxLengthCreator, RequiredField } from '../../utilits/validation/validation';
import { Input } from '../common/formsControls/FormsControls';
import { login } from './../../redux/authReduser';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { redirectToProfile } from '../hoc/redirectToProfile';
import s from './login.module.css';

let maxLength = MaxLengthCreator(25);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
  }
  return (
    <div className={s.login}>
      <h2>LOGIN</h2>
      <LoginReduxForm onSubmit={onSubmit}
        setCaptchaUrlSucces={props.setCaptchaUrlSucces}
        captchaUrl={props.captchaUrl} />
    </div>
  )
}

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.loginInputContainer}>
        <Field placeholder='login' name="login" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div className={s.loginInputContainer}  >
        <Field type ="password" placeholder='password' name="password" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div className={s.loginCheckBoxContainer}>
        <Field type="checkbox" name="rememberMe" component="input" /> Remember me
      </div>
      {props.error && <div>
        {props.error}
      </div>
      }
      {props.captchaUrl && <img src={props.captchaUrl} />}
      {props.captchaUrl && <Field placeholder='captcha' name="captcha" component={Input} />}
      <div className={s.loginButtonContainer} >
        <button>Login</button>

      </div>
    </form>
  )
}

let mapStateToProps = (state) => {
  return {
    setCaptchaUrlSucces: state.auth.setCaptchaUrlSucces,
    captchaUrl: state.auth.captchaUrl
  }
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default compose(connect(mapStateToProps, { login }),
  withRouter,
  redirectToProfile
)(Login);