import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
        <div className={s.logo}>
          <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"></img>
        </div>

      </header>
    )
}

export default Header;