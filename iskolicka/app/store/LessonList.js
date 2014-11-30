Ext.define('iskolicka.store.LessonList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'iskolicka.model.LessonList',
        data:(function(){
                return $.ajax({
                    url:"http://mobile.iskolicka.cz/script/ajaxScript.php",
                    dataType: 'json',
                    async: false
                });
              })()
    }
});
