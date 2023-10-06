# Movedor de XMLS

Movedor de XMLS é uma aplicação JavaScript que copia os XMLS de uma respectiva pasta e cola em outra criando subpastas com mil arquivos em cada, para facilitar o upload dos arquivos em uma plataforma que aceita apenas mil arquivos por vez.

# Requisitos

```bash
    NodeJS v18.16.0
    npm 9.5.1
```
[Clique aqui para instalar o NodeJS](https://nodejs.org/en)

# Instalação

Dentro do projeto executar o seguinte comando: 
    
```bash
  npm install
```

# Uso

- No aquivo `moveXML.bat` na primeira linha alterar o caminho para o caminho onde o projeto está.
- Criar pastas `XMLS` e `XMLS-para-copiar` na raiz do projeto.
- Colocar todos os XMLS que deseja copiar na pasta `XMLS-para-copiar` (não tem problema se houver subpastas dentro a aplicação vai percorre-las e copiar)
- Após fazer essas etapas iniciar o `moveXML.js` que os XML vão ser copiados e colocados em subpastas com mil cada dentro de `XMLS`

# Contribuições

- Fork o repositório
- Crie uma branch para a sua contribuição (`git checkout -b feature/nova-funcionalidade`)
- faça suas alterações e commit(`git commit -am 'Adicionei uma nova funcionalidade'`)
- push para branch (`git push origin feature/nova-funcionalidade`)
- Abra uma solicitação de pull