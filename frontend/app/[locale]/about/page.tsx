import { useTranslations } from 'next-intl';

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Welcome to my personal website! I'm passionate about technology, writing, and sharing knowledge
            with the community.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            This platform serves as a space where I share updates about my life, publish articles about my
            studies, and post news about my professional activities.
          </p>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Interests</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
            <li>Software Development</li>
            <li>Web Technologies</li>
            <li>Technical Writing</li>
            <li>Continuous Learning</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Feel free to reach out to me through the contact page. I'm always open to interesting
            conversations and collaboration opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
