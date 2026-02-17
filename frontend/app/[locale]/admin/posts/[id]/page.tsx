'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { posts, categories, tags } from '@/lib/api';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [formData, setFormData] = useState({
    title_uz: '',
    title_en: '',
    title_ru: '',
    slug_uz: '',
    slug_en: '',
    slug_ru: '',
    content_uz: '',
    content_en: '',
    content_ru: '',
    excerpt_uz: '',
    excerpt_en: '',
    excerpt_ru: '',
    meta_description_uz: '',
    meta_description_en: '',
    meta_description_ru: '',
    featured_image: '',
    is_published: false,
    is_featured: false,
    category_id: '',
    tag_ids: [] as number[],
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postData, categoriesData, tagsData] = await Promise.all([
        id === 'new' ? null : posts.getById(parseInt(id)),
        categories.getAll(),
        tags.getAll(),
      ]);

      setAllCategories(categoriesData);
      setAllTags(tagsData);

      if (postData) {
        setFormData({
          title_uz: postData.title_uz || '',
          title_en: postData.title_en || '',
          title_ru: postData.title_ru || '',
          slug_uz: postData.slug_uz || '',
          slug_en: postData.slug_en || '',
          slug_ru: postData.slug_ru || '',
          content_uz: postData.content_uz || '',
          content_en: postData.content_en || '',
          content_ru: postData.content_ru || '',
          excerpt_uz: postData.excerpt_uz || '',
          excerpt_en: postData.excerpt_en || '',
          excerpt_ru: postData.excerpt_ru || '',
          meta_description_uz: postData.meta_description_uz || '',
          meta_description_en: postData.meta_description_en || '',
          meta_description_ru: postData.meta_description_ru || '',
          featured_image: postData.featured_image || '',
          is_published: postData.is_published || false,
          is_featured: postData.is_featured || false,
          category_id: postData.category_id?.toString() || '',
          tag_ids: postData.tags?.map((tag: any) => tag.id) || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = {
        ...formData,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
      };

      if (id === 'new') {
        await posts.create(submitData);
      } else {
        await posts.update(parseInt(id), submitData);
      }

      router.push(`/${locale}/admin`);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleTagToggle = (tagId: number) => {
    setFormData({
      ...formData,
      tag_ids: formData.tag_ids.includes(tagId)
        ? formData.tag_ids.filter((id) => id !== tagId)
        : [...formData.tag_ids, tagId],
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {id === 'new' ? 'Create New Post' : 'Edit Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (Uzbek)
            </label>
            <input
              type="text"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (English)
            </label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (Russian)
            </label>
            <input
              type="text"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (UZ)</label>
            <input
              type="text"
              name="slug_uz"
              value={formData.slug_uz}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (EN)</label>
            <input
              type="text"
              name="slug_en"
              value={formData.slug_en}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (RU)</label>
            <input
              type="text"
              name="slug_ru"
              value={formData.slug_ru}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (Uzbek)
            </label>
            <textarea
              name="content_uz"
              value={formData.content_uz}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (English)
            </label>
            <textarea
              name="content_en"
              value={formData.content_en}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (Russian)
            </label>
            <textarea
              name="content_ru"
              value={formData.content_ru}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Category</option>
              {allCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured Image URL
            </label>
            <input
              type="text"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag: any) => (
              <label
                key={tag.id}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  formData.tag_ids.includes(tag.id)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.tag_ids.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                  className="hidden"
                />
                {tag.name_en}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Post'}</span>
          </button>
          <Link
            href={`/${locale}/admin`}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
