import React, { useState } from 'react';
import './Contact.css';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactProps {
  className?: string;
}

const contactAPI = {
  create: async (data: { firstName: string; lastName: string; email: string; message: string }) => {
    const response = await fetch('http://localhost:8080/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Có lỗi xảy ra khi gửi liên hệ');
    }

    return response.json();
  }
};

const Contact: React.FC<ContactProps> = ({ className }) => {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Tên là bắt buộc';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Họ là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail không hợp lệ';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Tin nhắn là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (apiError) {
      setApiError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const apiData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      };

      await contactAPI.create(apiData);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });

      setSubmitStatus('success');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setApiError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi liên hệ');

      setTimeout(() => {
        setSubmitStatus('idle');
        setApiError('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-wrapper ${className || ''}`}>
      <div className="contact-container">

        <div className="contact-header">
          <h2>Liên hệ với chúng tôi</h2>
          <p>Gửi thông tin để chúng tôi hỗ trợ bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lastName">Họ <span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Nhập họ"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Tên <span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Nhập tên"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="example@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+84 xxx xxx xxx"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Tin nhắn <span className="required">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Nhập tin nhắn của bạn..."
              rows={5}
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          {submitStatus === 'success' && (
            <div className="message success">
              ✓ Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="message error">
              ✗ {apiError || 'Có lỗi xảy ra. Vui lòng thử lại.'}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;