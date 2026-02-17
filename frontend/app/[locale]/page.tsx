import { useTranslations } from 'next-intl';
import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { posts } from '@/lib/api';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  let latestPosts = [];
  try {
    latestPosts = await posts.getAll(0, 3, true);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    <div className="container-custom py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to My Personal Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          I'm a developer and writer sharing my journey
        </p>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
          <Link
            href={`/${locale}/blog`}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            View All Posts →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.length > 0 ? (
            latestPosts.map((post: any) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-600 dark:text-gray-400">
              No posts available yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
