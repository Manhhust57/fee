import { useState, useEffect, useRef } from "react";
import "./DashBroad.css";
import {
  Card, Avatar, Button, Form, Typography, Input, message,
  Row, Col, Modal, Badge, Select
} from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;
const API_BASE = "http://localhost:8080/api/v1";

/** === Types === */
type ApiUser = {
  name: string;
  email: string;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  address: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  avatar?: string | null;
};

export interface StandardResponse<T = unknown> {
  success: boolean;
  message: string;
  code: number;
  reason_code?: string;
  data?: T | null;
}

type UserForm = {
  fullName: string;
  email: string;
  phone: string;
  dob: string; // dd/MM/yyyy
  address: string;
  gender: "male" | "female" | "other";
};

type UpdateUserPayload = Pick<
  ApiUser,
  "name" | "phoneNumber" | "dateOfBirth" | "address" | "gender"
>;

/** === Utils === */
const toDisplayDate = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
};
const toIsoDate = (dmy?: string) => {
  if (!dmy) return "";
  const [d, m, y] = dmy.split("/");
  return d && m && y ? `${y}-${m}-${d}` : "";
};

export default function DashBroad() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<UserForm>();
  const [pwdForm] = Form.useForm();
  const [changingPwd, setChangingPwd] = useState(false);
  const [points, setPoints] = useState(1250);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // AntD v5 message (bắt buộc có {contextHolder} trong JSX)
  const [msg, contextHolder] = message.useMessage();

  const notifyFromRes = (res: StandardResponse, fallback = "Thao tác hoàn tất") => {
    if (res.success) msg.success(res.message || fallback);
    else msg.error(res.message || "Có lỗi xảy ra");
  };

  const apiToForm = (u: ApiUser): UserForm => ({
    fullName: u.name ?? "",
    email: u.email ?? "",
    phone: u.phoneNumber ?? "",
    dob: toDisplayDate(u.dateOfBirth),
    address: u.address ?? "",
    gender: ((u.gender ?? "OTHER").toLowerCase() as UserForm["gender"]),
  });

  const formToApi = (v: UserForm): UpdateUserPayload => ({
    name: v.fullName,
    phoneNumber: v.phone || null,
    dateOfBirth: toIsoDate(v.dob) || null,
    address: v.address || null,
    gender: (v.gender?.toUpperCase() as UpdateUserPayload["gender"]) || "OTHER",
  });

  /** === Load user === */
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setUserId(parsed.id);

    (async () => {
      try {
        const r = await fetch(`${API_BASE}/user/${parsed.id}`);
        const res: StandardResponse<ApiUser> = await r.json();
        if (!res.success || !res.data) {
          notifyFromRes(res, "Không thể tải thông tin người dùng");
          return;
        }
        setUser(res.data);
        form.setFieldsValue(apiToForm(res.data));
      } catch {
        msg.error("Không thể tải thông tin người dùng");
      }
    })();
  }, [form, msg]);

  /** === Save profile (no email, no avatar) === */
  const handleSave = async () => {
    try {
      const vals = await form.validateFields();
      if (!userId) return;
      const payload = formToApi(vals);

      const r = await fetch(`${API_BASE}/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const res: StandardResponse<ApiUser> = await r.json();

      if (!res.success || !res.data) {
        notifyFromRes(res, "Cập nhật thất bại!");
        return;
      }

      setUser(res.data);
      form.setFieldsValue(apiToForm(res.data));
      notifyFromRes(res, "Cập nhật thành công!");
      setIsEditing(false);

      // cập nhật localStorage tên hiển thị nếu cần
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, name: res.data.name }));
    } catch {
      msg.error("Cập nhật thất bại!");
    }
  };

  /** === Avatar upload === */
  const openPicker = () => fileRef.current?.click();

  const validateImg = (f: File) => {
    const ok = ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(f.type);
    if (!ok) {
      msg.error("Chỉ hỗ trợ JPG/PNG/WebP");
      return false;
    }
    if (f.size / 1024 / 1024 >= 2) {
      msg.error("Ảnh phải nhỏ hơn 2MB");
      return false;
    }
    return true;
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !userId) return;
    if (!validateImg(file)) return;

    const fd = new FormData();
    fd.append("file", file);
    setUploadingAvatar(true);

    try {
      const r = await fetch(`${API_BASE}/user/${userId}/avatar`, { method: "POST", body: fd });
      const res: StandardResponse<{ avatar?: string; avatarUrl?: string } | ApiUser> = await r.json();

      if (!res.success) {
        notifyFromRes(res, "Upload ảnh thất bại!");
        return;
      }

      // lấy URL avatar từ data (tùy BE trả)
      let url = "";
      const d: any = res.data;
      url = d?.avatar ?? d?.avatarUrl ?? d?.avatar ?? "";

      setUser((prev) => (prev ? { ...prev, avatar: url } : prev));
      notifyFromRes(res, "Cập nhật ảnh đại diện thành công!");
    } catch {
      msg.error("Upload ảnh thất bại!");
    } finally {
      setUploadingAvatar(false);
    }
  };

  /** === Change password === */
  const [pwdLoadingKey] = useState("pwd_change");
  const handleChangePassword = async (v: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (changingPwd || !userId) return;
    setChangingPwd(true);
    msg.loading({ content: "Đang cập nhật mật khẩu...", key: pwdLoadingKey });

    try {
      const r = await fetch(`${API_BASE}/user/${userId}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword: v.oldPassword, newPassword: v.newPassword }),
      });
      const res: StandardResponse = await r.json();

      if (res.success) {
        msg.success({ content: res.message || "Đổi mật khẩu thành công!", key: pwdLoadingKey });
        pwdForm.resetFields();
      } else {
        msg.error({ content: res.message || "Đổi mật khẩu thất bại!", key: pwdLoadingKey });
      }
    } catch {
      msg.error({ content: "Đổi mật khẩu thất bại!", key: pwdLoadingKey });
    } finally {
      setChangingPwd(false);
    }
  };

  /** === Mock loyalty === */
  const promotions = [
    { icon: "🎁", title: "Giảm 10% khi lưu trú", point: 400 },
    { icon: "🚗", title: "Giảm giá 10% cho xe thuê", point: 300 },
    { icon: "🔔", title: "Thông báo giá vé máy bay", point: 200, isNew: true },
  ];
  const redeem = (p: number) => {
    setPoints((x) => x - p);
    Modal.success({ title: "Đổi điểm thành công!", content: `Bạn đã đổi ${p} điểm.` });
  };

  return (
    <div className="container-dashbroad">
      {contextHolder}

      <h1>Thông Tin Cá Nhân</h1>

      <Card className="container-dashbroad-card">
        <Row gutter={32} align="middle">
          {/* Avatar */}
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              src={user?.avatar || undefined}
              style={{ border: "1px solid #eee" }}
            />
            <h3 style={{ marginTop: 10 }}>{user?.name || "Loading..."}</h3>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={onAvatarChange}
            />
            <Button
              type="dashed"
              style={{ marginTop: 10 }}
              onClick={openPicker}
              loading={uploadingAvatar}
              disabled={uploadingAvatar}
            >
              {uploadingAvatar ? "Đang tải..." : "Thay đổi ảnh đại diện"}
            </Button>
          </Col>

          {/* Profile form */}
          <Col xs={24} sm={16}>
            <Form<UserForm> form={form} layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Họ và Tên"
                    name="fullName"
                    rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                  >
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Ngày sinh" name="dob">
                    <Input disabled={!isEditing} placeholder="dd/MM/yyyy" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Email" name="email" >
                    <Input disabled readOnly />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Giới tính" name="gender">
                    <Select
                      disabled={!isEditing}
                      options={[
                        { value: "male", label: "Nam" },
                        { value: "female", label: "Nữ" },
                        { value: "other", label: "Khác" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            {isEditing ? (
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                Lưu
              </Button>
            ) : (
              <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      {/* Points */}
      <Card className="container-dashbroad-card" style={{ opacity: 0.6, cursor: "not-allowed" }}>
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <h3>
              🎉 Tích điểm <br />
              <span>
                Bạn có <strong>{points}</strong> điểm
              </span>
            </h3>
          </Col>
          <Col xs={24} sm={16}>
            <Row gutter={[16, 16]} justify="center">
              {promotions.map((it, idx) => (
                <Col xs={24} sm={8} key={idx}>
                  <Card style={{ textAlign: "center", minHeight: 150 }}>
                    <div style={{ fontSize: 40 }}>{it.icon}</div>
                    <Title level={5} style={{ marginTop: 10 }}>
                      {it.title} {it.isNew && <Badge count="Mới" style={{ backgroundColor: "#52c41a" }} />}
                    </Title>
                    <Button type="primary" disabled style={{ pointerEvents: "none" }} onClick={() => redeem(it.point)}>
                      Đổi {it.point} điểm
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Change password */}
      <Card className="container-dashbroad-card">
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <h3>🔒 Đổi mật khẩu</h3>
          </Col>
          <Col xs={24} sm={16}>
            <Form
              form={pwdForm}
              layout="vertical"
              onFinish={handleChangePassword}
              onFinishFailed={() => msg.error("Vui lòng điền đúng thông tin mật khẩu")}
            >
              <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                  { min: 8, message: "Tối thiểu 8 ký tự" },
                  {
                    validator: (_, v) =>
                      !v || (/[A-Za-z]/.test(v) && /\d/.test(v))
                        ? Promise.resolve()
                        : Promise.reject(new Error("Phải có cả chữ và số")),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, v) {
                      return !v || v !== getFieldValue("oldPassword")
                        ? Promise.resolve()
                        : Promise.reject(new Error("Mật khẩu mới không được trùng mật khẩu cũ"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, v) {
                      return !v || v === getFieldValue("newPassword")
                        ? Promise.resolve()
                        : Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={changingPwd} disabled={changingPwd}>
                Cập nhật mật khẩu
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
