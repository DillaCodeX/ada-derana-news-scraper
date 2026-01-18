const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://sinhala.adaderana.lk';
const HOT_NEWS_URL = `${BASE_URL}/sinhala-hot-news.php`;

const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Accept-Language': 'si-LK,si;q=0.9,en;q=0.8'
    }
});

/* ---------------- SCRAPER ---------------- */
async function scrapeHotNews() {
    try {
        const response = await axiosInstance.get(HOT_NEWS_URL);
        const $ = cheerio.load(response.data);
        const newsData = [];

        $('div.news-story').each((_, el) => {
            const titleEl = $(el).find('h2 a');
            const imageEl = $(el).find('.thumb-image img');
            const commentsEl = $(el).find('.comments a');
            const relativeUrl = titleEl.attr('href');

            newsData.push({
                title: titleEl.text().trim(),
                image: imageEl.attr('src') || null,
                summary: $(el).find('.story-text > p').text().trim(),
                url: relativeUrl ? `${BASE_URL}/${relativeUrl}` : null,
                comments_url: commentsEl.attr('href') ? `${BASE_URL}/${commentsEl.attr('href')}` : null,
                time: $(el).find('.comments span').text().replace('|', '').trim()
            });
        });

        return newsData;
    } catch (err) {
        console.error('[Scraper ERROR]', err.message);
        return []; // Return empty array if scraping fails
    }
}

/* ---------------- API ---------------- */
function createAdaDeranaNewsAPI() {
    const app = express();

    app.get('/hotNews', async (req, res) => {
        try {
            const data = await scrapeHotNews();

            res.json({
                success: true,
                code: 200,
                creator: {
                    name: 'H.A. Diluka Hetti Arachchi',
                    github: 'https://github.com/DillaCodeX'
                },
                count: data.length,
                timestamp: new Date().toISOString(), // Added timestamp
                data
            });
        } catch (error) {
            console.error('[Ada Derana ERROR]', error.message);

            res.status(500).json({
                success: false,
                code: 500,
                error: 'Failed to fetch AdaDerana hot news',
                timestamp: new Date().toISOString() // Timestamp included on error
            });
        }
    });

    return app;
}

module.exports = {
    createAdaDeranaNewsAPI,
    scrapeHotNews
};
/* ---------------- EXPORTS ---------------- */