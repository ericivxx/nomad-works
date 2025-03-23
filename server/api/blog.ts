import express, { Request, Response } from 'express';
import { storage } from '../storage';

const router = express.Router();

// Get all blog posts
router.get('/api/blog/posts', async (req: Request, res: Response) => {
  try {
    const blogPosts = await storage.getAllBlogPosts();
    res.json({
      success: true,
      posts: blogPosts,
      count: blogPosts.length
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
});

// Get featured blog posts
router.get('/api/blog/featured', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const featuredPosts = await storage.getFeaturedBlogPosts(limit);
    res.json({
      success: true,
      posts: featuredPosts,
      count: featuredPosts.length
    });
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blog posts'
    });
  }
});

// Get blog posts by category
router.get('/api/blog/category/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const posts = await storage.getBlogPostsByCategory(slug);
    res.json({
      success: true,
      posts,
      count: posts.length
    });
  } catch (error) {
    console.error(`Error fetching blog posts by category ${req.params.slug}:`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts by category'
    });
  }
});

// Get single blog post by slug
router.get('/api/blog/post/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error(`Error fetching blog post ${req.params.slug}:`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
});

// Get all affiliate links
router.get('/api/blog/affiliate-links', async (req: Request, res: Response) => {
  try {
    const affiliateLinks = await storage.getAllAffiliateLinks();
    res.json({
      success: true,
      affiliateLinks,
      count: affiliateLinks.length
    });
  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching affiliate links'
    });
  }
});

// Get affiliate links for a specific blog post
router.get('/api/blog/post/:id/affiliate-links', async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const affiliateLinks = await storage.getAffiliateLinksByBlogPost(postId);
    
    res.json({
      success: true,
      affiliateLinks,
      count: affiliateLinks.length
    });
  } catch (error) {
    console.error(`Error fetching affiliate links for post ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching affiliate links for post'
    });
  }
});

export default router;