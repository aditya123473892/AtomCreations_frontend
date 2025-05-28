import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { slug } = useParams();

  // For now, simple placeholder
  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
      <p>This is where the blog content will go for <strong>{slug}</strong>.</p>
    </div>
  );
};

export default BlogDetail;
