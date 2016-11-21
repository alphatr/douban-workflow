const Alfred = require('alfred-workflow-nodejs');
const common = require('./common');

const actionHandler = Alfred.actionHandler;
const workflow = Alfred.workflow;
const Item = Alfred.Item;

workflow.setName('douban-workflow');

(function main() {
    actionHandler.onAction('douban', query => {
        Promise.all([
            common.listMovie(query),
            common.listMusic(query),
            common.listBooks(query)
        ]).then(values => {
            const list = [].concat.apply([], values);
            list.forEach(each => workflow.addItem(new Item(each)));

            if (!list.length) {
                workflow.addItem(new Item({
                    uid: 'douban',
                    title: '糟糕...',
                    arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                    icon: Alfred.ICONS.WARNING,
                    subtitle: '没找到符合条件的内容, 去豆瓣搜搜看？',
                    valid: true
                }));
            }

            workflow.feedback();
        }, () => {
            workflow.addItem(new Item({
                uid: 'douban',
                title: '糟糕...',
                arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                icon: Alfred.ICONS.WARNING,
                subtitle: '没找到符合条件的内容, 去豆瓣搜搜看？',
                valid: true
            }));

            workflow.feedback();
        });
    });

    actionHandler.onAction('movie', query => {
        common.listMovie(query).then(list => {
            list.forEach(each => workflow.addItem(new Item(each)));

            if (!list.length) {
                workflow.addItem(new Item({
                    uid: 'dobanmovie',
                    title: '糟糕...',
                    arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                    icon: Alfred.ICONS.WARNING,
                    subtitle: '没找到符合条件的影视, 去豆瓣搜搜看？',
                    valid: true
                }));
            }

            workflow.feedback();
        }, () => {
            workflow.addItem(new Item({
                uid: 'douban',
                title: '糟糕...',
                arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                icon: Alfred.ICONS.WARNING,
                subtitle: '没找到符合条件的影视, 去豆瓣搜搜看？',
                valid: true
            }));

            workflow.feedback();
        });
    });

    actionHandler.onAction('book', query => {
        common.listBooks(query).then(list => {
            list.forEach(each => workflow.addItem(new Item(each)));

            if (!list.length) {
                workflow.addItem(new Item({
                    uid: 'dobanbook',
                    title: '糟糕...',
                    arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                    icon: Alfred.ICONS.WARNING,
                    subtitle: '没找到符合条件的图书, 去豆瓣搜搜看？',
                    valid: true
                }));
            }

            workflow.feedback();
        }, () => {
            workflow.addItem(new Item({
                uid: 'douban',
                title: '糟糕...',
                arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                icon: Alfred.ICONS.WARNING,
                subtitle: '没找到符合条件的图书, 去豆瓣搜搜看？',
                valid: true
            }));

            workflow.feedback();
        });
    });

    actionHandler.onAction('music', query => {
        common.listBooks(query).then(list => {
            list.forEach(each => workflow.addItem(new Item(each)));

            if (!list.length) {
                workflow.addItem(new Item({
                    uid: 'dobanmusic',
                    title: '糟糕...',
                    arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                    icon: Alfred.ICONS.WARNING,
                    subtitle: '没找到符合条件的音乐, 去豆瓣搜搜看？',
                    valid: true
                }));
            }

            workflow.feedback();
        }, () => {
            workflow.addItem(new Item({
                uid: 'douban',
                title: '糟糕...',
                arg: `http://movie.douban.com/subject_search?search_text=${query}`,
                icon: Alfred.ICONS.WARNING,
                subtitle: '没找到符合条件的音乐, 去豆瓣搜搜看？',
                valid: true
            }));

            workflow.feedback();
        });
    });

    Alfred.run();
}());
