
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import WhyMe from "./pages/WhyMe";
import NotFound from "./pages/NotFound";
import FocusedCourse from "./pages/FocusedCourse";
import FocusedWorkshop from "./pages/FocusedWorkshop";
import CustomLecture from "./pages/CustomLecture";
import IntroWorkshop from "./pages/IntroWorkshop";
import AutoScrollTop from "./components/common/AutoScrollTop";
import ScrollToTop from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AutoScrollTop />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/why-me" element={<Layout><WhyMe /></Layout>} />
            <Route path="/focused-course" element={<Layout><FocusedCourse /></Layout>} />
            <Route path="/focused-workshop" element={<Layout><FocusedWorkshop /></Layout>} />
            <Route path="/custom-lecture" element={<Layout><CustomLecture /></Layout>} />
            <Route path="/intro-workshop" element={<Layout><IntroWorkshop /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
