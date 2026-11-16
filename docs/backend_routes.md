# バックエンド ルート設計

`routes/web.php` に定義する想定。Inertia構成のため、全ルートはControllerから `Inertia::render(...)` を返す（別途`routes/api.php`は用意しない）。

## 公開（ログイン不要）

| Method | URI | Controller@Action | 説明 |
|---|---|---|---|
| GET | `/` | `WelcomeController@index` | トップページ（紹介＋使い方） |
| GET / POST | `/login` | Breeze標準 | ログイン |
| GET / POST | `/register` | Breeze標準 | 新規登録 |
| POST | `/logout` | Breeze標準 | ログアウト |
| GET | `/share/{roomDesign:share_token}` | `ShareController@show` | 公開シェアページ（サムネイル表示、操作なし） |

## 認証必須（`auth`ミドルウェア）

| Method | URI | Controller@Action | 説明 |
|---|---|---|---|
| GET | `/dashboard` | `DashboardController@index` | RoomDesignカード一覧（3列グリッド）＋NEWボタン |
| GET | `/room-designs/create` | `RoomDesignController@create` | 部屋選択画面（テンプレート3種） |
| POST | `/room-designs` | `RoomDesignController@store` | 選んだ`room_template`でRoomDesign作成 → 編集ページへリダイレクト |
| GET | `/room-designs/{roomDesign}/edit` | `RoomDesignController@edit` | 家具配置（編集）ページ。ダッシュボードのカードから直接遷移 |
| PUT | `/room-designs/{roomDesign}` | `RoomDesignController@update` | 家具配置（layout_items）＋サムネイルを保存 |
| DELETE | `/room-designs/{roomDesign}` | `RoomDesignController@destroy` | サイドバー下部のDeleteボタンから呼ぶ |
| POST | `/share/{roomDesign:share_token}/copy` | `ShareController@copy` | シェアページの「自分のダッシュボードに追加」。コピーを作成し新しい編集ページへリダイレクト |

## 補足
- `{roomDesign}` と `{roomDesign:share_token}` はRoute Model Bindingで、それぞれ`id`／`share_token`カラムから解決する。
- `RoomDesignController@update` / `@destroy` では、Policyで「リクエストユーザーがそのRoomDesignの所有者か」をチェックする（他人のものを編集・削除できないように）。
- `ShareController@show` 以外のすべてのルートは `auth` ミドルウェアで保護する。
- コピー処理（`ShareController@copy`）は、対象の`layouts`レコード＋紐づく`layout_items`を複製し、新しい`user_id`・新しい`share_token`を割り振って保存する（[db_design.md](db_design.md)参照）。
