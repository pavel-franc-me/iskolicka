Ext.define('iskolicka.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainpanel',
    requires: [
        'iskolicka.view.LessonList',
        'iskolicka.view.LessonDetail'
    ],

    config: {
        items: [{
            xtype: 'lessonlist',
            title: 'iSkolicka'
        }]
    }
});