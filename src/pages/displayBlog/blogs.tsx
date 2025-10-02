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

const API_URL = "https://anstay.com.vn";
const BLOG_API = `http://localhost:8080/api/v1/blog/`;

// Dữ liệu mẫu khi chưa có API
const MOCK_BLOGS = [
    {
        id: 1,
        title: "Khám phá vẻ đẹp Đà Nẵng - Thành phố đáng sống",
        summary: "Hành trình khám phá những điểm đến tuyệt vời tại Đà Nẵng với những trải nghiệm độc đáo và ẩm thực phong phú.",
        content: "Đà Nẵng là một trong những thành phố du lịch hàng đầu Việt Nam với nhiều điểm tham quan hấp dẫn như Bà Nà Hills, cầu Rồng, bãi biển Mỹ Khê...",
        thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
        createdAt: "2024-11-15T10:30:00Z",
        status: "PUBLISHED"
    },
    {
        id: 2,
        title: "Hà Nội - Thủ đô ngàn năm văn hiến",
        summary: "Tìm hiểu về lịch sử và văn hóa Hà Nội qua những di tích lịch sử và món ăn truyền thống đặc sắc.",
        content: "Hà Nội với hơn 1000 năm lịch sử là nơi lưu giữ nhiều giá trị văn hóa truyền thống của dân tộc Việt Nam...",
        thumbnail: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop",
        createdAt: "2024-11-12T14:15:00Z",
        status: "PUBLISHED"
    },
    {
        id: 3,
        title: "Phú Quốc - Đảo ngọc của Việt Nam",
        summary: "Khám phá thiên đường biển đảo Phú Quốc với những bãi biển tuyệt đẹp và các hoạt động thú vị.",
        content: "Phú Quốc nổi tiếng với những bãi biển trong xanh, resort sang trọng và các hoạt động thể thao dưới nước hấp dẫn...",
        thumbnail: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=250&fit=crop",
        createdAt: "2024-11-10T09:20:00Z",
        status: "PUBLISHED"
    },
    {
        id: 4,
        title: "Sapa - Thị trấn trong mây",
        summary: "Trải nghiệm vẻ đẹp hùng vĩ của núi rừng Sapa với những thửa ruộng bậc thang và văn hóa dân tộc độc đáo.",
        content: "Sapa là điểm đến lý tưởng cho những ai yêu thích thiên nhiên với khí hậu mát mẻ quanh năm và phong cảnh tuyệt đẹp...",
        thumbnail: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=250&fit=crop",
        createdAt: "2024-11-08T16:45:00Z",
        status: "PUBLISHED"
    },
    {
        id: 5,
        title: "Hội An - Phố cổ ánh đèn lồng",
        summary: "Dạo bước trên những con phố cổ kính Hội An trong ánh sáng lung linh của hàng ngàn chiếc đèn lồng.",
        content: "Hội An là di sản văn hóa thế giới với kiến trúc cổ độc đáo, ẩm thực đặc sắc và không khí lãng mạn đặc biệt...",
        thumbnail: "https://images.unsplash.com/photo-1555618223-378fa4e86b0e?w=400&h=250&fit=crop",
        createdAt: "2024-11-05T11:30:00Z",
        status: "PUBLISHED"
    },
    {
        id: 6,
        title: "Huế - Cố đô ngàn năm",
        summary: "Khám phá những di tích lịch sử của triều đại phfeudal cuối cùng và thưởng thức ẩm thực cung đình tinh tế.",
        content: "Huế với Đại Nội, lăng tẩm các vua triều Nguyễn và ẩm thực cung đình đặc sắc là điểm đến không thể bỏ qua...",
        thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
        createdAt: "2024-11-03T13:10:00Z",
        status: "PUBLISHED"
    },
    {
        id: 7,
        title: "Đà Lạt - Thành phố mùa xuân",
        summary: "Tận hưởng không khí trong lành và khám phá vẻ đẹp lãng mạn của thành phố ngàn hoa.",
        content: "Đà Lạt nổi tiếng với khí hậu mát mẻ, những vườn hoa đầy màu sắc và các khu resort nghỉ dưỡng tuyệt vời...",
        thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
        createdAt: "2024-11-01T08:25:00Z",
        status: "PUBLISHED"
    }
];

const blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(BLOG_API)
            .then((res) => {
                setBlogs(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                // Khi API lỗi, sử dụng dữ liệu mẫu
                console.log("API không khả dụng, sử dụng dữ liệu mẫu");
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
            <div className="blog-page">
                <h1>Trải Nghiệm Tour Du Lịch</h1>
                <div className="loading">
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (publishedBlogs.length === 0) {
        return (
            <div className="blog-page">
                <h1>Trải Nghiệm Tour Du Lịch</h1>
                <div className="empty-state">
                    <p>Chưa có bài viết nào được xuất bản.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <h1>Trải Nghiệm Tour Du Lịch</h1>
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
                            <Link to={`/blog/id/${blog.id}`}>
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
    );
};

export default blogs;