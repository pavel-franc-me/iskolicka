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


function getDetail(id) {
    Ext.data.aj
    var result =  $.ajax({
        url:"http://mobile.iskolicka.cz/script/ajaxScript.php?id="+id,
        dataType: 'html',
        async: false
    }).responseText;
    return result;
}
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

