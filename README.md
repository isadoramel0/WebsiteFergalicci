# Projeto_WebsiteFergalicci

<p align="center">
    <img src="https://github.com/user-attachments/assets/088aec06-8c7b-45f9-8396-8f6b0b3cbec5" width="40" height="60">
</p>


<p align="center"> Projeto Final da disciplina de Engenharia de Software - Universidade Federal de Lavras </p>

## Tabela de Opções
- [Visão Geral](#visao-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Diretório](#estrutura-de-diretorio)
- [Regras e Padrões de uso do Git](#regras-e-padroes-de-uso-do-git)
- [Regras e Boas Práticas de Codificação](#regras-e-boas-praticas-de-codificacao)
- [Desenvolvedores](#desenvolvedores)

## Visão Geral

O sistema Fergalicci atua como uma maneira de promover uma marca de alto padrão por postagens que influenciem o estilo de vida dos visitantes.
As principais funcionalidades são:

<ul>
  <li>Cadastro de usuários leitores do sistema</li>
  <li>Login de usuários leitores do sistema</li>
  <li>Login do administrador do sistema</li>
  <li>Controle sobre os produtos ofertados no website(adicionar, excluir, alterar, listar)</li>
  <li>Controle sobre as postagens publicadas no website(adicionar, excluir, alterar, listar)</li>
</ul>

### Tipos de Usuários

O sistema prevê:
<ul>
    <li>Usuários <b>Leitores</b> do website</li> 
    <li>Um usuário <b>Administrador</b>
</ul>

## Tecnologias Utilizadas

<a name="tecnologias"></a>

### Front-end
- <b>Linguagem:</b> JavaScript
    - <b>Framework:</b> React v18.2.0

### Back-end
-  <b>Linguagem:</b> JavaScript
    - <b>Framework:</b> Express v4.16 

### Banco de Dados
- <b>PostgreeSQL</b> - v16.0

## Estrutura de Diretório

<a name="estrutura-diretorio"></a>

```sh
Projeto_WebsiteFergalicci/
|-- Documentação/
|   |-- Diagramas/
|   |-- Requisitos/
|-- Padrões Adotados/
|-- Testes/
|-- api/
|-- web/
|-- README.md
```
## Regras e Padrões de uso do Git


### Commits

- Escrever mensagens de commit claras e objetivas, utilizando o gerúndio para descrever a alteração (ex.: "Implementando funcionalidade X").
- Garantir que cada commit seja atômico, focando em uma única mudança lógica.
- Certificar de vincular os commits às respectivas issues registradas no backlog.


### Branches

- Realizar merge das branches com a branch *"main"* apenas após a conclusão dos testes e a validação das funcionalidades.
- Criar branches específicas para tratar correções críticas.
- Utilizar apenas letras minúsculas para nomear branches.

### Organização
- Manter uma estrutura clara de diretório, separando a documentação do código.

### Arquivos ignorados
- Listar no arquivo `.gitignore` extensões de arquivos gerados durante a compilação ou execução, como `.class`, `.jar` e `.log`.
- Inserir no arquivo `.gitignore` pastas e extensões de arquivos relacionados a dependências externas. (Ex.:`/.mvn/, /target/`).
- Inserir no arquivo `.gitignore` a extensão dos arquivos de configuração que são específicos para o ambiente de desenvolvimento local. (Ex.: `.env`).

## Regras e Boas Práticas de Codificação

<a name="regras-codificacao"></a>

- Identar o código corretamente, definindo de forma clara o escopo das classes, métodos, estruturas condicionais, de repetição, entre outros.
- Nomear classes, métodos e variáveis de forma que o propósito deles fique evidente.
- Utilizar a convenção de nomenclatura *Camel Case* em classes, métodos e variáveis.
- Evitar forçar classes a implementar interfaces que não utilizam. O ideal é utilizar interfaces específicas e focadas, que forneçam apenas as funcionalidades necessárias para as classes que as implementam.
- Cada função, classe ou módulo deve ter uma responsabilidade única e bem definida. Tornado-se mais fácil a compreensão do propósito de cada parte do código.
- Sempre que possível, escrever código claro e legível, de forma que sua finalidade seja evidente. O uso de comentários é feito apenas quando necessário, para explicar decisões específicas ou partes do código mais complexas.
- Evitar repetição de código. A duplicação pode levar a erros e tornar o código mais difícil de manter.
- Estruturar o código de maneira lógica, agrupando funções e classes relacionadas, e mantendo conceitos semelhantes próximos uns dos outros. Isso melhora a navegabilidade e a compreensão geral do projeto.

## Desenvolvedores

`Jhuan Carlos Sabaini Dassie` <br>
`Isadora Gomes Melo Cunha` <br>
`Ana Clara Carvalho Nascimento`
