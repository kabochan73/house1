# フロントエンド ファイル設計

## 命名の方針
Laravel Breeze標準の `resources/js/Layouts/`（ページの外枠コンポーネント：`AuthenticatedLayout.jsx`など）と、このアプリのドメイン概念「保存した部屋のレイアウト」が名前として衝突する。
そのため、コード上でドメイン側（部屋の配置データ）を指す際は **`RoomDesign`** という呼び方に統一する（DB設計の`layouts`/`layout_items`テーブル名はそのまま）。

## ディレクトリ構成

```
resources/js/
  Pages/                          # Inertiaのページ（ルーティング単位）
    Welcome.jsx                   # トップページ（紹介＋使い方）
    Auth/
      Login.jsx
      Register.jsx
    Dashboard.jsx                 # ログイン後：RoomDesignカード一覧＋NEWボタン
    RoomDesigns/
      Edit.jsx                    # 部屋選択＋家具配置（編集ページ本体）
    Share.jsx                     # 公開シェアページ（静止画＋コピーボタン）

  Layouts/                        # Breeze標準：ページの外枠
    AuthenticatedLayout.jsx       # ヘッダー（ロゴ＋ログアウト）付きの枠
    GuestLayout.jsx               # トップ/ログイン画面用の枠

  Components/
    Scene/
      RoomCanvas.jsx              # <Canvas>・カメラ・ライト等のルート
      RoomModel.jsx               # 部屋テンプレートの壁・床（3種を切り替え表示）
      FurnitureInstance.jsx       # 配置済み家具1つ（GLTF読み込み＋TransformControls）
    Editor/
      FurnitureCatalogPanel.jsx   # サイドバー：カテゴリー別の家具選択
      DeleteRoomDesignButton.jsx  # サイドバー下部のDeleteボタン
    RoomPicker/
      RoomTemplateCard.jsx        # 部屋選択画面のカード
    Dashboard/
      RoomDesignCard.jsx          # ダッシュボードのカード（サムネイル表示）
    Common/
      Button.jsx
      Header.jsx

  stores/
    useEditorStore.js             # Zustand：配置済み家具リスト・選択中アイテム・現在の部屋テンプレート

  hooks/
    useCaptureThumbnail.js        # 保存時にcanvasをPNG化するhook

  constants/
    roomTemplates.js              # 3部屋のメタ情報（id・名前・3Dモデルの切り替えキー）

  app.jsx                         # Inertiaエントリーポイント

public/
  models/furniture/                # Kenney Furniture KitのGLTFファイル（DBのmodel_pathが指す先）
  storage/thumbnails/               # 保存されたRoomDesignのサムネイルPNG
```

## 補足
- 家具カタログ（`furniture_catalog`テーブル）のデータは、Controllerから各Inertiaページに props として渡す（例：編集ページに渡し、`FurnitureCatalogPanel`で表示）。
- `useEditorStore`（Zustand）はRoomDesigns/Edit.jsx内でのみ使うローカルな編集状態。保存時にstoreの内容をInertiaの`router.post`でLaravelに送信する。
