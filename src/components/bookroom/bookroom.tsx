// Booking.tsx
import React, { useState, useEffect } from 'react';
import './bookroom.css';


interface Room {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  image: string;
  amenities: string[];
  maxGuests: number;
  beds: string;
  size: string;
  cancellation: string;
  available: boolean;
  isHot?: boolean;
}

interface BookingForm {
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guests: number;
  promoCode: string;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<BookingForm>({
    checkInDate: '',
    checkOutDate: '',
    rooms: 1,
    guests: 2,
    promoCode: ''
  });

  const [nights, setNights] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  // Sample room data
  const allRooms: Room[] = [
    {
      id: 'deluxe-city',
      name: 'A La Carte Ha Long Bay - Twin Room',
      price: 1588000,
      originalPrice: 2100000,
      discount: 35,
      description: 'Sleep 4 • 2 Single beds • 1 Bathroom',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/531929524.jpg?k=56daa95ca89920843f6ffbee15ac9ba63d803bd44fc9511eee6ba552ee48ef19&o=',
      amenities: ['46m² • City view', 'Evaporative Air conditioning', 'TV', 'Linen and Towels Provided', 'Safe large enough to accommodate a laptop'],
      maxGuests: 4,
      beds: '2 Single beds',
      size: '46m²',
      cancellation: 'Free cancellation before 11 Oct',
      available: true,
      isHot: true
    },
    {
      id: 'ocean-suite',
      name: 'Ocean View Suite - King Bed',
      price: 2800000,
      originalPrice: 3500000,
      discount: 20,
      description: 'Sleep 2 • 1 King bed • 1 Bathroom • Balcony',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/747443630.jpg?k=6b8372bd884ad7d5cf6e658eaf44baf9978319f001515ce11b16d4fa3fe24d10&o=',
      amenities: ['65m² • Ocean view', 'Private balcony', 'Minibar', 'Jacuzzi bathtub', 'Premium amenities'],
      maxGuests: 2,
      beds: '1 King bed',
      size: '65m²',
      cancellation: 'Free cancellation before 7 days',
      available: true,
      isHot: true
    },
    {
      id: 'family-room',
      name: 'Family Room - Twin + Double',
      price: 2200000,
      originalPrice: 2800000,
      discount: 25,
      description: 'Sleep 6 • 1 Double bed + 2 Single beds • 2 Bathrooms',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/529641816.jpg?k=e36161530b2a9ed90fbb28f3972a4069017ea1372ec5ef253d7baa5f1a3f48d8&o=',
      amenities: ['55m² • Garden view', 'Separate living area', 'Kitchenette', 'Children amenities', 'Extra space'],
      maxGuests: 6,
      beds: '1 Double + 2 Single beds',
      size: '55m²',
      cancellation: 'Free cancellation before 5 days',
      available: true,
      isHot: true
    },
    {
      id: 'standard-room',
      name: 'Standard Room - Double Bed',
      price: 1200000,
      originalPrice: 1500000,
      discount: 20,
      description: 'Sleep 2 • 1 Double bed • 1 Bathroom',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/599034002.jpg?k=e8512a5c07ce2bb8e91b979563a2447157f15933a0274dc0a13b021f92827c93&o=',
      amenities: ['28m² • City view', 'Air conditioning', 'WiFi', 'Room service', 'Daily housekeeping'],
      maxGuests: 2,
      beds: '1 Double bed',
      size: '28m²',
      cancellation: 'Free cancellation before 3 days',
      available: true,
      isHot: false
    },
    {
      id: 'room-only',
      name: 'A La Carte Ha Long Bay Managed by Anstay-Room Only - Basic',
      price: 900000,
      originalPrice: 1200000,
      discount: 25,
      description: 'Sleep 2 • 1 Double bed • 1 Bathroom',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/531929542.jpg?k=79d1e1bb0d43a66f008e5258c7f3b4f7aef30ba2ad5831bc4993dba19cfd6079&o=',
      amenities: ['22m² • No view', 'Basic amenities', 'WiFi'],
      maxGuests: 2,
      beds: '1 Double bed',
      size: '22m²',
      cancellation: 'Non-refundable',
      available: true,
      isHot: false
    },
    {
      id: 'breakfast-included',
      name: 'Room Stay + Breakfast Included!',
      price: 1566000,
      originalPrice: 2000000,
      discount: 20,
      description: 'Sleep 2 • 1 Double bed • 1 Bathroom • Breakfast',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733755139.jpg?k=e7776543f9f80fab29e8ea953a34f893e628346ddde4bc5e9597f291aac1b72d&o=',
      amenities: ['35m² • Garden view', 'Breakfast included', 'Room service', 'Free WiFi', 'Premium location'],
      maxGuests: 2,
      beds: '1 Double bed',
      size: '35m²',
      cancellation: 'Free cancellation before 11 Oct',
      available: true,
      isHot: false
    }
  ];

  // Get hot rooms for initial display
  const hotRooms = allRooms.filter(room => room.isHot);

  // Get available rooms based on search criteria
  const getAvailableRooms = () => {
    return allRooms.filter(room => {
      return room.available && room.maxGuests >= formData.guests;
    });
  };

  // Calculate nights
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNights(nightsCount > 0 ? nightsCount : 0);
    }
  }, [formData.checkInDate, formData.checkOutDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      setHasSearched(true);
    }
  };

  const handleClear = () => {
    setFormData({
      checkInDate: '',
      checkOutDate: '',
      rooms: 1,
      guests: 2,
      promoCode: ''
    });
    setHasSearched(false);
    setSelectedRoom('');
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const applyPromoCode = () => {
    alert('Promo code applied!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckout = () => {
    if (formData.checkInDate) {
      const date = new Date(formData.checkInDate);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    }
    return getTodayDate();
  };

  const displayRooms = hasSearched ? getAvailableRooms() : hotRooms;
  const sectionTitle = hasSearched ? 'Available Rooms' : 'Hot Rooms 🔥';
  const sectionSubtitle = hasSearched
    ? `${formData.checkInDate} — ${formData.checkOutDate} • ${nights} night${nights > 1 ? 's' : ''} • ${formData.rooms} room, ${formData.guests} guests`
    : 'Popular rooms with best deals';

  return (
    <div className="simple-booking">
      {/* Search Form */}
      <div className="search-container">
        <div className="search-form">
          <div className="search-row">
            <div className="form-group">
              <label>Chọn ngày</label>
              <div className="date-inputs">
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  placeholder="Thu, 14 Oct"
                />
                <span className="date-separator">—</span>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  min={getMinCheckout()}
                  placeholder="Fri, 17 Oct"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Chọn số phòng và số người</label>
              <div className="guests-rooms">
                <select name="rooms" value={formData.rooms} onChange={handleInputChange}>
                  <option value={1}>1 Phòng</option>
                  <option value={2}>2 Phòng</option>
                  <option value={3}>3 Phòng</option>
                </select>
                <select name="guests" value={formData.guests} onChange={handleInputChange}>
                  <option value={1}>1 Khách</option>
                  <option value={2}>2 Khách</option>
                  <option value={3}>3 Khách</option>
                  <option value={4}>4 Khách</option>
                  <option value={5}>5 Khách</option>
                  <option value={6}>6 Khách</option>
                </select>
              </div>
              <button className="promo-btn">📋 Thêm mã khuyến mãi</button>
            </div>
          </div>

          <div className="promo-row">
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              placeholder="Enter your promo code"
              className="promo-input"
            />
            <button onClick={applyPromoCode} className="apply-btn">Áp dụng</button>
            <button onClick={handleClear} className="clear-btn">Xóa</button>
          </div>
        </div>

        {formData.checkInDate && formData.checkOutDate && (
          <button onClick={handleSearch} className="search-btn">
            Tìm kiếm phòng
          </button>
        )}
      </div>

      {/* Rooms Display */}
      <div className="rooms-container">
        <div className="rooms-header">
          <h3>{sectionTitle}</h3>
          <p>{sectionSubtitle}</p>
        </div>

        <div className={`rooms-display ${hasSearched ? 'search-results' : 'hot-rooms'}`}>
          {displayRooms.map((room) => (
            <div
              key={room.id}
              className={`room-card-horizontal ${selectedRoom === room.id ? 'selected' : ''}`}
              onClick={() => handleSelectRoom(room.id)}
            >
              <div className="room-image-horizontal">
                <img src={room.image} alt={room.name} />
                {room.discount && (
                  <div className="discount-badge">
                    Save {room.discount}%
                  </div>
                )}
                {room.isHot && !hasSearched && (
                  <div className="hot-badge">🔥 HOT</div>
                )}
              </div>

              <div className="room-info-horizontal">
                <div className="room-details-horizontal">
                  <h4 className="room-name">{room.name}</h4>
                  <p className="room-description">{room.description}</p>

                  <div className="room-amenities-horizontal">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="more-amenities">+{room.amenities.length - 3} more</span>
                    )}
                  </div>

                  <div className="room-features-horizontal">
                    <span className="feature">✓ {room.cancellation}</span>
                    <span className="feature">✓ Book now, pay later</span>
                  </div>
                </div>

                <div className="room-pricing-horizontal">
                  {room.originalPrice && (
                    <div className="original-price">
                      VND {formatPrice(room.originalPrice)}
                    </div>
                  )}
                  <div className="current-price">
                    VND {formatPrice(room.price)}
                  </div>
                  {hasSearched && nights > 0 && (
                    <div className="price-note">
                      Cost for {nights} night{nights > 1 ? 's' : ''}, {formData.guests} guests
                    </div>
                  )}
                  {!hasSearched && (
                    <div className="price-note">per night</div>
                  )}

                  <button
                    className={`select-btn-horizontal ${selectedRoom === room.id ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRoom(room.id);
                    }}
                  >
                    {selectedRoom === room.id ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>

              {selectedRoom === room.id && (
                <div className="selected-indicator">
                  <div className="check-icon">✓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Room Summary */}
      {selectedRoom && (
        <div className="selected-summary">
          <div className="summary-content">
            <h4>Selected Room:</h4>
            <p>{displayRooms.find(r => r.id === selectedRoom)?.name}</p>
            {hasSearched && nights > 0 && (
              <p className="total-price">
                Total: VND {formatPrice(displayRooms.find(r => r.id === selectedRoom)?.price! * nights)}
              </p>
            )}
          </div>
          <button className="book-now-btn">Book Now</button>
        </div>
      )}
    </div>
  );
};


export default Booking;