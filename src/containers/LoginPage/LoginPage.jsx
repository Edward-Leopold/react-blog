import './LoginPage.scss';
import { useNavigate } from "react-router-dom";

export const LoginPage = (props) => {
    let navigate = useNavigate();

    const toHome = () => {
        navigate('/');
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        toHome();
    }

    return (
        <>
            <h1>
                Login Page
            </h1>
            <div>
                <form onSubmit={handleLogIn} className="loginForm">
                    <h2>Авторизация</h2>
                    <div>
                        <input required className="loginForm__input" type="text" placeholder="Логин" />
                    </div>
                    <div>
                        <input required className="loginForm__input" type="password" placeholder="Пароль" />
                    </div>
                    <div>
                        <button className="blackBtn" type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </>

    )
}