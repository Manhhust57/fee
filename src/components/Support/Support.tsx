import React, { useState, useEffect } from "react";
import "./Support.css";

function Support() {
  const [openTabs, setOpenTabs] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const getVideoUrl = (sectionId) => {
    const videos = {
      "1": "/videos/huong-dan-mo.mp4",
      "2-1": "/videos/huong-dan-bat-dien.mp4",
      "2-2": "/videos/huong-dan-bep.mp4",
      "2-3": "/videos/may-giat.mp4",
      "3": "/videos/huong-dan-thang-may.mp4",
    };
    return videos[sectionId] || "";
  };

  const [showVideo, setShowVideo] = useState(false);

  const toggleViewAll = () => {
    setShowAllEvents(!showAllEvents);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const SHEET_ID = "1W4VT3LIzFtgcW0-_k25zjgLKQMr828ic44mmdCCfi9I";
        const SHEET_NAME = "Event";
        const API_KEY = "AIzaSyCt-Q3stzkgRvpliLFuwhyy2uvF8hXHzfc";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const formattedEvents = data.values.slice(1).map((row) => ({
            title: row[0],
            date: row[1],
            location: row[2],
            description: row[3],
            imageUrl: row[4],
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const toggleTab = (tabId) => {
    setOpenTabs((prev) => {
      if (prev.includes(tabId)) {
        return prev.filter((id) => id !== tabId);
      }
      return [...prev, tabId];
    });
  };

  const isTabOpen = (tabId) => {
    return openTabs.includes(tabId);
  };

  return (
    <div className="guide-container">
      <h2 className="guide-title">Hướng Dẫn Du Lịch</h2>

      <div className="accordion">
        <div className="accordion-item">
          <button
            onClick={() => toggleTab(1)}
            className="accordion-header"
            aria-expanded={isTabOpen(1)}
          >
            Hướng dẫn mở cửa
          </button>
          {isTabOpen(1) && (
            <div className="accordion-content">
              <p>- Bạn sẽ nhận được mã mở cửa từ chủ nhà qua tin nhắn</p>
              <p>- Nhập mã vào bảng phím số ở cửa, sau đó nhấn nút `#`</p>
              <p>- Cửa sẽ tự động mở nếu mã đúng</p>
              <button
                onClick={() => setShowPopup("1")}
                className="guide-button"
              >
                Xem hướng dẫn
              </button>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            onClick={() => toggleTab(2)}
            className="accordion-header"
            aria-expanded={isTabOpen(2)}
          >
            Hướng dẫn Bật Điện-Bếp-Máy Giặt
          </button>
          {isTabOpen(2) && (
            <div className="accordion-content">
              <div className="sub-accordion">
                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-1");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("2-1")}
                  >
                    Hướng dẫn bật điện
                  </button>
                  {isTabOpen("2-1") && (
                    <div className="sub-accordion-content">
                      <p>- Công tắc điện chính nằm bên cạnh cửa ra vào</p>
                      <p>- Bật cầu dao tổng (nếu cần)</p>
                      <p>- Kiểm tra các thiết bị điện hoạt động</p>
                      <button
                        onClick={() => setShowPopup("2-1")}
                        className="guide-button"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-2");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("2-2")}
                  >
                    Hướng dẫn sử dụng bếp
                  </button>
                  {isTabOpen("2-2") && (
                    <div className="sub-accordion-content">
                      <p>- Bếp từ: Nhấn nút nguồn để bật</p>
                      <p>- Điều chỉnh nhiệt độ phù hợp (mức 1-9)</p>
                      <p>- Lưu ý vệ sinh bếp sau khi sử dụng</p>
                      <button
                        onClick={() => setShowPopup("2-2")}
                        className="guide-button"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-3");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("2-3")}
                  >
                    Hướng dẫn sử dụng máy giặt
                  </button>
                  {isTabOpen("2-3") && (
                    <div className="sub-accordion-content">
                      <img
                        src="https://i.ibb.co/3y7TNhd6/maygiat.jpg"
                        alt="Hướng dẫn sử dụng máy giặt"
                        className="guide-image"
                      />
                      <button
                        onClick={() => setShowPopup("2-3")}
                        className="guide-button"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            onClick={() => toggleTab(3)}
            className="accordion-header"
            aria-expanded={isTabOpen(3)}
          >
            Hướng dẫn đi thang máy
          </button>
          {isTabOpen(3) && (
            <div className="accordion-content">
              <p>- Quẹt thẻ từ trước khi chọn tầng</p>
              <p>- Các tầng có thể truy cập: 1-20</p>
              <p>- Nút khẩn cấp màu đỏ trong trường hợp cần hỗ trợ</p>
              <button
                onClick={() => setShowPopup("3")}
                className="guide-button"
              >
                Xem hướng dẫn sử dụng
              </button>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            onClick={() => toggleTab(4)}
            className="accordion-header"
            aria-expanded={isTabOpen(4)}
          >
            Thông tin lưu ý khi lưu trú
          </button>
          {isTabOpen(4) && (
            <div className="accordion-content">
              <p>
                <strong>Quy định chung:</strong>
              </p>
              <p>- Giờ nhận phòng: 14:00, trả phòng: 12:00</p>
              <p>- Không hút thuốc trong căn hộ</p>
              <p>- Không gây ồn sau 22:00</p>
              <p>- Không tổ chức tiệc tùng</p>
              <p>
                <strong>An toàn:</strong>
              </p>
              <p>- Kiểm tra đã khóa cửa khi ra ngoài</p>
              <p>- Tắt các thiết bị điện khi không sử dụng</p>
              <p>- Số điện thoại khẩn cấp: 114 (Cảnh sát), 115 (Cấp cứu)</p>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            onClick={() => toggleTab(5)}
            className="accordion-header"
            aria-expanded={isTabOpen(5)}
          >
            Thông tin thiết bị và mức giá
          </button>
          {isTabOpen(5) && (
            <div className="accordion-content">
              <div className="sub-accordion">
                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-1");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("5-1")}
                  >
                    Bảng Đồ Sành Sứ
                  </button>
                  {isTabOpen("5-1") && (
                    <div className="sub-accordion-content">
                      <table className="compensation-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Bát ăn cơm</td>
                            <td>Once</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Gạt tàn sứ</td>
                            <td>Once</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Đĩa tròn F20</td>
                            <td>Once</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Đĩa tròn F25</td>
                            <td>Once</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Đĩa kê tách trà</td>
                            <td>Once</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Tô canh</td>
                            <td>Once</td>
                            <td>95,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Bát chấm</td>
                            <td>Once</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Thìa soup</td>
                            <td>Once</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Thìa café nhỏ</td>
                            <td>Once</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Dao ăn</td>
                            <td>Once</td>
                            <td>110,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Dĩa ăn</td>
                            <td>Once</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Dĩa ăn</td>
                            <td>Pair</td>
                            <td>15,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Ly đặt phòng</td>
                            <td>Once</td>
                            <td>145,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Tách trà</td>
                            <td>Once</td>
                            <td>65,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Muôi múc canh</td>
                            <td>Once</td>
                            <td>60,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Chảo chống dính</td>
                            <td>Once</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Bộ xoong nồi inox</td>
                            <td>Once</td>
                            <td>980,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Nồi cơm điện</td>
                            <td>Once</td>
                            <td>950,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Thớt nhựa trong phòng CH</td>
                            <td>Once</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Thớt gỗ trong phòng CH</td>
                            <td>Once</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Bộ gia vị đựng trong phòng</td>
                            <td>Set</td>
                            <td>205,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Dao thái 22cm</td>
                            <td>Once</td>
                            <td>255,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Dao thái 24cm</td>
                            <td>Once</td>
                            <td>120,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Xẻng nấu ăn</td>
                            <td>Once</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>Kéo nấu ăn trong phòng căn hộ</td>
                            <td>Once</td>
                            <td>70,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>Rổ nhựa</td>
                            <td>Once</td>
                            <td>80,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Giỏ máy đặt phòng</td>
                            <td>Once</td>
                            <td>190,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-2");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("5-2")}
                  >
                    Porcelain Table
                  </button>
                  {isTabOpen("5-2") && (
                    <div className="sub-accordion-content">
                      <table className="compensation-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Bowl</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Porcelain ashtray</td>
                            <td>Chiếc</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Round disc F20</td>
                            <td>Chiếc</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Round disc F25</td>
                            <td>Chiếc</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>A plate with a cup of tea</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Bowl of soup</td>
                            <td>Chiếc</td>
                            <td>95,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Dipping bowl</td>
                            <td>Chiếc</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Soup spoon</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Small coffee spoon</td>
                            <td>Chiếc</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Eating knife</td>
                            <td>Chiếc</td>
                            <td>110,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Plate</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Chopsticks</td>
                            <td>Đôi</td>
                            <td>15,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Ly made a reservation</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Teacup</td>
                            <td>Chiếc</td>
                            <td>65,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Soup ladle</td>
                            <td>Chiếc</td>
                            <td>60,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Non-stick pan</td>
                            <td>Chiếc</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Stainless steel pots and pans set</td>
                            <td>Chiếc</td>
                            <td>980,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Electric cooker</td>
                            <td>Chiếc</td>
                            <td>950,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Plastic cutting board in CH room</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Wooden cutting board in CH's room</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Spice set in the room</td>
                            <td>Bộ</td>
                            <td>205,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Máy sấy tóc</td>
                            <td>Once</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Điện thoại bàn</td>
                            <td>Once</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Key phòng</td>
                            <td>Once</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>Tivi 40 inch</td>
                            <td>Once</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>Tivi 45 inch</td>
                            <td>Once</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Ghế sofa đôi (1.6m or 1.8m)</td>
                            <td>Once</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Gối ghế sofa</td>
                            <td>Once</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Ghế gỗ đơn</td>
                            <td>Once</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Bàn gỗ tròn</td>
                            <td>Once</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Mặt kính</td>
                            <td>Once</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Khăn chân (45*80)</td>
                            <td>Once</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Khăn mặt (34*34)</td>
                            <td>Once</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Khăn tắm (70*90)</td>
                            <td>Once</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Giỏ mây</td>
                            <td>Once</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Đèn chụp</td>
                            <td>Once</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Đèn cây</td>
                            <td>Once</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Tranh treo tường (70*90)</td>
                            <td>Once</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Tranh treo tường (45*45)</td>
                            <td>Once</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Tranh treo tường (40*40)</td>
                            <td>Once</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-3");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("5-3")}
                  >
                    Compensation Price List
                  </button>
                  {isTabOpen("5-3") && (
                    <div className="sub-accordion-content">
                      <table className="compensation-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Loại vật dụng (Species)</th>
                            <th>Kích thước (Size)</th>
                            <th>Giá (C&B) (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>BED 110*200 (Shafts 3,5,11,12)</td>
                            <td>110*200</td>
                            <td>250,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mattress protection</td>
                            <td>190*280</td>
                            <td>380,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Sheets</td>
                            <td>180*235</td>
                            <td>700,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Quilt cover</td>
                            <td>180*235</td>
                            <td>760,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Blanket intestines</td>
                            <td>180*235</td>
                            <td>765,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>BED 160*200 (Axis 8,9,10)</td>
                            <td>160*200</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Mattress protection</td>
                            <td>230*235</td>
                            <td>815,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Quilt cover</td>
                            <td>230*235</td>
                            <td>890,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Blanket intestines</td>
                            <td>230*235</td>
                            <td>890,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>BED 180*200 (Axis 1,2,6,7)</td>
                            <td>180*200</td>
                            <td>320,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Mattress protection</td>
                            <td>180*200</td>
                            <td>320,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Sheets</td>
                            <td>260*280</td>
                            <td>490,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Quilt cover</td>
                            <td>250*235</td>
                            <td>925,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Pillowcase</td>
                            <td>50*70</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Blanket intestines</td>
                            <td>250*235</td>
                            <td>960,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Gut pillow</td>
                            <td>50*70</td>
                            <td>210,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Pillowcase</td>
                            <td>60*80</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Gut pillow</td>
                            <td>60*80</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Swimsuit</td>
                            <td>-</td>
                            <td>435,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>BED 220*200 (paired 3,5,11,12)</td>
                            <td>200*200</td>
                            <td>365,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Mattress protection</td>
                            <td>200*200</td>
                            <td>365,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Sheets</td>
                            <td>300*280</td>
                            <td>575,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Quilt cover</td>
                            <td>290*235</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Blanket intestines</td>
                            <td>290*235</td>
                            <td>1,115,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-4");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("5-4")}
                  >
                    Bảng Đồ Công Cụ Dụng Cụ
                  </button>
                  {isTabOpen("5-4") && (
                    <div className="sub-accordion-content">
                      <table className="compensation-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Thùng rác trong phòng (sắt)</td>
                            <td>Once</td>
                            <td>329,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Thùng rác trong phòng (da)</td>
                            <td>Once</td>
                            <td>366,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Khay đựng Minibar</td>
                            <td>Once</td>
                            <td>569,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Khay đựng trà/café</td>
                            <td>Once</td>
                            <td>283,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Khay đựng Amenities</td>
                            <td>Once</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Bìa da phục vụ phòng</td>
                            <td>Once</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Bìa da note pad</td>
                            <td>Once</td>
                            <td>195,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Bìa da thu ngân</td>
                            <td>Once</td>
                            <td>302,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Bìa da menu</td>
                            <td>Once</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Hộp giấy ăn</td>
                            <td>Once</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Biển treo cửa đa</td>
                            <td>Once</td>
                            <td>165,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Đồng hồ để bàn</td>
                            <td>Once</td>
                            <td>473,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Đĩa đựng xà bông (màu đen)</td>
                            <td>Once</td>
                            <td>50,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Điều khiển tivi</td>
                            <td>Once</td>
                            <td>300,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Điều khiển điều hòa</td>
                            <td>Once</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Đèn bàn làm việc</td>
                            <td>Once</td>
                            <td>245,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Đèn ngủ phòng khách</td>
                            <td>Once</td>
                            <td>403,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Đèn cây trong phòng</td>
                            <td>Once</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Móc treo quần áo gỗ</td>
                            <td>Once</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Móc treo quần áo có kẹp</td>
                            <td>Once</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Ấm siêu tốc</td>
                            <td>Once</td>
                            <td>194,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Máy sấy tóc</td>
                            <td>Once</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Landline</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Room key</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>40 inch TV</td>
                            <td>Chiếc</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>45 inch TV</td>
                            <td>Chiếc</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Double sofa (1.6m or 1.8m)</td>
                            <td>Chiếc</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Sofa pillow</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Single wooden chair</td>
                            <td>Chiếc</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Round wooden table</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Glass surface</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Foot towel (45*80)</td>
                            <td>Chiếc</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Washcloth (34*34)</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Towel (70*90)</td>
                            <td>Chiếc</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Basket</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Lamp</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Tree lights</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Wall painting (70*90)</td>
                            <td>Chiếc</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Wall painting (45*45)</td>
                            <td>Chiếc</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Wall painting (40*40)</td>
                            <td>Chiếc</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-5");
                    }}
                    className="sub-accordion-header"
                    aria-expanded={isTabOpen("5-5")}
                  >
                    Example Tool Map
                  </button>
                  {isTabOpen("5-5") && (
                    <div className="sub-accordion-content">
                      <table className="compensation-table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>SẢN PHẨM</th>
                            <th>ĐƠN VỊ</th>
                            <th>GIÁ ĐỀN BÙ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Trash can in room (iron)</td>
                            <td>Chiếc</td>
                            <td>329,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>In-room trash can (leather)</td>
                            <td>Chiếc</td>
                            <td>366,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Minibar tray</td>
                            <td>Chiếc</td>
                            <td>569,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Tea/coffee tray</td>
                            <td>Chiếc</td>
                            <td>283,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Amenities tray</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Leather cover for room service</td>
                            <td>Chiếc</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Note pad leather cover</td>
                            <td>Chiếc</td>
                            <td>195,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Cashier leather cover</td>
                            <td>Chiếc</td>
                            <td>302,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Menu leather cover</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Tissue box</td>
                            <td>Chiếc</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Leather door hanging sign</td>
                            <td>Chiếc</td>
                            <td>165,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Clocks</td>
                            <td>Chiếc</td>
                            <td>473,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Soap dish (black)</td>
                            <td>Chiếc</td>
                            <td>50,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>TV remote control</td>
                            <td>Chiếc</td>
                            <td>300,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Air-conditioner remote control</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Desk lamp</td>
                            <td>Chiếc</td>
                            <td>245,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Living room night light</td>
                            <td>Chiếc</td>
                            <td>403,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Tree lights in the room</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Wooden clothes hanger</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Clothes hanger with clips</td>
                            <td>Chiếc</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Super tepid</td>
                            <td>Chiếc</td>
                            <td>194,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Hairdryer</td>
                            <td>Chiếc</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Landline</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Room key</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>40 inch TV</td>
                            <td>Chiếc</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>45 inch TV</td>
                            <td>Chiếc</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Double sofa (1.6m or 1.8m)</td>
                            <td>Chiếc</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Sofa pillow</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Single wooden chair</td>
                            <td>Chiếc</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Round wooden table</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Glass surface</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Foot towel (45*80)</td>
                            <td>Chiếc</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Washcloth (34*34)</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Towel (70*90)</td>
                            <td>Chiếc</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Basket</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Lamp</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Tree lights</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Wall painting (70*90)</td>
                            <td>Chiếc</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Wall painting (45*45)</td>
                            <td>Chiếc</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Wall painting (40*40)</td>
                            <td>Chiếc</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            onClick={() => toggleTab(6)}
            className="accordion-header"
            aria-expanded={isTabOpen(6)}
          >
            Sơ đồ khách sạn
          </button>
          {isTabOpen(6) && (
            <div className="accordion-content">
              <div className="hotel-map">
                <div className="floor-plan">
                  <div className="floor-level">
                    <h3>Tầng hầm (B1–B2)</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Bãi đỗ xe: Dành cho cư dân và khách lưu trú
                      </div>
                      <div className="area">
                        Khu kỹ thuật: Bao gồm hệ thống điện, nước, và an ninh
                      </div>
                    </div>
                  </div>

                  <div className="floor-level">
                    <h3>Tầng trệt (Tầng 1)</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Sảnh lễ tân: Khu vực tiếp đón khách với không gian sang
                        trọng
                      </div>
                      <div className="area">
                        Quầy lễ tân: Nơi làm thủ tục nhận và trả phòng
                      </div>
                      <div className="area">
                        Khu vực chờ: Ghế ngồi thoải mái cho khách chờ
                      </div>
                      <div className="area">
                        Khu vực bảo vệ: Đảm bảo an ninh 24/7
                      </div>
                    </div>
                  </div>

                  <div className="floor-level">
                    <h3>Tầng 2–5</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Phòng họp và hội nghị: Trang bị đầy đủ thiết bị hiện đại
                      </div>
                      <div className="area">
                        Phòng gym: Khu vực tập luyện thể dục thể thao
                      </div>
                      <div className="area">
                        Khu vực sinh hoạt chung: Không gian thư giãn và giao lưu
                      </div>
                    </div>
                  </div>

                  <div className="floor-level">
                    <h3>Tầng 6–10</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Phòng nghỉ Deluxe: Diện tích khoảng 40–56 m², có ban
                        công, tầm nhìn ra thành phố hoặc biển
                      </div>
                      <div className="area">
                        Khu vực BBQ: Nơi tổ chức tiệc nướng ngoài trời
                      </div>
                    </div>
                  </div>

                  <div className="floor-level">
                    <h3>Tầng 11–40</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Căn hộ khách sạn: Gồm các loại phòng từ 1 đến 2 phòng
                        ngủ, diện tích từ 44–83 m², đầy đủ tiện nghi như bếp
                        nhỏ, máy giặt, và ban công
                      </div>
                      <div className="area">
                        Phòng Executive Suite: Diện tích lớn hơn, tầm nhìn toàn
                        cảnh Vịnh Hạ Long
                      </div>
                    </div>
                  </div>

                  <div className="floor-level">
                    <h3>Tầng 41 (Tầng mái)</h3>
                    <div className="floor-areas">
                      <div className="area">
                        Hồ bơi vô cực: Nằm trên tầng cao nhất với tầm nhìn bao
                        quát Vịnh Hạ Long
                      </div>
                      <div className="area">
                        Sky Bar: Quầy bar ngoài trời, phục vụ đồ uống và tổ chức
                        sự kiện
                      </div>
                      <div className="area">
                        Khu vực thư giãn: Ghế nằm và không gian xanh để nghỉ
                        ngơi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popups for video guides */}
      {showPopup && (
     <>
     <div
       className="popup-overlay"
       onClick={() => setShowPopup(null)}
     >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
       <video
         width="100%"
         height="100%"
         controls
         autoPlay
         style={{
           opacity: 2,
           filter: "none",
           backdropFilter: "none",
           zIndex: 9999,
           position: "relative",
           display: "block",
           background: "#000",
         }}
       >
         <source src={getVideoUrl(showPopup)} type="video/mp4" />
       </video>

       <button onClick={() => setShowPopup(null)} className="close-popup">
         Đóng
       </button>
     </div>
     </div>
     
   </>
      )}

      <div className="events-section">
        <h2 className="events-title">Sự kiện sắp diễn ra</h2>
        {!showAllEvents ? (
          <>
            <div className="events-carousel">
              {events.slice(0, 3).map((event, index) => (
                <div key={index} className="event-cardSP">
                  <div className="event-image-container">
                    <img
                      src={
                        event.imageUrl ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={event.title || "Event image"}
                      className="event-image12"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-date">{event.date}</p>
                    <p className="event-location">{event.location}</p>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {events.length > 3 && (
              <button className="view-all-button" onClick={toggleViewAll}>
                Xem tất cả sự kiện
              </button>
            )}
          </>
        ) : (
          <>
            <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="event-cardSP">
                  <img
                    src={
                      event.imageUrl ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={event.title || "Event image"}
                    className="event-image13"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-date">{event.date}</p>
                    <p className="event-location">{event.location}</p>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-button" onClick={toggleViewAll}>
              Thu gọn
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Support;
