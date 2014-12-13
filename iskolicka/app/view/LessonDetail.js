Ext.define('iskolicka.view.LessonDetail', {
	extend: 'Ext.tab.Panel',
	xtype: 'lessondetail',

	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',

		items: [
			{
				dataLoaded: false,
				title: 'Detail',
				iconCls: 'home',
				html: 'Detail - texty',
				badgeText: 'Tip.',
				listeners: {
					show: function () {
						this.getParent().foo(this);
					}
				}
			},
			{
				title: 'Dictionary',
				iconCls: 'bookmarks',
				html: 'Slovicka - slovní zásoba',
				initialize: function () {
					this.setHtml("stranka 2");
				},
				listeners: {
					show: function () {
						this.getParent().foo(this);
					}
				}
			},
			{
				title: 'Test',
				iconCls: 'action',
				html: 'Testovani - zkoušení slovíček',
				listeners: {
					show: function () {
						this.getParent().foo(this);
					}
				}
			}
		]
	},
	foo: function (page) {
		if (page.dataLoaded) {
			return;
		}
        page.setHtml(this.getText());
		page.dataLoaded = true;
	},
	detail: function (id) {
		var result = $.ajax({
			url: "http://mobile.iskolicka.cz/script/ajaxScript.php?id=" + id,
			dataType: 'html',
			async: false
		}).responseText;
		return result;
	},
	getText: function () {
		return this.detail(this.config.data["firstName"]);
	}
});