import { posts } from '@/lib/api';
import { formatDate, getPostContent } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function PostDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  let post;
  try {
    post = await posts.getBySlug(slug, locale);
  } catch (error) {
    notFound();
  }

  const title = getPostContent(post, locale, 'title');
  const content = getPostContent(post, locale, 'content');

  return (
    <article className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <span>{formatDate(post.created_at, locale)}</span>
          <span>•</span>
          <span>{post.views_count} views</span>
          {post.category && (
            <>
              <span>•</span>
              <span>{post.category[`name_${locale}`]}</span>
            </>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                >
                  {tag[`name_${locale}`]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
