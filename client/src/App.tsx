import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import JobDetail from "@/pages/JobDetail";
import CategoryPage from "@/pages/CategoryPage";
import LocationPage from "@/pages/LocationPage";
import SearchResults from "@/pages/SearchResults";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs/:slug" component={JobDetail} />
        <Route path="/categories/:slug" component={CategoryPage} />
        <Route path="/locations/:slug" component={LocationPage} />
        <Route path="/search" component={SearchResults} />
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
