jquery-dom-tmpl
=====================
DOM ベースの HTML テンプレートエンジン。  jQuery プラグインとして動作する。

テンプレートを DOM として用意して DOM のまま (＝テキスト化せずに) 操作する。存在理由 ->
[JavaScript テンプレートエンジン vs DOM 直接操作](https://gist.github.com/froop/5492623)

tmplBind
--------------------
テンプレートに値を設定する。

### DOM 要素の選択方法
属性 id, class, name のいずれかが合致する要素が対象。オプション find で変更可能。

### 値の設定方法

* 値が Boolean 型の checkbox, radio: `jQuery#prop("checked", value)`
* 上記以外の checkbox: `jQuery#val(valueArray)`
* 上記以外の radio: `jQuery#val([value])`
* 上記以外の input, select タグ: `jQuery#val(value)`
* 上記以外のタグ: `jQuery#text(value)`

設定方法は、オプション bindCallback で変更可能。  
設定値は、オプション convertCallback で変更可能。  

### options

#### find
DOM 要素の選択方法を変更する。`jQuery#find()` の引数になるセレクターを指定する。

#### bindCallback
DOM 要素へ値を設定する関数を任意のものに変更する。

#### convertCallback
値をそのままではなく変換してから適用する場合に関数を指定する。

### sample
簡単な例は以下。詳細な例は example.html を参照。

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
		<div id="nest1">
			<span id="nest11"></span>
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
		prop1: true,
		nest1: {
			nest11: "nested text"
		}
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
		<div id="nest1">
			<span id="nest11">nested text</span>
		</div>
	</div>


tmplUnbind
--------------------
tmplBind の逆。DOM から JSON を生成。
使用例は example.html を参照。

### options 
tmplBind にはない独自のオプション。

#### trim
値の先頭と末尾の空白文字を削除する。空白文字とは半角/全角スペースと改行文字。


tmplAppend
--------------------
子要素を `jQuery#clone()` して値を設定し、子要素群の末尾に追加する。戻り値として追加した要素を返す。
値設定については、内部で `tmplBind()` を使用するのでそちらを参照。

### sample

#### HTML

	<ol id="clone-list">
		<li class="clone1"></li>
	</ol>

#### JavaScript

	$("#clone-list").tmplAppend({clone1: "clone11"});
	$("#clone-list").tmplAppend({clone1: "clone12"}).css({color: "blue"});

#### result

	<ol id="clone-list">
		<li class="clone1">clone11</li>
		<li class="clone1" style="color: blue">clone12</li>
	</ol>


tmplList
--------------------
繰り返し要素に値を一括設定。内部で `tmplAppend()` を使用するのでそちらを参照。

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


tmplBindClone
--------------------
使い方は tmplBind と同じ。毎回空のテンプレートを復元してから値を設定するのが tmplBind との違い。
具体的には、元テンプレートを直接に使用するのではなく、退避したものをコピーして使用する。


tmplInit
--------------------
テンプレート化する。すでにテンプレート化されている場合は初期状態のDOMに戻す。


tmplEmpty
--------------------
テンプレート化し、DOMから取り除く。


tmplSelectOpts
--------------------
内部コード値と表示文字列の組み合わせである繰り返し要素を配列から動的に作成。
引数はプロパティに value, text を持つオブジェクトの配列。下記のテンプレートに対応する。

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
