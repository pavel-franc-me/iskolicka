Ext.define('iskolicka.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel'
        },
        control: {
            'lessonlist': {
                disclose: 'showDetail'
            }
        }
    },

    showDetail: function(list, record) {
        console.log('Record = %o', record.getData());
        this.getMain().push({
            xtype: 'lessondetail',
            data: record.getData()
        })
    }

});
