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
  const { data, isLoading, error } = useQuery<BlogResponse>({
    queryKey: ['/api/blog/posts'],
    queryFn: () => apiRequest<BlogResponse>('/api/blog/posts')
  });

  const featuredPostsQuery = useQuery<BlogResponse>({
    queryKey: ['/api/blog/featured'],
    queryFn: () => apiRequest<BlogResponse>('/api/blog/featured')
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nomad Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Expert advice, product recommendations, and guides for digital nomads and remote workers around the world.
          </p>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-48">
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
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                      {post.category && (
                        <Badge variant="outline" className="mr-2">
                          {post.category.name}
                        </Badge>
                      )}
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <Link href={`/blog/post/${post.slug}`} className="hover:underline">
                      <CardTitle className="mb-2">{post.title}</CardTitle>
                    </Link>
                    <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.fullName || 'Unknown')}`} />
                        <AvatarFallback>{(post.author.fullName || 'U')[0]}</AvatarFallback>
                      </Avatar>
                      <span className="ml-2 text-sm">{post.author.fullName || 'Anonymous'}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
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
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                  <div className="h-48">
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
                  <CardContent className="flex-grow p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                      {post.category && (
                        <Badge variant="outline" className="mr-2">
                          {post.category.name}
                        </Badge>
                      )}
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <Link href={`/blog/post/${post.slug}`} className="hover:underline">
                      <CardTitle className="mb-2">{post.title}</CardTitle>
                    </Link>
                    <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.fullName || 'Unknown')}`} />
                        <AvatarFallback>{(post.author.fullName || 'U')[0]}</AvatarFallback>
                      </Avatar>
                      <span className="ml-2 text-sm">{post.author.fullName || 'Anonymous'}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}