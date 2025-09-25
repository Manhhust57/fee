import React, { useState, useEffect, useCallback, useRef } from "react";
import "./RoomCard.css";
import {
  FaUser,
  FaBed,
  FaChild,
  FaRulerCombined,
  FaTag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { vi } from "date-fns/locale/vi";

registerLocale("vi", vi);

const RoomCard1 = () => {
  const [quantity, setQuantity] = useState(1);
  const [dateRanges, setDateRanges] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookedDatesByRoom, setBookedDatesByRoom] = useState({});
  const [loadingBookedDates, setLoadingBookedDates] = useState(false);

  // Ảnh phòng & chỉ số ảnh hiện tại
  const [roomImages, setRoomImages] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const intervalsRef = useRef({});

  const navigate = useNavigate();
  const location = useLocation();

  // === Lấy tên căn hộ từ URL ===
  const pathParts = location.pathname.split("/");
  const apartmentName = decodeURIComponent(pathParts[pathParts.length - 1]);
  console.log("Tên căn hộ từ URL:", apartmentName);

  // === Fetch danh sách phòng, ngày đã book, ảnh phòng ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentResponse = await fetch(
          `https://anstay.com.vn/api/apartments/search?name=${apartmentName}`
        );
        const apartmentData = await apartmentResponse.json();
        if (apartmentData && apartmentData.length > 0) {
          const apartmentId = apartmentData[0].id;
          // Lấy danh sách phòng
          const roomsResponse = await fetch(
            `https://anstay.com.vn/api/rooms/apartment/${apartmentId}`
          );
          const roomsData = await roomsResponse.json();
          setRooms(roomsData);

          // Lấy ngày đã book cho từng phòng
          setLoadingBookedDates(true);
          const newBookedDates = {};
          for (const room of roomsData) {
            const res = await fetch(
              `https://anstay.com.vn/api/apartment-bookings/by-room?roomId=${room.id}`
            );
            const bookings = await res.json();
            const validStatuses = ["HOLD", "CONFIRMED", "PENDING"];
            const periods = bookings
              .filter((b) => validStatuses.includes(b.status))
              .map((b) => ({
                start: new Date(b.checkIn),
                end: new Date(b.checkOut),
              }));
            newBookedDates[room.id] = periods;
          }
          setBookedDatesByRoom(newBookedDates);
          setLoadingBookedDates(false);

          // Lấy ảnh từng phòng
          const imagesData = {};
          for (const room of roomsData) {
            try {
              const imgRes = await fetch(
                `https://anstay.com.vn/api/room-images/room/${room.id}`
              );
              const imgJson = await imgRes.json();
              const imgs =
                Array.isArray(imgJson) && typeof imgJson[0] === "string"
                  ? imgJson
                  : imgJson.map(
                      (img) => img.url || img.imageUrl || img.path || ""
                    );
              imagesData[room.id] =
                imgs && imgs.length > 0
                  ? imgs
                  : ["https://placeholder.com/300x200"];
            } catch {
              imagesData[room.id] = ["https://placeholder.com/300x200"];
            }
          }
          setRoomImages(imagesData);

          // Khởi tạo index cho từng phòng
          const imageIndexes = {};
          roomsData.forEach((r) => (imageIndexes[r.id] = 0));
          setCurrentImageIndex(imageIndexes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingBookedDates(false);
      }
    };

    if (apartmentName) {
      fetchData();
    }
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, [apartmentName]);

  // === Chuyển ảnh tự động 2s/lần ===
  useEffect(() => {
    Object.values(intervalsRef.current).forEach(clearInterval);
    rooms.forEach((room) => {
      if (roomImages[room.id] && roomImages[room.id].length > 1) {
        intervalsRef.current[room.id] = setInterval(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [room.id]:
              prev[room.id] + 1 < roomImages[room.id].length
                ? prev[room.id] + 1
                : 0,
          }));
        }, 2000);
      }
    });
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, [rooms, roomImages]);

  // Chuyển ảnh thủ công
  const handlePrevImage = (roomId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]:
        prev[roomId] > 0
          ? prev[roomId] - 1
          : (roomImages[roomId]?.length || 1) - 1,
    }));
  };
  const handleNextImage = (roomId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]:
        prev[roomId] + 1 < (roomImages[roomId]?.length || 1)
          ? prev[roomId] + 1
          : 0,
    }));
  };

  // Các hàm phụ trợ
  const getExcludedDates = useCallback(
    (roomId) => {
      const periods = bookedDatesByRoom[roomId] || [];
      const dates = [];
      periods.forEach(({ start, end }) => {
        let current = new Date(start);
        while (current <= end) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });
      return dates;
    },
    [bookedDatesByRoom]
  );
  const getNightCount = (roomId) => {
    const range = dateRanges[roomId];
    if (range && range.startDate && range.endDate) {
      const diff =
        (range.endDate.getTime() - range.startDate.getTime()) /
        (1000 * 60 * 60 * 24);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };
  const handleDateChange = (roomId, dates) => {
    const [start, end] = dates;
    if (start && end) {
      if (start >= end) {
        alert("Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày.");
        setDateRanges((prev) => ({
          ...prev,
          [roomId]: { startDate: start, endDate: null },
        }));
        return;
      }
    }
    setDateRanges((prev) => ({
      ...prev,
      [roomId]: { startDate: start, endDate: end },
    }));
  };
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  const filterDate = (roomId, date) => {
    const periods = bookedDatesByRoom[roomId] || [];
    for (const period of periods) {
      let current = new Date(period.start);
      while (current <= period.end) {
        if (isSameDay(current, date)) return false;
        current.setDate(current.getDate() + 1);
      }
    }
    return true;
  };
  const pad = (num) => String(num).padStart(2, "0");
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  };

  // ==== UI Render ====
  return (
    <>
      {rooms.map((room) => {
        const price = Number(room.price) || 0;
        const discount = Number(room.discount) || 0;
        const range = dateRanges[room.id] || { startDate: null, endDate: null };
        const totalNights = getNightCount(room.id);
        const pricePerNight = Math.round(price * (1 - discount / 100));
        const totalOriginal = price * totalNights * quantity;
        const totalDiscounted = pricePerNight * totalNights * quantity;
        const amountSaved = totalOriginal - totalDiscounted;

        const images = roomImages[room.id] || [
          "https://placeholder.com/300x200",
        ];
        const imgIdx = currentImageIndex[room.id] ?? 0;

        return (
          <div className="room-card" key={room.id}>
            <div className="name-card">
              <h3 className="room-title">{room.name}</h3>
            </div>
            <div className="body-card">
              <div className="room-info">
                <div className="room-image" style={{ position: "relative" }}>
                  <img
                    src={images[imgIdx]}
                    alt={room.name}
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      transition: "all 0.5s",
                    }}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        style={{
                          position: "absolute",
                          left: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "#fff9",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          zIndex: 1,
                          padding: "2px 5px",
                        }}
                        onClick={() => handlePrevImage(room.id)}
                        type="button"
                      >
                        <FaChevronLeft size={18} />
                      </button>
                      <button
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "#fff9",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          zIndex: 1,
                          padding: "2px 5px",
                        }}
                        onClick={() => handleNextImage(room.id)}
                        type="button"
                      >
                        <FaChevronRight size={18} />
                      </button>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          right: 18,
                          background: "#000a",
                          color: "#fff",
                          borderRadius: 12,
                          fontSize: 13,
                          padding: "1px 8px",
                        }}
                      >
                        {imgIdx + 1}/{images.length}
                      </div>
                    </>
                  )}
                </div>
                <div className="room-details">
                  <div className="room-icons">
                    <span>
                      <FaUser /> x {room.maxAdults}
                    </span>
                    <span>
                      <FaBed /> x {room.maxRooms}
                    </span>
                    <span>
                      <FaChild /> x {room.maxChildren}
                    </span>
                  </div>
                  <div className="room-size">
                    <FaRulerCombined /> {room.capacity} m²
                  </div>
                </div>
              </div>
              <div className="room-pricing">
                <div className="room-icons compact">
                  <div className="discount-tag">
                    <FaTag /> Giảm giá {discount > 0 ? discount : 0}%
                  </div>
                  <div>
                    <span>
                      <FaUser /> x {room.maxAdults}
                    </span>
                    <span>
                      <FaBed /> x {room.maxRooms}
                    </span>
                    <span>
                      <FaChild /> x {room.maxChildren}
                    </span>
                  </div>
                </div>
                <div className="room-policy">
                  <strong>Chính sách thanh toán và hủy bỏ:</strong>
                  <ul>
                    <li>Thanh toán khi nhận phòng</li>
                    <li>Hủy phòng trước 24h</li>
                  </ul>
                </div>
                <div className="room-promotions">
                  <div className="badge purple">
                    <FaTag /> Giảm giá {discount > 0 ? discount : 0}% cho đặt
                    phòng sớm
                  </div>
                </div>
              </div>

              <div className="room-actions">
                <div className="date-picker-container">
                  <div className="night-info">
                    <p>
                      Giá mỗi đêm:{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        {price.toLocaleString("vi-VN")} VND
                      </span>{" "}
                      →{" "}
                      <span style={{ color: "#e60023", fontWeight: "bold" }}>
                        {pricePerNight.toLocaleString("vi-VN")} VND
                      </span>
                    </p>
                    {range.startDate && range.endDate && (
                      <>
                        <p>Số đêm: {totalNights}</p>
                        <p>
                          Tổng giá:{" "}
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                            }}
                          >
                            {totalOriginal.toLocaleString("vi-VN")} VND
                          </span>{" "}
                          →{" "}
                          <span
                            style={{ color: "#e60023", fontWeight: "bold" }}
                          >
                            {totalDiscounted.toLocaleString("vi-VN")} VND
                          </span>
                        </p>
                        <p>
                          Tiết kiệm:{" "}
                          <span style={{ color: "green", fontWeight: 600 }}>
                            {amountSaved.toLocaleString("vi-VN")} VND (
                            {discount}
                            %)
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  <label>Chọn ngày:</label>
                  <DatePicker
                    selectsRange
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onChange={(dates) => handleDateChange(room.id, dates)}
                    locale="vi"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn khoảng ngày"
                    filterDate={(date) => filterDate(room.id, date)}
                    minDate={new Date()}
                    className="date-input"
                    isClearable
                  />
                  {loadingBookedDates && (
                    <div
                      style={{ fontSize: 12, color: "#e60023", marginTop: 4 }}
                    >
                      Đang tải lịch phòng...
                    </div>
                  )}
                </div>

                <div className="btns">
                  <button
                    className="btn-select"
                    onClick={() => {
                      if (range.startDate && range.endDate) {
                        if (range.startDate >= range.endDate) {
                          alert(
                            "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                          );
                          return;
                        }
                        setSelectedRoomId(room.id);
                      } else {
                        alert(
                          "Vui lòng chọn ngày đến và đi trước khi chọn phòng"
                        );
                      }
                    }}
                  >
                    <strong>LỰA CHỌN</strong>
                  </button>
                  <button
                    className="btn-book"
                    onClick={() => {
                      if (range.startDate && range.endDate) {
                        if (range.startDate >= range.endDate) {
                          alert(
                            "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                          );
                          return;
                        }
                        const params = new URLSearchParams({
                          id: room.id.toString(),
                          roomName: room.name,
                          startDate: formatDate(range.startDate),
                          endDate: formatDate(range.endDate),
                          quantity: quantity.toString(),
                          totalDiscounted: totalDiscounted.toString(),
                          maxRooms: room.maxRooms.toString(),
                          maxAdults: room.maxAdults.toString(),
                          maxChildren: room.maxChildren.toString(),
                          capacity: room.capacity.toString(),
                          pricePerNight: pricePerNight.toString(),
                          priceOriginalPerNight: price.toString(),
                          discountPercent: discount.toString(),
                          totalNights: totalNights.toString(),
                          totalOriginal: totalOriginal.toString(),
                          amountSaved: amountSaved.toString(),
                          location: apartmentName, // TRUYỀN ĐÚNG TÊN CĂN HỘ
                        });
                        navigate(`/booking-page?${params.toString()}`);
                      } else {
                        alert("Vui lòng chọn ngày trước khi đặt phòng");
                      }
                    }}
                  >
                    <strong>ĐẶT NGAY</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {selectedRoomId !== null && (
        <div className="bottom-bar">
          <div className="bottom-bar-info">
            🛒 Lựa chọn của bạn bao gồm:{" "}
            <strong>
              {quantity} Room{quantity > 1 ? "s" : ""},{" "}
              {getNightCount(selectedRoomId)} Night
              {getNightCount(selectedRoomId) > 1 ? "s" : ""}
            </strong>
          </div>
          <div className="bottom-bar-price">
            <strong>
              {rooms.length > 0 && dateRanges[selectedRoomId]
                ? Math.round(
                    Number(
                      rooms.find((r) => r.id === selectedRoomId)?.price || 0
                    ) *
                      (1 -
                        (Number(
                          rooms.find((r) => r.id === selectedRoomId)?.discount
                        ) || 0) /
                          100) *
                      getNightCount(selectedRoomId) *
                      quantity
                  ).toLocaleString("vi-VN")
                : 0}{" "}
              VND
            </strong>
            <button
              className="btn-book-now"
              onClick={() => {
                if (selectedRoomId !== null) {
                  const room = rooms.find((r) => r.id === selectedRoomId);
                  const range = dateRanges[selectedRoomId];
                  if (room && range && range.startDate && range.endDate) {
                    if (range.startDate >= range.endDate) {
                      alert(
                        "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                      );
                      return;
                    }
                    const price = Number(room.price) || 0;
                    const discount = Number(room.discount) || 0;
                    const pricePerNight = Math.round(
                      price * (1 - discount / 100)
                    );
                    const totalNights = getNightCount(selectedRoomId);
                    const totalOriginal = price * totalNights * quantity;
                    const totalDiscounted =
                      pricePerNight * totalNights * quantity;
                    const amountSaved = totalOriginal - totalDiscounted;

                    const params = new URLSearchParams({
                      id: room.id.toString(),
                      roomName: room.name,
                      startDate: formatDate(range.startDate),
                      endDate: formatDate(range.endDate),
                      quantity: quantity.toString(),
                      totalDiscounted: totalDiscounted.toString(),
                      maxRooms: room.maxRooms.toString(),
                      maxAdults: room.maxAdults.toString(),
                      maxChildren: room.maxChildren.toString(),
                      capacity: room.capacity.toString(),
                      pricePerNight: pricePerNight.toString(),
                      priceOriginalPerNight: price.toString(),
                      discountPercent: discount.toString(),
                      totalNights: totalNights.toString(),
                      totalOriginal: totalOriginal.toString(),
                      amountSaved: amountSaved.toString(),
                      location: apartmentName, // Đúng tên căn hộ
                    });
                    navigate(`/booking-page?${params.toString()}`);
                  } else {
                    alert("Vui lòng chọn ngày trước khi đặt phòng");
                  }
                }
              }}
            >
              ĐẶT NGAY
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard1;
