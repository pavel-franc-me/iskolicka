Ext.define('iskolicka.view.LessonDetail', {
    extend: 'Ext.Panel',
    xtype: 'lessondetail',

    config: {
        title: 'Details',
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: [
            'Hello {lastName}!'
        ]

    },

    initialize: function() {
        console.log('----------------- Initialized -----------------Result=%o', this);
        this.setHtml(getDetail(70));
    }
});


function getDetail(id) {
    var result =  $.ajax({
        url:"script/ajaxScript.php?id="+id,
        dataType: 'html',
        async: false
    }).responseText;
    console.log("Result=%o", result);
    return result;
   //return "ahoj";
}

