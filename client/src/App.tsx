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
import IconTest from "@/components/IconTest";
import Register from "@/pages/Register";
import SavedJobs from "@/pages/SavedJobs";
import Login from "@/pages/Login";
import AuthGateway from "@/components/AuthGateway";

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
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/saved-jobs" component={SavedJobs} />
        <Route path="/auth" component={AuthGateway} />
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