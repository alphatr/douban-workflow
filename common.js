const request = require('request');

const REQUEST_TIMEOUT = 5000;
const HTTP_STATIC_OK = 200;
const QUERY_COUNT = 5;
const API_KEY = '05b2e24806124f0f1118a6d81236ed2d';

/**
 * 获取远程 API 内容
 * @param  {String} url    URL
 * @param  {String} query  搜索词
 * @return {Promise}       异步结果
 */
const getRemote = function getRemote(url, query) {
    const option = {
        url,
        qs: {
            q: query,
            count: QUERY_COUNT,
            apikey: API_KEY
        },
        timeout: REQUEST_TIMEOUT
    };

    return new Promise((resolve, reject) => {
        request(option, (error, response, body) => {
            'use strict';

            if (error) {
                console.log(`get remote content error:${error.toString()} ## ${url}`);
                reject(error);
            }

            if (response.statusCode !== HTTP_STATIC_OK) {
                console.log(`get remote content error:errorCode(${response.statusCode}) ## ${url}`);
                reject(response.statusCode);
            }

            let res = null;
            try {
                res = JSON.parse(body);
            } catch (err) {
                console.log(`parse json error: ${err.toString()}`);
                reject(body);
            }

            resolve(res);
        });
    });
};

/**
 * 获取评分星级
 * @param  {Number} val 评分值
 * @param  {Number} max 最大值
 * @return {String}     星级字符串
 */
const rating = function rating(val, max) {
    const MAX_RATING = 5;
    const star = '★★★★★☆☆☆☆☆';

    const rat = Math.max(Math.min(Math.round(val / max * MAX_RATING), MAX_RATING), 0);
    return `${star.substr(MAX_RATING - rat, MAX_RATING)}(${val} 分)`;
};

/**
 * 获取豆瓣音乐搜索结果
 * @param  {String} query 搜索词
 * @return {Promise}      异步结果
 */
const listMusic = function getMovie(query) {
    const url = 'https://api.douban.com/v2/music/search';
    return getRemote(url, query).then(res => res.musics.map(subject => {
        const subtitle = [
            `表演者: ${subject.attrs.singer.join(',')}`,
            `评分: ${rating(subject.rating.average, subject.rating.max)}`,
            `标签: ${subject.tags.map(tag => tag.name).join(',')}`
        ].join(' ');

        return {
            uid: subject.id,
            title: subject.title,
            arg: subject.alt,
            quicklookurl: subject.alt,
            icon: 'images/music.png',
            subtitle,
            valid: true
        };
    }));
};

/**
 * 获取豆瓣电影搜索结果
 * @param  {String} query 搜索词
 * @return {Promise}      异步结果
 */
const listMovie = function getMovie(query) {
    const url = 'https://api.douban.com/v2/movie/search';
    return getRemote(url, query).then(res => res.subjects.map(subject => {
        const subtitle = [
            `年份: ${subject.year}`,
            `评分: ${rating(subject.rating.average, subject.rating.max)}`,
            `类型: ${subject.subtype}`,
            `别名: ${subject.original_title}`
        ].join(' ');

        return {
            uid: subject.id,
            title: subject.title,
            arg: subject.alt,
            quicklookurl: subject.alt,
            icon: 'images/movie.png',
            subtitle,
            valid: true
        };
    }));
};

/**
 * 获取豆瓣图书搜索结果
 * @param  {String} query 搜索词
 * @return {Promise}      异步结果
 */
const listBooks = function getMovie(query) {
    const url = 'https://api.douban.com/v2/book/search';
    return getRemote(url, query).then(res => res.books.map(subject => {
        const subtitle = [
            `作者: ${subject.author.join(',')}`,
            `评分: ${rating(subject.rating.average, subject.rating.max)}`,
            `标签: ${subject.tags.map(tag => tag.name).join(',')}`
        ].join(' ');

        return {
            uid: subject.id,
            title: subject.title,
            arg: subject.alt,
            quicklookurl: subject.alt,
            icon: 'images/books.png',
            subtitle,
            valid: true
        };
    }));
};

module.exports = {
    listMovie,
    listMusic,
    listBooks
};
