# MK Data Front-End Project

Esse é o projeto Front-End para o desafio do MK Data. Aqui escreverei o meu processo de desenvolvimento
com alguns detalhes sobre o projeto.

## Executar

Para instalar o projeto rode `npm install` na pasta raiz, e logo após rode `ng-serve` para executá-lo.

## Estrutura do Projeto

Como primeiro passo, desenhei um esboço da estrutura do projeto, desta forma posso ter uma base de
como arquitetar os componentes, as rotas e já estruturar o estado da aplicação.

```
    |-- src
            |-- app
            |-- core
                |-- auth
                |-- header
            |-- modules
                |-- clientes
                    |-- cadastro
                        |- cadastro.component.ts
                        |- cadastro.component.html
                        |- ...
                    |-- consulta
                        |- consulta.component.ts
                        |- consulta.component.html
                        |- ...
                    |-- clientes-routes.module.ts
                    |-- clientes.module.ts
                    |-- clientes.component.ts
                    |-- clientes.component.scss
                    |-- clientes.component.html
            |-- shared
                |-- directives
                |-- components
                |-- models
                ...
            |-- store
                |-- app.reducers.ts
        |-- assets
            |-- img
            |-- scss
        |-- environment
```

## Primeiros Passos

Com a estrutura feita, desenhei um esboço de como cada componente deveria aparecer na tela e como
dividi-lo em blocos, como com o componente de `consulta`, ele deverá ter um componente filho para pesquisar e
outro para mostrar os clientes.

Com esse esboço fica mais fácil também entender o estado de cada componente e módulo.

### Step 1: Gerenciamento de Estado

Para solução de estado, optei por usar o NgRx que é uma implementação do Redux para o Angular. Mesmo que
a aplicação seja simples, gosto de pensar que um dia ela poderá expandir e ficar mais complexa.

### Step 2: Authenticação

TODO

## Ferramentas

* **[Angular](https://angular.io/)** - 9.1.6
* **[NgRx](https://ngrx.io/)** - 6.5.4
* **[Angular Material](https://material.angular.io/)** - 9.2.4
