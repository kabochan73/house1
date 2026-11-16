# インフラ構成（Docker / Railway）

## ローカル開発（docker-compose）

| サービス | 内容 |
|---|---|
| `app` | Laravelコンテナ（PHP 8.5 + Apache）。ソースはボリュームマウントしてホットリロード |
| `db` | PostgreSQL 18コンテナ。データはボリュームで永続化 |
| `node` | Viteの開発サーバー用コンテナ（`npm run dev`、HMR用にポート開放） |

## Dockerfile（マルチステージ）

本番用（Railwayデプロイ用）とローカル用を共通のDockerfileで管理する。

1. **フロントビルドステージ**：`node:22-alpine` で `npm ci && npm run build`（Viteの本番ビルド、`public/build`を生成）
2. **PHPステージ**：`php:8.5-cli` ベース（Apache/FPMは使わず`php artisan serve`で配信、シンプルさ重視）
   - `pdo_pgsql`拡張を追加
   - Composerをインストールし、`composer install --no-dev --optimize-autoloader`
   - ステージ1でビルドした`public/build`をコピー

## Railwayへのデプロイ

- RailwayはリポジトリのDockerfileを検出し、そのままビルド・デプロイできる（Dockerfileデプロイ方式）
- DBはRailwayのPostgresプラグインを使用。接続情報は`DATABASE_URL`環境変数経由で受け取り、Laravelの`config/database.php`側で対応させる
- Railwayは`$PORT`環境変数でリスニングポートを動的に指定してくるため、起動コマンドをこれに対応させる
  - 例：`php artisan serve --host=0.0.0.0 --port=$PORT`
  - シンプルさ重視で`artisan serve`を採用（本格運用ならFrankenPHP/Octaneだが、ハッカソンMVPではオーバースペック）
- 起動時のフロー：`php artisan migrate --force` を実行 → サーバー起動
  - 起動スクリプト（例：`entrypoint.sh`）でmigrate実行後に`php artisan serve`をexecする形にする

## 環境変数（Railway側で設定）
- `APP_KEY`
- `DATABASE_URL`（Postgresプラグインが自動付与）
- `APP_ENV=production`
- `APP_DEBUG=false`
