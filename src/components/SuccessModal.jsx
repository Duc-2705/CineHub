import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ isOpen, onClose, message, planName }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { onClose(); navigate('/'); }}></div>
      
      <div className="relative bg-surface-container-high w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl p-8 text-center scale-100 animate-success-bounce">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        
        <h2 className="font-headline-md text-white mb-2">{message}</h2>
        <p className="text-gray-400 text-sm mb-8">
          You now have access to the <span className="font-bold text-white">{planName}</span>.
        </p>

        <button 
          onClick={() => { onClose(); navigate('/'); }}
          className="w-full bg-surface-container hover:bg-surface-container-highest text-white font-bold py-3 px-4 rounded-lg transition-colors border border-white/10"
        >
          Continue to Home
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes successBounce {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-success-bounce {
          animation: successBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />
    </div>
  );
}
