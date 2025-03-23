import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';

// Removed Layout import - using Layout from App.tsx
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronRight, 
  Code, 
  PenTool, 
  BarChart4, 
  FileText, 
  Camera, 
  HeartPulse,
  Globe
} from 'lucide-react';

// Career path types and data structures
interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface JobRole {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  skills: Skill[];
  icon: React.ReactNode;
  remoteScore: number; // 1-5 how suitable for remote work
}

interface CareerPath {
  id: string;
  name: string;
  description: string;
  roles: JobRole[];
}

export default function CareerPathVisualization() {
  const [selectedPath, setSelectedPath] = useState<string>('tech');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Career paths data
  const careerPaths: Record<string, CareerPath> = {
    tech: {
      id: 'tech',
      name: 'Technology & Development',
      description: 'Career paths in software development, engineering, and technical roles that are highly suitable for remote work.',
      roles: [
        {
          id: 'junior-dev',
          title: 'Junior Developer',
          description: 'Entry-level software developer working on basic features and bug fixes under supervision.',
          salaryRange: '$60,000 - $85,000',
          remoteScore: 3,
          icon: <Code size={24} />,
          skills: [
            { id: 's1', name: 'JavaScript', level: 'beginner' },
            { id: 's2', name: 'HTML/CSS', level: 'intermediate' },
            { id: 's3', name: 'Git', level: 'beginner' },
            { id: 's4', name: 'Problem Solving', level: 'beginner' }
          ]
        },
        {
          id: 'mid-dev',
          title: 'Mid-Level Developer',
          description: 'Experienced developer working independently on features and collaborating with team members.',
          salaryRange: '$85,000 - $120,000',
          remoteScore: 4,
          icon: <Code size={24} />,
          skills: [
            { id: 's1', name: 'JavaScript/TypeScript', level: 'intermediate' },
            { id: 's2', name: 'React/Vue/Angular', level: 'intermediate' },
            { id: 's3', name: 'API Integration', level: 'intermediate' },
            { id: 's4', name: 'Testing', level: 'intermediate' }
          ]
        },
        {
          id: 'senior-dev',
          title: 'Senior Developer',
          description: 'Highly experienced developer leading projects and mentoring junior team members.',
          salaryRange: '$120,000 - $160,000',
          remoteScore: 5,
          icon: <Code size={24} />,
          skills: [
            { id: 's1', name: 'Advanced JavaScript', level: 'advanced' },
            { id: 's2', name: 'System Architecture', level: 'advanced' },
            { id: 's3', name: 'Performance Optimization', level: 'advanced' },
            { id: 's4', name: 'Technical Leadership', level: 'intermediate' }
          ]
        },
        {
          id: 'tech-lead',
          title: 'Technical Lead',
          description: 'Technical leader responsible for architecture decisions and overseeing development teams.',
          salaryRange: '$150,000 - $190,000',
          remoteScore: 5,
          icon: <Code size={24} />,
          skills: [
            { id: 's1', name: 'System Design', level: 'advanced' },
            { id: 's2', name: 'Team Leadership', level: 'advanced' },
            { id: 's3', name: 'Project Management', level: 'intermediate' },
            { id: 's4', name: 'Code Review', level: 'advanced' }
          ]
        }
      ]
    },
    design: {
      id: 'design',
      name: 'Design & Creative',
      description: 'Career paths in design, creative work, and user experience that can be performed remotely.',
      roles: [
        {
          id: 'junior-designer',
          title: 'Junior Designer',
          description: 'Entry-level designer working on basic design tasks under supervision.',
          salaryRange: '$50,000 - $70,000',
          remoteScore: 3,
          icon: <PenTool size={24} />,
          skills: [
            { id: 's1', name: 'Adobe Creative Suite', level: 'beginner' },
            { id: 's2', name: 'UI Basics', level: 'beginner' },
            { id: 's3', name: 'Typography', level: 'intermediate' },
            { id: 's4', name: 'Color Theory', level: 'beginner' }
          ]
        },
        {
          id: 'mid-designer',
          title: 'Mid-Level Designer',
          description: 'Experienced designer creating polished visuals and user interfaces.',
          salaryRange: '$70,000 - $100,000',
          remoteScore: 4,
          icon: <PenTool size={24} />,
          skills: [
            { id: 's1', name: 'Figma/Sketch', level: 'intermediate' },
            { id: 's2', name: 'UI/UX Design', level: 'intermediate' },
            { id: 's3', name: 'Prototyping', level: 'intermediate' },
            { id: 's4', name: 'Design Systems', level: 'intermediate' }
          ]
        },
        {
          id: 'senior-designer',
          title: 'Senior Designer',
          description: 'Highly experienced designer creating comprehensive design solutions and leading visual direction.',
          salaryRange: '$100,000 - $140,000',
          remoteScore: 5,
          icon: <PenTool size={24} />,
          skills: [
            { id: 's1', name: 'Advanced UI/UX', level: 'advanced' },
            { id: 's2', name: 'Design Strategy', level: 'advanced' },
            { id: 's3', name: 'User Research', level: 'intermediate' },
            { id: 's4', name: 'Team Collaboration', level: 'advanced' }
          ]
        },
        {
          id: 'design-director',
          title: 'Design Director',
          description: 'Design leader overseeing visual identity and creative strategy for products or brands.',
          salaryRange: '$130,000 - $180,000',
          remoteScore: 4,
          icon: <PenTool size={24} />,
          skills: [
            { id: 's1', name: 'Creative Direction', level: 'advanced' },
            { id: 's2', name: 'Brand Strategy', level: 'advanced' },
            { id: 's3', name: 'Team Management', level: 'advanced' },
            { id: 's4', name: 'Design Operations', level: 'intermediate' }
          ]
        }
      ]
    },
    marketing: {
      id: 'marketing',
      name: 'Marketing & Content',
      description: 'Career paths in digital marketing, content creation, and communications that are well-suited to remote work.',
      roles: [
        {
          id: 'content-writer',
          title: 'Content Writer',
          description: 'Creates written content for websites, blogs, and marketing materials.',
          salaryRange: '$45,000 - $70,000',
          remoteScore: 5,
          icon: <FileText size={24} />,
          skills: [
            { id: 's1', name: 'Writing & Editing', level: 'intermediate' },
            { id: 's2', name: 'SEO Basics', level: 'beginner' },
            { id: 's3', name: 'Content Management', level: 'beginner' },
            { id: 's4', name: 'Research', level: 'intermediate' }
          ]
        },
        {
          id: 'digital-marketer',
          title: 'Digital Marketing Specialist',
          description: 'Manages digital marketing campaigns across multiple channels.',
          salaryRange: '$60,000 - $90,000',
          remoteScore: 5,
          icon: <BarChart4 size={24} />,
          skills: [
            { id: 's1', name: 'Social Media Marketing', level: 'intermediate' },
            { id: 's2', name: 'SEO/SEM', level: 'intermediate' },
            { id: 's3', name: 'Email Marketing', level: 'intermediate' },
            { id: 's4', name: 'Analytics', level: 'intermediate' }
          ]
        },
        {
          id: 'content-strategist',
          title: 'Content Strategist',
          description: 'Develops content strategy and oversees content creation across platforms.',
          salaryRange: '$80,000 - $120,000',
          remoteScore: 5,
          icon: <FileText size={24} />,
          skills: [
            { id: 's1', name: 'Content Planning', level: 'advanced' },
            { id: 's2', name: 'SEO Strategy', level: 'advanced' },
            { id: 's3', name: 'Audience Research', level: 'intermediate' },
            { id: 's4', name: 'Editorial Calendar', level: 'advanced' }
          ]
        },
        {
          id: 'marketing-director',
          title: 'Marketing Director',
          description: 'Leads marketing strategy and oversees all marketing initiatives.',
          salaryRange: '$120,000 - $180,000',
          remoteScore: 4,
          icon: <BarChart4 size={24} />,
          skills: [
            { id: 's1', name: 'Marketing Strategy', level: 'advanced' },
            { id: 's2', name: 'Team Leadership', level: 'advanced' },
            { id: 's3', name: 'Budget Management', level: 'advanced' },
            { id: 's4', name: 'Brand Development', level: 'advanced' }
          ]
        }
      ]
    }
  };

  // Helper function to render a skill with appropriate styling based on level
  const renderSkill = (skill: Skill) => {
    const levelColors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-purple-100 text-purple-800',
      advanced: 'bg-green-100 text-green-800'
    };
    
    return (
      <span 
        key={skill.id} 
        className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium mr-1.5 mb-1.5 ${levelColors[skill.level]}`}
      >
        {skill.name} • {skill.level.charAt(0).toUpperCase()}
      </span>
    );
  };

  // Get currently selected career path
  const currentPath = careerPaths[selectedPath];
  const selectedRoleData = selectedRole 
    ? currentPath.roles.find(role => role.id === selectedRole) 
    : null;

  // Function to render the career path visualization
  const renderCareerPath = (path: CareerPath) => {
    return (
      <div className="mt-3">
        <h2 className="text-xl font-bold mb-2">{path.name}</h2>
        <p className="text-gray-600 mb-3 text-sm">{path.description}</p>
        
        <div className="relative">
          {/* Career path progression line */}
          <div className="absolute left-6 top-8 h-[calc(100%-40px)] w-0.5 bg-gray-200"></div>
          
          {/* Job roles */}
          <div className="space-y-3">
            {path.roles.map((role, index) => (
              <div key={role.id} className={`relative`}>
                <Card 
                  className={`
                    border-l-4 
                    ${selectedRole === role.id ? 'border-l-primary bg-primary/5' : 'border-l-gray-300'}
                    cursor-pointer hover:shadow-md transition-all
                  `}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="py-2 px-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 z-10">
                        {role.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{role.title}</CardTitle>
                        <div className="text-xs text-gray-500">
                          {role.salaryRange} • Remote Score: {Array(5).fill(0).map((_, i) => (
                            <span key={i} className={`inline-block ${i < role.remoteScore ? 'text-primary' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="ml-auto text-gray-400" size={16} />
                    </div>
                  </CardHeader>
                </Card>
                
                {/* Show arrow connectors between roles */}
                {index < path.roles.length - 1 && (
                  <div className="absolute left-6 top-full mt-1 h-2 flex items-center justify-center z-0">
                    <div className="h-2 w-0.5 bg-gray-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Function to render detailed role information
  const renderRoleDetails = (role: JobRole) => {
    return (
      <Card className="mt-3">
        <CardHeader className="pb-1 pt-3">
          <div className="flex items-center mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              {role.icon}
            </div>
            <CardTitle className="text-base">{role.title}</CardTitle>
          </div>
          <div className="text-xs text-gray-500">
            {role.salaryRange} • Remote Compatibility: {role.remoteScore}/5
          </div>
        </CardHeader>
        <CardContent className="pt-1 pb-3">
          <h3 className="font-semibold mb-1 text-sm">Role Description</h3>
          <p className="text-gray-700 mb-3 text-sm">{role.description}</p>
          
          <h3 className="font-semibold mb-1 text-sm">Key Skills</h3>
          <div className="mb-3">
            {role.skills.map(skill => renderSkill(skill))}
          </div>
          
          <h3 className="font-semibold mb-1 text-sm">Related Job Opportunities</h3>
          <div className="mt-1">
            <Button asChild variant="outline" size="sm">
              <Link href={`/search?q=${encodeURIComponent(role.title)}`}>
                Browse Related Jobs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <SEOHead 
        title="Interactive Career Paths for Digital Nomads | NomadWorks" 
        description="Explore potential career paths for remote workers and digital nomads. Find the right progression path for your skills and interests."
      />
      
      <div className="container mx-auto py-4 px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">Digital Nomad Career Paths</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore potential remote-friendly career paths and progression opportunities for digital nomads
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={selectedPath} onValueChange={setSelectedPath} className="mb-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="tech" className="flex items-center gap-2">
                  <Code size={16} /> Technology
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <PenTool size={16} /> Design
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2">
                  <BarChart4 size={16} /> Marketing
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tech" className="mt-2">
                {renderCareerPath(careerPaths.tech)}
              </TabsContent>
              
              <TabsContent value="design" className="mt-2">
                {renderCareerPath(careerPaths.design)}
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-2">
                {renderCareerPath(careerPaths.marketing)}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            {selectedRoleData ? (
              renderRoleDetails(selectedRoleData)
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="p-3 text-center flex flex-col items-center">
                  <Globe className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-base font-medium text-gray-700 mb-1">Select a Role</h3>
                  <p className="text-gray-500 text-xs">
                    Click on any role to view details about the position, skills, and related jobs.
                  </p>
                </CardContent>
              </Card>
            )}
            
            <Card className="mt-4 bg-blue-50">
              <CardContent className="p-3">
                <h3 className="text-base font-medium text-blue-800 mb-2">Why Choose Remote Work?</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li className="flex items-start">
                    <span className="mr-1">🌍</span> Work from anywhere in the world
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">⏰</span> Flexible work schedule
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">💰</span> Reduced commuting costs
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">🏡</span> Better work-life balance
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">📈</span> Access to global opportunities
                  </li>
                </ul>
                
                <div className="mt-3">
                  <Button asChild size="sm" variant="outline" className="bg-white text-xs">
                    <Link href="/digital-nomad-toolkit">
                      Explore Digital Nomad Toolkit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}