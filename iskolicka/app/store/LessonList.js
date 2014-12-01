/**
 * Store for reading list of lessons from server
 */
Ext.define('iskolicka.store.LessonList', {
    // define server url for ajax requests
    sever_url : 'http://mobile.iskolicka.cz/script/ajaxScript.php',

    xtype: 'lessonListStore',
    extend: 'Ext.data.Store',

    config: {
        fields: ['firstName', 'lastName'],
    },
    /**
     * Constructor, we will read data from the server in this constructor
     * @param params
     */
    constructor: function(params) {
        var me = this;
        this.callParent(arguments);
        $.ajax({
            url: this.sever_url,
            dataType: 'json',
            success: function(data) {
                me.setData(data);
            }
        });
    }
});
