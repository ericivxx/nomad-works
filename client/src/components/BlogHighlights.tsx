import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ExternalLink, ChevronRight, Sparkles, PenTool } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface AffiliateLink {
  id: number;
  title: string;
  affiliateUrl: string;
  productImage: string | null;
  productPrice: string | null;
}

interface BlogResponse {
  success: boolean;
  posts: BlogPost[];
  count: number;
}

export default function BlogHighlights() {
  const { data: featuredPosts, isLoading } = useQuery<{ success: boolean; posts: BlogPost[] }>({
    queryKey: ['/api/blog/featured'],
  });

  // Function to format date nicely
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-bold tracking-tight">Blog & Resources</h2>
          </div>
          
          <Link href="/blog">
            <Button variant="link" className="gap-1 text-purple-600 hover:text-purple-700">
              View all posts <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="relative mb-12">
          <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6">
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 rotate-[-3deg] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Resources for Remote Workers</span>
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders while fetching data
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden border border-gray-200 h-[380px]">
                <Skeleton className="h-40 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-5 w-1/2" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Render actual blog posts
            featuredPosts?.posts.map((post) => (
              <Link key={post.id} href={`/blog/post/${post.slug}`}>
                <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {post.coverImage ? (
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
                        <PenTool className="h-10 w-10 text-purple-300" />
                      </div>
                    )}
                    
                    {post.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-amber-500 text-white border-0">
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    {post.category && (
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0">
                          {post.category.name}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">
                        Gear Guide
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-4 flex-grow">
                    <CardDescription className="text-sm text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="pt-0 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 text-purple-600 p-1 rounded-full">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs text-purple-600 font-medium">Special Deals</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sm">
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}