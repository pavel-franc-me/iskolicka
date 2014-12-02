Ext.define('iskolicka.view.LessonDetail', {
    extend: 'Ext.tab.Panel',
    xtype: 'lessondetail',
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Detail',
                iconCls: 'home',
                html: 'Detail - texty'
            },
            {
                title: 'Dictionary',
                iconCls: 'bookmarks',
                html: 'Slovicka - slovní zásoba'
            },
            {
                title: 'Test',
                iconCls: 'action',
                html: 'Testovani - zkoušení slovíček'
            }
        ]
    }



});

