import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';
import { format } from 'date-fns';

import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';

interface User {
  id: number;
  email: string;
  fullName: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  author: User;
  category?: Category;
  featured: boolean;
}

interface BlogResponse {
  success: boolean;
  posts: BlogPost[];
  count: number;
}

export default function BlogListing() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await apiRequest<BlogResponse>('/api/blog/posts');
      if (!response) {
        throw new Error('Failed to fetch blog posts');
      }
      return response;
    }
  });

  const featuredPostsQuery = useQuery({
    queryKey: ['/api/blog/featured'],
    queryFn: async () => {
      const response = await apiRequest<BlogResponse>('/api/blog/featured');
      if (!response) {
        throw new Error('Failed to fetch featured posts');
      }
      return response;
    }
  });

  const posts = data?.posts || [];
  const featuredPosts = featuredPostsQuery.data?.posts || [];

  return (
    <>
      <SEOHead 
        title="The Digital Nomad Blog | NomadWorks" 
        description="Expert tips, guides, and resources for digital nomads and remote workers. Learn about the best gear, destinations, and strategies for location-independent work."
      />

      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            <span className="relative z-10">Nomad Blog</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-100/70 -z-10 transform -rotate-1"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert advice, product recommendations, and guides for digital nomads and remote workers around the world.
          </p>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b pb-3 border-gray-100">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredPosts.map((post: BlogPost) => (
                <Card key={post.id} className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-52 md:h-56">
                    {post.coverImage ? (
                      <img 
                        src={window.location.origin + post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="px-3 py-1">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="flex-grow p-5 md:p-6">
                    <div className="flex items-center mb-3 text-sm text-gray-500">
                      {post.category && (
                        <Badge variant="outline" className="mr-3 px-2.5 py-0.5">
                          {post.category.name}
                        </Badge>
                      )}
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1.5" />
                        <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <Link href={`/blog/post/${post.slug}`} className="hover:underline block">
                      <CardTitle className="mb-3 text-xl md:text-2xl leading-tight">{post.title}</CardTitle>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 mb-4 text-base">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-5 px-5 md:px-6 border-t border-gray-100">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.fullName || 'Unknown')}`} />
                        <AvatarFallback>{(post.author.fullName || 'U')[0]}</AvatarFallback>
                      </Avatar>
                      <span className="ml-2.5 text-sm font-medium text-gray-700">{post.author.fullName || 'Anonymous'}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b pb-3 border-gray-100">Latest Articles</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="overflow-hidden shadow-md">
                  <div className="h-52 md:h-56 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center mb-3">
                      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mr-3"></div>
                      <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-7 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                  </CardContent>
                  <div className="pt-0 pb-5 px-5 md:px-6 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="ml-2.5 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post: BlogPost) => (
                <Link key={post.id} href={`/blog/post/${post.slug}`} className="block">
                  <Card className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-52 md:h-56">
                      {post.coverImage ? (
                        <img 
                          src={window.location.origin + post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-grow p-5 md:p-6">
                      <div className="flex items-center mb-3 text-sm text-gray-500">
                        {post.category && (
                          <Badge variant="outline" className="mr-3 px-2.5 py-0.5">
                            {post.category.name}
                          </Badge>
                        )}
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1.5" />
                          <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <div className="group">
                        <CardTitle className="mb-3 text-xl md:text-2xl leading-tight group-hover:text-purple-600 transition-colors">{post.title}</CardTitle>
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-4 text-base">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 pb-5 px-5 md:px-6 border-t border-gray-100">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.fullName || 'Unknown')}`} />
                          <AvatarFallback>{(post.author.fullName || 'U')[0]}</AvatarFallback>
                        </Avatar>
                        <span className="ml-2.5 text-sm font-medium text-gray-700">{post.author.fullName || 'Anonymous'}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}