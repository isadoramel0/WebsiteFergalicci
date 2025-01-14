import React from 'react'
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  return (
    <div className='cadastro'>
        <form className='forms'>
            <div className="intro-cadastro">
                <Link to="/" ><img className='logo-cadastro' src="imgs/Fergalicci-preto.png" alt="Fergalicci" /></Link>
                <p>Cadastro</p>
            </div>

            <div className="campos">
                <div className="modal-input">
                    <input
                        type="text"
                        name="nome"
                        placeholder='  Nome'
                        required
                    />
                </div>

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

                <div className="modal-input">
                    <input
                        type="password"
                        name="password"
                        placeholder='  Confirmar sua senha'
                        required
                    />
                </div>
            </div>

            <button type='submit' className='btn-cadastro'>Cadastrar</button>
        </form>
    </div>
  )
}

export default Cadastro