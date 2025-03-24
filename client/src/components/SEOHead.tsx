import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  structuredData?: any;
  image?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  canonicalUrl, 
  structuredData,
  image = "/og-image.jpg",
  type = "website",
  keywords = "digital nomad, remote work, remote jobs, work from anywhere, digital nomad lifestyle, nomad career",
  author = "NomadWorks Team",
  publishedDate,
  modifiedDate
}: SEOHeadProps) {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  const siteName = "NomadWorks - Remote Jobs for Digital Nomads";
  
  // Default structured data for Organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NomadWorks",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Find the best remote jobs and digital nomad resources to work from anywhere.",
    "sameAs": [
      "https://twitter.com/nomadworks",
      "https://linkedin.com/company/nomadworks",
      "https://instagram.com/nomadworks"
    ]
  };
  
  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {author && <meta name="author" content={author} />}
      {publishedDate && <meta name="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta name="article:modified_time" content={modifiedDate} />}
      
      {/* Robots meta */}
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={`${siteUrl}${image}`} />}
      {image && <meta property="og:image:alt" content={`Image for ${title}`} />}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@nomadworks" />
      {image && <meta name="twitter:image" content={`${siteUrl}${image}`} />}
      {image && <meta name="twitter:image:alt" content={`Image for ${title}`} />}
      
      {/* Additional mobile-friendly tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
}
