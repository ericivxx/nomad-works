
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User as UserIcon, MapPin, Calendar, FileText, Bookmark, Shield, KeyRound } from "lucide-react";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const profileSchema = z.object({
  fullName: z.string().optional(),
  location: z.string().optional(),
  gender: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, isAuthenticated, loading, logout } = useUser();
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading, navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      location: user?.location || '',
      gender: user?.gender || '',
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || '',
        location: user.location || '',
        gender: user.gender || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setUpdateLoading(true);
    
    // For now we'll just simulate an update since we don't have the API yet
    // This would be replaced with a real API call in the future
    setTimeout(() => {
      setUpdateLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }, 500);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                    <CardDescription>
                      Manage your profile information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-medium">Personal Information</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-medium">Location</h3>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          disabled={updateLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={updateLoading}>
                          {updateLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Personal Information</h3>
                      </div>
                      
                      <dl className="divide-y divide-border rounded-md border p-4">
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                          <dd className="col-span-2 text-sm">{user?.email}</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                          <dd className="col-span-2 text-sm">{user?.fullName || 'Not provided'}</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                          <dd className="col-span-2 text-sm capitalize">{user?.gender || 'Not provided'}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Location</h3>
                      </div>
                      
                      <dl className="divide-y divide-border rounded-md border p-4">
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <dt className="text-sm font-medium text-muted-foreground">Current Location</dt>
                          <dd className="col-span-2 text-sm">{user?.location || 'Not provided'}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Account</h3>
                      </div>
                      
                      <dl className="divide-y divide-border rounded-md border p-4">
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <dt className="text-sm font-medium text-muted-foreground">Member Since</dt>
                          <dd className="col-span-2 text-sm">March 2024</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                {!isEditing && (
                  <>
                    <Button variant="outline" onClick={handleLogout}>
                      Log Out
                    </Button>
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Shield className="h-10 w-10 text-primary/70" />
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and update your password
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Password Management</h3>
                    </div>
                    
                    <ChangePasswordForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
                <CardDescription>
                  Keep track of jobs you're interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No saved jobs yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    When you find interesting jobs, save them for later.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No applications yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Apply to jobs and track your applications here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
