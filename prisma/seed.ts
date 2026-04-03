import { prisma } from "../lib/prisma";

async function main() {
  await prisma.home.createMany({
    data: [
      {
        prefix: "I'm",
        name: "Kaung Pyae Aung",
        title: "Full Stack Developer",
        content:
          "Full-stack developer skilled in Laravel, Next.js, React, and cloud deployment, delivering scalable platforms like job portals, legal search engines, and custom packages. Proven experience at MMSIT, Netra, and ET Verdict, collaborating in Agile teams to build maintainable code with Git workflows. Eager for mid-level roles to drive impactful web solutions.",
        date_of_birth: "December 8, 2003",
        location: "Yangon, Myanmar",
        email: "kaungpyaeaung8123@gmail.com",
        phone: "+95 9 5109983",
        github: "https://github.com/KaungPyae223",
        linkedin: "https://www.linkedin.com/in/kaung-pyae-908324250/",
        facebook: "https://www.facebook.com/kaung.591455/",
        language: "English",
      },
      {
        prefix: "私は",
        name: "カウ・ピェ・アウン",
        title: "フルスタック開発者",
        content:
          "Laravel、Next.js、React、クラウドデプロイに精通したフルスタック開発者です。求人ポータル、法律検索エンジン、カスタムパッケージなどのスケーラブルなプラットフォームを構築してきました。MMSIT、Netra、ET Verdictでの実績があり、アジャイルチームでGitワークフローを活用した保守可能なコードを開発。ミッドレベルポジションでインパクトのあるウェブソリューションを推進したいと考えています。",
        date_of_birth: "2003年12月8日",
        location: "ミャンマー、ヤンゴン",
        email: "kaungpyaeaung8123@gmail.com",
        phone: "+95 9 5109983",
        github: "https://github.com/KaungPyae223",
        linkedin: "https://www.linkedin.com/in/kaung-pyae-908324250/",
        facebook: "https://www.facebook.com/kaung.591455/",
        language: "Japanese",
      },
    ],
  });

  await prisma.education.createMany({
    data: [
      {
        educationable_type: "Home",
        title: "NCC Level 4 Diploma in Computing",
        description: "2022 - 2023",
      },
      {
        educationable_type: "Home",
        title: "NCC Level 5 Diploma in Computing",
        description: "2023 - 2024",
      },
      {
        educationable_type: "Home",
        title: "Bachelor of Computing, University of Greenwich",
        description: "2024 - 2025",
      },
      {
        educationable_type: "Home",
        title: "MMSIT SWD & WAD",
        description: "2023 - 2024",
      },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        experienceable_type: "Home",
        title: "MMSIT Full Stack Developer",
        description: "2024 - 2025",
      },
      {
        experienceable_type: "Home",
        title: "ET Verdict",
        description: "2025",
      },
      {
        experienceable_type: "Home",
        title: "Netra",
        description: "2024 - ",
      },
    ],
  });

  await prisma.about.createMany({
    data: [
      {
        title: "Introduction",
        subtitle: "of My Story",
        first_paragraph:
          "Hi, I'm Kaung Pyae Aung, a passionate full-stack developer from Yangon, Myanmar. My journey began in 2023 at MMSIT, where under the guidance of Sayar Hein Htet Zan, I dove into intensive frontend and backend courses through hands-on workshops that transformed theoretical knowledge into real-world skills—teaching me Agile collaboration, Git version control, and clean, maintainable code in team settings. After completing my NCC Level 4 and 5 Diplomas at KMD (covering agile development, database management, and advanced computing), I pursued my Bachelor of Computing at the University of Greenwich (2024-2025), gaining comprehensive software engineering principles from database normalization and system architecture to modern deployment with Docker, CI/CD, and Vercel hosting.",
        second_paragraph:
          "My practical experience extends beyond academics. At MMSIT's workshop program (Nov 2024–present), I served as a backend developer, designing databases and integrating with frontend teams on projects like the E-Learning Platform and Restaurant Booking System. I've also freelanced at ET Verdict (2025), building a FastAPI-based legal search engine with JWT authentication, role-based access control, SEO via Typesense, S3 storage, payment systems, and analytics dashboards. Additional roles at Netra included full-stack contributions to Mekong Jobs (Elasticsearch search, multi-language support) and Global Bright Opportunities (CMS and contributor systems).",
        language: "English",
      },
      {
        title: "自己紹介",
        subtitle: "私の物語",
        first_paragraph:
          "こんにちは、私はミャンマー・ヤンゴン出身の情熱的なフルスタック開発者、Kaung Pyae Aungです。私の開発者としての旅は2023年にMMSITで始まりました。Sayar Hein Htet Zanの指導のもと、フロントエンドとバックエンドの集中コースに取り組み、ハンズオンワークショップを通じて理論知識を実世界のスキルに変えました。これにより、アジャイルコラボレーション、Gitバージョン管理、チーム環境でのクリーンで保守可能なコードの提供を学びました。その後、KMDでNCC Level 4およびLevel 5ディプロマ（アジャイル開発、データベース管理、先進コンピューティング）を修了し、University of GreenwichでBachelor of Computing（2024-2025）を追求。データベース正規化やシステムアーキテクチャからDocker、CI/CD、Vercelホスティングによる現代的なデプロイまで、包括的なソフトウェア工学の原則を習得しました。",
        second_paragraph:
          "私の実践経験は学業を超えています。MMSITのワークショッププログラム（2024年11月～現在）ではバックエンド開発者としてデータベース設計を行い、E-Learning PlatformやRestaurant Booking Systemなどのプロジェクトでフロントエンドチームと連携しました。また、ET Verdict（2025年）でのフリーランスでは、FastAPIベースの法律検索エンジンを構築し、JWT認証、ロールベースアクセス制御、TypesenseによるSEO、S3ストレージ、決済システム、アナリティクスダッシュボードを実装しました。NetraではMekong Jobs（Elasticsearch検索、多言語対応）やGlobal Bright Opportunities（CMS、貢献者システム）へのフルスタック貢献も行いました。",
        language: "Japanese",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Database seeded successfully");
  });
