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
import DigitalNomadGuide from "@/pages/DigitalNomadGuide"; 
import PaymentSuccess from "@/pages/PaymentSuccess";
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
    <Switch>
      <Route path="/">
        {() => (
          <Layout>
            <Home />
          </Layout>
        )}
      </Route>
      <Route path="/jobs/:slug">
        {(params) => (
          <Layout>
            <JobDetail />
          </Layout>
        )}
      </Route>
      <Route path="/categories">
        {() => (
          <Layout>
            <CategoriesListPage />
          </Layout>
        )}
      </Route>
      <Route path="/categories/:slug">
        {(params) => (
          <Layout>
            <CategoryPage />
          </Layout>
        )}
      </Route>
      <Route path="/locations">
        {() => (
          <Layout>
            <LocationsListPage />
          </Layout>
        )}
      </Route>
      <Route path="/locations/:slug">
        {(params) => (
          <Layout>
            <LocationPage />
          </Layout>
        )}
      </Route>
      <Route path="/search">
        {() => (
          <Layout>
            <SearchResults />
          </Layout>
        )}
      </Route>
      <Route path="/keywords/:keyword">
        {(params) => (
          <Layout>
            <KeywordLandingPage />
          </Layout>
        )}
      </Route>
      <Route path="/sitemap">
        {() => (
          <Layout>
            <SitemapPage />
          </Layout>
        )}
      </Route>
      <Route path="/digital-nomad-toolkit">
        {() => (
          <Layout>
            <DigitalNomadToolkit />
          </Layout>
        )}
      </Route>
      <Route path="/career-paths">
        {() => (
          <Layout>
            <CareerPathVisualization />
          </Layout>
        )}
      </Route>
      <Route path="/nomad-guide">
        {() => (
          <Layout>
            <DigitalNomadGuide />
          </Layout>
        )}
      </Route>
      <Route path="/payment-success">
        {() => (
          <Layout>
            <PaymentSuccess />
          </Layout>
        )}
      </Route>
      <Route path="/blog">
        {() => (
          <Layout>
            <BlogListing />
          </Layout>
        )}
      </Route>
      <Route path="/blog/post/:slug">
        {(params) => (
          <Layout>
            <BlogPost />
          </Layout>
        )}
      </Route>
      <Route path="/profile">
        {() => (
          <Layout>
            <Profile />
          </Layout>
        )}
      </Route>
      <Route path="/register">
        {() => (
          <Layout>
            <Register />
          </Layout>
        )}
      </Route>
      <Route path="/login">
        {() => (
          <Layout>
            <Login />
          </Layout>
        )}
      </Route>
      <Route path="/forgot-password">
        {() => (
          <Layout>
            <ForgotPassword />
          </Layout>
        )}
      </Route>
      <Route path="/reset-password">
        {() => (
          <Layout>
            <ResetPassword />
          </Layout>
        )}
      </Route>
      <Route path="/saved-jobs">
        {() => (
          <Layout>
            <SavedJobs />
          </Layout>
        )}
      </Route>
      <Route path="/auth">
        {() => (
          <Layout>
            <AuthGateway />
          </Layout>
        )}
      </Route>
      <Route path="/admin">
        {(params) => <AdminRoute component={AdminPanel} path="/admin" />}
      </Route>
      <Route path="/icon-test">
        {() => (
          <Layout>
            <IconTest />
          </Layout>
        )}
      </Route>
      <Route>
        {() => (
          <Layout>
            <NotFound />
          </Layout>
        )}
      </Route>
    </Switch>
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