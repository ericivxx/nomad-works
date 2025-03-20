import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Save, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface ApiConfig {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  hasApiKey: boolean;
  status: 'available' | 'unavailable' | 'checking' | 'unknown';
}

interface ExternalApiState {
  providers: ApiConfig[];
  loading: boolean;
  saving: boolean;
}

export default function AdminPanel() {
  const { toast } = useToast();
  const { user, isAuthenticated } = useUser();
  const [, setLocation] = useLocation();
  const [apiState, setApiState] = useState<ExternalApiState>({
    providers: [],
    loading: true,
    saving: false
  });

  // Check if user is an admin, if not redirect
  useEffect(() => {
    if (isAuthenticated === false) {
      setLocation("/login");
    } else if (user && user.role !== "admin") {
      setLocation("/");
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page.",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, user, setLocation, toast]);

  // Fetch API configurations
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      fetchApiConfigurations();
    }
  }, [isAuthenticated, user]);

  const fetchApiConfigurations = async () => {
    setApiState(prev => ({ ...prev, loading: true }));
    try {
      const response = await apiRequest<{ providers: ApiConfig[] }>("/api/admin/api-config", {
        method: "GET"
      });
      setApiState({
        providers: response?.providers || [],
        loading: false,
        saving: false
      });
    } catch (error) {
      console.error("Failed to fetch API configurations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch API configurations. Please try again.",
        variant: "destructive"
      });
      setApiState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleToggleApi = (providerId: string) => {
    setApiState(prev => ({
      ...prev,
      providers: prev.providers.map(provider => 
        provider.id === providerId 
          ? { ...provider, enabled: !provider.enabled } 
          : provider
      )
    }));
  };

  const handleSaveChanges = async () => {
    setApiState(prev => ({ ...prev, saving: true }));
    try {
      await apiRequest("/api/admin/api-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providers: apiState.providers.map(p => ({
            id: p.id,
            enabled: p.enabled
          }))
        })
      });
      
      toast({
        title: "Success",
        description: "API configurations have been updated successfully.",
      });
      
      // Refresh the status of the APIs
      fetchApiConfigurations();
    } catch (error) {
      console.error("Failed to save API configurations:", error);
      toast({
        title: "Error",
        description: "Failed to save API configurations. Please try again.",
        variant: "destructive"
      });
      setApiState(prev => ({ ...prev, saving: false }));
    }
  };

  const handleApiStatus = async () => {
    setApiState(prev => ({
      ...prev,
      providers: prev.providers.map(provider => ({
        ...provider,
        status: 'checking'
      }))
    }));

    try {
      const response = await apiRequest<{ providers: { id: string; status: 'available' | 'unavailable' }[] }>("/api/admin/api-status", {
        method: "GET"
      });
      
      setApiState(prev => ({
        ...prev,
        providers: prev.providers.map(provider => {
          const statusInfo = response?.providers?.find(p => p.id === provider.id);
          return {
            ...provider,
            status: statusInfo ? statusInfo.status : 'unknown'
          };
        })
      }));
      
      toast({
        title: "API Status Check",
        description: "API availability status has been updated.",
      });
    } catch (error) {
      console.error("Failed to check API status:", error);
      toast({
        title: "Error",
        description: "Failed to check API availability status.",
        variant: "destructive"
      });
      
      setApiState(prev => ({
        ...prev,
        providers: prev.providers.map(provider => ({
          ...provider,
          status: 'unknown'
        }))
      }));
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <>
      <SEOHead
        title="Admin Panel - NomadWorks"
        description="Manage system settings and external integrations"
      />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">Manage system settings and external integrations</p>
          </div>
          <Shield className="h-8 w-8 text-blue-600" />
        </div>

        <Tabs defaultValue="api-management" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="api-management">API Management</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="api-management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>External API Management</CardTitle>
                <CardDescription>
                  Enable or disable external API integrations. When disabled, the system will use internal data only.
                </CardDescription>
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={handleApiStatus} 
                    variant="outline" 
                    size="sm"
                    disabled={apiState.loading || apiState.saving}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check API Status
                  </Button>
                  <Button 
                    onClick={handleSaveChanges} 
                    disabled={apiState.loading || apiState.saving}
                  >
                    {apiState.saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {apiState.loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2">Loading API configurations...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {apiState.providers.map(provider => (
                      <div key={provider.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{provider.name}</h3>
                            <div className="ml-2">
                              {provider.status === 'available' && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Available
                                </span>
                              )}
                              {provider.status === 'unavailable' && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                  Unavailable
                                </span>
                              )}
                              {provider.status === 'checking' && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                  Checking
                                </span>
                              )}
                              {provider.status === 'unknown' && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                  Unknown
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{provider.description}</p>
                          {!provider.hasApiKey && provider.enabled && (
                            <p className="text-sm text-amber-600 mt-1">
                              Warning: API key not configured. This API will not function correctly.
                            </p>
                          )}
                        </div>
                        <div>
                          <Switch 
                            checked={provider.enabled} 
                            onCheckedChange={() => handleToggleApi(provider.id)}
                            id={`toggle-${provider.id}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>
                  Manage API keys for external services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  To update API keys, use the environment settings or contact your system administrator.
                  API keys are not displayed here for security reasons.
                </p>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Required Environment Variables</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>RAPIDAPI_KEY - For JSearch API integration</li>
                    <li>ADZUNA_API_KEY - For Adzuna API integration</li>
                    <li>ADZUNA_APP_ID - For Adzuna API authentication</li>
                    <li>BRANDFETCH_API_KEY - For company logo and brand information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-management">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  This feature will be implemented in a future update.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  User management functionality is coming soon. You'll be able to manage user accounts, 
                  roles, and permissions from this panel.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system-settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  This feature will be implemented in a future update.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  System configuration settings are coming soon. You'll be able to adjust 
                  system behavior, manage caching, and configure other global settings.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}