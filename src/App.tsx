import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import WhyMe from "./pages/WhyMe";
import NotFound from "./pages/NotFound";
import FocusedCourse from "./pages/FocusedCourse";
import FocusedWorkshop from "./pages/FocusedWorkshop";
import CustomLecture from "./pages/CustomLecture";
import IntroWorkshop from "./pages/IntroWorkshop";
import AutoScrollTop from "./components/common/AutoScrollTop";
import ScrollToTop from "./components/common/ScrollToTop";
import YouTubeVideos from "./pages/YouTubeVideos";
import ArticlesBlog from "./pages/ArticlesBlog";
import ArticlePage from "./pages/articles/ArticlePage";
import ThankYou from "./pages/ThankYou";
import ThankYouPhysical from "./pages/ThankYouPhysical";
import VibeCoding from "./pages/VibeCoding";
import ZoomMeeting from "./pages/ZoomMeeting";
import PrivateLesson from "./pages/PrivateLesson";

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
            <Route path="/video-blog" element={<Layout><YouTubeVideos /></Layout>} />
            <Route path="/articles-blog" element={<Layout><ArticlesBlog /></Layout>} />
            <Route path="/articles-blog/:slug" element={<Layout><ArticlePage /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/why-me" element={<Layout><WhyMe /></Layout>} />
            <Route path="/focused-course" element={<Layout><FocusedCourse /></Layout>} />
            <Route path="/focused-workshop" element={<Layout><FocusedWorkshop /></Layout>} />
            <Route path="/custom-lecture" element={<Layout><CustomLecture /></Layout>} />
            <Route path="/intro-workshop" element={<Layout><IntroWorkshop /></Layout>} />
            <Route path="/zoom-meeting" element={<Layout><ZoomMeeting /></Layout>} />
            <Route path="/private-lesson" element={<Layout><PrivateLesson /></Layout>} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/thank-you-physical" element={<ThankYouPhysical />} />
            <Route path="/vibecoding" element={<VibeCoding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
