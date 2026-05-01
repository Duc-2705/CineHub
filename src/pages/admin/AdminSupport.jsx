import { useState, useEffect } from 'react';
import { getSupportMessages, saveSupportMessages, addNotification } from '../../utils/dataStore';

export default function AdminSupport() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    setMessages(getSupportMessages().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const handleReply = (e) => {
    e.preventDefault();
    const replyText = new FormData(e.target).get('replyText');
    
    const updatedMessages = messages.map(m => {
      if (m.id === selectedMessage.id) {
        // Only trigger notification if it's the first time replying
        if (m.status === 'pending') {
          addNotification({
            userId: m.userId,
            supportId: m.id,
            type: 'support_reply',
            message: 'Admin replied to your support request'
          });
        }
        
        return {
          ...m,
          status: 'replied',
          reply: replyText,
          repliedAt: new Date().toISOString()
        };
      }
      return m;
    });

    setMessages(updatedMessages);
    saveSupportMessages(updatedMessages);
    setSelectedMessage(updatedMessages.find(m => m.id === selectedMessage.id));
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="font-headline-lg text-white mb-8">Support Requests</h1>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 min-h-0">
        {/* Messages List */}
        <div className="md:col-span-5 bg-surface-container-low rounded-xl border border-white/5 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No support messages yet.</div>
          ) : (
            messages.map(msg => (
              <button 
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full text-left p-6 border-b border-white/5 transition-colors ${selectedMessage?.id === msg.id ? 'bg-surface-container-high border-l-4 border-l-red-600' : 'hover:bg-white/5 border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white truncate pr-4">{msg.userName || `${msg.firstName} ${msg.lastName}`}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap ${msg.status === 'pending' ? 'bg-orange-600/20 text-orange-500' : 'bg-green-600/20 text-green-500'}`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{msg.message}</p>
                <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </button>
            ))
          )}
        </div>

        {/* Message Detail & Reply */}
        <div className="md:col-span-7 bg-surface-container-low rounded-xl border border-white/5 p-8 overflow-y-auto flex flex-col">
          {selectedMessage ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedMessage.userName || `${selectedMessage.firstName} ${selectedMessage.lastName}`}</h2>
                    <p className="text-gray-400">{selectedMessage.email} • {selectedMessage.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-surface-container p-6 rounded-lg border border-white/5 mb-8">
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                {selectedMessage.status === 'replied' ? (
                  <div className="bg-surface-container-high p-6 rounded-lg border border-white/10 border-l-4 border-l-red-600">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-600 text-sm">support_agent</span> 
                        Admin Reply
                      </h3>
                      <span className="text-xs text-gray-500">{new Date(selectedMessage.repliedAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.reply}</p>
                  </div>
                ) : (
                  <form onSubmit={handleReply} className="flex flex-col gap-4">
                    <h3 className="font-bold text-white">Reply to User</h3>
                    <textarea 
                      required 
                      name="replyText" 
                      rows="5" 
                      placeholder="Type your reply here..."
                      className="w-full bg-surface border border-white/10 rounded-lg p-4 text-white focus:ring-1 focus:ring-red-600 outline-none resize-none"
                    ></textarea>
                    <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 self-start">Send Reply</button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">forum</span>
              <p>Select a message to view details and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
