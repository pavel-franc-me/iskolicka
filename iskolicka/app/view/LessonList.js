Ext.define('iskolicka.view.LessonList', {
    extend: 'Ext.dataview.List',
    xtype: 'lessonlist',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        ui: 'round',
        pinHeaders: false,
        itemTpl: '{firstName} {lastName}',
        store: getStore(),
        onItemDisclosure: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    { xtype: 'spacer' },
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search...',
                        listeners: {
                            scope: this,
                            clearicontap: onSearchClearIconTap,
                            keyup: onSearchKeyUp
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                docked: 'bottom',
                xtype: 'titlebar',
                items: [
                    {
                        title: 'Welcome',
                        iconCls: 'home',
                        styleHtmlContent: true,
                        scrollable: true,
                        items: [{
                            docked: 'top',
                            xtype: 'titlebar',
                            title: 'Welcome to Sencha Touch 2'
                        }]
                    },
                    {
                        title: 'Get Started',
                        iconCls: 'action',
                        items: [
                            {
                                docked: 'top',
                                xtype: 'titlebar',
                                title: 'Getting Started'
                            },
                            {
                                xtype: 'video',
                                url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                                posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                            }
                        ]
                    }
                ]
            }

        ]
    }
});
var store;

function getStore() {
    if (store === undefined) {
        store = Ext.create('Ext.data.Store', {
            fields: ['firstName', 'lastName'],
            data:(function(){
                return $.ajax({
                    url:"http://mobile.iskolicka.cz/script/ajaxScript.php",
                    dataType: 'json',
                    async: false
                });
            })()
        });
    }
    return store;
}

function onSearchKeyUp(field) {
    var value = field.getValue(),
        store = getStore();

    store.clearFilter(!!value);

    if (value) {
        var searches = value.split(','),
            regexps = [],
            i, regex;
        for (i = 0; i < searches.length; i++) {
            //if it is nothing, continue
            if (!searches[i]) continue;
            regex = searches[i].trim();
            regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            regexps.push(new RegExp(regex.trim(), 'i'));
        }
        store.filter(function(record) {
            var matched = [];
            for (i = 0; i < regexps.length; i++) {
                var search = regexps[i],
                    didMatch = search.test(record.get('firstName') + ' ' + record.get('lastName'));
                matched.push(didMatch);
            }
            return (regexps.length && matched.indexOf(true) !== -1);
        });
    }
}

function onSearchClearIconTap() {
    getStore().clearFilter();
}