Ext.define('iskolicka.view.LessonDetail', {
	extend: 'Ext.tab.Panel',
	xtype: 'lessondetail',
	counter: 0,
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',

		items: [
			{
				title: 'Detail',
				id: 'detail',
				iconCls: 'home',
				html: 'Detail - texty',
				listeners: {
					show: function() {
						var cnt = this.getParent().incrementCounter();
						this.setHtml('Detail - texty ' + cnt);
					}
				}
			},
			{
				title: 'Dictionary',
				iconCls: 'bookmarks',
				html: 'Slovicka - slovní zásoba'
			},
			{
				title: 'Test',
				iconCls: 'action',
				html: 'Testovani - zkoušení slovíček'
			}
		]
	},
	incrementCounter: function() {
		this.counter++;
		return this.counter;

	}
});

