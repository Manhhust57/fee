import React, { useState, useMemo } from 'react';
import './bookroom.css';

/* ===================================
   INTERFACES - Định nghĩa các kiểu dữ liệu
   =================================== */

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  discountedPrice: number;
  totalRooms: number;
  maxAdults: number;
  maxChildren: number;
  images: RoomImage[];
  amenities: Amenity[];
  amenitiesByCategory: Record<string, { id: number; name: string; icon: string }[]>;
}

interface RoomImage {
  url: string;
  alt: string;
}

interface Amenity {
  id: number;
  name: string;
  icon: string;
  category: string;
}

interface RoomOption {
  id: number;
  roomId: number;
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

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

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

  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [roomCount, setRoomCount] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  /* ===================================
     DATA - Dữ liệu mẫu
     =================================== */

  const roomData: Room[] = [
    {
      id: 1,
      name: "Deluxe City View King",
      description: `Diện tích 48m² • Hướng nhìn ra thành phố • Cung cấp áo choàng tắm • Máy dò khói •
  Điện thoại • Đầy đủ tiện nghi phòng tắm • Vòi sen • Phòng cách âm • Khu vực ăn uống •
      Bồn rửa vệ sinh(bidet) • Tủ quần áo trong phòng • Hệ thống sưởi • Máy điều hòa •
      Dép đi trong phòng • Chăn ga cao cấp • TV • Bàn ăn • Nôi trẻ em • Két sắt đủ lớn để
  đựng laptop • Khu vực toilet riêng biệt • Bàn làm việc • Máy sấy tóc • Cung cấp khăn
  tắm và ga trải giường • Thang máy • Bàn ủi và bàn để ủi đồ • Phòng tắm riêng • Tủ lạnh •
      Dầu gội • Xà phòng tắm • Ban công • Bình chữa cháy • Két an toàn trong phòng.
  Phòng có 1 giường King, diện tích 45 - 54m², không gian cao ráo, sáng sủa, sàn gỗ tinh tế,
    phòng tắm hiện đại, TV 50 inch, Wi - Fi miễn phí, và giường phụ có thể yêu cầu thêm(tính phí).`,
      price: 2000000,
      discount: 20,
      discountedPrice: 1600000,
      totalRooms: 10,
      maxAdults: 2,
      maxChildren: 1,
      images: [
        { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Deluxe City View King Room" },
        { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Deluxe Room Bathroom" },
        { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Deluxe Room Balcony" }
      ],
      amenities: [{ id: 1, name: "Wi-Fi miễn phí", icon: "wifi", category: "Tiện nghi chung" }],
      amenitiesByCategory: {}
    },
    {
      id: 2,
      name: "Ocean View Suite",
      description: "Phòng Suite rộng rãi với ban công hướng biển",
      price: 3500000,
      discount: 10,
      discountedPrice: 3150000,
      totalRooms: 5,
      maxAdults: 3,
      maxChildren: 2,
      images: [
        { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop", alt: "Ocean View Suite" },
        { url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", alt: "Ocean Suite Living Area" },
        { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", alt: "Ocean Suite Balcony" }
      ],
      amenities: [
        { id: 2, name: "Ban công", icon: "balcony", category: "View" },
        { id: 3, name: "Bồn tắm", icon: "bathtub", category: "Phòng tắm" }
      ],
      amenitiesByCategory: {}
    },
    {
      id: 3,
      name: "Standard Twin",
      description: "Phòng tiêu chuẩn 2 giường đơn",
      price: 1200000,
      discount: 0,
      discountedPrice: 1200000,
      totalRooms: 15,
      maxAdults: 2,
      maxChildren: 1,
      images: [
        { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop", alt: "Standard Twin Room" },
        { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop", alt: "Standard Twin Bathroom" }
      ],
      amenities: [
        { id: 4, name: "Máy lạnh", icon: "ac", category: "Tiện nghi phòng" },
        { id: 5, name: "TV", icon: "tv", category: "Giải trí" }
      ],
      amenitiesByCategory: {}
    }
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  // Hàm chuyển ảnh
  const nextImage = (roomId: number) => {
    const room = roomData.find(r => r.id === roomId);
    if (!room || room.images.length <= 1) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % room.images.length
    }));
  };

  const prevImage = (roomId: number) => {
    const room = roomData.find(r => r.id === roomId);
    if (!room || room.images.length <= 1) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + room.images.length) % room.images.length
    }));
  };
  /* ===================================
     CALCULATIONS - Tính toán giá trị
     =================================== */

  const nightCount = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Tạo room options cho từng phòng
  const createRoomOptions = (room: Room): RoomOption[] => {
    return [
      {
        id: room.id * 10 + 1,
        roomId: room.id,
        title: 'Room Only!',
        originalPrice: room.price * nightCount,
        discountedPrice: room.discountedPrice * nightCount,
        discount: room.discount,
        features: 'Đặt ngay, thanh toán sau',
        refundable: true
      },
      {
        id: room.id * 10 + 2,
        roomId: room.id,
        title: 'Room + Breakfast Included!',
        originalPrice: (room.price + 200000) * nightCount,
        discountedPrice: (room.discountedPrice + 200000) * nightCount,
        discount: room.discount,
        features: 'Đặt ngay, thanh toán sau',
        refundable: true
      }
    ];
  };

  // Tính tổng giá tất cả phòng đã chọn
  const getTotalPrice = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([roomId, optionId]) => {
      const room = roomData.find(r => r.id === parseInt(roomId));
      if (room) {
        const options = createRoomOptions(room);
        const option = options.find(o => o.id === optionId);
        if (option) {
          total += option.discountedPrice;
        }
      }
    });
    return total;
  };

  const totalPrice = getTotalPrice();

  /* ===================================
     UTILITY FUNCTIONS - Các hàm tiện ích
     =================================== */

  const formatDate = (date: Date): string => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${days[date.getDay()]}, ${date.getDate()} thg ${date.getMonth() + 1}`;
  };

  const isPastDate = (day: number, month: number, year: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(year, month, day);
    return selectedDate < today;
  };

  const isDateInRange = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date >= checkInDate && date <= checkOutDate;
  };

  const isCheckInDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkInDate.toDateString();
  };

  const isCheckOutDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkOutDate.toDateString();
  };

  /* ===================================
     COMPUTED VALUES - Giá trị tính toán
     =================================== */

  const currentMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + currentMonthIndex);
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      month,
      year,
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      startingDayOfWeek: new Date(year, month, 1).getDay()
    };
  }, [currentMonthIndex]);

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

  const navigateMonth = (direction: number): void => {
    const newIndex = currentMonthIndex + direction;
    if (newIndex < 0) return;
    setCurrentMonthIndex(newIndex);
  };

  const handleDateClick = (day: number, month: number, year: number): void => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return;
    }

    if (selectingCheckIn) {
      setCheckInDate(selectedDate);
      setSelectingCheckIn(false);

      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    } else {
      if (selectedDate > checkInDate) {
        setCheckOutDate(selectedDate);
        setShowDatePicker(false);
        setSelectingCheckIn(true);
      } else {
        alert('Ngày trả phòng phải sau ngày nhận phòng!');
      }
    }
  };

  const handleOptionSelect = (roomId: number, optionId: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [roomId]: optionId
    }));
  };

  const handleRemoveRoom = (roomId: number) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[roomId];
      return newOptions;
    });
  };

  const toggleExpanded = (roomId: number) => {
    setExpanded(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  /* ===================================
     RENDER FUNCTIONS - Các hàm render giao diện
     =================================== */

  const renderMonth = (monthData: typeof currentMonth, prefix: string) => (
    <div className="calendar-month">
      <div className="month-title">
        Tháng {monthData.month + 1} năm {monthData.year}
      </div>
      <div className="calendar-grid">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
          <div key={day} className="calendar-header">{day}</div>
        ))}

        {Array.from({ length: monthData.startingDayOfWeek }).map((_, i) => (
          <div key={`${prefix}-empty-${i}`} className="calendar-day-empty" />
        ))}

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
      <div className="search-bar">
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

        {showDatePicker && (
          <div className="date-picker-popup">
            <div className="picker-header">
              <button
                className="month-nav-btn"
                onClick={() => navigateMonth(-1)}
                disabled={currentMonthIndex === 0}
              >
                ←
              </button>

              <div className="picker-title">
                {selectingCheckIn ? 'Chọn ngày nhận phòng' : 'Chọn ngày trả phòng'}
              </div>

              <button
                className="month-nav-btn"
                onClick={() => navigateMonth(1)}
              >
                →
              </button>
            </div>

            <div className="dual-calendar">
              {renderMonth(currentMonth, 'current')}
              {renderMonth(nextMonth, 'next')}
            </div>
          </div>
        )}

        <div
          className="guest-selector"
          onClick={() => {
            setShowGuestPicker(!showGuestPicker);
            setShowDatePicker(false);
          }}
        >
          {showGuestPicker && (
            <div
              className="guest-picker-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="guest-control">
                <span>Phòng</span>
                <div className="counter">
                  <button onClick={() => setRoomCount(Math.max(1, roomCount - 1))}>-</button>
                  <span>{roomCount}</span>
                  <button onClick={() => setRoomCount(roomCount + 1)}>+</button>
                </div>
              </div>

              <div className="guest-control">
                <span>Khách</span>
                <div className="counter">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests}</span>
                  <button onClick={() => setGuests(guests + 1)}>+</button>
                </div>
              </div>

              <button
                className="done-btn"
                onClick={() => setShowGuestPicker(false)}
              >
                Done
              </button>
            </div>
          )}

          <div className="label">Chọn số người số phòng</div>
          <div className="guest-display">{roomCount} Phòng, {guests} Khách</div>
        </div>

        <div className="promo-code">Thêm mã khuyến mãi</div>
      </div>

      <div className="content-wrapper">
        <div className="left-panel">
          {/* HIỂN THỊ TẤT CẢ CÁC PHÒNG */}
          {roomData.map((room) => {
            const roomOptions = createRoomOptions(room);
            const selectedOptionId = selectedOptions[room.id];
            const isExpanded = expanded[room.id];

            return (
              <div key={room.id} className="room-section">
                <div className="room-header">
                  <div className="room-image-container">
                    <img
                      src={room.images[currentImageIndex[room.id] || 0]?.url || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"}
                      alt={room.images[currentImageIndex[room.id] || 0]?.alt || "Room"}
                      loading="lazy"
                      className="room-image"
                      onError={(e) => {
                        // Fallback nếu ảnh không load được
                        e.currentTarget.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop";
                      }}
                    />
                    {/* Navigation buttons cho ảnh */}
                    {room.images.length > 1 && (
                      <>
                        <button
                          className="image-nav-btn prev-btn"
                          onClick={() => prevImage(room.id)}
                        >
                          ‹
                        </button>
                        <button
                          className="image-nav-btn next-btn"
                          onClick={() => nextImage(room.id)}
                        >
                          ›
                        </button>

                        {/* Dots indicator */}
                        <div className="image-dots">
                          {room.images.map((_, index) => (
                            <span
                              key={index}
                              className={`dot ${(currentImageIndex[room.id] || 0) === index ? 'active' : ''}`}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, [room.id]: index }))}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="room-info">
                    <h2>{room.name}</h2>

                    <div className="room-specs">
                      <span>Sleeps {room.maxAdults}</span>
                      <span>1 King bed</span>
                      <span>1 Bathroom</span>
                    </div>

                    <div className="room-description">
                      {isExpanded ? room.description : room.description.slice(0, 300) + (room.description.length > 300 ? "..." : "")}
                    </div>

                    <div
                      className="more-info"
                      style={{ color: "blue", cursor: "pointer", marginTop: "8px" }}
                      onClick={() => toggleExpanded(room.id)}
                    >
                      {isExpanded ? "Rút gọn" : "Đầy đủ"}
                    </div>
                  </div>
                </div>

                {/* Hiển thị các options cho phòng này */}
                {roomOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`room-option ${selectedOptionId === option.id ? 'selected' : ''}`}
                  >
                    {option.discount > 0 && (
                      <div className="discount-badge">Save {option.discount}%</div>
                    )}
                    <h3>{option.title}</h3>

                    <div className="feature-item">
                      <span className="check">✓</span>
                      <span className="feature-text">{option.features}</span>
                    </div>

                    <div className="info-item">
                      <span>ⓘ</span>
                      <span>Không hoàn tiền</span>
                    </div>

                    <div className="option-footer">
                      <div className="more-info">More info</div>

                      <div className="price-section">
                        <div className="price-info">
                          <div className="original-price">
                            VND {option.originalPrice.toLocaleString('vi-VN')}
                          </div>

                          <div className="discounted-price">
                            VND {option.discountedPrice.toLocaleString('vi-VN')}
                          </div>

                          <div className="price-label">
                            Cost for {nightCount} night, {guests} guests
                          </div>
                        </div>

                        <button
                          className={`select-btn ${selectedOptionId === option.id ? 'selected' : ''}`}
                          onClick={() => handleOptionSelect(room.id, option.id)}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Đường phân cách giữa các phòng */}
                <div className="room-divider"></div>
              </div>
            );
          })}
        </div>

        <div className="right-panel">
          <div className="booking-summary">
            <h2 className="total-header">
              VND {totalPrice.toLocaleString('vi-VN')}
              <span className="total-label">total</span>
            </h2>

            <div className="booking-details">
              <div>{formatDate(checkInDate)} – {formatDate(checkOutDate)}</div>
              <div>{nightCount} night</div>
              <div>{roomCount} room, {guests} guests</div>
            </div>

            {/* Hiển thị tất cả phòng đã chọn */}
            {Object.entries(selectedOptions).map(([roomId, optionId]) => {
              const room = roomData.find(r => r.id === parseInt(roomId));
              const roomOptions = createRoomOptions(room!);
              const option = roomOptions.find(o => o.id === optionId);

              if (!room || !option) return null;

              return (
                <div key={roomId} className="selected-room">
                  <div className="selected-header">
                    <span>{room.name} - {option.title}</span>
                    <span
                      className="delete-icon"
                      onClick={() => handleRemoveRoom(parseInt(roomId))}
                    >
                      🗑
                    </span>
                  </div>

                  <div className="selected-info">
                    {guests} guests {nightCount} night
                    <div>Non-refundable</div>
                  </div>

                  <div className="selected-price">
                    VND {option.discountedPrice.toLocaleString('vi-VN')}
                  </div>

                </div>

              );
            })}

            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span>VND {totalPrice.toLocaleString('vi-VN')}</span>
              </div>
              <div className="tax-info">Includes taxes + fees</div>
            </div>

            {Object.keys(selectedOptions).length > 0 && (
              <div className="payment-info">
                <div className="payment-title">Book now, pay later!</div>
                <div>Outstanding balance: VND {totalPrice.toLocaleString('vi-VN')}</div>
              </div>
            )}

            <button
              className="book-btn"
              disabled={Object.keys(selectedOptions).length === 0}
              onClick={() => alert('Booking confirmed!')}
            >
              Book ({Object.keys(selectedOptions).length} room{Object.keys(selectedOptions).length > 1 ? 's' : ''})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;