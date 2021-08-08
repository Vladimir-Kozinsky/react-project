import { WrappedFieldProps } from 'redux-form';
import s from './FormsControls.module.css';

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={hasError ? s.errorBorderRed : ""} >
                <textarea {...input} ></textarea> {hasError && <span className={s.errorMessage}>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={hasError ? s.errorBorderRed : ""} >
                <input {...input} {...props} ></input> {hasError && <div className={s.errorMessage}>{meta.error}</div>}
            </div>
        </div>
    )
}