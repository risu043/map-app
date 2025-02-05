<img src="https://github.com/risu043/map-app/blob/main/public/images/readme1.png" width="600" alt="readme1">

下関市のおでかけスポットのレビューアプリです。

## 使用したもの

[![My Skills](https://skillicons.dev/icons?i=next,ts,prisma,postgres,supabase)](https://skillicons.dev)<br>

- React Google Map
- Supabase Auth
- Supabase Strage

## 目標

- React Google Map の使い方を学ぶ
- Supabase の使い方を学ぶ

## 作ろうと思ったきっかけ

- 児童館に掲示されている市内地図に、訪れた人達がお薦めのおでかけスポットを付箋で書き込んでいる。
- こうした地域の情報を google map と組み合わせたら面白そうだと感じた。

## アプリの遊び方

- マップからスポットを探せる。
- リストからスポットの検索・絞り込みができる。
- ユーザー登録をすると、スポットの追加・編集、コメント・お気に入り機能が使用できる

## 工夫したとこと

- Supabase Auth を用いてユーザー登録・ログイン・パスワードリセット・プロフィール編集機能を実装した。
- Auth の User テーブルは fetch に制限があるので、User テーブルの操作時に別途 Profile テーブルが複製されるようにした。
- 画像投稿機能にプレビュー表示機能を追加した。
- 画像投稿エラーを防ぐため、画像アップロード中は post できないようにした。
- 検索用の API ルートで filter、category クエリを受け付けるようにし、検索・絞り込み機能を実装した。
- 検索用の API ルートの設定を force-dynamic に設定することで、ルートが動的にレンダリングされるようにした。

## 改善したいところ

- Supabase Auth で作成した User テーブルの id を schema.prisma で共有できない。
- Supabase Strage の無料枠に 50MB までの制限がある。

## ER 図

<img src="https://github.com/risu043/map-app/blob/main/public/images/readme3.png" width="600" alt="readme3">

## 画面遷移図

<img src="https://github.com/risu043/map-app/blob/main/public/images/readme2.png" width="600" alt="readme2">

## env

DATABASE_URL=接続プーリング機能を用いて DB に接続する url(ポート 6543)<br>
DIRECT_URL=直接 DB に接続する url(ポート 5432)<br>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
