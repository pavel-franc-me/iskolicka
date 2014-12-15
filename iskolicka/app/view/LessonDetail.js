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
				listeners: {
					show: function () {
						this.getParent().foo(this);
					}
				}
			},
			{
				title: 'Test',
				iconCls: 'action',
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
        console.log("page ...%o",page);
        page.setHtml(this.getText(page.title));
		page.dataLoaded = true;
	},
	detail: function (id,title) {
		var result = $.ajax({
			url: "http://mobile.iskolicka.cz/script/ajaxScript.php?id=" + id + "&title=" + title,
			dataType: 'html',
			async: false
		}).responseText;
		return result;
	},
	getText: function (title) {
		return this.detail(this.config.data["firstName"],title);
	}
});