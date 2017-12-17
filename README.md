# 静的HTMLの構築テンプレート
gulpを使ってサイト構築を高速化します。


## このテンプレートを使うために
npmがインストールされていることが前提です。<br>
gitからこのテンプレートをcloneしてきたらドキュメントルートで以下のコマンドを入力しましょう。
~~~
npm install
~~~


## 開発時に叩くコマンド
source配下のファイルの変更をgulpで監視します。<br>
開発、修正時には以下のコマンドをドキュメントルートで叩いてから作業すること。
~~~
npm run watch
~~~
↑プロジェクト内の/node_modules/.bin/gulp watchを起動
グローバルのnode_modulesまでのパスが通っている場合は「gulp watch」でも可


### その他便利コマンド
その他、開発に便利なコマンド

#### サーバー立ち上げ
~~~
npm run webserver
(gulp webserver)
~~~


#### サーバー立ち上げ + ファイルの修正監視
~~~
npm run gulp
(gulp)
~~~


#### 画像圧縮
~~~
npm run imagemin
(gulp imagemin)
~~~


## 監視を止めるコマンド
~~~
ctrl + c
~~~


## ディレクトリ構成
~~~~
project
 ├ doc                   # ドキュメント
 │
 ├ public                # 公開ディレクトリ
 │ ├ css                 # コンパイル後のcssディレクトリ
 │ │ └ main.css
 │ │
 │ ├ js                  # コンパイル後のjsディレクトリ
 │ │ └ main.js
 │ │
 │ └ index.html          # コンパイル後のhtml
 │
 ├ src                   # 作業ディレクトリ
 │ ├ pug                 # pugディレクトリ
 │ │ ├ common            # 共通（layout, hearder, footerなど）
 │ │ │ └ _layout.pug
 │ │ └ pages             # ページ
 │ │   └ index.pug
 │ │
 │ ├ sass                # sassディレクトリ
 │ │ └ main.scss         # メインscss
 │ │
 │ └ ts                  # jsディレクトリ
 │   ├ module
 │   │ └ _util.ts      # 共通モジュール
 │   │
 │   ├ class  
 │   │ └ _member.ts    # クラス
 │   │
 │   └ main.ts           # メイン処理
 │
 ├ node_modules          # nodeモジュール（git管理はしない）
 ├ .gitignore
 ├ gulpfile.js           # タスク管理ファイル
 ├ tsconfig.json         # TypeScriptのコンパル設定
 ├ webpack.config.js     # JSのモジュール管理
 ├ gulpfile.js           # タスク管理ファイル
 └ README.md
~~~~


## html
Pug

## js
TypeScriptで書く。
結合して１ファイルにする。
jQueryとVueをwebpackでモジュール管理

## css
sass + postCSS
