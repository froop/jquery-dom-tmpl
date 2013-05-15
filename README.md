jquery-dom-tmpl
=====================

HTML テンプレートを DOM で用意して DOM のまま操作する jQuery プラグイン

存在理由はこんな感じ ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

tmplBind
--------------------
DOM 上のテンプレートに値を設定。
[Transparency](https://github.com/leonidas/transparency) と違い、
`input:radio` や `input:checkbox` に対する、同一 name 単位の checked 設定に対応。

### sample

#### HTML

	<div id="direct-bind">
		<div id="text1"></div>
		<div><span id="text2"></span></div>
		<input name="input1">
		<input name="input2">
		<input name="checkbox1" type="checkbox" value="1">
		<select name="select1">
			<option value=""></option>
			<option value="s1">select1</option>
			<option value="s2">select2</option>
		</select>
		<div id="radios">
			<span><input name="radio1" type="radio" value="r1"><label>radio1</label></span>
			<span><input name="radio1" type="radio" value="r2"><label>radio2</label></span>
		</div>
		<div id="checks">
			<span><input name="checkbox2" type="checkbox" value="c1"><label>check1</label></span>
			<span><input name="checkbox2" type="checkbox" value="c2"><label>check2</label></span>
			<span><input name="checkbox2" type="checkbox" value="c3"><label>check3</label></span>
		</div>
		<div><label id="custom11"></label><input name="custom12"></div>
		<div id="custom2">
			<a id="custom21"></a>
			<input name="custom22">
		</div>
	</div>

#### JavaScript

	$("#direct-bind").tmplBind({
		text1: "root text",
		text2: "nested text",
		input1: "input text",
		input2: 123,
		checkbox1: true,
		select1: "s1",
		radio1: "r1",
		checkbox2: ["c1", "c3"],
		alternate1: "alt1",
		alternate21: "alt21",
		alternate22: "alt22",
		custom21: "http://google.co.jp/",
		custom22: true,
	}, {
		selector: {
			alternate1: "#custom11,[name=custom12]",
			alternate21: "#custom21",
			alternate22: "#custom2 > input",
		},
		attr: {
			custom21: "href"
		},
		prop: {
			custom22: "disabled"
		}
	});

#### result

	<div id="direct-bind">
		<div id="text1">root text</div>
		<div><span id="text2">nested text</span></div>
		<input name="input1" value="input text">
		<input name="input2" value="123">
		<input name="checkbox1" type="checkbox" value="1" checked>
		<select name="select1">
			<option value=""></option>
			<option value="s1" selected>select1</option>
			<option value="s2">select2</option>
		</select>
		<div id="radios">
			<span><input name="radio1" type="radio" value="r1" checked><label>radio1</label></span>
			<span><input name="radio1" type="radio" value="r2"><label>radio2</label></span>
		</div>
		<div id="checks">
			<span><input name="checkbox2" type="checkbox" value="c1" checked><label>check1</label></span>
			<span><input name="checkbox2" type="checkbox" value="c2"><label>check2</label></span>
			<span><input name="checkbox2" type="checkbox" value="c3" checked><label>check3</label></span>
		</div>
		<div><label id="custom11">alt1</label><input name="custom12" value="alt1"></div>
		<div id="custom2">
			<a id="custom21" href="http://google.co.jp/">alt21</a>
			<input name="custom22" value="alt22" disabled>
		</div>
	</div>

tmplAppend
--------------------
指定要素内のテンプレートを `clone()` して子要素を追加する。戻り値として追加した要素を返す。
値設定は内部で `tmplBind()` を使用するのでそちらを参照。

### sample

#### HTML

	<ol id="clone-list">
		<li class="clone1"></li>
	</ol>

#### JavaScript

	$("#clone-list").tmplAppend({clone1: "clone11"}).css({color: "red"});
	$("#clone-list").tmplAppend({clone1: "clone12"}).css({color: "blue"});

#### result

	<ol id="clone-list">
		<li class="clone1">clone11</li>
		<li class="clone1">clone12</li>
	</ol>

tmplSelectOpts
--------------------
内部値と表示文字列を組み合わせた選択肢項目を配列から動的に作成。
引数はプロパティに value, text を持つオブジェクトの配列。

下記のテンプレートに対応する。

* select タグ内の option タグ
* input タグ (radio, checkbox を想定) 及び対応する label タグ

### sample

#### HTML

	<select name="select1">
		<option></option>
	</select>
	<span id="radios">
		<span><input name="radio1" type="radio"><label></label></span>
	</span>

#### JavaScript

	$("select[name=select1]").tmplSelectOpts([
		{value: "", text: ""},
		{value: "o1", text: "select11"},
		{value: "o2", text: "select12"}
	]);
	$("#radios").tmplSelectOpts([
		{value: "r1", text: "radio11"},
		{value: "r2", text: "radio12"}
	]);

#### result

	<select name="select1">
		<option value=""></option>
		<option value="s1">select1</option>
		<option value="s2">select2</option>
	</select>
	<span id="radios">
		<span><input name="radio1" type="radio" value="r1"><label>radio1</label></span>
		<span><input name="radio1" type="radio" value="r2"><label>radio2</label></span>
	</span>

tmplList
--------------------
一覧を一括設定。値設定は内部で `tmplBind()` を使用するのでそちらを参照。

### sample

#### HTML

	<ol id="direct-list">
		<li class="list1"></li>
	</ol>

#### JavaScript

	$("#direct-list").tmplList([
		{list1: "list11"},
		{list1: "list12"}
	]);

#### result

	<ol id="direct-list">
		<li class="list1">list11</li>
		<li class="list1">list12</li>
	</ol>
