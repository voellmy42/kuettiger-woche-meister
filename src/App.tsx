import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LaunchScreen from "./pages/LaunchScreen";
import Index from "./pages/Index";
import NewsletterPage from "./pages/NewsletterPage";
import NotFound from "./pages/NotFound";
import Info from "./pages/Info";
import PollsPage from "./pages/PollsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LaunchScreen />} />
          <Route path="/app" element={<Index />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/polls" element={<PollsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
