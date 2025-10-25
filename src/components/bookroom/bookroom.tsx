import React, { useState, useMemo } from 'react';
import './bookroom.css';

/* ===================================
   INTERFACES - Định nghĩa các kiểu dữ liệu
   =================================== */

/**
 * Interface định nghĩa cấu trúc dữ liệu cho phòng
 */
interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
}

/**
 * Interface định nghĩa các tùy chọn đặt phòng
 */
interface RoomOption {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  features: string;
  refundable: boolean;
}

/* ===================================
   COMPONENT CHÍNH
   =================================== */

const Booking: React.FC = () => {

  /* ===================================
     STATE MANAGEMENT - Quản lý trạng thái
     =================================== */

  /**
   * State cho ngày check-in
   * Mặc định là ngày hôm nay (00:00:00)
   */
  const [expanded, setExpanded] = useState(false);

  const shortText = `Diện tích 48m² • Hướng nhìn ra thành phố • Cung cấp áo choàng tắm • Máy dò khói •
  Điện thoại • Đầy đủ tiện nghi phòng tắm • Vòi sen • Phòng cách âm• Khu vực ăn uống •
  Bồn rửa vệ sinh (bidet) • Tủ quần áo trong phòng •...`;

  const fullText = `Diện tích 48m² • Hướng nhìn ra thành phố • Cung cấp áo choàng tắm • Máy dò khói •
  Điện thoại • Đầy đủ tiện nghi phòng tắm • Vòi sen • Phòng cách âm • Khu vực ăn uống •
  Bồn rửa vệ sinh (bidet) • Tủ quần áo trong phòng • Hệ thống sưởi • Máy điều hòa •
  Dép đi trong phòng • Chăn ga cao cấp • TV • Bàn ăn • Nôi trẻ em • Két sắt đủ lớn để
  đựng laptop • Khu vực toilet riêng biệt • Bàn làm việc • Máy sấy tóc • Cung cấp khăn
  tắm và ga trải giường • Thang máy • Bàn ủi và bàn để ủi đồ • Phòng tắm riêng • Tủ lạnh •
  Dầu gội • Xà phòng tắm • Ban công • Bình chữa cháy • Két an toàn trong phòng.
  Phòng có 1 giường King, diện tích 45 - 54m², không gian cao ráo, sáng sủa, sàn gỗ tinh tế,
  phòng tắm hiện đại, TV 50 inch, Wi-Fi miễn phí, và giường phụ có thể yêu cầu thêm (tính phí).`;

  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  /**
   * State cho ngày check-out
   * Mặc định là ngày mai
   */
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  /**
   * State điều khiển hiển thị date picker
   */
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * State xác định đang chọn ngày check-in hay check-out
   * true = đang chọn check-in, false = đang chọn check-out
   */
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);

  /**
   * State số lượng phòng (tối thiểu 1)
   */
  const [rooms, setRooms] = useState(1);

  /**
   * State số lượng khách (tối thiểu 1)
   */
  const [guests, setGuests] = useState(2);

  /**
   * State điều khiển hiển thị guest picker
   */
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  /**
   * State lưu ID của room option đã chọn
   * null = chưa chọn option nào
   */
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  /**
   * State quản lý vị trí tháng hiện tại trong calendar
   * 0 = tháng hiện tại, 1 = tháng sau, -1 = tháng trước
   */
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  /* ===================================
     UTILITY FUNCTIONS - Các hàm tiện ích
     =================================== */

  /**
   * Format ngày theo định dạng tiếng Việt
   * @param date - Đối tượng Date cần format
   * @returns Chuỗi ngày đã format (VD: "T2, 25 thg 10")
   */
  const formatDate = (date: Date): string => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${days[date.getDay()]}, ${date.getDate()} thg ${date.getMonth() + 1}`;
  };

  /**
   * Kiểm tra một ngày có phải là ngày trong quá khứ không
   * @param day - Ngày trong tháng
   * @param month - Tháng (0-11)
   * @param year - Năm
   * @returns true nếu là ngày quá khứ, false nếu không
   */
  const isPastDate = (day: number, month: number, year: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(year, month, day);
    return selectedDate < today;
  };

  /**
   * Kiểm tra một ngày có nằm trong khoảng check-in đến check-out không
   * @param day - Ngày trong tháng
   * @param month - Tháng (0-11)
   * @param year - Năm
   * @returns true nếu nằm trong khoảng, false nếu không
   */
  const isDateInRange = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date >= checkInDate && date <= checkOutDate;
  };

  /**
   * Kiểm tra một ngày có phải là ngày check-in không
   * @param day - Ngày trong tháng
   * @param month - Tháng (0-11)
   * @param year - Năm
   * @returns true nếu là ngày check-in, false nếu không
   */
  const isCheckInDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkInDate.toDateString();
  };

  /**
   * Kiểm tra một ngày có phải là ngày check-out không
   * @param day - Ngày trong tháng
   * @param month - Tháng (0-11)
   * @param year - Năm
   * @returns true nếu là ngày check-out, false nếu không
   */
  const isCheckOutDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkOutDate.toDateString();
  };

  /* ===================================
     COMPUTED VALUES - Giá trị tính toán
     =================================== */

  /**
   * Tính toán thông tin tháng hiện tại
   * Sử dụng useMemo để tối ưu performance, chỉ tính lại khi currentMonthIndex thay đổi
   */
  const currentMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + currentMonthIndex);
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      month,
      year,
      daysInMonth: new Date(year, month + 1, 0).getDate(), // Số ngày trong tháng
      startingDayOfWeek: new Date(year, month, 1).getDay() // Ngày đầu tiên của tháng là thứ mấy
    };
  }, [currentMonthIndex]);

  /**
   * Tính toán thông tin tháng tiếp theo
   * Sử dụng useMemo để tối ưu performance
   */
  const nextMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + currentMonthIndex + 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      month,
      year,
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      startingDayOfWeek: new Date(year, month, 1).getDay()
    };
  }, [currentMonthIndex]);

  /* ===================================
     EVENT HANDLERS - Xử lý sự kiện
     =================================== */

  /**
   * Điều hướng sang tháng trước/sau trong calendar
   * @param direction - Hướng điều hướng (1 = tháng sau, -1 = tháng trước)
   */
  const navigateMonth = (direction: number): void => {
    const newIndex = currentMonthIndex + direction;
    // Không cho phép lùi về quá khứ
    if (newIndex < 0) return;
    setCurrentMonthIndex(newIndex);
  };

  /**
   * Xử lý khi người dùng click vào một ngày trong calendar
   * @param day - Ngày được chọn
   * @param month - Tháng (0-11)
   * @param year - Năm
   */
  const handleDateClick = (day: number, month: number, year: number): void => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Không cho phép chọn ngày quá khứ
    if (selectedDate < today) {
      return;
    }

    if (selectingCheckIn) {
      // Đang chọn ngày check-in
      setCheckInDate(selectedDate);
      setSelectingCheckIn(false);

      // Tự động set check-out là ngày hôm sau
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    } else {
      // Đang chọn ngày check-out
      if (selectedDate > checkInDate) {
        setCheckOutDate(selectedDate);
        setShowDatePicker(false);
        setSelectingCheckIn(true);
      } else {
        alert('Ngày trả phòng phải sau ngày nhận phòng!');
      }
    }
  };

  /* ===================================
     DATA - Dữ liệu tĩnh
     =================================== */

  /**
   * Danh sách các option phòng có sẵn
   */
  const roomOptions: RoomOption[] = [
    {
      id: 1,
      title: 'Room Only!',
      originalPrice: 1760000,
      discountedPrice: 1188000,
      discount: 33,
      features: 'Đặt ngay, thanh toán sau',
      refundable: true
    },
    {
      id: 2,
      title: 'Best Available Rate - Breakfast Included!',
      originalPrice: 2320000,
      discountedPrice: 1566000,
      discount: 33,
      features: 'Đặt ngay, thanh toán sau',
      refundable: true
    }
  ];

  /* ===================================
     CALCULATIONS - Tính toán giá trị
     =================================== */

  /**
   * Tìm room option đã được chọn
   */
  const selectedRoom = roomOptions.find(opt => opt.id === selectedOption);

  /**
   * Tính tổng giá tiền
   */
  const totalPrice = selectedRoom ? selectedRoom.discountedPrice : 0;

  /**
   * Tính số đêm lưu trú
   */
  const nightCount = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  /* ===================================
     RENDER FUNCTIONS - Các hàm render giao diện
     =================================== */

  /**
   * Render một tháng trong calendar
   * @param monthData - Dữ liệu của tháng cần render
   * @param prefix - Prefix cho key (để phân biệt 2 tháng)
   */
  const renderMonth = (monthData: typeof currentMonth, prefix: string) => (
    <div className="calendar-month">
      <div className="month-title">
        Tháng {monthData.month + 1} năm {monthData.year}
      </div>
      <div className="calendar-grid">
        {/* Header với tên các ngày trong tuần */}
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
          <div key={day} className="calendar-header">{day}</div>
        ))}

        {/* Các ô trống ở đầu tháng */}
        {Array.from({ length: monthData.startingDayOfWeek }).map((_, i) => (
          <div key={`${prefix}-empty-${i}`} className="calendar-day-empty" />
        ))}

        {/* Các ngày trong tháng */}
        {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isPast = isPastDate(day, monthData.month, monthData.year);
          const isInRange = isDateInRange(day, monthData.month, monthData.year);
          const isCheckIn = isCheckInDate(day, monthData.month, monthData.year);
          const isCheckOut = isCheckOutDate(day, monthData.month, monthData.year);

          return (
            <div
              key={`${prefix}-${day}`}
              onClick={() => !isPast && handleDateClick(day, monthData.month, monthData.year)}
              className={`calendar-day 
                ${isCheckIn ? 'check-in' : ''} 
                ${isCheckOut ? 'check-out' : ''} 
                ${isInRange ? 'in-range' : ''}
                ${isPast ? 'disabled' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ===================================
     MAIN RENDER - Render giao diện chính
     =================================== */

  return (
    <div className="booking-container">
      {/* ========== THANH TÌM KIẾM ========== */}
      <div className="search-bar">

        {/* === Date Selector === */}
        <div
          className="date-selector"
          onClick={() => {
            setShowDatePicker(!showDatePicker);
            setSelectingCheckIn(true);
            setShowGuestPicker(false);
          }}
        >
          <div className="label">Chọn ngày</div>
          <div className="date-display">
            <span>{formatDate(checkInDate)}</span>
            <span>→</span>
            <span>{formatDate(checkOutDate)}</span>
          </div>
        </div>

        {/* === Date Picker Popup === */}
        {showDatePicker && (
          <div className="date-picker-popup">
            <div className="picker-header">
              {/* Nút lùi tháng */}
              <button
                className="month-nav-btn"
                onClick={() => navigateMonth(-1)}
                disabled={currentMonthIndex === 0}
              >
                ←
              </button>

              {/* Tiêu đề */}
              <div className="picker-title">
                {selectingCheckIn ? 'Chọn ngày nhận phòng' : 'Chọn ngày trả phòng'}
              </div>

              {/* Nút tiến tháng */}
              <button
                className="month-nav-btn"
                onClick={() => navigateMonth(1)}
              >
                →
              </button>
            </div>

            {/* Calendar hiển thị 2 tháng */}
            <div className="dual-calendar">
              {renderMonth(currentMonth, 'current')}
              {renderMonth(nextMonth, 'next')}
            </div>
          </div>
        )}

        {/* === Guest Selector === */}
        <div
          className="guest-selector"
          onClick={() => {
            setShowGuestPicker(!showGuestPicker);
            setShowDatePicker(false);
          }}
        >
          {/* Guest Picker Popup */}
          {showGuestPicker && (
            <div
              className="guest-picker-popup"
              onClick={(e) => e.stopPropagation()} // Ngăn đóng popup khi click bên trong
            >
              {/* Control số phòng */}
              <div className="guest-control">
                <span>Phòng</span>
                <div className="counter">
                  <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                  <span>{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)}>+</button>
                </div>
              </div>

              {/* Control số khách */}
              <div className="guest-control">
                <span>Khách</span>
                <div className="counter">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests}</span>
                  <button onClick={() => setGuests(guests + 1)}>+</button>
                </div>
              </div>

              {/* Nút Done */}
              <button
                className="done-btn"
                onClick={() => setShowGuestPicker(false)}
              >
                Done
              </button>
            </div>
          )}

          <div className="label">Chọn số người số phòng</div>
          <div className="guest-display">{rooms} Phòng, {guests} Khách</div>
        </div>

        {/* === Promo Code === */}
        <div className="promo-code">Thêm mã khuyến mãi</div>
      </div>

      {/* ========== NỘI DUNG CHÍNH ========== */}
      <div className="content-wrapper">

        {/* === PANEL TRÁI - Thông tin phòng === */}
        <div className="left-panel">

          {/* Header phòng với ảnh và thông tin */}
          <div className="room-header">
            <img
              src="https://i.ibb.co/3qZFPSx/Phong-khach-san-ALacarte-1.jpg"
              alt="Room"
              loading="lazy"
              className="room-image"
            />

            <div className="room-info">
              <h2>Deluxe City View King</h2>

              {/* Thông số phòng */}
              <div className="room-specs">
                <span>Sleeps 2</span>
                <span>1 King bed</span>
                <span>1 Bathroom</span>
              </div>

              {/* Mô tả chi tiết phòng */}
              <div className="room-description">
                {expanded ? fullText : shortText}
              </div>

              <div
                className="more-info"
                style={{ color: "blue", cursor: "pointer", marginTop: "8px" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Rút gọn" : "Đầy đủ"}
              </div>

            </div>
          </div>

          {/* Danh sách các room options */}
          {roomOptions.map((option) => (
            <div
              key={option.id}
              className={`room-option ${selectedOption === option.id ? 'selected' : ''}`}
            >
              {/* Badge giảm giá */}
              <div className="discount-badge">Save {option.discount}%</div>

              {/* Tiêu đề option */}
              <h3>{option.title}</h3>

              {/* Tính năng */}
              <div className="feature-item">
                <span className="check">✓</span>
                <span className="feature-text">{option.features}</span>
              </div>

              {/* Thông tin hoàn tiền */}
              <div className="info-item">
                <span>ⓘ</span>
                <span>Không hoàn tiền</span>
              </div>

              {/* Footer với giá và nút chọn */}
              <div className="option-footer">
                <div className="more-info">More info</div>

                <div className="price-section">
                  <div className="price-info">
                    {/* Giá gốc */}
                    <div className="original-price">
                      VND {option.originalPrice.toLocaleString('vi-VN')}
                    </div>

                    {/* Giá sau giảm */}
                    <div className="discounted-price">
                      VND {option.discountedPrice.toLocaleString('vi-VN')}
                    </div>

                    {/* Chi tiết giá */}
                    <div className="price-label">
                      Cost for {nightCount} night, {guests} guests
                    </div>
                  </div>

                  {/* Nút chọn phòng */}
                  <button
                    className={`select-btn ${selectedOption === option.id ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === PANEL PHẢI - Tổng kết booking === */}
        <div className="right-panel">
          <div className="booking-summary">

            {/* Tổng giá tiền */}
            <h2 className="total-header">
              VND {totalPrice.toLocaleString('vi-VN')}
              <span className="total-label">total</span>
            </h2>

            {/* Chi tiết booking */}
            <div className="booking-details">
              <div>{formatDate(checkInDate)} – {formatDate(checkOutDate)}</div>
              <div>{nightCount} night</div>
              <div>{rooms} room, {guests} guests</div>
            </div>

            {/* Thông tin phòng đã chọn */}
            {selectedOption && (
              <div className="selected-room">
                <div className="selected-header">
                  <span>{selectedRoom?.title}</span>
                  <span
                    className="delete-icon"
                    onClick={() => setSelectedOption(null)}
                  >
                    🗑
                  </span>
                </div>

                <div className="selected-info">
                  {guests} guests {nightCount} night
                  <div>Non-refundable</div>
                </div>

                <div className="selected-price">
                  VND {totalPrice.toLocaleString('vi-VN')}
                </div>
              </div>
            )}

            {/* Tổng cộng */}
            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span>VND {totalPrice.toLocaleString('vi-VN')}</span>
              </div>
              <div className="tax-info">Includes taxes + fees</div>
            </div>

            {/* Thông tin thanh toán */}
            {selectedOption && (
              <div className="payment-info">
                <div className="payment-title">Book now, pay later!</div>
                <div>Outstanding balance: VND {totalPrice.toLocaleString('vi-VN')}</div>
              </div>
            )}

            {/* Nút đặt phòng */}
            <button
              className="book-btn"
              disabled={!selectedOption}
              onClick={() => alert('Booking confirmed!')}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;


