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
        this.setTitle(this.config.data["lastName"]);
        this.setHtml(getDetail(this.config.data["firstName"]));
    }
});


function getDetail(id) {
    var result =  $.ajax({
        url:"http://mobile.iskolicka.cz/script/ajaxScript.php?id="+id,
        dataType: 'html',
        async: false
    }).responseText;
    console.log('----------------- Result -----------------Result=%o', result)
    return result;
   //return "ahoj";
}

