Ext.define('iskolicka.view.Test', {
    extend: 'Ext.dataview.List',
    xtype: 'personlist',
    config: {
        itemTpl: '{last}, {first}',
        store: Ext.create('Ext.data.Store', {
            sorters: 'last',
            autoLoad: true,
            fields: [
                {name: 'first', type: 'string'},
                {name: 'last', type: 'string'}
            ],
            data: [
                {first: 'Aaron', last: 'Karp'},
                {first: 'Baron', last: 'Chandler'},
                {first: 'Bryan', last: 'Johnson'},
                {first: 'David', last: 'Evans'},
                {first: 'John', last: 'Clark'},
                {first: 'Norbert', last: 'Taylor'},
                {first: 'Jane', last: 'West'}
            ]
        })
    }
});