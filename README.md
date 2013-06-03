jquery-dom-tmpl
=====================

HTML テンプレートを DOM で用意して DOM のまま操作する jQuery プラグイン

存在理由はこんな感じ ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

tmplBind
--------------------
DOM 上のテンプレートに値を設定する。

### DOM 要素の選択方法
属性 id, class, name のいずれかが合致する要素が対象。オプション find で変更可能。

### 値の設定方法

* checkbox, radio: `jQuery#prop("checked")`
* 上記以外の input, select タグ: `jQuery#val()`
* 上記以外のタグ: `jQuery#text()`

設定方法は、オプション bindCallback で変更可能。  
設定値は、オプション convertCallbacks で変更可能。  

### options

#### find
DOM 要素の選択方法を変更する。`jQuery#find()` に使われるセレクターを指定する。

#### bindCallback
DOM 要素へ値を設定する関数を任意のものに変更する。

#### convertCallbacks
値をそのままではなく変換してから適用する場合に関数を指定する。

### sample
詳細な例は example.html を参照。

#### HTML

	<div id="example1">
		<div id="text1"></div>
		<div>
			<label class="text2"></label>
			<input name="input1">
		</div>
		<select name="select1">
			<option value=""></option>
			<option value="s1">select1</option>
			<option value="s2">select2</option>
		</select>
		<div id="find1"><input></div>
		<div>
			<a id="attr1">link</a>
			<input name="prop1">
		</div>
	</div>

#### JavaScript

	$("#example1").tmplBind({
		text1: "by id",
		text2: "by class",
		input1: "by name",
		select1: "s1",
		alias1: "alias find",
		attr1: "http://example.com/",
		prop1: true
	}, {
		find: {
			alias1: "#find1 > input"
		},
		bindCallback: function ($elements, value, name) {
			if (name === "attr1") {
				$elements.attr("href", value);
			} else if (name === "prop1") {
				$elements.prop("disabled", value);
			} else {
				$elements.tmplBindValue(value);
			}
		}
	});

#### result

	<div id="example1">
		<div id="text1">by id</div>
		<div>
			<label class="text2">by class</label>
			<input name="input1" value="by name">
		</div>
		<select name="select1">
			<option value=""></option>
			<option value="s1" selected>select1</option>
			<option value="s2">select2</option>
		</select>
		<div id="find1"><input value="alias find"></div>
		<div>
			<a id="attr1" href="http://example.com/">link</a>
			<input name="prop1" disabled>
		</div>
	</div>


tmplUnbind
--------------------
tmplBind の逆。DOM の値を JSON に設定。
使用例は example.html を参照。


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
内部コード値と表示文字列を組み合わせた選択肢項目を配列から動的に作成。
引数はプロパティに value, text を持つオブジェクトの配列。

下記のテンプレートに対応する。

* select タグ内の option タグ
* input タグ (radio, checkbox を想定) 及び対応する label タグ

### options

#### canEmpty
先頭に空の選択肢を追加するなら `true`。デフォルトは `false`。

#### emptyText
canEmpty プロパティが `true` の場合の表示文字列。デフォルトは空文字列 (`""`)。


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
		{value: "s1", text: "select11"},
		{value: "s2", text: "select12"}
	], {
		canEmpty: true
	});
	$("#radios").tmplSelectOpts([
		{value: "r1", text: "radio11"},
		{value: "r2", text: "radio12"}
	], {
		canEmpty: true,
		emptyText: "none"
	});

#### result

	<select name="select1">
		<option value=""></option>
		<option value="s1">select1</option>
		<option value="s2">select2</option>
	</select>
	<span id="radios">
		<span><input name="radio1" type="radio" value=""><label>none</label></span>
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
