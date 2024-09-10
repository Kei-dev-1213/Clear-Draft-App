import json from "./defaultArticles.json";

const howToUseForGitArticle = json.howToUseForGit;
const howToUseConsoleLog = json.howToUseConsoleLog;
const howToWork = json.howToWork;

const howToWork_text = `技術の進歩と共に、エンジニアの働き方も大きく変化しています。この記事では、現代のエンジニアの一般的な働き方と、効率的に仕事を進めるためのヒントを紹介します。

<br>

## リモートワークの普及

近年、特にCOVID-19パンデミック以降、リモートワークが急速に普及しました。多くのエンジニアが自宅やコワーキングスペースから仕事をすることが一般的になっています。

**リモートワークのメリット**:
- 通勤時間の削減
- 柔軟な勤務時間
- 集中できる環境の確保

**課題**:
- コミュニケーションの難しさ
- ワークライフバランスの管理

<br>

## アジャイル開発の採用

多くの企業がアジャイル開発手法を採用し、短いサイクルで開発と改善を繰り返しています。

**主な特徴**:
- スプリント単位での開発
- 定期的なスクラムミーティング
- 継続的なフィードバックと改善

<br>

## 継続的な学習

技術の進歩が速いIT業界では、継続的な学習が不可欠です。

**学習方法**:
- オンラインコースの受講
- 技術書の読書
- 勉強会やカンファレンスへの参加

<br>

## ワークライフバランス

長時間労働を避け、健康的な生活を送ることが重要です。

**ヒント**:
- 定時退社の習慣化
- 休暇の積極的な取得
- 趣味や運動の時間確保

<br>

## コラボレーションツールの活用

効率的な協業のために、様々なツールが使用されています。

**よく使用されるツール**:
- Slack（コミュニケーション）
- GitHub（バージョン管理）
- Jira（タスク管理）
- Zoom（ビデオ会議）

<br>

## 多様性と包括性

多様なバックグラウンドを持つメンバーが協力することで、イノベーションが促進されます。

**重要な点**:
- 異なる視点の尊重
- インクルーシブな職場環境の構築
- 公平な機会の提供

<br>

## まとめ

エンジニアの働き方は、技術の進歩と社会の変化に応じて常に進化しています。リモートワークやアジャイル開発の採用、継続的な学習、ワークライフバランスの重視など、様々な要素が現代のエンジニアの働き方を形作っています。

<br>

これらの要素を意識しながら、自分に合った働き方を見つけ、キャリアを発展させていくことが重要です。同時に、技術スキルだけでなく、コミュニケーション能力や問題解決能力も磨いていくことで、より価値のあるエンジニアとして成長できるでしょう。`;

const howToUseForGit_text = `Gitは現代のソフトウェア開発に欠かせないバージョン管理システムです。この記事では、Gitの基本的なコマンドと使い方を紹介します。

<br>

## リポジトリの作成

新しいGitリポジトリを作成するには、以下のコマンドを使用します。

\`\`\`bash
git init
\`\`\`

<br><br>

## 変更の追跡

ファイルの変更をステージングエリアに追加します。

\`\`\`bash
git add ファイル名
\`\`\`

すべての変更をステージングエリアに追加する場合：

\`\`\`bash
git add .
\`\`\`

<br><br>

## コミットの作成

ステージングエリアの変更をコミットします。

\`\`\`bash
git commit -m "コミットメッセージ"
\`\`\`

<br><br>

## ブランチの操作

新しいブランチを作成：

\`\`\`bash
git branch ブランチ名
\`\`\`

ブランチの切り替え：

\`\`\`bash
git checkout ブランチ名
\`\`\`

ブランチの作成と切り替えを同時に行う：

\`\`\`bash
git checkout -b ブランチ名
\`\`\`

<br><br>

## リモートリポジトリとの連携

リモートリポジトリを追加：

\`\`\`bash
git remote add origin リポジトリURL
\`\`\`

変更をリモートリポジトリにプッシュ：

\`\`\`bash
git push origin ブランチ名
\`\`\`

リモートリポジトリの変更を取得：

\`\`\`bash
git pull origin ブランチ名
\`\`\`

<br><br>

## 状態の確認

現在の作業ディレクトリの状態を確認：

\`\`\`bash
git status
\`\`\`

コミット履歴の確認：

\`\`\`bash
git log
\`\`\`

<br><br>

## マージ

他のブランチの変更を現在のブランチにマージ：

\`\`\`bash
git merge ブランチ名
\`\`\`

<br><br>

## まとめ

これらの基本的なGitコマンドを理解し、適切に使用することで、効率的なバージョン管理が可能になります。Gitの使い方に慣れることで、チーム開発やプロジェクト管理がスムーズになるでしょう。

<br>

Gitには他にも多くの機能がありますが、これらの基本的なコマンドを習得することで、日常的な開発作業の大部分をカバーできます。さらに詳細な使い方や高度な機能については、Gitの公式ドキュメントを参照することをおすすめします。`;

const howToUseConsoleLog_text = `# console.logの使い方

JavaScriptのデバッグや開発において、\`console.log()\`は非常に便利なツールです。この記事では、\`console.log()\`の基本的な使い方と、知っておくと便利なテクニックをいくつか紹介します。

<br/>

## 基本的な使い方

\`console.log()\`は、引数に渡された値をコンソールに出力します。

\`\`\`javascript
console.log('Hello, World!'); // 出力: Hello, World!
\`\`\`

<br/><br/>

## 複数の値を出力

カンマで区切ることで、複数の値を一度に出力できます。

\`\`\`javascript
let name = 'Alice';
let age = 30;
console.log('Name:', name, 'Age:', age);
// 出力: Name: Alice Age: 30
\`\`\`

<br/><br/>

## オブジェクトの出力

オブジェクトを出力する場合、その構造が展開されて表示されます。

\`\`\`javascript
let person = { name: 'Bob', age: 25 };
console.log(person);
// 出力: { name: 'Bob', age: 25 }
\`\`\`

<br/><br/>

## フォーマット指定子の使用

\`console.log()\`では、C言語のprintfに似たフォーマット指定子が使えます。

\`\`\`javascript
console.log('%s is %d years old', 'Charlie', 35);
// 出力: Charlie is 35 years old
\`\`\`

<br/><br/>

## スタイリング

ブラウザのコンソールでは、CSSスタイルを適用することもできます。

\`\`\`javascript
console.log('%cStyled text', 'color: blue; font-size: 20px;');
// 青色の20pxサイズのテキストが出力されます
\`\`\`

<br/><br/>

## まとめ

\`console.log()\`は単純ですが、適切に使用することで開発効率を大きく向上させることができます。デバッグ時だけでなく、アプリケーションの動作を理解する上でも非常に役立つツールです。

<br/>

以上が、\`console.log()\`の基本的な使い方と便利なテクニックです。これらを活用して、より効率的なJavaScript開発を行ってください。`;

export const defaultArticles = [
  {
    title: howToUseForGitArticle.title,
    tag: howToUseForGitArticle.tag,
    main_text: howToUseForGit_text,
    posted: howToUseForGitArticle.posted,
    ai_answer: howToUseForGitArticle.ai_answer,
  },
  {
    title: howToUseConsoleLog.title,
    tag: howToUseConsoleLog.tag,
    main_text: howToUseConsoleLog_text,
    posted: howToUseConsoleLog.posted,
    ai_answer: howToUseConsoleLog.ai_answer,
  },
  {
    title: howToWork.title,
    tag: howToWork.tag,
    main_text: howToWork_text,
    posted: howToWork.posted,
    ai_answer: howToWork.ai_answer,
  },
];
