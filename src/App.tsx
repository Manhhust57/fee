import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import các component cần thiết ngay (critical)
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop/SrcollToTop";
import { AuthProvider } from "./Context/AuthContext";
import BlogUser from "./pages/BlogUser/BlogUser";

// Lazy load các pages
const Home = lazy(() => import("./pages/Home/Home"));
const Apartment = lazy(() => import("./components/Apartment/Apartment"));
const ApartmentDetail = lazy(() => import("./components/ApartmentDetail/ApartmentDetail"));
const Tour = lazy(() => import("./components/Tour/Tour"));
const TourDetail = lazy(() => import("./components/TourDetail/TourDetail"));
const Help = lazy(() => import("./components/Help/Help"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const AboutCP = lazy(() => import("./components/AboutList/AboutCP/AboutCP"));
const AboutGCP = lazy(() => import("./components/AboutList/AboutGCP/AboutGCP"));
const OurStory = lazy(() => import("./components/AboutList/OurStory/OurStory"));
const Coperate = lazy(() => import("./components/Coperate/Coperate"));
const ExploExper = lazy(() => import("./components/ExploExper/ExploExper"));
const ExploSub = lazy(() => import("./components/ExploExperSub/ExploSub"));
const DashBroad = lazy(() => import("./components/DashBroad/DashBroad"));
const Culture = lazy(() => import("./components/AboutList/Aboutculture/Culture"));
const Support = lazy(() => import("./components/Support/Support"));
const HidenPage = lazy(() => import("./pages/HidenPage/HidenPage"));
const FormQr = lazy(() => import("./components/FormQr/FormQr"));
const SearchResults = lazy(() => import("./pages/SearchResults/SearchResults"));
const ApartmentList = lazy(() => import("./pages/ApartmentList/ApartmentList"));
const BookingPage = lazy(() => import("./components/BookingPage/BookingPage"));
const ApartmentRoom = lazy(() => import("./pages/ApartmentRoom/ApartmentRoom"));
const BaoMat = lazy(() => import("./pages/ChinhSach/BaoMat/BaoMat"));
const ChamSoc = lazy(() => import("./pages/ChinhSach/ChamSoc/ChamSoc"));
const HopTac = lazy(() => import("./pages/ChinhSach/HopTac/HopTac"));
const Policy = lazy(() => import("./components/Policy/Policy"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const About = lazy(() => import("./pages/About/about"));
const Booking = lazy(() => import("./components/bookroom/bookroom"));
const Blogs = lazy(() => import("./pages/displayBlog/blogs"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));

// Loading Component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    <div>Đang tải...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Routes không có MainLayout */}
            <Route path="/hiden-page/:apartment" element={<HidenPage />} />
            <Route path="/form-qr" element={<FormQr />} />
            <Route path="/chinh-sach-bao-mat" element={<BaoMat />} />
            <Route path="/cham-soc-khach-hang" element={<ChamSoc />} />
            <Route path="/chuong-trinh-hop-tac" element={<HopTac />} />
            <Route path="/apartment-detail/:apartmentId" element={<ApartmentDetail />} />

            {/* Routes có MainLayout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/policy" element={<MainLayout><Policy /></MainLayout>} />
            <Route path="/blog" element={<MainLayout hideFooter={true} hideFloattingContactBt={true}><Blogs /></MainLayout>} />
            <Route path="/blog/id/:id" element={<MainLayout hideFooter={true} hideFloattingContactBt={true}><BlogDetail /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
            <Route path="/booking" element={<MainLayout><Booking /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />

            <Route path="/bloguser" element={<MainLayout><BlogUser /></MainLayout>} />

            {/* Apartment Routes */}
            <Route path="/apartment-ha-noi" element={<MainLayout><Apartment /></MainLayout>} />
            <Route path="/apartment-ha-long" element={<MainLayout><Apartment /></MainLayout>} />
            <Route path="/apartment-ha-noi/:apartmentName/view" element={<MainLayout><ApartmentDetail /></MainLayout>} />
            <Route path="/apartment-ha-long/:apartmentName/view" element={<MainLayout><ApartmentDetail /></MainLayout>} />
            <Route path="/apartment/:area/:apartmentName" element={<MainLayout><ApartmentRoom /></MainLayout>} />
            <Route path="/apartments/ha-noi" element={<MainLayout><ApartmentList /></MainLayout>} />
            <Route path="/apartments/ha-long" element={<MainLayout><ApartmentList /></MainLayout>} />
            <Route path="/apartments/:locationSlug" element={<MainLayout><ApartmentList /></MainLayout>} />

            {/* Booking Routes */}
            <Route path="/booking-page" element={<MainLayout><BookingPage /></MainLayout>} />
          
            {/* About Routes */}
            <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
            <Route path="/about-us/company" element={<MainLayout><AboutCP /></MainLayout>} />
            <Route path="/about-us/groupcompany" element={<MainLayout><AboutGCP /></MainLayout>} />
            <Route path="/about-us/culture" element={<MainLayout><Culture /></MainLayout>} />
            <Route path="/about-us/our-story" element={<MainLayout><OurStory /></MainLayout>} />

            {/* Explore Routes */}
            <Route path="/explore&experience" element={<MainLayout><ExploExper /></MainLayout>} />
            <Route path="/explore&experience/:slug" element={<MainLayout><ExploSub /></MainLayout>} />

            {/* Other Routes */}
            <Route path="/help" element={<MainLayout><Help /></MainLayout>} />
            <Route path="/dashbroad" element={<MainLayout><DashBroad /></MainLayout>} />
            <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
            <Route path="/search-results" element={<MainLayout><SearchResults /></MainLayout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;