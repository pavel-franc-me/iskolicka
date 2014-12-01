Ext.define('iskolicka.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            lessonlist: 'lessonlist'

        },
        control: {
            lessonlist: {
                itemtap: 'showDetail'
            }
        }

    },

    showDetail: function(list, index, item, record) {
        this.getMain().push({
            xtype: 'lessondetail',
            data: record.getData()
        })
    }

});
