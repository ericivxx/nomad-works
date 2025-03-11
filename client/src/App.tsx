import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import JobDetail from "@/pages/JobDetail";
import CategoryPage from "@/pages/CategoryPage";
import CategoriesListPage from "@/pages/CategoriesListPage";
import LocationPage from "@/pages/LocationPage";
import LocationsListPage from "@/pages/LocationsListPage";
import SearchResults from "@/pages/SearchResults";
import KeywordLandingPage from "@/pages/KeywordLandingPage";
import SitemapPage from "@/pages/SitemapPage";
import DigitalNomadToolkit from "@/pages/DigitalNomadToolkit";

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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
