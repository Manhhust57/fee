import './AboutCP.css';
import { Card, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const AboutCP =  ()=>{
return (
    <div className="aboutcp">
    <div className="banner">
     <div className="banner-img">
         <img src="https://crm.flesta.vn//uploads/about_us/ISN-JUTEC.png" alt="" />
         <div className="banner-des">Hồ sơ công ty</div>
     </div>
    </div>
    <div className="description-box" >
    <Card title={<span style={{ fontSize: '22px' }}>CÔNG TY CỔ PHẦN ANSTAY VIỆT NAM</span>} bordered={false} style={{ width: 1000 }}>
     <div className="info-pair">
       <Title level={5}>Thương hiệu</Title>
       <Text>ANSTAY VN</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Mô tả doanh nghiệp</Title>
       <Text style={{ paddingLeft: 0, marginLeft: 0, textIndent: 0 }}>
       1. Cho thuê căn hộ và văn phòng dịch vụ
        <br/>
        2. Quản lý căn hộ
        <br/>
        3. Bất động sản
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Đại diện pháp lý</Title>
       <Text>Ông Nghiêm Thành An</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Ngày thành lập</Title>
       <Text>31/10/2016</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Vốn điều lệ</Title>
       <Text>20,000,000,000 VND</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Trụ sở chính</Title>
       <Text>
         Số 19, Ngách 107/3b/97, Đưỡng Lĩnh Nam, Phường Vĩnh Hưng, <br /> Quận Hoàng Mai, Thành Phố Hà Nội, Việt Nam<br />
         Điện thoại:  096 543 4556
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Chi nhánh Hạ Long</Title>
       <Text>
         Số 2 Hùng Thắng, Thành Phố Hạ Long, Tỉnh Quảng Ninh<br />
         Điện thoại:  096 543 4556
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Mã số thuế</Title>
       <Text>0109090259</Text>
     </div>
 </Card>
    </div>
</div>
)
}
export default AboutCP;