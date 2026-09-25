import type { Dictionary } from "./dictionary.ts";

export const ja: Dictionary = {
  meta: {
    title: "まきのん - Portfolio",
    description:
      "まきのん - 東京を拠点とするソフトウェアエンジニア。TypeScript、Rust、Node.jsによるWeb開発を中心に活動しています。",
  },
  nav: {
    about: "自己紹介",
    tech: "技術スタック",
    personalProjects: "個人プロジェクト",
    stats: "統計",
  },
  header: {
    openMenuLabel: "メニューを開く",
    closeMenuLabel: "メニューを閉じる",
    navLabel: "サイトナビゲーション",
    toggleThemeLabel: "テーマを切り替える",
  },
  languageLabel: "言語",
  hero: {
    subtitle:
      "東京を拠点とするソフトウェアエンジニア。Web・モバイルアプリケーション開発を中心に活動しています。",
    avatarAlt: "まきのん",
  },
  about: {
    title: "自己紹介",
    greetingTemplate: "こんにちは！東京を拠点に活動するソフトウェアエンジニア、{name}です。",
    paragraphs: [
      "仕事ではTypeScriptによるNode.jsバックエンドサービスの開発を中心に担当しています。",
      "個人では家計管理ツールや2Dゲームを開発しています。",
      "開発スタイルはAIエージェントを活用した仕様駆動開発ですが、自分でコードを書く楽しさも忘れません。",
    ],
  },
  tech: {
    title: "技術スタック",
    categories: {
      languages: "言語",
      frameworksTools: "フレームワーク・ツール",
      infrastructures: "インフラストラクチャ",
      other: "その他",
    },
  },
  personalProjects: {
    title: "個人プロジェクト",
    descriptions: {
      utopia:
        "Firefly IIIと部分互換の軽量・セルフホスト可能な個人向け家計管理API（Rust製）。",
      xiangke:
        "Xiangke（相剋、xiāngkè）：三国志に着想を得たコマンド・ターン制バトルゲーム。",
      "pr-agent-runner":
        "OpenCodeReview（OCR）基盤のAIによるPRレビュー自動化と、GitHub @メンション応答用の小型TypeScript CLI。",
      website: "このサイト！",
    },
    viewOnGitHubTemplate: "GitHubで{name}を開く",
    inDevelopment: "開発中",
  },
  stats: {
    title: "GitHub 統計",
    recentPushes: "最近のプッシュ",
    pushesSuffix: "直近7日間のプッシュ数",
    activity: "アクティビティ",
    topRepos: "トップリポジトリ",
    loadingPushes: "最近のプッシュを読み込み中…",
    loadingActivity: "アクティビティを読み込み中…",
    loadingTopRepos: "トップリポジトリを読み込み中…",
    loadError:
      "GitHub アクティビティを読み込めませんでした。しばらくしてから再度お試しください。",
    topReposLoadError:
      "トップリポジトリを読み込めませんでした。しばらくしてから再度お試しください。",
    labels: {
      commits: "コミット",
      pullRequests: "プルリクエスト",
      codeReview: "コードレビュー",
      issues: "Issue",
    },
  },
  footer: {
    rightsSuffix: "All rights reserved.",
    licensesButton: "サードパーティライセンス",
  },
  licensesModal: {
    title: "サードパーティライセンス",
    description:
      "このサイトはオープンソースソフトウェアで構築されています。各プロジェクトのメンテナーとコントリビューターに感謝します。",
    closeLabel: "サードパーティライセンスのダイアログを閉じる",
    categories: {
      runtime: "ランタイム",
      buildTooling: "ビルドツール",
      fonts: "フォント",
      icons: "アイコン",
    },
  },
  qqModal: {
    openLabel: "QQのQRコードを表示",
    closeLabel: "QQのQRコードダイアログを閉じる",
    qrAlt: "QQのQRコード",
  },
  wechatModal: {
    openLabel: "WeChatのQRコードを表示",
    closeLabel: "WeChatのQRコードダイアログを閉じる",
    qrAlt: "WeChatのQRコード",
  },
  emailModal: {
    openLabel: "メールアドレスを表示",
    title: "メール",
    description: "お気軽にメールでご連絡ください。",
    closeLabel: "メールのダイアログを閉じる",
    addressLabel: "メールアドレス",
    copyLabel: "コピー",
    copiedLabel: "コピーしました！",
    composeLabel: "メールを作成",
  },
};
