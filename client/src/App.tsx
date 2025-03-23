import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./contexts/UserContext";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import JobDetail from "@/pages/JobDetail";
import CategoryPage from "@/pages/CategoryPage";
import CategoriesListPage from "@/pages/CategoriesListPage";
import LocationPage from "@/pages/LocationPage";
import LocationsListPage from "@/pages/LocationsListPage";
import SearchResults from "@/pages/SearchResults";
import KeywordLandingPage from "@/pages/KeywordLandingPage";
import SitemapPage from "@/pages/SitemapPage";
import DigitalNomadToolkit from "@/pages/DigitalNomadToolkit";
import CareerPathVisualization from "@/pages/CareerPathVisualization";
import IconTest from "@/components/IconTest";
import Register from "@/pages/Register";
import SavedJobs from "@/pages/SavedJobs";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminPanel from "@/pages/AdminPanel";
import BlogListing from "@/pages/BlogListing";
import BlogPost from "@/pages/BlogPost";
import AuthGateway from "@/components/AuthGateway";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

function AdminRoute({ component: Component, ...rest }: { component: React.ComponentType, path: string }) {
  const { user, isAuthenticated } = useUser();
  const [, setLocation] = useLocation();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      // Redirect non-admin authenticated users to home
      setLocation('/');
    } else if (!isAuthenticated) {
      // Redirect non-authenticated users to login
      setLocation('/login');
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // If the user is admin, render the component, otherwise render nothing during redirect
  return (isAuthenticated && isAdmin) ? <Component /> : null;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs/:slug" component={JobDetail} />
        <Route path="/categories" component={CategoriesListPage} />
        <Route path="/categories/:slug" component={CategoryPage} />
        <Route path="/locations" component={LocationsListPage} />
        <Route path="/locations/:slug" component={LocationPage} />
        <Route path="/search" component={SearchResults} />
        <Route path="/keywords/:keyword" component={KeywordLandingPage} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route path="/digital-nomad-toolkit" component={DigitalNomadToolkit} />
        <Route path="/career-paths" component={CareerPathVisualization} />
        <Route path="/blog" component={BlogListing} />
        <Route path="/blog/post/:slug" component={BlogPost} />
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/saved-jobs" component={SavedJobs} />
        <Route path="/auth" component={AuthGateway} />
        <Route path="/admin">
          {(params) => <AdminRoute component={AdminPanel} path="/admin" />}
        </Route>
        <Route path="/icon-test" component={IconTest} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;