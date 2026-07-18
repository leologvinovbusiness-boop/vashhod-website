# Vash Hod Website

Сайт настольных игр ручной работы.

## Домен

- Основной: `vashhod.online`
- Редирект: `your-move.ru` → `vashhod.online`

## Как развернуть на GitHub Pages

### 1. Создать репозиторий

1. Зайди на https://github.com/new
2. Название репозитория: `vashhod-website`
3. Сделай его **Public**
4. Нажми **Create repository**

### 2. Загрузить файлы

Вариант A — через сайт GitHub:
1. Открой созданный репозиторий
2. Нажми **Uploading an existing file**
3. Загрузи все файлы из папки `github-pages/` проекта

Вариант B — через командную строку:
```bash
cd C:/LeoGames/vash-hod_shop_2/github-pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/vashhod-website.git
git push -u origin main
```

### 3. Включить GitHub Pages

1. В репозитории зайди в **Settings** → **Pages**
2. В разделе **Source** выбери **Deploy from a branch**
3. Выбери ветку `main`, папку `/(root)`
4. Нажми **Save**
5. В разделе **Custom domain** введи `vashhod.online`
6. Нажми **Save**
7. Дождись проверки DNS (может занять до 24 часов)

### 4. Настроить DNS

В панели управления доменом `vashhod.online` (где ты покупал домен) установи DNS-записи:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | vashhod.online |

### 5. Редирект your-move.ru

`your-move.ru` должен переадресовывать на `vashhod.online`. Обычно это настраивается в панели регистратора домена (Reg.ru) — раздел **Web-переадресация** или **Redirect**.

## Примечание

GitHub Pages поддерживает только статические сайты (HTML/CSS/JS). Форма заказа отправляет данные в Google Apps Script, поэтому продолжит работать.
