// src/components/Alerts/AlertFail.jsx
import React, { useEffect } from "react";

const AlertFail = ({ children, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000); // 5 segundos para fechar automaticamente

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center">
      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-exclamation-triangle" />
        </span>
        <span className="inline-block align-middle mr-8">
          {children}
        </span>
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          onClick={onClose}
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
};

export default AlertFail;
