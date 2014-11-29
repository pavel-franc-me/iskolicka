/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'iskolicka',

    requires: [
        'Ext.MessageBox',
        'Ext.TitleBar',
        'Ext.Video'
    ],

    views: [
        'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,
    scrollable: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('iskolicka.view.Main'));
        //Ext.Viewport.add(Ext.create('iskolicka.view.Search'));
        var listConfiguration = this.getListConfiguration();
        Ext.Viewport.add(listConfiguration);

    },

    getListConfiguration: function() {
        return {
            xtype: 'list',
            ui: 'round',
            pinHeaders: false,
            itemTpl: '{firstName} {lastName}',
            store: this.getStore(),
            emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
            items: [
                {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'iSkolicka.cz'
                },
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
                                clearicontap: this.onSearchClearIconTap,
                                keyup: this.onSearchKeyUp
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
        };
    },

    getStore: function() {
        if (!this.store) {
            this.store = Ext.create('Ext.data.Store', {
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
        return this.store;
    },

    onSearchKeyUp: function(field) {
        var value = field.getValue(),
            store = this.getStore();

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

    onSearchClearIconTap: function() {
        this.getStore().clearFilter();
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
