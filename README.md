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
                |-- customers
                    |- customer
                        |- customer.component.ts
                        |- customer.component.html
                        |- ...
                    |- customer-group
                        |- customer-group.component.ts...
                        |- customer-group.component.html
                        |- ...
                    |-- consulta
                        |- consulta.component.ts
                        |- consulta.component.html
                        |- ...
                    |-- clientes-routes.module.ts
                    |-- clientes.module.ts
                    |-- clientes.component.ts
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

### Step 2: Autenticação

Nesta etapa criei o componente de Login, que será o primeiro que o usuário verá. Como é um componente
relativamente simples, decidi usar TD - Template Driven forms. Quando a autenticação é feita, um objeto contendo
as informações da sessão é criado e guardado no LocalStorage. Juntamente com isso, um timer é disparado com base no
session_duration, quando esse valor é atingido o usuário é deslogado e seu objeto no LS destruído. Em caso de refresh
o `app.component` dispara uma ação para verificar se existe um objeto de sessão no LS e se ele é vado, caso verdadeiro,
o usuário é autenticado automaticamente. Também criei um Guard que assegura que o usuário está logado. Tudo isso 
está contido no Auth Module.

### Step 3: Customer Module

O Customer Module conterá tudo que é referente a feature de Clientes, ele é Lazy Loaded no `app.module.ts`.
As rotas serão organizadas: 
```
 ./clientes
 .../cliente
    .../cadastro
    .../edit
 .../grupo
    .../cadastro
    .../edit
 .../consulta
```

Utilizei o mesmo componente tanto para a criação como para edição de Customer e CustomerGroup. 
Para o cadastro de cliente (CustomerEdit) fiz uso do Reactive Forms do Angular, com validações Async para
verificar se o CPF/CNPJ já existia. Também utilizei a biblioteca NgxMask para criar as máscaras dos campos.
O campo Grupos é buscado via API toda vez que a tela de Cadastro e Edição é carregada, para sempre ter valores atualizados.

Um Detalhe, que devido a estar usando Spring Data REST como API, a inserção de relacionamentos OneToMany e ManyToMany são feitas
por URL, por exemplo, para inserir uma entidade CustomerGroup a um Customer foi necessário passar o URL deste CustomerGroup
por exemplo como propriedade no campo `customerGroup: 'http://localhost:4300/api/customer-groups/2'` do cliente a ser enviado. Para
esse tipo de transação, o Util CustomerMapper foi criado.

Um Async Validator foi criado tanto para Customer quanto para o CustomerGroup a fim de ver se os campos chaves são únicos.

### Step 4: Busca

A funcionalidade de busca está contida no Customer Module como `Search`. Esse component tem seu próprio estado, assim como `Customer`e
`CustomerGroup` e guard o resultado das buscas nele. A Busca é realizada de modo que, nenhum campo é obrigatório e sua pesquisa é 
case insensitive. Quando uma busca é feita, a ação "startSearch" é disparada, fazendo uma requisição tanto para o endpoint de `Customer`
quanto de `CustomerGroup`, esses valores são combinados com o `forkJoin` e atribuídos ao estado do componente `Search`.

## Ferramentas

* **[Angular](https://angular.io/)** - 9.1.6
* **[NgRx](https://ngrx.io/)** - 6.5.4
* **[NgRx-Store-Logger](https://www.npmjs.com/package/ngrx-store-logger)** - 0.2.4
* **[Ngx-Mask](https://github.com/JsDaddy/ngx-mask)** - 9.1.2
* **[Ng-Bootstrap](https://ng-bootstrap.github.io/)** - 0.2.4
* **[Angular Material](https://material.angular.io/)** - 9.2.4
