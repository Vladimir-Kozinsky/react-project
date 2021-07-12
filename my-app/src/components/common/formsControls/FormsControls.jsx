import s from './FormsControls.module.css';

export const Textarea = ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={hasError ? s.errorBorderRed : ""} >
                <textarea {...input} {...props} cols="50" rows="5"></textarea> {meta.touched && meta.error && <span className={s.errorMessage}>{meta.error}</span>}
            </div>
        </div>
    )
}