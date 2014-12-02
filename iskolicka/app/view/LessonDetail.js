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
                html: [
                    'Detail - texty'
                ].join("")
            },
            {
                title: 'Dictionary',
                iconCls: 'bookmarks',
                html: [
                    'Slovicka - slovní zásoba'
                ].join("")
            },
            {
                title: 'Test',
                iconCls: 'action',
                html: [
                    'Testovani - zkoušení slovíček'
                ].join("")
            }
        ]
    }
});


function getDetail(id) {
    var result =  $.ajax({
        url:"script/ajaxScript.php?id="+id,
        dataType: 'html',
        async: false
    }).responseText;
    return result;
}
/*
Ext.define('iskolicka.view.LessonDetail', {
    extend: 'Ext.Panel',
    xtype: 'lessondetail',

    config: {
        title: 'Hello!',
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: [
            'Hello {lastName}!'
        ]
    },

    initialize: function() {
        this.setTitle(this.getData().lastName);
        this.setHtml(getDetail(this.getData().firstName));
    }
});
*/



/*
 var ajax = Ext.Ajax.request({
 url: 'ajax_demo/sample.json',
 success: function(response, opts) {
 var obj = Ext.decode(response.responseText);
 console.dir(obj);
 },
 failure: function(response, opts) {
 console.log('server-side failure with status code ' + response.status);
 }
 });
 */

