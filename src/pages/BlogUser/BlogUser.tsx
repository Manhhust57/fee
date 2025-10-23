import React, { useState } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import "./BlogUser.css";

// Cấu hình domain backend
const API_IMAGE_PREFIX = "https://anstay.com.vn";

// Interface cho image attributes
interface ImageAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

// Hàm upload ảnh luôn trả về url có domain
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("Đang upload ảnh đến:", `${API_IMAGE_PREFIX}/api/images/upload`);

    const response = await axios.post(
      `${API_IMAGE_PREFIX}/api/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        timeout: 30000
      }
    );

    console.log("Response upload:", response.data);

    let url = response.data.url;
    if (url && url.startsWith("/")) {
      url = API_IMAGE_PREFIX + url;
    }

    console.log("URL cuối cùng:", url);
    return url;
  } catch (err: any) {
    console.error("Upload failed:", err);
    if (err.response) {
      console.error("Response error:", err.response.data);
      console.error("Status:", err.response.status);
    }
    throw new Error("Upload ảnh thất bại: " + (err.message || "Lỗi không xác định"));
  }
};

const fontFamilies = [
  { label: "Mặc định", value: "" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
];

const fontSizes = [
  { label: "12", value: "12px" },
  { label: "14", value: "14px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "20", value: "20px" },
  { label: "24", value: "24px" },
  { label: "28", value: "28px" },
  { label: "32", value: "32px" },
  { label: "36", value: "36px" },
  { label: "48", value: "48px" },
  { label: "64", value: "64px" },
];

// Hàm lấy text thuần từ HTML
function stripHtml(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// Hàm fix url /uploads/... thành url đầy đủ domain
const fixUrl = (url: string): string =>
  url && url.startsWith("/") ? API_IMAGE_PREFIX + url : url;

// Hàm fix url ảnh trong nội dung (<img src="/uploads/...">)
const fixContentImageUrls = (html: string): string =>
  html.replace(/<img\s+[^>]*src="(\/uploads\/[^"]+)"/g, (match, p1) =>
    match.replace(p1, API_IMAGE_PREFIX + p1)
  );

const BlogUser: React.FC = () => {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [fontSizeInput, setFontSizeInput] = useState("16px");
  const [imgWidth, setImgWidth] = useState("");
  const [imgHeight, setImgHeight] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status] = useState("DRAFT");
  const [summary, setSummary] = useState("");

  // Loading states
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Preview state
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: true, linkOnPaste: true, autolink: true }),
      TextStyle.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            fontSize: {
              default: "16px",
              parseHTML: (element: HTMLElement) => element.style.fontSize || "16px",
              renderHTML: (attributes: { fontSize?: string }) => {
                if (!attributes.fontSize) return {};
                return { style: `font-size: ${attributes.fontSize}` };
              },
            },
          };
        },
      }),
      FontFamily.configure({ types: ["textStyle"] }),
      Placeholder.configure({
        placeholder: "Nhập nội dung bài viết ở đây...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onCreate: ({ editor }) => {
      editor.chain().focus().setMark("textStyle", { fontSize: "16px" }).run();
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("image")) {
        const attrs = editor.getAttributes("image") as ImageAttributes;
        setImgWidth(attrs.width?.toString() || "");
        setImgHeight(attrs.height?.toString() || "");
      } else {
        setImgWidth("");
        setImgHeight("");
      }
    },
  });

  // Upload thumbnail ảnh đại diện
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
      return;
    }

    setUploadingThumbnail(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        setThumbnail(url);
        console.log("Upload thumbnail thành công:", url);
      }
    } catch (error) {
      console.error("Lỗi upload thumbnail:", error);
      alert("Upload ảnh thất bại! Vui lòng thử lại.");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Upload ảnh chèn vào nội dung bài
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
      return;
    }

    if (!editor) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
        console.log("Upload ảnh nội dung thành công:", imageUrl);
      }
    } catch (error) {
      console.error("Lỗi upload ảnh nội dung:", error);
      alert("Upload ảnh thất bại! Vui lòng thử lại.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInsertLink = () => {
    if (!editor) return;
    const url = prompt("Dán link hoặc nhập URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!editor) return;
    const font = e.target.value;
    editor.chain().focus().setFontFamily(font).run();
  };

  const handleFontSizeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFontSizeInput(val);
    if (!editor) return;
    if (val) {
      const { empty } = editor.state.selection;
      if (empty) {
        editor
          .chain()
          .focus()
          .setTextSelection({ from: 0, to: editor.state.doc.content.size })
          .setMark("textStyle", { fontSize: val })
          .run();
      } else {
        editor.chain().focus().setMark("textStyle", { fontSize: val }).run();
      }
    }
  };

  const handleDeleteImage = () => {
    if (editor && editor.isActive("image")) {
      editor.chain().focus().deleteSelection().run();
      setImgWidth("");
      setImgHeight("");
    }
  };

  const handleImageWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = e.target.value;
    setImgWidth(width);
    if (editor && editor.isActive("image")) {
      const attrs = editor.getAttributes("image") as ImageAttributes;
      const newAttrs: ImageAttributes = {
        ...attrs,
        width: width ? Number(width) : undefined,
      };
      editor.chain().focus().setImage(newAttrs).run();
    }
  };

  const handleImageHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = e.target.value;
    setImgHeight(height);
    if (editor && editor.isActive("image")) {
      const attrs = editor.getAttributes("image") as ImageAttributes;
      const newAttrs: ImageAttributes = {
        ...attrs,
        height: height ? Number(height) : undefined,
      };
      editor.chain().focus().setImage(newAttrs).run();
    }
  };

  // Hàm tạo slug tự động từ tiêu đề
  const createSlug = (title: string): string =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Gửi bài blog lên BE
  const handleSave = async () => {
    if (!editor) return;

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }

    if (!editor.getHTML().trim() || editor.isEmpty) {
      alert("Vui lòng nhập nội dung bài viết!");
      return;
    }

    setSaving(true);

    const slug = createSlug(title);
    const fixedThumbnail = fixUrl(thumbnail);
    const fixedContent = fixContentImageUrls(editor.getHTML());

    let summaryAuto = summary?.trim();
    if (!summaryAuto) {
      summaryAuto = stripHtml(fixedContent).slice(0, 180);
    }

    const payload = {
      title,
      slug,
      content: fixedContent,
      summary: summaryAuto,
      thumbnail: fixedThumbnail,
      status,
      createdBy: 0,
    };

    console.log("Payload gửi backend:", payload);

    try {
      const response = await axios.post(
        `${API_IMAGE_PREFIX}/api/admin/blog-posts`,
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 30000
        }
      );
      console.log("Kết quả lưu bài viết:", response.data);
      alert("Lưu bài viết thành công!");
      setTitle("");
      setThumbnail("");
      setSummary("");
      editor.commands.clearContent();
      setShowPreview(false);
    } catch (e: any) {
      console.error("Lỗi khi lưu bài viết:", e);
      if (e.response) {
        console.error("Response error:", e.response.data);
        alert(`Lỗi khi lưu bài viết: ${e.response.status} - ${e.response.data?.message || "Lỗi không xác định"}`);
      } else {
        alert("Lỗi khi lưu bài viết! Vui lòng kiểm tra kết nối mạng.");
      }
    }
    setSaving(false);
  };

  const handlePreview = () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }
    if (!editor || editor.isEmpty) {
      alert("Vui lòng nhập nội dung bài viết!");
      return;
    }
    setShowPreview(true);
  };

  if (!editor) {
    return <div className="blog-admin">Đang tải editor...</div>;
  }

  // Preview Modal
  if (showPreview) {
    return (
      <div className="blog-admin">
        <div className="preview-header">
          <h2> Xem trước bài viết</h2>
          <div>
            <button
              className="back-btn"
              onClick={() => setShowPreview(false)}
            >
              ← Quay lại chỉnh sửa
            </button>
            <button
              className="save-btn"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Đang đăng..." : "✓ Đăng bài viết"}
            </button>
          </div>
        </div>

        <div className="preview-container">
          {thumbnail && (
            <div className="preview-thumbnail">
              <img src={fixUrl(thumbnail)} alt="thumbnail" />
            </div>
          )}
          <h1 className="preview-title">{title}</h1>
          {summary && <p className="preview-summary">{summary}</p>}
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: fixContentImageUrls(editor.getHTML()) }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="blog-admin">
      <h2> Viết bài Blog mới</h2>

      {/* THUMBNAIL UPLOAD */}
      <div className="thumbnail-row">
        <div className="thumbnail-label">
          Ảnh đại diện (thumbnail):
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="thumbnail-input"
            style={{ display: "none" }}
            id="thumbnail-upload"
            disabled={uploadingThumbnail}
          />
          <button
            type="button"
            className="thumbnail-btn"
            onClick={() => document.getElementById("thumbnail-upload")?.click()}
            disabled={uploadingThumbnail}
          >
            {uploadingThumbnail ? "⏳ Đang tải..." : thumbnail ? "Đổi ảnh" : "Chọn ảnh"}
          </button>
        </div>
        {thumbnail ? (
          <div className="thumbnail-preview">
            <img src={fixUrl(thumbnail)} alt="thumbnail" />
          </div>
        ) : (
          <div className="thumbnail-preview thumbnail-empty">
            {uploadingThumbnail ? "⏳ Đang upload..." : "Chưa có ảnh"}
          </div>
        )}
      </div>

      <div className="title-row">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="blog-title-input"
        />
      </div>

      {/* Nhập summary (tóm tắt) tuỳ chọn */}
      <div style={{ marginBottom: 16 }}>
        <textarea
          placeholder="Tóm tắt bài viết (có thể để trống, sẽ tự sinh)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="blog-summary-input"
          style={{
            width: "100%",
            minHeight: 50,
            borderRadius: 6,
            border: "1px solid #ddd",
            padding: 8,
            fontSize: 15,
          }}
        />
      </div>

      <div className="blog-toolbar">
        <div className="toolbar-group">
          <select
            className="font-family-select"
            onChange={handleFontChange}
            defaultValue=""
            title="Font chữ"
          >
            {fontFamilies.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <select
            className="font-size-select"
            value={fontSizeInput}
            onChange={handleFontSizeDropdown}
            title="Cỡ chữ"
          >
            {fontSizes.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-group align-group">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Căn trái"
            className="icon-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="2" y="4" width="16" height="2" fill="#444" />
              <rect x="2" y="9" width="10" height="2" fill="#444" />
              <rect x="2" y="14" width="14" height="2" fill="#444" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Căn giữa"
            className="icon-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="4" y="4" width="12" height="2" fill="#444" />
              <rect x="2" y="9" width="16" height="2" fill="#444" />
              <rect x="5" y="14" width="10" height="2" fill="#444" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Căn phải"
            className="icon-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="2" y="4" width="16" height="2" fill="#444" />
              <rect x="8" y="9" width="10" height="2" fill="#444" />
              <rect x="4" y="14" width="14" height="2" fill="#444" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            title="Căn đều"
            className="icon-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="2" y="4" width="16" height="2" fill="#444" />
              <rect x="2" y="9" width="16" height="2" fill="#444" />
              <rect x="2" y="14" width="16" height="2" fill="#444" />
            </svg>
          </button>
        </div>
        <div className="toolbar-group">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <b>B</b>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <i>I</i>
          </button>
          <button onClick={handleInsertLink} title="Chèn Link">
            🔗
          </button>
          <button onClick={handleRemoveLink} title="Xoá Link">
            ❌
          </button>
          <label
            title={uploadingImage ? "Đang upload..." : "Chèn ảnh"}
            className={`toolbar-image-btn ${uploadingImage ? 'uploading' : ''}`}
          >
            <span role="img" aria-label="Ảnh">
              {uploadingImage ? "⏳" : "🖼️"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              disabled={uploadingImage}
            />
          </label>
          {editor.isActive("image") && (
            <>
              <input
                className="image-size-input"
                type="number"
                min="30"
                max="1200"
                placeholder="Width"
                value={imgWidth}
                style={{ width: 70, marginLeft: 8 }}
                onChange={handleImageWidthChange}
              />
              <input
                className="image-size-input"
                type="number"
                min="30"
                max="1200"
                placeholder="Height"
                value={imgHeight}
                style={{ width: 70, marginLeft: 4 }}
                onChange={handleImageHeightChange}
              />
              <button
                className="delete-image-btn"
                onClick={handleDeleteImage}
                title="Xoá ảnh đang chọn"
                style={{ marginLeft: 4 }}
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
      <div className="editor-row">
        <div className="blog-editor">
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="action-buttons">
        <button
          className="preview-btn"
          onClick={handlePreview}
          disabled={!title.trim() || editor.isEmpty}
        >
          👁️ Xem trước
        </button>
        <button
          className="save-btn"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "⏳ Đang lưu..." : "✓ Đăng bài viết"}
        </button>
      </div>
    </div>
  );
};

export default BlogUser;