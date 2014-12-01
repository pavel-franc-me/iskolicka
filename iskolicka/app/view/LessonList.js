/**
 * List view with filter edit. It's displaying list aof all lessons
 * The list can be filtered by filter field. When user click in one list
 * item, the corresponding lesson is opened
 */
Ext.define('iskolicka.view.LessonList', {
    extend: 'Ext.dataview.List',
    xtype: 'lessonlist',

    requires: [
        'Ext.Toolbar',
        'Ext.field.Search'
    ],
    config: {
        ui: 'round',
        pinHeaders: false,
        itemTpl: '{firstName} {lastName}',
        store: 'LessonList',
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
                            clearicontap: function() {
                                this.up('lessonlist').onSearchClearIconTap();
                            },
                            keyup: function() {
                                this.up('lessonlist').onSearchKeyUp(this.getValue());
                            }
                        }
                    },
                    { xtype: 'spacer' }
                ]
            }
        ]
    },
    /**
     * New character has been entered into filter field. We have set filter in data store
     * @param value value in search text field
     */
    onSearchKeyUp : function(value) {
        var store = this.getStore();

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
    },
    /**
     * User clicked to clear filter button. We have clear filter in data store
     */
    onSearchClearIconTap: function() {
        this.getStore().clearFilter();
    }
});