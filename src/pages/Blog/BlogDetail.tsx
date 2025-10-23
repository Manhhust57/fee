import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import "./BlogDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const API_ = "https://anstay.com.vn";
const VITE_API_URL = "http://localhost:8080";
const API_URL = import.meta.env.VITE_API_URL;

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  summary?: string;
  createdAt: string;
  gallery?: string[];
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("ID bài viết không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        // Lấy blog chính
        const response = await axios.get(`${API_URL}/blog/id/${id}`);
        setBlog(response.data);

        // Lấy danh sách blog liên quan
        try {
          const relatedResponse = await axios.get(`${API_URL}/blog?limit=6`);
          // Lọc bỏ blog hiện tại
          const filtered = relatedResponse.data.filter((b: Blog) => String(b.id) !== String(id));
          setRelatedBlogs(filtered.slice(0, 5));
        } catch {
          setRelatedBlogs([]);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Không thể tải bài viết";
        setError(errorMessage);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Cập nhật title trang khi có blog
  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Anstay Blog`;
    }
    return () => {
      document.title = "Anstay";
    };
  }, [blog]);

  // Xử lý ảnh (nếu là relative path thì tự động thêm domain)
  const getFullImageUrl = (url?: string): string => {
    if (!url) return "https://placehold.co/600x300?text=No+Image";
    if (url.startsWith("http")) return url;
    return API_URL + url;
  };

  // Format ngày tháng
  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return dateStr.split("T")[0].split("-").reverse().join("/");
    }
  };

  // Sanitize HTML content để tránh XSS attacks
  const sanitizedContent = useMemo(() => {
    if (!blog?.content) return "";
    return DOMPurify.sanitize(blog.content, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }, [blog?.content]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="blog-detail-container">
          <div className="p-6 text-center text-gray-600 italic">
            <i className="bi bi-hourglass-split me-2"></i>
            Đang tải bài viết...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <div className="blog-detail-container">
          <div className="p-6 text-center text-red-600">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error || "Không tìm thấy bài viết"}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Wrapper chia 5 phần theo chiều dọc */}
      <div className="blog-detail-wrapper">
        {/* Phần 1: Để trống */}
        <div className="blog-section-empty"></div>

        {/* Phần 2 & 3: Nội dung bài viết */}
        <div className="blog-detail-main">
          <div className="blog-detail-container">
            <h1 className="blog-detail-title">{blog.title}</h1>

            <div className="blog-detail-header">
              <p className="blog-detail-meta">
                <i className="bi bi-calendar3"></i>{" "}
                {formatDate(blog.createdAt)}
              </p>
            </div>

            {blog.summary && (
              <div className="blog-detail-summary">{blog.summary}</div>
            )}

            <div className="blog-html">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>

            {blog.gallery && blog.gallery.length > 0 && (
              <section className="blog-gallery-section">
                <h2 className="blog-gallery-title">Hình ảnh trải nghiệm</h2>
                <div className="blog-gallery-grid">
                  {blog.gallery.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={getFullImageUrl(img)}
                      alt={`${blog.title} - Ảnh ${idx + 1}`}
                      className="blog-gallery-img"
                      loading="lazy"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
          <div style={{
            fontFamily: "'Segoe UI', sans-serif",
            background: "linear-gradient(135deg, #fffefb, #fff)",
            border: "2px solid #0088feff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            textAlign: "center",
            maxWidth: "650px",
            margin: "40px auto"
          }}>
          {/* Không có code nào ở đây gây ra lỗi "Type 'string' has no properties in common with type 'Properties<string | number, string & {}>'" */}
            

            <h3 style={{ color: "#333", fontSize: "22px", marginBottom: "10px" }}> Bạn cảm thấy thế nào sau khi đọc bài viết này?</h3>

            <p style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: 1.7,
              marginBottom: "20px"
            }}>
              Chúng tôi rất muốn nghe cảm nhận của bạn!
              Hãy gửi vài dòng chia sẻ về <strong>anstayresidence@gmail.com</strong>
              và nhận ngay <span style={{ color: "#0088feff", fontWeight: 600 }}>phiếu ưu đãi 100.000&nbsp;VNĐ</span>
              cho kỳ nghỉ tiếp theo tại <strong>Anstay</strong> nhé!
            </p>

            <a
              href="https://anstay.com.vn/booking"
              style={{
                display: "inline-block",
                color: "#000",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "0px",
                borderRadius: "30px",
                border: "2px solid #0088feff",
                boxShadow: "0 1px 1px #0088feff",
                transition: "all 0.3s ease"
              }}
            >
              👉 Nhấn vào đây để nhận quà từ Anstay
              <img src="/pictures/voucher.png"
                alt="Phiếu ưu đãi 100.000 VNĐ từ Anstay"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "160px",
                }} loading="lazy" />
            </a>
          </div>

        </div>
            
        {/* Phần 4: Bài viết liên quan */}
        <div className="related-blogs-section">
          <h3 className="related-blogs-title">Bài viết liên quan</h3>

          {relatedBlogs.length > 0 ? (
            <div className="related-blogs-list">
              {relatedBlogs.map((relatedBlog) => (
                <a
                  key={relatedBlog.id}
                  href={`/blog/id/${relatedBlog.id}`}
                  className="related-blog-item"
                >
                  <img src={getFullImageUrl(relatedBlog.thumbnail)} alt="" width="40%" height="60vw" />
                  <div className="related-blog-item-content">
                  <h4 className="related-blog-item-title">
                    {relatedBlog.title && <p className="related-blog-tittle">
                      {relatedBlog.title.slice(0, 50)}...
                    </p>}
                  </h4>
                  <p className="related-blog-item-date">
                    {formatDate(relatedBlog.createdAt)}
                  </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="no-related-blogs">Chưa có bài viết liên quan</p>
          )}
        </div>

        {/* Phần 5: Để trống */}
        <div className="blog-section-empty">dd</div>
      
      </div>
      <div></div>

    
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
    </>
  );
}