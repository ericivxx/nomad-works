import React, { useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

import SEOHead from '@/components/SEOHead';
import GoogleAdUnit from '@/components/GoogleAdUnit';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, LinkIcon, BookOpen, Monitor, Cpu, Battery, Headphones, Video, Plug, Globe, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';

interface AffiliateLink {
  id: number;
  title: string;
  description: string | null;
  affiliateUrl: string;
  productImage: string | null;
  productPrice: string | null;
  platform: string;
}

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
  content: string;
  coverImage: string | null;
  publishedAt: string;
  updatedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  author: User;
  category?: Category;
  affiliateLinks?: AffiliateLink[];
}

export default function BlogPost() {
  const [, params] = useRoute('/blog/post/:slug');
  const slug = params?.slug;

  // Scroll to top when the component mounts or slug changes
  useEffect(() => {
    // Use timeout to ensure this happens after rendering is complete
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid any transition
      });
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [slug]);

  const { data, isLoading, error } = useQuery<{ success: boolean; post: BlogPost }>({
    queryKey: ['/api/blog/post', slug],
    queryFn: async () => {
      const result = await apiRequest(`/api/blog/post/${slug}`);
      if (!result) {
        throw new Error('Failed to fetch blog post');
      }
      return result;
    },
    enabled: !!slug
  });

  const post = data?.post;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p>Sorry, the blog post you're looking for could not be found.</p>
        <Button className="mt-4" asChild>
          <a href="/blog">Return to Blog</a>
        </Button>
      </div>
    );
  }

  // Function to render markdown content with affiliate link processing
  const renderContent = () => {
    let content = post.content;
    
    // Add proper formatting to the content by adding paragraphs and headings
    if (content) {
      // Remove the first heading that duplicates the title
      content = content.replace(/^#\s+([^\n]+)(\n|$)/, ''); 
      
      // Process bold text and other special formatting
      const processParagraph = (text: string): string => {
        // Process bold text
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Process italic text
        text = text.replace(/\_\_([^_]+)\_\_/g, '<em>$1</em>');
        // Process links
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        return text;
      };
      
      // Split into paragraphs and process
      content = content.split('\n\n').map((para: string) => {
        para = para.trim();
        if (!para) return '';
        
        // Format headings (lines starting with # or ##)
        if (para.startsWith('# ')) {
          return `<h1>${processParagraph(para.substring(2))}</h1>`;
        } else if (para.startsWith('## ')) {
          return `<h2>${processParagraph(para.substring(3))}</h2>`;
        } else if (para.startsWith('### ')) {
          return `<h3>${processParagraph(para.substring(4))}</h3>`;
        } 
        
        // Format lists
        if (para.includes('\n- ')) {
          const listItems = para.split('\n- ');
          const firstLine = listItems.shift() || '';
          const formattedList = `<ul>${listItems.map((item: string) => `<li>${processParagraph(item)}</li>`).join('')}</ul>`;
          return firstLine ? `<p>${processParagraph(firstLine)}</p>${formattedList}` : formattedList;
        }
        
        // Standard paragraph with formatting applied
        return `<p>${processParagraph(para)}</p>`;
      }).join('');
    }
    
    return (
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <>
      <SEOHead 
        title={post.metaTitle || `${post.title} | NomadWorks Blog`}
        description={post.metaDescription || post.excerpt}
        canonicalUrl={`${window.location.origin}/blog/post/${post.slug}`}
        image={post.coverImage ? `${window.location.origin}${post.coverImage}` : undefined}
        type="article"
        keywords={`digital nomad, remote work, ${post.category?.name.toLowerCase() || ''}, nomad life, ${post.title.toLowerCase().split(' ').slice(0, 3).join(', ')}`}
        author={post.author.fullName || "NomadWorks Team"}
        publishedDate={post.publishedAt}
        modifiedDate={post.updatedAt || undefined}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${window.location.origin}/blog/post/${post.slug}`
          },
          "headline": post.title,
          "description": post.excerpt,
          "image": post.coverImage ? `${window.location.origin}${post.coverImage}` : undefined,
          "author": {
            "@type": "Person",
            "name": post.author.fullName || "NomadWorks Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "NomadWorks",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          },
          "datePublished": post.publishedAt,
          "dateModified": post.updatedAt || post.publishedAt
        }}
      />

      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category and date */}
          <div className="flex items-center mb-4 text-sm text-gray-500">
            {post.category && (
              <Badge variant="outline" className="mr-2">
                {post.category.name}
              </Badge>
            )}
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          {/* Excerpt */}
          <p className="text-xl text-gray-500 mb-6">{post.excerpt}</p>
          
          {/* Author */}
          <div className="flex items-center mb-8">
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.fullName || 'Unknown')}`} />
              <AvatarFallback>{(post.author.fullName || 'U')[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="font-medium">{post.author.fullName || 'Anonymous'}</p>
            </div>
          </div>
          
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8">
              <img 
                src={window.location.origin + post.coverImage} 
                alt={post.title} 
                className="w-full h-auto rounded-lg object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}
          
          {/* Content */}
          <div className="mb-10 blog-content">
            {renderContent()}
          </div>
          
          {/* Ad Unit */}
          <div className="my-8 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <GoogleAdUnit adFormat="rectangle" />
          </div>
          
          <Separator className="my-10" />
          
          {/* Affiliate Product Showcase */}
          {post.affiliateLinks && post.affiliateLinks.length > 0 && (
            <div className="my-10">
              <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.affiliateLinks.map((link: AffiliateLink) => (
                  <Card key={link.id} className="overflow-hidden flex flex-col h-full">
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 relative bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          {(() => {
                            // Use a function to determine which icon to show
                            if (link.title.includes("Monitor")) {
                              return <Monitor size={48} className="text-primary" />;
                            } else if (link.title.includes("Laptop") || link.title.includes("MacBook")) {
                              return <Cpu size={48} className="text-primary" />;
                            } else if (link.title.includes("Power Bank")) {
                              return <Battery size={48} className="text-primary" />;
                            } else if (link.title.includes("Headphones") || link.title.includes("AirPods")) {
                              return <Headphones size={48} className="text-primary" />;
                            } else if (link.title.includes("Webcam")) {
                              return <Video size={48} className="text-primary" />;
                            } else if (link.title.includes("Travel Adapter")) {
                              return <Plug size={48} className="text-primary" />;
                            } else if (link.title.includes("Global") && !link.title.includes("Travel Adapter")) {
                              return <Globe size={48} className="text-primary" />;
                            } else if (link.title.includes("Stand") && !link.title.includes("Monitor")) {
                              return <Lightbulb size={48} className="text-primary" />;
                            } else {
                              // Default fallback
                              return (
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary font-bold text-lg">{link.title.charAt(0)}</span>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{link.title}</h3>
                          {link.description && (
                            <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                          )}
                          {link.productPrice && (
                            <p className="font-bold text-primary mt-1">{link.productPrice}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button 
                          size="sm" 
                          className="w-full"
                          variant="default"
                          onClick={() => window.open(link.affiliateUrl, '_blank')}
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          View on {link.platform}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}