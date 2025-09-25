// import { useNavigate } from "react-router-dom";
// import { Modal, message } from "antd";

// interface LoginValues {
//   username: string;
//   password: string;
// }

// const Login = ({ onCancel }: { onCancel?: () => void }) => {
//   const navigate = useNavigate();
//   console.log("✅ Login component mounted")
//   const onFinish = async (values: LoginValues) => {
//     try {
//       console.log("🚀 onFinish called with values:", values);
//       // const response = await fetch("https://anstay.com.vn/api/auth/login", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(values),
//       // });
//         const response = await fetch("http://localhost:3000/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         await localStorage.setItem("user", JSON.stringify(data));
//         message.success("Đăng nhập thành công");

//         const returnUrl = localStorage.getItem("returnUrl");
//         console.log("Return URL:", returnUrl);

//         // Force a small delay to ensure localStorage is updated
//         setTimeout(() => {
//           if (returnUrl) {
//             window.location.replace(returnUrl);
//           } else {
//             window.location.replace("/");
//           }
//           localStorage.removeItem("returnUrl");
//         }, 500);
//       } else {
//         message.error("Đăng nhập thất bại");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       message.error("Có lỗi xảy ra");
//     }
//   };

//   return null; // Add return statement to comply with React component requirements
// };

// export default Login;
import { useNavigate } from "react-router-dom";
import { Modal, message, Form, Input, Button } from "antd";

interface LoginValues {
  username: string;
  password: string;
}

const Login = ({ onCancel }: { onCancel?: () => void }) => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginValues) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Đăng nhập thành công");

        const returnUrl = localStorage.getItem("returnUrl");

        setTimeout(() => {
          if (returnUrl) {
            window.location.replace(returnUrl);
          } else {
            window.location.replace("/");
          }
          localStorage.removeItem("returnUrl");
        }, 500);
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <Form
      name="loginForm"
      className="popup-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
