import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
        <div className='login'>
            <form className='forms-login'>
                <div className="intro-login">
                    <Link to="/"><img className='logo-login' src="imgs/Fergalicci-preto.png" alt="Fergalicci" /></Link>
                </div>

                <div className="campos-login">
                    <div className="modal-input">
                        <input
                            type="email"
                            name="email"
                            placeholder='  E-mail'
                            required
                        />
                    </div>

                    <div className="modal-input">
                        <input
                            type="password"
                            name="password"
                            placeholder='  Senha'
                            required
                        />
                    </div>
                </div>

                <button type='submit' className='btn-login'>Entrar</button>

                <a href="">Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default Login