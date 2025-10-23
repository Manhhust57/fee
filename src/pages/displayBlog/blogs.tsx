// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./blogs.css";

// const API_URL = "https://anstay.com.vn";
// const BLOG_API = `${API_URL}/api/admin/blog-posts`;

// const blogs = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const blogsPerPage = 5;

//     useEffect(() => {
//         axios
//             .get(BLOG_API)
//             .then((res) => setBlogs(res.data))
//             .catch(() => setBlogs([]));
//     }, []);
//     const publishedBlogs = blogs.filter((b) => b.status === "PUBLISHED");

//     const indexOfLastBlog = currentPage * blogsPerPage;
//     const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//     const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

//     const totalPages = Math.ceil(publishedBlogs.length / blogsPerPage);

//     // Xử lý ảnh (thêm domain nếu cần)
//     const getFullImageUrl = (url) => {
//         if (!url) return "https://placehold.co/400x250?text=No+Image";
//         if (url.startsWith("http")) return url;
//         return API_URL + url;
//     };

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const ScrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <div className="blog-page">
//             <h1>Trải Nghiệm Tour Du Lịch</h1>
//             <div className="blog-list">
//                 {currentBlogs.map((blog) => (
//                     <div key={blog.id} className="blog-card">
//                         <img
//                             src={getFullImageUrl(blog.thumbnail)}
//                             alt={blog.title}
//                             className="blog-image"
//                         />
//                         <div className="blog-content">
//                             <h2 className="blog-title">{blog.title}</h2>
//                             <div className="blog-meta">
//                                 <span>
//                                     📅{" "}
//                                     {blog.createdAt
//                                         ? blog.createdAt
//                                             .split("T")[0]
//                                             .split("-")
//                                             .reverse()
//                                             .join("-")
//                                         : ""}
//                                 </span>
//                                 {/* <span>👁️ 0</span> */}
//                             </div>
//                             <p className="blog-description">
//                                 {blog.summary && blog.summary.trim() !== ""
//                                     ? blog.summary
//                                     : blog.content
//                                         ? blog.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
//                                         : ""}
//                             </p>
//                             <Link to={`/blog/${blog.id}`}>
//                                 <button className="blog-button">Xem thêm</button>
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="pagination">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => {
//                             paginate(index + 1);
//                             ScrollToTop();
//                         }}
//                         className={currentPage === index + 1 ? "active" : ""}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default blogs;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./blogs.css";
console.log("✅ ENV:", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
// Dữ liệu mẫu khi chưa có API
const MOCK_BLOGS = [
    {
        id: 1,
        title: "Kinh Nghiệm Du Lịch Hạ Long Tự Túc Siêu Vui Và Tiết Kiệm",
        summary: "Hành trình khám phá những điểm đến tuyệt vời tại Đà Nẵng với những trải nghiệm độc đáo và ẩm thực phong phú.",
        content: "Đà Nẵng là một trong những thành phố du lịch hàng đầu Việt Nam với nhiều điểm tham quan hấp dẫn như Bà Nà Hills, cầu Rồng, bãi biển Mỹ Khê...",
        thumbnail: "https://res.klook.com/image/upload/q_85/c_fill,w_1360/v1706867337/vviqkvkrzeohe12wxjyu.webp",
        createdAt: "2024-11-15T10:30:00Z",
        status: "PUBLISHED"
    },
    {
        id: 2,
        title: "Kinh Nghiệm Đi Sun Wheel Hạ Long: Giá Vé Và Các Trò Chơi",
        summary: "Tìm hiểu về lịch sử và văn hóa Hà Nội qua những di tích lịch sử và món ăn truyền thống đặc sắc.",
        content: "Hà Nội với hơn 1000 năm lịch sử là nơi lưu giữ nhiều giá trị văn hóa truyền thống của dân tộc Việt Nam...",
        thumbnail: "https://halong.sunworld.vn/wp-content/uploads/2018/10/DSC06754.jpeg",
        createdAt: "2024-11-12T14:15:00Z",
        status: "PUBLISHED"
    },
    {
        id: 3,
        title: "Kinh nghiệm du lịch Hang Sửng Sốt chi tiết từ A – Z 2025",
        summary: "Khám phá thiên đường biển đảo Phú Quốc với những bãi biển tuyệt đẹp và các hoạt động thú vị.",
        content: "Phú Quốc nổi tiếng với những bãi biển trong xanh, resort sang trọng và các hoạt động thể thao dưới nước hấp dẫn...",
        thumbnail: "/pictures/anh3.jpg",
        createdAt: "2024-11-10T09:20:00Z",
        status: "PUBLISHED"
    },
    {
        id: 4,
        title: "Sun World Hạ Long - Cập Nhật Giá Vé & Kinh Nghiệm Đi Tự Túc",
        summary: "Trải nghiệm vẻ đẹp hùng vĩ của núi rừng Sapa với những thửa ruộng bậc thang và văn hóa dân tộc độc đáo.",
        content: "Sapa là điểm đến lý tưởng cho những ai yêu thích thiên nhiên với khí hậu mát mẻ quanh năm và phong cảnh tuyệt đẹp...",
        thumbnail: "https://th.bing.com/th/id/OIP.b9U0APgxEJee-bWA5EfA6gHaEc?w=281&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
        createdAt: "2024-11-08T16:45:00Z",
        status: "PUBLISHED"
    },
    {
        id: 5,
        title: "15 Du Thuyền Hạ Long Sang Trọng Cho Bạn Kỳ Nghỉ Trọn Vẹn",
        summary: "Dạo bước trên những con phố cổ kính Hội An trong ánh sáng lung linh của hàng ngàn chiếc đèn lồng.",
        content: "Hội An là di sản văn hóa thế giới với kiến trúc cổ độc đáo, ẩm thực đặc sắc và không khí lãng mạn đặc biệt...",
        thumbnail: "https://thuetauhalong.com/wp-content/uploads/2024/01/du-thuyen-Halong-symphony-cruise-11.jpg",
        createdAt: "2024-11-05T11:30:00Z",
        status: "PUBLISHED"
    },
    {
        id: 6,
        title: "Lịch Trình Du Lịch Hà Nội - Hạ Long - Ninh Bình 5 Ngày 4 Đêm",
        summary: "Khám phá những di tích lịch sử của triều đại phfeudal cuối cùng và thưởng thức ẩm thực cung đình tinh tế.",
        content: "Huế với Đại Nội, lăng tẩm các vua triều Nguyễn và ẩm thực cung đình đặc sắc là điểm đến không thể bỏ qua...",
        thumbnail: "https://static-images.vnncdn.net/files/publish/2022/7/27/ha-long-bay-1-852.jpg",
        createdAt: "2024-11-03T13:10:00Z",
        status: "PUBLISHED"
    }
];

const blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

        console.log("🧭 NODE_ENV:", import.meta.env.MODE);
        console.log("🌍 VITE_API_URL:", import.meta.env.VITE_API_URL);
    useEffect(() => {
        console.log("👉 API_URL =", API_URL);

        // ✅ Nếu không có ENV thì dùng MOCK_BLOGS luôn
        if (!API_URL ) {
            console.warn("⚠️ Không tìm thấy ENV, dùng dữ liệu mẫu");
            setBlogs(MOCK_BLOGS);
            return;
        }

        setIsLoading(true);
        axios
        axios.get(API_URL + "/blog")

            .then((res) => {
                console.log("✅ API response:", res.data);
                const blogArray = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data.data)
                        ? res.data.data
                        : [];

                setBlogs(blogArray);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("❌ Lỗi API:", err.message);
                console.log("Dùng dữ liệu mẫu thay thế");
                setBlogs(MOCK_BLOGS);
                setIsLoading(false);
            });
    }, []);

        

    const publishedBlogs = blogs.filter((b) => b.status === "PUBLISHED")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(publishedBlogs.length / blogsPerPage);

    // Xử lý ảnh (thêm domain nếu cần)
    const getFullImageUrl = (url) => {
        if (!url) return "https://placehold.co/400x250?text=No+Image";
        if (url.startsWith("http")) return url;
        return API_URL + url;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="blog-page1">
                <h1>Bí kíp du lịch</h1>
                <div className="loading">
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (publishedBlogs.length === 0) {
        return (
            <div className="about-content">
                <div className="hero-section">
                    <div className="hero-image">
                        <img src="https://cdn.tripspoint.com/uploads/photos/426/halong-bay-tour_mpTU2.jpeg" alt="À La Carte Ha Long Bay" />
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <h2>Bí kíp du lịch tại Vịnh Hạ Long</h2>
                                <p>Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog-page">

                    <h1>Bí kíp du lịch</h1>
                <div className="empty-state">
                    <p>Chưa có bài viết nào được xuất bản.</p>
                </div>
            </div></div>
        );
    }

    return (
        <div className="about-content">
            <div className="hero-section">
                <div className="hero-image">
                    <img src="https://cdn.tripspoint.com/uploads/photos/426/halong-bay-tour_mpTU2.jpeg" alt="À La Carte Ha Long Bay" />
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h2>Bí kíp du lịch tại Vịnh Hạ Long</h2>
                            <p>Khám phá những câu chuyện, cảm hứng và ý tưởng du lịch độc đáo cho chuyến vi vu tiếp theo của bạn</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blog-page">
            
                <h1>Bí kíp du lịch</h1>
            
            <div className="blog-list">
                
                {currentBlogs.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <img
                            src={getFullImageUrl(blog.thumbnail) }
                            alt={blog.title}
                            className="blog-image"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://placehold.co/400x250?text=No+Image";
                            }}
                        />
                        <div className="blog-content">
                            <h2 className="blog-title">{blog.title}</h2>
                            <div className="blog-meta">
                                <span>
                                    📅{" "}
                                    {blog.createdAt
                                        ? blog.createdAt
                                            .split("T")[0]
                                            .split("-")
                                            .reverse()
                                            .join("/")
                                        : ""}
                                </span>
                                {/* <span>👁️ 0</span> */}
                            </div>
                            <p className="blog-description">
                                {blog.summary && blog.summary.trim() !== ""
                                    ? blog.summary
                                    : blog.content
                                        ? blog.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                                        : "Không có mô tả"}
                            </p>

                            <Link
                                to={
                                        blog.id === 1
                                            ? "https://www.klook.com/vi/blog/kinh-nghiem-du-lich-ha-long/?msockid=37d954118afb6ea422f641f68bf36ff2  "
                                        : blog.id === 2
                                            ? "https://www.klook.com/vi/blog/sun-wheel-ha-long/?spm=BlogCity.CityContent_LIST&clickId=718a844c08"
                                        : blog.id === 3
                                                ? "https://sinhtour.vn/hang-sung-sot/"
                                        : blog.id === 4
                                            ? "https://www.klook.com/vi/blog/sun-world-ha-long-complex/?spm=BlogCity.CityContent_LIST&clickId=52153b1906"
                                        : blog.id === 5
                                            ? "https://www.klook.com/vi/blog/du-thuyen-ha-long/?spm=BlogCity.CityContent_LIST&clickId=898e26ea92"
                                        : blog.id === 6
                                            ? "https://www.klook.com/vi/blog/du-lich-ha-noi-ha-long-ninh-binh/?spm=BlogCity.CityContent_LIST&clickId=2537ea5aaf"
                                        
                                        : `/blog/id/${blog.id}`
                                }
                            >
                                <button className="blog-button">Xem thêm</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
                
            {/* Pagination - chỉ hiện khi có nhiều hơn 1 trang */}
            {totalPages > 1 && (
                <div className="pagination">
                    {/* Previous button */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => {
                                paginate(currentPage - 1);
                                ScrollToTop();
                            }}
                            className="pagination-arrow"
                        >
                            ← Trước
                        </button>
                    )}

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                paginate(index + 1);
                                ScrollToTop();
                            }}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next button */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => {
                                paginate(currentPage + 1);
                                ScrollToTop();
                            }}
                            className="pagination-arrow"
                        >
                            Sau →
                        </button>
                    )}
                </div>
            )}
                
            </div>
            <footer className="blog-footer">
                <div className="blog-footer-content">
                    <div className="footer-left">
                        <p>&copy; {new Date().getFullYear()} Anstay. All rights reserved.</p>
                    </div>
                    <div className="footer-right">
                        <a href="https://www.facebook.com/Anstayalacarte" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img
                                src="https://i.ibb.co/dst8XydC/Facebook-Logo-2019.png"
                                alt="facebook"
                                className="icon-fl"
                            />
                        </a>
                        <a href="https://zalo.me/0916612772" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                                alt="zalo"
                                className="icon-fl"
                            />
                        </a>
                        <a href="https://www.youtube.com/@AnstayResidencebyALaCarte" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                            <img
                                src="/pictures/youtube.png"
                                alt="instagram"
                                className="icon-fl"
                            />
                        </a>
                        <a href="https://www.instagram.com/alacarte_by_anstay/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/pictures/instagram.png"
                                alt="instagram"
                                className="icon-fl"
                            />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default blogs;