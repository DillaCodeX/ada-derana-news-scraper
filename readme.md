# 📰 Ada Derana News Scraper (v1.0.0)

A lightweight API and scraper for Ada Derana Sinhala news content. This package allows you to easily access hot news headlines, summaries, and links from the Ada Derana Sinhala news website.

## 🚀 Installation

```bash
npm install ada-derana-news-scraper
```

## ✨ Features

- 🌐 Express.js API endpoint for hot news
- 🔍 Standalone scraper function
- 🔌 Easy integration with existing Node.js applications
- 🖼️ Returns news images, summary, and links

## 📘 Usage

### 🖥️ Using a Custom Server (server.js)

You can create a simple server to run the API:

```javascript
// server.js
const express = require('express');
const adaDerana = require('ada-derana-news-scraper');
require('dotenv').config(); // Load environment variables

const server = adaDerana.createAdaDeranaNewsAPI();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/hotNews`);
});
```

### 🛠️ As an Express API

```javascript
const { createAdaDeranaNewsAPI } = require('ada-derana-news-scraper');
require('dotenv').config(); // Load environment variables

const app = createAdaDeranaNewsAPI();

// Optional: Add more routes or middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ada Derana API server running on port ${PORT}`);
});
```

### 🧰 As a Scraper

```javascript
const { scrapeHotNews } = require('ada-derana-news-scraper');

async function getNews() {
  try {
    const news = await scrapeHotNews();
    console.log(news);
  } catch (error) {
    console.error('Error scraping news:', error);
  }
}

getNews();
```

## 🔧 Environment Configuration

You can configure the application using environment variables:

### Available Environment Variables:
- `PORT`: The port number for the server (default: `3000`)

### Setting Environment Variables:

#### Using .env file (recommended for development):
Create a `.env` file in your project root:

```
PORT=8080
```

Then install the dotenv package:

```bash
npm install dotenv
```

And import it in your server file as shown in the usage examples above.

#### Using command line (for production):

```bash
# Linux/Mac
PORT=8080 node server.js

# Windows Command Prompt
set PORT=8080 && node server.js

# Windows PowerShell
$env:PORT=8080; node server.js
```

## 📚 API Documentation

### 🔄 API Endpoints

#### 📋 GET `/hotNews`

Returns the latest hot news headlines from Ada Derana Sinhala.

**Response Format:**
```json
{
  "success": true,
  "code": 200,
  "creator": {
    "name": "H.A. Diluka Hetti Arachchi",
    "github": "https://github.com/DillaCodeX"
  },
  "count": 5,
  "data": [
    {
      "title": "News headline",
      "summary": "News summary",
      "time": "Published time",
      "url": "https://sinhala.adaderana.lk/news-url",
      "image": "https://sinhala.adaderana.lk/image.jpg",
      "comments_url": "https://sinhala.adaderana.lk/news-url#disqus_thread"
    }
    // More news items...
  ]
}
```

**Error Response Format:**
```json
{
  "success": false,
  "code": 500,
  "error": "Failed to fetch AdaDerana hot news"
}
```

### ⚙️ Functions

#### 🔧 `createAdaDeranaNewsAPI()`

Creates an Express application with the AdaDerana News API routes configured.

**Returns:** Express application instance with the following endpoints:
- `GET /hotNews` - Returns the latest hot news headlines

#### 🔍 `scrapeHotNews()`

Scrapes hot news headlines directly from Ada Derana Sinhala website.

**Returns:** Promise that resolves to an array of news objects with the following properties:

  - `title`: The headline of the news article
  - `image`: News image URL
  - `summary`: A snippet of the news article
  - `url`: The full URL to the news article
  - `comments_url`: Direct link to comments
  - `time`: The published time of the article

## 📝 License

MIT

## 👨‍💻 Author

- H.A. Diluka Hetti Arachchi ([@DillaCodeX](https://github.com/DillaCodeX))