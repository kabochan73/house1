# 技術スタック

## バックエンド
- PHP + Laravel（最新版）
- Laravel Breeze（React + Inertiaスタック）で認証の雛形（name + passwordの簡易ログイン）
- Inertia.js（別途REST APIは用意せず、`routes/web.php` + Controllerで完結）
- DB：PostgreSQL

## フロントエンド
- React + Inertia Reactアダプタ
- Vite（Breeze標準のビルドツール）
- Tailwind CSS（スタイリング。[design_guidelines.md](design_guidelines.md)参照）
- React Three Fiber + `@react-three/drei`（3Dシーン・操作）
- Zustand（編集画面の状態管理）

## アセット
- Kenney.nl Furniture Kit（GLTFモデル、CC0ライセンス）

## バージョン（2026年11月時点の目安）

| カテゴリ | 技術 | バージョン | 備考 |
|---|---|---|---|
| 言語 | PHP | 8.5.x系 | 2027年末までアクティブサポート |
| フレームワーク | Laravel | 13.x（最新マイナー） | 2026/3リリースの現行メジャー |
| 認証 | Laravel Breeze | 最新版 | `composer require laravel/breeze --dev` |
| ブリッジ | Inertia.js | v3.9系 | v3でAxios廃止・ESM専用。Node 24以上が必須 |
| ランタイム | Node.js | 26 LTS（Lithium） | Inertia v3の要件を満たす |
| DB | PostgreSQL | 18.x系 | 19は2026/11/19 GA予定（執筆時点でRCの可能性） |
| フロント | React | 19.x | Inertia v3のReactアダプタ対応版 |
| ビルド | Vite | 最新版（7〜8系） | Breeze標準。Tailwind v4がVite 8対応済み |
| CSS | Tailwind CSS | v4.3系 | v4がデフォルト、Oxideエンジン採用 |
| 3D | @react-three/fiber | 8.18.x | React 18系と互換性のある最新版（9系はReact19必須のため不採用） |
| 3D | @react-three/drei | 9.122.x | TransformControls, Clone, OrbitControls等 |
| 3D | three | 0.180.x | |
| 状態管理 | Zustand | 5.0.x系 | 軽量、API変更少ない |

npm/Composerパッケージは変化が速いため、実際のセットアップ時に `composer create-project laravel/laravel` や `npm view <パッケージ名> version` で正確な最新版を確認して固定すること。

## 構成上の補足
- 家具カタログ（`furniture_catalog`テーブル）はDB管理、部屋テンプレートはフロント側の定数で管理（[db_design.md](db_design.md)参照）
- レイアウト保存時のサムネイルはcanvasキャプチャ（`gl.domElement.toDataURL('image/png')`）で生成し、PostgreSQLには画像パスを保存、実ファイルは`public/storage`配下に保存
