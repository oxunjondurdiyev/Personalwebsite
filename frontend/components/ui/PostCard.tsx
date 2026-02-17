import Link from 'next/link';
import { formatDate, getPostContent } from '@/lib/utils';

interface PostCardProps {
  post: any;
  locale: string;
}

export default function PostCard({ post, locale }: PostCardProps) {
  const title = getPostContent(post, locale, 'title');
  const excerpt = getPostContent(post, locale, 'excerpt');
  const slug = getPostContent(post, locale, 'slug');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{formatDate(post.created_at, locale)}</span>
          <span>{post.views_count} views</span>
        </div>
        <Link
          href={`/${locale}/blog/${slug}`}
          className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
