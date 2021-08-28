import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { MaxLengthCreator, RequiredField } from '../../utilits/validation/validation';
import { Input } from '../common/formsControls/FormsControls';
import { login, regist } from '../../redux/authReduser';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { redirectToProfile } from '../hoc/redirectToProfile';
import s from './login.module.css';
import { RootState } from '../../redux/redux-store';

let maxLength = MaxLengthCreator(25);

type MapStateToPropsType = {
  setCaptchaUrlSucces: boolean
  captchaUrl: string | null
}

type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
  regist: () => void
}

type FormDataValuesType = {
  login: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: FormDataValuesType) => {
    props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
  }
  return (
    <div className={s.login}>
      <h2>LOGIN</h2>
      <LoginReduxForm onSubmit={onSubmit}
        //setCaptchaUrlSucces={props.setCaptchaUrlSucces}
        captchaUrl={props.captchaUrl} />
        <button onClick={props.regist} >Register</button>
    </div>
  )
}

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.loginInputContainer}>
        <Field placeholder='login' name="login" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div className={s.loginInputContainer}  >
        <Field type="password" placeholder='password' name="password" component={Input} validate={[maxLength, RequiredField]} />
      </div>
      <div className={s.loginCheckBoxContainer}>
        <Field type="checkbox" name="rememberMe" component="input" /> Remember me
      </div>
      {error && <div>
        {error}
      </div>
      }
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl && <Field placeholder='captcha' name="captcha" component={Input} />}
      <div className={s.loginButtonContainer} >
        <button>Login</button>

      </div>
    </form>
  )
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
  return {
    setCaptchaUrlSucces: state.auth.setCaptchaUrlSucces,
    captchaUrl: state.auth.captchaUrl
  }
}

const LoginReduxForm = reduxForm<FormDataValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

export default compose(connect(mapStateToProps, { login, regist }),
  withRouter,
  redirectToProfile
)(Login);