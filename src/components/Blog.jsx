import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "5 Tips to Design Your Own T-Shirt Brand",
      slug: "design-tshirt-brand",
      excerpt: "Want to start your own apparel line? Here are 5 essential tips...",
      cover: "/assets/blog1.jpg",
    },
    {
      title: "College Fest Outfit Ideas 2025",
      slug: "college-fest-outfits",
      excerpt: "Planning your college merch? These styles are trending...",
      cover: "/assets/blog2.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow p-6">
            <img src={post.cover} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <Link to={`/blogs/${post.slug}`} className="text-blue-600 font-semibold hover:underline">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
