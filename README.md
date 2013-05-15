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
内部値と表示文字列を組み合わせた選択肢項目を配列から動的に作成。
引数はプロパティに value, text を持つオブジェクトの配列。

テンプレートは下記に対応する。

* select タグ内の option タグ
* input タグ (:radio, :checkbox を想定) 及び対応する label タグ

	<select name="select1">
		<option></option>
	</select>
	<span id="radios">
		<span><input name="radio1" type="radio"><label></label></span>
	</span>

	$("select[name=select1]").tmplSelectOpts([
		{value: "", text: ""},
		{value: "o1", text: "option1"},
		{value: "o2", text: "option2"}
	]);
	$("#radios").tmplSelectOpts([
		{value: "r1", text: "radio1"},
		{value: "r2", text: "radio2"}
	]);

tmplList
--------------------

	$("#direct-list").tmplList([
		{text2: "text2a"},
		{text2: "text2b"}
	]);
	