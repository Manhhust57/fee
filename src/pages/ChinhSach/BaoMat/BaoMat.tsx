import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./BaoMat.css";

export default function BaoMat() {
  return (
    <>
      <Header />
      <div className="privacy-policy-container">
        <h1>Chính Sách Bảo Mật</h1>

        <section>
          <h2>1. Mục đích thu thập thông tin</h2>
          <p>
            Anstay thu thập thông tin cá nhân của khách hàng nhằm phục vụ các
            mục đích:
          </p>
          <ul>
            <li>
              Hỗ trợ khách hàng trong quá trình đặt phòng, thanh toán, xác nhận
              đơn hàng.
            </li>
            <li>
              Chăm sóc khách hàng sau khi sử dụng dịch vụ, xử lý các yêu cầu
              hoặc khiếu nại.
            </li>
            <li>
              Cải tiến chất lượng dịch vụ thông qua khảo sát, phản hồi, đánh
              giá.
            </li>
            <li>
              Gửi thông báo khuyến mãi, chương trình ưu đãi, thông tin mới (nếu
              được khách hàng đồng ý).
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Phạm vi sử dụng thông tin</h2>
          <p>
            Thông tin cá nhân chỉ được sử dụng trong nội bộ công ty và trong
            phạm vi:
          </p>
          <ul>
            <li>Xác thực tài khoản và bảo vệ quyền lợi người dùng.</li>
            <li>Liên lạc để hỗ trợ hoặc xác nhận các giao dịch liên quan.</li>
            <li>
              Thống kê, phân tích dữ liệu phục vụ công tác vận hành và phát
              triển hệ thống.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Thời gian lưu trữ</h2>
          <p>
            Thông tin cá nhân sẽ được lưu trữ trong hệ thống của chúng tôi cho
            đến khi:
          </p>
          <ul>
            <li>Khách hàng có yêu cầu huỷ bỏ thông tin cá nhân.</li>
            <li>
              Công ty không còn nhu cầu sử dụng thông tin cho các mục đích nêu
              trên.
            </li>
            <li>
              Thông tin hết thời hạn lưu trữ theo quy định pháp luật hiện hành.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Bảo mật thông tin</h2>
          <p>
            Anstay áp dụng các biện pháp bảo mật để bảo vệ thông tin cá nhân của
            khách hàng, bao gồm:
          </p>
          <ul>
            <li>Sử dụng giao thức HTTPS để bảo mật dữ liệu truyền tải.</li>
            <li>
              Mã hóa dữ liệu quan trọng và phân quyền truy cập rõ ràng trong hệ
              thống nội bộ.
            </li>
            <li>
              Đào tạo nhân viên về bảo mật thông tin và ký cam kết bảo mật dữ
              liệu.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Quyền của khách hàng</h2>
          <p>
            Khách hàng có các quyền liên quan đến thông tin cá nhân của mình
            như:
          </p>
          <ul>
            <li>Yêu cầu xem lại thông tin cá nhân đã cung cấp.</li>
            <li>
              Chỉnh sửa, cập nhật hoặc xoá thông tin không chính xác hoặc không
              còn phù hợp.
            </li>
            <li>Rút lại sự đồng ý cho phép xử lý dữ liệu.</li>
            <li>
              Gửi phản ánh, khiếu nại liên quan đến việc bảo mật thông tin cá
              nhân.
            </li>
          </ul>
          <p>
            Để thực hiện các quyền này, khách hàng có thể liên hệ với bộ phận
            chăm sóc khách hàng qua các thông tin dưới đây.
          </p>
        </section>

        <section>
          <h2>6. Chia sẻ thông tin</h2>
          <p>
            Anstay cam kết không chia sẻ, tiết lộ hoặc bán thông tin cá nhân cho
            bất kỳ bên thứ ba nào, ngoại trừ các trường hợp:
          </p>
          <ul>
            <li>Có sự đồng ý rõ ràng từ phía khách hàng.</li>
            <li>
              Phục vụ cho việc thực hiện hợp đồng giữa khách hàng và Anstay (ví
              dụ: đơn vị thanh toán, bên giao nhận, đối tác lưu trú...).
            </li>
            <li>
              Theo yêu cầu của cơ quan pháp luật hoặc khi cần thiết để bảo vệ
              quyền lợi hợp pháp của Anstay.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Chính sách cookie và theo dõi</h2>
          <p>
            Website của Anstay có thể sử dụng cookie để lưu thông tin đăng nhập,
            lựa chọn hiển thị, và hành vi duyệt web nhằm nâng cao trải nghiệm
            người dùng.
          </p>
          <ul>
            <li>
              Bạn có thể tắt cookie thông qua trình duyệt, tuy nhiên một số tính
              năng có thể không hoạt động đầy đủ.
            </li>
            <li>
              Thông tin cookie không được chia sẻ cho bên thứ ba ngoài mục đích
              phân tích nội bộ.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
