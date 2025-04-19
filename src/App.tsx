
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WrittenBlog from "./pages/WrittenBlog";
import BlogAdmin from "./pages/BlogAdmin";
import Contact from "./pages/Contact";
import WhyMe from "./pages/WhyMe";
import NotFound from "./pages/NotFound";
import FocusedCourse from "./pages/FocusedCourse";
import FocusedWorkshop from "./pages/FocusedWorkshop";
import CustomLecture from "./pages/CustomLecture";
import IntroWorkshop from "./pages/IntroWorkshop";
import AutoScrollTop from "./components/common/AutoScrollTop";
import ScrollToTop from "./components/common/ScrollToTop";
import DigitalCourses from "./pages/DigitalCourses";
import CourseDetail from "./pages/CourseDetail";
import LessonDetail from "./pages/LessonDetail";
import AuthPage from "./pages/AuthPage";
import CourseAdmin from "./pages/CourseAdmin";
import CourseLessons from "./pages/CourseLessons";
import UserAdmin from "./pages/UserAdmin";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
              <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
              <Route path="/written-blog" element={<Layout><WrittenBlog /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/why-me" element={<Layout><WhyMe /></Layout>} />
              <Route path="/focused-course" element={<Layout><FocusedCourse /></Layout>} />
              <Route path="/focused-workshop" element={<Layout><FocusedWorkshop /></Layout>} />
              <Route path="/custom-lecture" element={<Layout><CustomLecture /></Layout>} />
              <Route path="/intro-workshop" element={<Layout><IntroWorkshop /></Layout>} />
              <Route path="/digital-courses" element={<Layout><DigitalCourses /></Layout>} />
              <Route path="/digital-courses/:slug" element={<Layout><CourseDetail /></Layout>} />
              <Route path="/digital-courses/:courseSlug/lessons/:lessonId" element={<Layout><LessonDetail /></Layout>} />
              <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
              
              {/* Profile Route */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><UserProfile /></Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/blog-admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><BlogAdmin /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/course-admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><CourseAdmin /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/course-admin/:courseId" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><CourseLessons /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/user-admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><UserAdmin /></Layout>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
