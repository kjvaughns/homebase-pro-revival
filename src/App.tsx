import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MarketplacePage from "./pages/MarketplacePage.tsx";
import ProviderDetailPage from "./pages/ProviderDetailPage.tsx";
import ProviderProfilePage from "./pages/ProviderProfilePage.tsx";

const BookSlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/providers/${slug}`} replace />;
};
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import AIBookingPage from "./pages/AIBookingPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import GuestBookingPage from "./pages/GuestBookingPage.tsx";
import BookingConfirmedPage from "./pages/BookingConfirmedPage.tsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.tsx";
import PaymentSuccessPage from "./pages/PaymentSuccessPage.tsx";
import PaymentCancelledPage from "./pages/PaymentCancelledPage.tsx";
import BookingSuccessPage from "./pages/BookingSuccessPage.tsx";
import OpenAppPage from "./pages/OpenAppPage.tsx";
import BlogIndexPage from "./pages/BlogIndexPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<ProviderDetailPage />} />
          <Route path="/providers/:id" element={<ProviderProfilePage />} />
          <Route path="/book/appointment/:providerId" element={<BookAppointmentPage />} />
          <Route path="/book/:slug" element={<BookSlugRedirect />} />
          <Route path="/book" element={<GuestBookingPage />} />
          <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/ai-booking" element={<AIBookingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/open-app" element={<OpenAppPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
