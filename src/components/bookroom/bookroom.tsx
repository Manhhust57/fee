import React, { useState, useMemo } from 'react';
import './bookroom.css';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
}

interface RoomOption {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  features: string;
  refundable: boolean;
}

const Booking: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState(()=> {
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
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const formatDate = (date: Date) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${days[date.getDay()]}, ${date.getDate()} thg ${date.getMonth() + 1}`;
  };
  // Kết quả: "T2, 25 thg 10"

  // Tính toán tháng hiện tại
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

  // Tính toán tháng tiếp theo
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

  // Điều hướng tháng
  const navigateMonth = (direction: number) => {
    const newIndex = currentMonthIndex + direction;
    if (newIndex < 0) return; // Không cho lùi về quá khứ
    setCurrentMonthIndex(newIndex);
  };

  // Kiểm tra ngày quá khứ
  const isPastDate = (day: number, month: number, year: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(year, month, day);
    return selectedDate < today;
  };

  const handleDateClick = (day: number, month: number, year: number) => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Không cho chọn ngày quá khứ
    if (selectedDate < today) {
      return;
    }

    if (selectingCheckIn) {
      setCheckInDate(selectedDate);
      setSelectingCheckIn(false);
      // Tự động set check-out là ngày hôm sau
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

  const isDateInRange = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    return date >= checkInDate && date <= checkOutDate;
  };

  const isCheckInDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkInDate.toDateString();
  };

  const isCheckOutDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    return date.toDateString() === checkOutDate.toDateString();
  };

  const roomOptions: RoomOption[] = [
    {
      id: 1,
      title: 'Room Only!',
      originalPrice: 1760000,
      discountedPrice: 1188000,
      discount: 33,
      features: 'Book now, pay later',
      refundable: false
    },
    {
      id: 2,
      title: 'Best Available Rate - Breakfast Included!',
      originalPrice: 2320000,
      discountedPrice: 1566000,
      discount: 33,
      features: 'Book now, pay later',
      refundable: false
    }
  ];

  const selectedRoom = roomOptions.find(opt => opt.id === selectedOption);
  const totalPrice = selectedRoom ? selectedRoom.discountedPrice : 0;
  const nightCount = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="booking-container">
      <div className="search-bar">
        <div className="date-selector" onClick={() => {
          setShowDatePicker(!showDatePicker);
          setSelectingCheckIn(true);
          setShowGuestPicker(false);
        }}>
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
              {/* Tháng hiện tại */}
              <div className="calendar-month">
                <div className="month-title">
                  Tháng {currentMonth.month + 1} năm {currentMonth.year}
                </div>
                <div className="calendar-grid">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                    <div key={day} className="calendar-header">{day}</div>
                  ))}
                  {Array.from({ length: currentMonth.startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day-empty" />
                  ))}
                  {Array.from({ length: currentMonth.daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isPast = isPastDate(day, currentMonth.month, currentMonth.year);
                    const isInRange = isDateInRange(day, currentMonth.month, currentMonth.year);
                    const isCheckIn = isCheckInDate(day, currentMonth.month, currentMonth.year);
                    const isCheckOut = isCheckOutDate(day, currentMonth.month, currentMonth.year);

                    return (
                      <div
                        key={day}
                        onClick={() => !isPast && handleDateClick(day, currentMonth.month, currentMonth.year)}
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
              {/* Tháng tiếp theo */}
              <div className="calendar-month">
                <div className="month-title">
                  Tháng {nextMonth.month + 1} năm {nextMonth.year}
                </div>
                <div className="calendar-grid">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                    <div key={day} className="calendar-header">{day}</div>
                  ))}
                  {Array.from({ length: nextMonth.startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-next-${i}`} className="calendar-day-empty" />
                  ))}
                  {Array.from({ length: nextMonth.daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isPast = isPastDate(day, nextMonth.month, nextMonth.year);
                    const isInRange = isDateInRange(day, nextMonth.month, nextMonth.year);
                    const isCheckIn = isCheckInDate(day, nextMonth.month, nextMonth.year);
                    const isCheckOut = isCheckOutDate(day, nextMonth.month, nextMonth.year);

                    return (
                      <div
                        key={day}
                        onClick={() => !isPast && handleDateClick(day, nextMonth.month, nextMonth.year)}
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
            </div>
          </div>
        )}
        <div className="guest-selector" onClick={() => {
          setShowGuestPicker(!showGuestPicker);
          setShowDatePicker(false);
        }}>

          {showGuestPicker && (
            <div className="guest-picker-popup"
              onClick={(e) => e.stopPropagation()}>
              <div className="guest-control">
                <span>Phòng</span>
                <div className="counter">
                  <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                  <span>{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)}>+</button>
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

              <button className="done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
            </div>
          )}
          <div className="label">Chọn số người số phòng</div>
          <div className="guest-display">{rooms} Phòng, {guests} Khách</div>
        </div>

        <div className="promo-code">Thêm mã khuyến mãi</div>

        

        
      </div>

      <div className="content-wrapper">
        <div className="left-panel">
          <div className="room-header">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"
              alt="Room"
              className="room-image"
            />
            <div className="room-info">
              <h2>Deluxe City View King</h2>
              <div className="room-specs">
                <span>Sleeps 2</span>
                <span>1 King bed</span>
                <span>1 Bathroom</span>
              </div>
              <div className="room-description">
                48m² • City view • Bathrobes Provided • Smoke detectors • Telephone • Bathroom amenities • Shower • Soundproofed room...
                <br />
                Room with 1 King Bed, 45 - 54 SQM, Lofty & Bright interiors, Elegantly finished timber floors, Contemporary bathroom, 50" TV....
              </div>
              <div className="more-info">More info</div>
            </div>
          </div>

          {roomOptions.map((option) => (
            <div key={option.id} className={`room-option ${selectedOption === option.id ? 'selected' : ''}`}>
              <div className="discount-badge">Save {option.discount}%</div>

              <h3>{option.title}</h3>

              <div className="feature-item">
                <span className="check">✓</span>
                <span className="feature-text">{option.features}</span>
              </div>

              <div className="info-item">
                <span>ⓘ</span>
                <span>Non-refundable</span>
              </div>

              <div className="option-footer">
                <div className="more-info">More info</div>

                <div className="price-section">
                  <div className="price-info">
                    <div className="original-price">VND {option.originalPrice.toLocaleString('vi-VN')}</div>
                    <div className="discounted-price">VND {option.discountedPrice.toLocaleString('vi-VN')}</div>
                    <div className="price-label">Cost for {nightCount} night, {guests} guests</div>
                  </div>

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

        <div className="right-panel">
          <div className="booking-summary">
            <h2 className="total-header">
              VND {totalPrice.toLocaleString('vi-VN')} <span className="total-label">total</span>
            </h2>

            <div className="booking-details">
              <div>{formatDate(checkInDate)} – {formatDate(checkOutDate)}</div>
              <div>{nightCount} night</div>
              <div>{rooms} room, {guests} guests</div>
            </div>

            {selectedOption && (
              <div className="selected-room">
                <div className="selected-header">
                  <span>{selectedRoom?.title}</span>
                  <span className="delete-icon" onClick={() => setSelectedOption(null)}>🗑</span>
                </div>
                <div className="selected-info">
                  {guests} guests {nightCount} night
                  <div>Non-refundable</div>
                </div>
                <div className="selected-price">VND {totalPrice.toLocaleString('vi-VN')}</div>
              </div>
            )}

            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span>VND {totalPrice.toLocaleString('vi-VN')}</span>
              </div>
              <div className="tax-info">Includes taxes + fees</div>
            </div>

            {selectedOption && (
              <div className="payment-info">
                <div className="payment-title">Book now, pay later!</div>
                <div>Outstanding balance: VND {totalPrice.toLocaleString('vi-VN')}</div>
              </div>
            )}

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