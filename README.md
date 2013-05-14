jquery-clone-template
=====================

HTML テンプレートを DOM で用意して clone する jQuery プラグイン

存在理由はこんな感じ ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

調べてみたら、同様の思想で作られた下記のテンプレートエンジンを見つけたので、内部でコレを使うことにする。

Transparency: https://github.com/leonidas/transparency

tmplClone
--------------------
DOM 上のテンプレートを clone して値を設定。

	$("#item-template > *").tmplClone({
		input1: "input text",
		input2: 123,
		checkbox1: true,
		radio1: "1",
		select1: "11"
	}).appendTo($("#example"));

tmplSelectOpts
--------------------
select タグ内の option タグを配列から動的に作成。引数は value, text を持つオブジェクトの配列。

	$("select[name=select1]").tmplSelectOpts([
		{value: "", text: ""},
		{value: "1", text: "select1"},
		{value: "2", text: "select2"}
	]);
