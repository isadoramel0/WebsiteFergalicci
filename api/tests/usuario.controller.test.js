import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from './index.js';

describe('UsuarioController', () => {
  it('deve retornar erro se a confirmação de senha não corresponder à senha', async () => {
    const novoUsuario = {
      nomeUsuario: 'João Krasinski',
      email: 'joao123@dominio.com',
      senha: '12345678',
      confirmacaoSenha: '87654321'
    };

    const response = await request(app)
      .post('/usuarios/cadastrar')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain('A confirmação de senha não corresponde à senha informada');
  });

  it('deve retornar erro se a senha não tiver pelo menos 8 caracteres', async () => {
    const novoUsuario = {
      nomeUsuario: 'João Krasinski',
      email: 'joao123@dominio.com',
      senha: '12345',
      confirmacaoSenha: '12345'
    };

    const response = await request(app)
      .post('/usuarios/cadastrar')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain('A senha deve conter no mínimo 8 caracteres');
  });

  it('deve retornar erro se a senha não contiver pelo menos uma letra', async () => {
    const novoUsuario = {
      nomeUsuario: 'João Krasinski',
      email: 'joao123@dominio.com',
      senha: '12345678',
      confirmacaoSenha: '12345678'
    };

    const response = await request(app)
      .post('/usuarios/cadastrar')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain('A senha deve conter ao menos uma letra');
  });

  it('deve retornar erro se a senha não contiver pelo menos um número', async () => {
    const novoUsuario = {
      nomeUsuario: 'João Krasinski',
      email: 'joao123@dominio.com',
      senha: 'abcdefgh',
      confirmacaoSenha: 'abcdefgh'
    };

    const response = await request(app)
      .post('/usuarios/cadastrar')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain('A senha deve conter ao menos um número');
  });

  it('deve fazer login com sucesso quando as credenciais estão corretas', async () => {
    const usuario = {
      email: 'ma@dominio.com',
      senha: 'senhaBoa0'
    };

    // Primeiro, cria o usuário para garantir que ele existe no banco de dados
    await request(app)
      .post('/usuarios/cadastrar')
      .send({
        nomeUsuario: 'Mariana Maria',
        email: 'ma@dominio.com',
        senha: 'senhaBoa0',
        confirmacaoSenha: 'senhaBoa0'
      });

    // Em seguida, tenta fazer login com as credenciais corretas
    const response = await request(app)
      .post('/usuarios/login')
      .send(usuario);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('deve impedir o login pois a senha está incorreta', async () => {
    const usuario = {
      email: 'ma@dominio.com',
      senha: 'senhaRuim0'
    };

    // Primeiro, cria o usuário para garantir que ele existe no banco de dados
    await request(app)
      .post('/usuarios/cadastrar')
      .send({
        nomeUsuario: 'Mariana Maria',
        email: 'ma@dominio.com',
        senha: 'senhaBoa0',
        confirmacaoSenha: 'senhaBoa0'
      });

    // Em seguida, tenta fazer login com as credenciais corretas
    const response = await request(app)
      .post('/usuarios/login')
      .send(usuario);

    expect(response.status).toBe(401);
    expect(response.body.erro).toContain("Usuário ou senha estão incorretos!");
  });

  it('deve impedir o login pois o email está incorreto', async () => {
    const usuario = {
      email: 'ma@dominio.me',
      senha: 'senhaBoa0'
    };

    // Primeiro, cria o usuário para garantir que ele existe no banco de dados
    await request(app)
      .post('/usuarios/cadastrar')
      .send({
        nomeUsuario: 'Mariana Maria',
        email: 'ma@dominio.com',
        senha: 'senhaBoa0',
        confirmacaoSenha: 'senhaBoa0'
      });

    // Em seguida, tenta fazer login com as credenciais corretas
    const response = await request(app)
      .post('/usuarios/login')
      .send(usuario);

    expect(response.status).toBe(401);
    expect(response.body.erro).toContain("Usuário ou senha estão incorretos!");
  });

});