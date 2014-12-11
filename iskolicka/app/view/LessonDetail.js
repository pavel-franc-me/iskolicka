Ext.define('iskolicka.view.LessonDetail', {
    extend: 'Ext.tab.Panel',
    xtype: 'lessondetail',

    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            {
                dataLoaded : false,
                title: 'Detail',
                iconCls: 'home',
                html: 'Detail - texty',
                badgeText: 'Tip.',
                initialize: function() {
                    console.log("console....%o",this)
                    this.setHtml("stranka 1");
                },
                listeners: {
                    show: function() {
                        if(!this.dataLoaded) {
                            this.setHtml(this.getParent().getText());
                            this.dataLoaded = true;
                        }
                    }
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
    getText : function() {
        return this.detail(this.config.data["firstName"]);
    }
});