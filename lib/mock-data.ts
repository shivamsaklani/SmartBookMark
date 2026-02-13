import { Bookmark, Collection } from './types';

export const collections: Collection[] = [
  { id: 'work', name: 'Work', icon: 'Briefcase', color: '217 91% 60%' },
  { id: 'design', name: 'Design', icon: 'Palette', color: '280 65% 60%' },
  { id: 'dev-tools', name: 'Dev Tools', icon: 'Code', color: '142 71% 45%' },
  { id: 'news', name: 'News', icon: 'Newspaper', color: '25 95% 53%' },
  { id: 'productivity', name: 'Productivity', icon: 'Zap', color: '47 96% 53%' },
  { id: 'learning', name: 'Learning', icon: 'GraduationCap', color: '340 65% 55%' },
];

export const bookmarks: Bookmark[] = [
  { id: '1', url: 'https://github.com', title: 'GitHub', description: 'Where the world builds software. Millions of developers use GitHub to ship code.', favicon: 'https://github.com/favicon.ico', tags: ['development', 'git', 'open-source'], collectionId: 'dev-tools', isFavorite: true, createdAt: '2025-12-01', visits: 142 },
  { id: '2', url: 'https://figma.com', title: 'Figma', description: 'Collaborative design tool for building meaningful products together.', favicon: 'https://figma.com/favicon.ico', tags: ['design', 'ui', 'collaboration'], collectionId: 'design', isFavorite: true, createdAt: '2025-11-28', visits: 89 },
  { id: '3', url: 'https://vercel.com', title: 'Vercel', description: 'Deploy web projects with the best frontend developer experience.', favicon: 'https://vercel.com/favicon.ico', tags: ['deployment', 'hosting', 'development'], collectionId: 'dev-tools', isFavorite: false, createdAt: '2025-12-05', visits: 56 },
  { id: '4', url: 'https://notion.so', title: 'Notion', description: 'All-in-one workspace for notes, docs, wikis, and project management.', favicon: 'https://notion.so/favicon.ico', tags: ['productivity', 'notes', 'docs'], collectionId: 'productivity', isFavorite: true, createdAt: '2025-11-15', visits: 203 },
  { id: '5', url: 'https://tailwindcss.com', title: 'Tailwind CSS', description: 'A utility-first CSS framework for rapidly building custom user interfaces.', favicon: 'https://tailwindcss.com/favicon.ico', tags: ['css', 'development', 'design'], collectionId: 'dev-tools', isFavorite: false, createdAt: '2025-12-10', visits: 78 },
  { id: '6', url: 'https://dribbble.com', title: 'Dribbble', description: "Discover the world's top designers and creatives. Design inspiration and jobs.", favicon: 'https://dribbble.com/favicon.ico', tags: ['design', 'inspiration', 'portfolio'], collectionId: 'design', isFavorite: false, createdAt: '2025-11-20', visits: 45 },
  { id: '7', url: 'https://news.ycombinator.com', title: 'Hacker News', description: 'Social news website focusing on computer science and entrepreneurship.', favicon: 'https://news.ycombinator.com/favicon.ico', tags: ['news', 'tech', 'startups'], collectionId: 'news', isFavorite: true, createdAt: '2025-10-05', visits: 312 },
  { id: '8', url: 'https://stackoverflow.com', title: 'Stack Overflow', description: 'The largest online community for developers to learn and share knowledge.', favicon: 'https://stackoverflow.com/favicon.ico', tags: ['development', 'q&a', 'community'], collectionId: 'dev-tools', isFavorite: false, createdAt: '2025-09-15', visits: 167 },
  { id: '9', url: 'https://linear.app', title: 'Linear', description: 'Streamline software projects, sprints, tasks, and bug tracking.', favicon: 'https://linear.app/favicon.ico', tags: ['productivity', 'project-management'], collectionId: 'work', isFavorite: true, createdAt: '2025-12-08', visits: 94 },
  { id: '10', url: 'https://medium.com', title: 'Medium', description: 'Where good ideas find you. Read and share new perspectives on topics.', favicon: 'https://medium.com/favicon.ico', tags: ['reading', 'blog', 'articles'], collectionId: 'news', isFavorite: false, createdAt: '2025-11-01', visits: 38 },
  { id: '11', url: 'https://react.dev', title: 'React', description: 'The library for web and native user interfaces. Build with components.', favicon: 'https://react.dev/favicon.ico', tags: ['development', 'react', 'javascript'], collectionId: 'learning', isFavorite: true, createdAt: '2025-12-12', visits: 121 },
  { id: '12', url: 'https://typescriptlang.org', title: 'TypeScript', description: 'Typed JavaScript at any scale. Start writing better JavaScript today.', favicon: 'https://typescriptlang.org/favicon.ico', tags: ['development', 'typescript', 'javascript'], collectionId: 'learning', isFavorite: false, createdAt: '2025-10-20', visits: 67 },
  { id: '13', url: 'https://slack.com', title: 'Slack', description: 'Where work happens. Connect your team with messaging and collaboration.', favicon: 'https://slack.com/favicon.ico', tags: ['communication', 'work', 'collaboration'], collectionId: 'work', isFavorite: false, createdAt: '2025-11-10', visits: 254 },
  { id: '14', url: 'https://youtube.com', title: 'YouTube', description: 'Enjoy the videos and music you love, upload original content.', favicon: 'https://youtube.com/favicon.ico', tags: ['video', 'entertainment', 'learning'], collectionId: null, isFavorite: false, createdAt: '2025-08-15', visits: 489 },
  { id: '15', url: 'https://supabase.com', title: 'Supabase', description: 'Open source Firebase alternative. Build production-grade applications.', favicon: 'https://supabase.com/favicon.ico', tags: ['development', 'database', 'backend'], collectionId: 'dev-tools', isFavorite: true, createdAt: '2025-12-14', visits: 73 },
  { id: '16', url: 'https://cal.com', title: 'Cal.com', description: 'Open scheduling infrastructure for absolutely everyone.', favicon: 'https://cal.com/favicon.ico', tags: ['productivity', 'scheduling'], collectionId: 'productivity', isFavorite: false, createdAt: '2025-11-25', visits: 29 },
  { id: '17', url: 'https://framer.com', title: 'Framer', description: 'Design and publish stunning sites with AI in minutes.', favicon: 'https://framer.com/favicon.ico', tags: ['design', 'website-builder', 'no-code'], collectionId: 'design', isFavorite: false, createdAt: '2025-12-02', visits: 41 },
  { id: '18', url: 'https://arc.net', title: 'Arc Browser', description: 'A better way to use the internet. The browser built for you.', favicon: 'https://arc.net/favicon.ico', tags: ['browser', 'productivity', 'tools'], collectionId: 'productivity', isFavorite: true, createdAt: '2025-10-30', visits: 55 },
];

export const allTags = Array.from(new Set(bookmarks.flatMap(b => b.tags))).sort();
