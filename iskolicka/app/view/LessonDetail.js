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
        this.request(this.getData().firstName);
    },

    request : function(id) {
        var me = this;
        $.ajax({
            url:"http://mobile.iskolicka.cz/script/ajaxScript.php?id="+id,
            dataType: 'html',
            success : function(result) {
                me.setHtml(result);
            },
            error: function(x, y) {
                console.log('Cannot connect server ' + y);
            }
        });
    }
});
