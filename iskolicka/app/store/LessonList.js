Ext.define('iskolicka.store.LessonList', {
    xtype: 'lessonListStore',
    extend: 'Ext.data.Store',
    //singleton : true,
    config: {
        fields: ['firstName', 'lastName'],
        data:(function(){
            return $.ajax({
                url:"http://mobile.iskolicka.cz/script/ajaxScript.php",
                dataType: 'json',
                async: false
            });
        })()
    }
});
