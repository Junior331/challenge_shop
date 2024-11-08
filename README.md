# Challenge Shop

## App

- https://challenge-shop.vercel.app/

## Principais Tecnologias utilizadas

- Next
- daisyUI
- firebase
- Tailwind
- Typescript

## Instalação

- Clone o repositório com
  ```
  git clone https://github.com/Junior331/challenge_shop
  ```
- É necessario ter o Node 20x ou superior instalado
- Para iniciar o servidor de desenvolvimento rode os comandos abaixo

```
yarn
yarn dev
```

### To do

- [x] Criar estrutura inicial do projeto
- [x] Implementação de Theme e Style
- [x] Criar componentes
- [x] Criar tela de SignIn
- [x] Criar tela de SignUp
- [x] Criar tela de Listagem dos produtos
- [x] Criar tela de Detalhes do produto
- [x] CRUD do produtos (GET - POST - PUT - DELETE)

  ### Pages

     - [x] Produtos
     - [x] Details

  ### Components

  ## Elements

     - [x] Input
     - [x] Button

  ## Organism

  - [x] Layout
  - [x] LayoutAbstract

  ## Modules

     - [X] Cards
     - [x] Modal
     - [x] Header
     - [x] Snackbar

### Descrição da estrutura do projeto

- `Átomo (elements)`: Os átomos são componentes básicos e individuais, como botões, inputs, ícones, etc. Um menu lateral geralmente é composto por diversos elementos, como ícones, textos, talvez até mesmo botões para navegação, e cada um desses elementos pode ser considerado um átomo. No entanto, o menu lateral como um todo é mais complexo do que apenas um único átomo.

- `Molécula (modules)`: As moléculas são compostas por átomos e têm uma funcionalidade mais complexa. Um menu lateral poderia ser considerado uma molécula se fosse composto por vários átomos (como botões, ícones, etc.) agrupados de uma maneira específica para uma função específica. No entanto, um menu lateral geralmente representa uma parte maior e mais significativa da interface do usuário.

- `Organismo (organism)`: Os organismos são componentes mais complexos que combinam vários átomos e/ou moléculas para formar uma parte significativa de uma interface. Um menu lateral se encaixa nessa definição, pois geralmente consiste em uma combinação de vários elementos (como itens de menu, ícones, títulos, etc.) agrupados para formar uma parte distinta e funcional da interface do usuário.

- `Pages`: As páginas geralmente representam as diferentes rotas da aplicação, cada uma correspondendo a uma URL específica. As páginas são componentes que são renderizados quando o usuário navega para uma determinada rota. Elas são responsáveis por exibir o conteúdo relevante para essa rota específica e podem conter outros componentes, como formulários, listas, gráficos, etc. As páginas geralmente são compostas por uma combinação de componentes de apresentação e lógica, e podem ser estruturadas de acordo com as necessidades da aplicação.

- `Utils`: desempenha um papel crucial na organização e eficiência do código da aplicação. Ela abriga uma variedade de utilitários que são essenciais para diferentes partes da aplicação, ex: (endpoints, renderCustom, types, utils).

### Estrutura do projeto

    ├── src/
    │   ├── app/
    │   │   ├── assets/
    │   │   │   └── images/
    │   │   │   │   ├── icons/
    │   │   │   │   │   └── index
    │   │   │   │   ├── import-png.d
    │   │   │   │   ├── import-svg.d
    │   │   │   │   └── index
    │   │   ├── components/
    │   │   │   ├── elements/
    │   │   │   │   ├── Input
    │   │   │   │   ├── Select
    │   │   │   │   ├── Button
    │   │   │   │   ├── ControllerTheme
    │   │   │   │   └── index
    │   │   │   ├── modules/
    │   │   │   │   ├── Header
    │   │   │   │   ├── Snackbar
    │   │   │   │   ├── GenericModal
    │   │   │   │   └── index
    │   │   │   └── organism/
    │   │   │   │   ├── Layout
    │   │   │   │   ├── CardProduct
    │   │   │   │   ├── ProductForm
    │   │   │   │   ├── LayoutAbstract
    │   │   │   │   ├── CardProductDetails
    │   │   │   │   └── index
    │   │   ├── contexts/
    │   │   │   ├── Search
    │   │   │   └── Snackbar
    │   │   ├── firebase/
    │   │   │   └── firebase
    │   │   ├── hooks/
    │   │   │   └── axiosAdapter
    │   │   ├── pages/
    │   │   │   ├── (auth)/
    │   │   │   │   ├── signIn
    │   │   │   │   └── signUp
    │   │   │   ├── products/
    │   │   │   │   ├── [id]/
    │   │   │   │   └── product
    │   │   ├── state/
    │   │   │   └── provider
    │   │   ├── styles/
    │   │   │   └── globals
    └───────└── utils/
    │   │   │   ├── utils
    │   │   │   ├── types
    │   │   │   └── endpoints

- O diretório `src/` contém todos os componentes do projeto, organizados de acordo com o padrão atomic.
  Cada componente é classificado como `átomo (atom)`, `molécula (molecule)` ou `organismo (organism)`, conforme
  sua complexidade e reutilização.

