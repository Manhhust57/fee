import React, { useState, useMemo, useEffect } from 'react';
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
interface SelectedOption {
  roomId: number;
  optionId: number;
  quantity: number;
}
/* ===================================
   COMPONENT CHÍNH
   =================================== */

const Booking: React.FC = () => {
  /* ===================================
     STATE MANAGEMENT - Quản lý trạng thái
     =================================== */

  // ⭐ State mới cho API
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date(); // 30/10/2025
    today.setHours(0, 0, 0, 0);
    return today; // ✅ 30/10/2025
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
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  /* ===================================
     API FETCH - Lấy dữ liệu từ backend
     =================================== */
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";



  const fetchRooms = async () => {
    try {
      console.log('🔍 Fetching rooms from API...');

      const response = await fetch(`${API_URL}/rooms/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      // API trả về { total: number, rooms: Room[] }
      setRooms(data.rooms || []);
      setLoading(false);

    } catch (err) {
      console.error('❌ Error fetching rooms:', err);
      setError('404');
      setLoading(false);
    }
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
        originalPrice: (room.price + 200000 * guests) * nightCount,
        discountedPrice: (room.discountedPrice + 200000 * guests) * nightCount,
        discount: room.discount,
        features: 'Đặt ngay, thanh toán sau + Ăn sáng buffet',
        refundable: true
      }
    ];
  };

  // Tính tổng giá tất cả phòng đã chọn
  /* ===================================
   CALCULATIONS - Tính toán giá trị
   =================================== */

  // Tính tổng giá tất cả phòng đã chọn
  const getTotalPrice = () => {
    let total = 0;

    selectedOptions.forEach(selected => {
      const room = rooms.find(r => r.id === selected.roomId);
      if (room) {
        const options = createRoomOptions(room);
        const option = options.find(o => o.id === selected.optionId);
        if (option) {
          total += option.discountedPrice * selected.quantity; // ⭐ Nhân với quantity
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

  // Hàm chuyển ảnh
  const nextImage = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room || room.images.length <= 1) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % room.images.length
    }));
  };

  const prevImage = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room || room.images.length <= 1) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + room.images.length) % room.images.length
    }));
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

      nextDay.setHours(0, 0, 0, 0);
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

  /* ===================================
   EVENT HANDLERS - Xử lý sự kiện
   =================================== */

  const handleOptionSelect = (roomId: number, optionId: number) => {
    setSelectedOptions(prev => {
      // Kiểm tra đã có combo này chưa
      const existingIndex = prev.findIndex(
        item => item.roomId === roomId && item.optionId === optionId
      );

      if (existingIndex >= 0) {
        // ⭐ Đã có → Tăng quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        // ⭐ Chưa có → Thêm mới
        return [...prev, { roomId, optionId, quantity: 1 }];
      }
    });
  };

  const handleRemoveOption = (roomId: number, optionId: number) => {
    setSelectedOptions(prev => {
      const existingIndex = prev.findIndex(
        item => item.roomId === roomId && item.optionId === optionId
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        const currentQuantity = updated[existingIndex].quantity;

        if (currentQuantity > 1) {
          // ⭐ Giảm quantity
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: currentQuantity - 1
          };
          return updated;
        } else {
          // ⭐ Xóa hẳn nếu quantity = 1
          return prev.filter((_, index) => index !== existingIndex);
        }
      }

      return prev;
    });
  };

  const handleRemoveRoom = (roomId: number, optionId: number) => {
    // ⭐ Xóa hẳn 1 combo
    setSelectedOptions(prev =>
      prev.filter(item => !(item.roomId === roomId && item.optionId === optionId))
    );
  };



  const toggleExpanded = (roomId: number) => {
    setExpanded(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  // ⭐ State cho availability check
  const [availabilityData, setAvailabilityData] = useState<Record<number, {
    totalRooms: number;
    bookedRooms: number;
    availableRooms: number;
    isAvailable: boolean;
  }>>({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  /* ===================================
   AVAILABILITY CHECK - Kiểm tra phòng trống
   =================================== */

  /**
   * Kiểm tra phòng trống khi thay đổi ngày
   */
  /* ===================================
   AVAILABILITY CHECK - Kiểm tra phòng trống
   =================================== */

  /**
   * Kiểm tra phòng trống khi thay đổi ngày
   */
  const checkRoomAvailability = async () => {
    if (rooms.length === 0) return;

    setCheckingAvailability(true);

    try {
      const checkIn = checkInDate.toLocaleDateString('en-CA');
      const checkOut = checkOutDate.toLocaleDateString('en-CA');


      console.log('🔍 Checking availability...', { checkIn, checkOut });

      // ⭐ SỬA URL ĐÂY - Bỏ /api/v1
      const response = await fetch(
        `${API_URL}/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}`
      );

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      console.log('✅ Availability data:', data);

      // Chuyển đổi data thành object dễ truy cập
      const availabilityMap: Record<number, any> = {};
      data.rooms.forEach((room: any) => {
        availabilityMap[room.id] = {
          totalRooms: room.totalRooms,
          bookedRooms: room.bookedRooms,
          availableRooms: room.availableRooms,
          isAvailable: room.isAvailable,
        };
      });

      setAvailabilityData(availabilityMap);
      setCheckingAvailability(false);
    } catch (err) {
      console.error('❌ Error checking availability:', err);
      setCheckingAvailability(false);
    }
  };
  /* ===================================
   EFFECTS - Side effects
   =================================== */

  useEffect(() => {
    fetchRooms();
  }, []);

  // ⭐ THÊM useEffect này
  useEffect(() => {
    if (rooms.length > 0 && !loading && checkInDate && checkOutDate) {
      // Đảm bảo check-out sau check-in
      if (checkOutDate <= checkInDate) {
        console.warn('⚠️ Invalid date range');
        return;
      }

      // ⭐ Debounce: Chờ 300ms
      const timer = setTimeout(() => {
        console.log('⏰ Debounce finished, checking availability...');
        checkRoomAvailability();
      }, 300);

      // Cleanup: Hủy timer cũ
      return () => {
        console.log('🧹 Cleanup timer');
        clearTimeout(timer);
      };
    }
  }, [checkInDate, checkOutDate, rooms.length, loading]);

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
     LOADING & ERROR STATES
     =================================== */

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner" style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }}></div>
        <div>Đang tải danh sách phòng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#e74c3c',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>❌ {error}</div>
        <button
          onClick={fetchRooms}
          style={{
            padding: '12px 24px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Không có phòng nào. Vui lòng kiểm tra database.
      </div>
    );
  }

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
                  {/* ⭐ THÊM giới hạn max 20 */}
                  <button
                    onClick={() => setRoomCount(Math.min(20, roomCount + 1))}
                    disabled={roomCount >= 20}
                    style={{
                      cursor: roomCount >= 20 ? 'not-allowed' : 'pointer',
                      opacity: roomCount >= 20 ? 0.5 : 1
                    }}
                  >
                    +
                  </button>
                </div>
                {/* ⭐ THÊM text cảnh báo */}
                {roomCount >= 20 && (
                  <div style={{
                    fontSize: '0.5rem',
                    color: '#e74c3c',
                    marginTop: '4px'
                  }}>
                    Tối đa 20 phòng
                  </div>
                )}
              </div>
              <div className="guest-control">
                <span>Khách</span>
                <div className="counter">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests}</span>
                  {/* ⭐ THÊM giới hạn max 10 */}
                  <button
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    disabled={guests >= 20}
                    style={{
                      cursor: guests >= 20 ? 'not-allowed' : 'pointer',
                      opacity: guests >= 20 ? 0.5 : 1
                    }}
                  >
                    +
                  </button>
                </div>
                {/* ⭐ THÊM text cảnh báo */}
                {guests >= 20 && (
                  <div style={{
                    fontSize: '0.5rem',
                    color: '#e74c3c',
                    marginTop: '4px'
                  }}>
                    Tối đa 20 khách
                  </div>
                )}
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
          {/* ⭐ HIỂN THỊ TẤT CẢ CÁC PHÒNG TỪ API */}
          {rooms.map((room) => {
            const roomOptions = createRoomOptions(room);
            const selectedOptionId = selectedOptions[room.id];
            const isExpanded = expanded[room.id];

            const availability = availabilityData[room.id];
            return (
              <div key={room.id} className="room-section">
                <div className="room-header">
                  <div className="room-image-container">
                    <img
                      src={room.images[currentImageIndex[room.id] || 0]?.url || "https://via.placeholder.com/800x600"}
                      alt={room.images[currentImageIndex[room.id] || 0]?.alt || room.name}
                      loading="lazy"
                      className="room-image"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/800x600";
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
                      <span>Sleeps {room.maxAdults + room.maxChildren}</span>
                      <span>{room.maxAdults} người lớn</span>
                      <span>{room.maxChildren} trẻ em</span>
                    </div>

                    {room.amenities && room.amenities.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <strong style={{ display: 'block', marginBottom: '8px' }}>
                          Tiện nghi:
                        </strong>

                        {/* Rút gọn - Hiển thị 10 tiện nghi đầu */}
                        {!isExpanded && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {room.amenities.slice(0, 10).map((amenity) => (
                              <span
                                key={amenity.id}
                                style={{
                                  background: '#f0f0f0',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  color: '#555'
                                }}
                              >
                                • {amenity.name}
                              </span>
                            ))}
                            {room.amenities.length > 10 && (
                              <span
                                style={{
                                  background: '#e3f2fd',
                                  color: '#1976d2',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  fontWeight: '500'
                                }}
                              >
                                +{room.amenities.length - 10} tiện nghi
                              </span>
                            )}
                          </div>
                        )}

                        {/* Đầy đủ - Hiển thị tất cả tiện nghi */}
                        {isExpanded && (
                          <div style={{
                            padding: '12px',
                            background: '#f9f9f9',
                            borderRadius: '6px',
                            marginTop: '8px'
                          }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {room.amenities.map((amenity) => (
                                <span
                                  key={amenity.id}
                                  style={{
                                    background: '#f0f0f0',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    color: '#555'
                                  }}
                                >
                                  • {amenity.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className="none"
                  >
                  </div>
                  <div
                    className="more-info"
                    style={{ color: "blue", cursor: "pointer", marginTop: "8px" }}
                    onClick={() => toggleExpanded(room.id)}
                  >
                    {isExpanded ? "Rút gọn" : "Xem đầy đủ"}
                  </div>
                </div>

                {/* Hiển thị các options cho phòng này */}
                {roomOptions.map((option) => {
                  // ⭐ Kiểm tra option này đã được chọn chưa
                  const selectedItem = selectedOptions.find(
                    item => item.roomId === room.id && item.optionId === option.id
                  );
                  const isSelected = !!selectedItem;
                  const quantity = selectedItem?.quantity || 0;

                  return (
                    <div
                      key={option.id}
                      className={`room-option ${isSelected ? 'selected' : ''}`}
                    >
                      {option.discount > 0 && (
                        <div className="discount-badge">Save {option.discount}%</div>
                      )}

                      {/* ⭐ Badge số lượng đã chọn */}
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#ffffffff',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}>
                          x{quantity}
                        </div>
                      )}

                      <h3>{option.title}</h3>

                      <div className="feature-item">
                        <span className="check">✓</span>
                        <span className="feature-text">{option.features}</span>
                      </div>

                      <div className="info-item">
                        <span>ⓘ</span>
                        <span>{option.refundable ? 'Có hoàn tiền' : 'Không hoàn tiền'}</span>
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
                              Tính cho {nightCount} đêm, {guests} khách
                            </div>
                          </div>

                          {/* ⭐ Nút + và - */}
                          {isSelected ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button
                                className="quantity-btn"
                                onClick={() => handleRemoveOption(room.id, option.id)}
                                style={{
                                  padding: '8px 16px',
                                  background: '#ffffffff',
                                  color: 'black',
                                  border: 'solid 1px #ccc',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                −
                              </button>
                              <span style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                minWidth: '30px',
                                textAlign: 'center'
                              }}>
                                {quantity}
                              </span>
                              <button
                                className="quantity-btn"
                                onClick={() => handleOptionSelect(room.id, option.id)}
                                style={{
                                  padding: '8px 16px',
                                  background: '#ffffffff',
                                  color: 'black',
                                  border: 'solid 1px #ccc',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="select-btn"
                              onClick={() => handleOptionSelect(room.id, option.id)}
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

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
              <span className="total-label"> total</span>
            </h2>

            <div className="booking-details">
              <div>{formatDate(checkInDate)} – {formatDate(checkOutDate)}</div>
              <div>{nightCount} night</div>
              <div>
                {selectedOptions.reduce((sum, item) => sum + item.quantity, 0)} room(s), {guests} guests
              </div>
            </div>

            {/* ⭐ Hiển thị tất cả phòng đã chọn */}
            {selectedOptions.map((selected, index) => {
              const room = rooms.find(r => r.id === selected.roomId);
              if (!room) return null;

              const roomOptions = createRoomOptions(room);
              const option = roomOptions.find(o => o.id === selected.optionId);
              if (!option) return null;

              return (
                <div key={index} className="selected-room">
                  <div className="selected-header">
                    <span>
                      {room.name} - {option.title}
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        background: 'rgb(246 236 0)',
                        color: 'white',
                        borderRadius: '10px',
                        fontSize: '0.85rem'
                      }}>
                        x{selected.quantity}
                      </span>
                    </span>
                    <span
                      className="delete-icon"
                      onClick={() => handleRemoveRoom(selected.roomId, selected.optionId)}
                    >
                      🗑
                    </span>
                  </div>

                  <div className="selected-info">
                    {guests} guests {nightCount} night
                    <div>{option.refundable ? 'Refundable' : 'Non-refundable'}</div>
                  </div>

                  <div className="selected-price">
                    VND {(option.discountedPrice * selected.quantity).toLocaleString('vi-VN')}
                  </div>
                </div>
              );
            })}

            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span>VND {totalPrice.toLocaleString('vi-VN')}</span>
              </div>
              <div className="tax-info">Bao gốm thuế + phí</div>
            </div>



            <button
              className="book-btn"
              disabled={selectedOptions.length === 0}
              onClick={() => {
                const summary = selectedOptions.map(s => {
                  const room = rooms.find(r => r.id === s.roomId);
                  const options = createRoomOptions(room!);
                  const option = options.find(o => o.id === s.optionId);
                  return `${room?.name} (${option?.title}) x${s.quantity}`;
                }).join('\n');
                alert(`Booking confirmed!\n\n${summary}\n\nTotal: ${totalPrice.toLocaleString('vi-VN')}đ`);
              }}
            >
              Book ({selectedOptions.reduce((sum, item) => sum + item.quantity, 0)} room{selectedOptions.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''})
            </button>




            {Object.keys(selectedOptions).length > 0 && (
              <div className="payment-info">
                <div className="payment-title">Book now, pay later!</div>
                <div>Outstanding balance: VND {totalPrice.toLocaleString('vi-VN')}</div>
              </div>
            )}


          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Booking;