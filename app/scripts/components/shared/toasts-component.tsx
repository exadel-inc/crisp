import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastComponent = () => <ToastContainer 
  position="top-center"
  autoClose={3000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
/>;

export const showToast = (message: string, color?: string, options?: any) => {
  toast(message, {
    ...options,
    className: color ? `bg-${color} text-white` : '',
  });
};

export const dismissAllToasts = () =>  toast.dismiss();
