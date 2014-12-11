Ext.define('iskolicka.view.LessonDetail', {
    extend: 'Ext.tab.Panel',
    xtype: 'lessondetail',
    text1: 'blabla',
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Detail',
                iconCls: 'home',
                html: 'Detail - texty',
                badgeText: 'Tip.',
                initialize: function() {
                    console.log("console....%o",this)
                    this.setHtml("stranka 1");
                }

            },
            {
                title: 'Dictionary',
                iconCls: 'bookmarks',
                html: 'Slovicka - slovní zásoba',
                initialize: function() {
                    this.setHtml("stranka 2");
                }
            },
            {
                title: 'Test',
                iconCls: 'action',
                html: 'Testovani - zkoušení slovíček',
                initialize: function() {
                    this.setHtml("stranka 3");
                }
            }
        ]
    },
    detail: function(id) {
        var result =  $.ajax({
         url:"http://mobile.iskolicka.cz/script/ajaxScript.php?id="+id,
         dataType: 'html',
         async: false
         }).responseText;
         return result;
    },
    initialize: function() {
        console.log("parent....%o",this.items.items[0].html)
        this.items.items[0].setHtml(this.detail(this.config.data["firstName"]));

    }



});