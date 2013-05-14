jquery-dom-tmpl
=====================

HTML テンプレートを DOM で用意して DOM のまま操作する jQuery プラグイン

存在理由はこんな感じ ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

tmplBind
--------------------
DOM 上のテンプレートに値を設定。
Transparency と違い、`input:radio` の同一 name 属性グループ単位の checked 設定に対応。

	$("#direct-bind").tmplBind({
		input1: "input text",
		input2: 123,
		checkbox1: true,
		radio1: "1",
		select1: "11"
	});

tmplClone
--------------------
DOM 上のテンプレートを clone して値を設定。値設定は内部で上記 tmplBind を使用するのでそちらを参照。

	$("#item-template > *").tmplClone({
		text1: "text1a"
	}).appendTo($("#clone-list"));

tmplSelectOpts
--------------------
select タグ内の option タグを配列から動的に作成。引数は value, text を持つオブジェクトの配列。

	$("select[name=select1]").tmplSelectOpts([
		{value: "", text: ""},
		{value: "1", text: "select1"},
		{value: "2", text: "select2"}
	]);

tmplRadios
--------------------
input:radio 及び対応する label を配列から動的に作成。引数は value, text を持つオブジェクトの配列。

	$("#radios").tmplRadios([
		{value: "1", text: "radio1"},
		{value: "2", text: "radio2"}
	]);

tmplList
--------------------

	$("#direct-list").tmplList([
		{text2: "text2a"},
		{text2: "text2b"}
	]);
	