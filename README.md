для запуска проекта node версии 21 выше

npm install для установки зависимостей
npm run dev для запуска проекта

структура проекта
├── src/
│ ├── api/ # билдер запросов при настоящем ендпойнте будет api.base.js где будет бэйз и нтерцепторы. Интерфейсы долдны быть прописаны отдельнов types.js
│ │ ├── appeals.js  
│ │ └── index.js
│ │
│ ├── components/
│ │ ├── ui/ # переиспользуемы юай компоненты
│ │ │ ├── Button/
│ │ │ ├── Card/
│ │ │ ├── SearchInput/
│ │ │ ├── StatCard/
│ │ │ ├── StatusBadge/
│ │ │ └── index.js
│ │ │
│ │ ├── layout/ # основной layout
│ │ │ ├── Header/
│ │ │ ├── Sidebar/
│ │ │ ├── Footer/
│ │ │ ├── MainLayout/
│ │ │ └── index.js
│ │ │
│ │ ├── features/ # компоненты приложения
│ │ │ ├── AppealsTable/
│ │ │ ├── AppealsMap/
│ │ │ ├── AppealModal/
│ │ │ └── index.js
│ │ │
│ │ └── index.js
│ │
│ ├── hooks/ # кастомные хуки
│ │ ├── useAppeals.js
│ │ └── index.js
│ │
│ ├── pages/ # рендер страниц
│ │ ├── DashboardPage/
│ │ ├── TablePage/
│ │ ├── MapPage/
│ │ ├── StatisticsPage/
│ │ ├── ReportsPage/
│ │ └── index.js
│ │
│ ├── data/
│ │ └── data.json # данные
│ │
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── index.css
│
├── index.html
├── package.json
└── vite.config.js
