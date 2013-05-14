jquery-dom-tmpl
=====================

HTML テンプレートを DOM で用意して DOM のまま操作する jQuery プラグイン

存在理由はこんな感じ ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

調べてみたら、同様の思想で作られた下記のテンプレートエンジンを見つけたので、内部でコレを使うことにする。

Transparency: https://github.com/leonidas/transparency

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
DOM 上のテンプレートを clone して値を設定。

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
