export function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale === 'uz' ? 'uz-UZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getPostContent(post: any, locale: string, field: string): string {
  const fieldName = `${field}_${locale}`;
  return post[fieldName] || '';
}
