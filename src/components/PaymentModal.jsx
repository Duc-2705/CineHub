import { useState, useEffect, useRef } from 'react';

export default function PaymentModal({ isOpen, onClose, plan, onSubmit }) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-focus on open
      setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
      }, 100);
    } else {
      // Reset state on close
      setName('');
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    await onSubmit();
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-surface-container-high w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden scale-100 animate-fade-in-up">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-white">Payment Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mb-6">You are subscribing to the <span className="font-bold text-white">{plan?.name}</span>.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Cardholder Name</label>
              <input 
                ref={nameInputRef}
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                className="w-full bg-surface-container px-4 py-3 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Card Number</label>
              <input 
                type="text" 
                required 
                maxLength="19"
                value={cardNumber}
                onChange={handleCardChange}
                disabled={isProcessing}
                className="w-full bg-surface-container px-4 py-3 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Expiry Date</label>
                <input 
                  type="text" 
                  required 
                  maxLength="5"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  disabled={isProcessing}
                  className="w-full bg-surface-container px-4 py-3 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">CVV</label>
                <input 
                  type="text" 
                  required 
                  maxLength="4"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  disabled={isProcessing}
                  className="w-full bg-surface-container px-4 py-3 rounded-lg border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
                  placeholder="123"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}} />
    </div>
  );
}
