# Gift Shop Bot

Telegram бот на Grammy для управления магазином подарков.

## Структура проекта

```
src/
├── modules/
│   ├── api     # Модуль для связи с апи бэкенда
├── ├── bot     # Модуль бота
│   ├── botApi  # Модуль апи бота
├── libs/
├── middlewares/
└── app.ts
```

## Запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте .env файл:
```env
BOT_TOKEN=test
...
```

3. Запустите бота:
```bash
npm run dev
```

## Cкрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Компиляция TypeScript
- `npm run start` - Запуск собранного бота

## Технологии

- Node.js + TypeScript
- Grammy
- Axios для HTTP запросов
- Dotenv для конфигурации 