import React, { useState } from 'react';
import { Review } from '../types/cinema';

interface CommentsModalProps {
  review: Review;
  onClose: () => void;
}

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  badge?: string;
  content: string;
  time: string;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ review, onClose }) => {
  const [commentList, setCommentList] = useState<CommentItem[]>([
    {
      id: 'c-1',
      author: 'Julian Thorne',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm_5JdHLKI9a6tjuwVHmjX3HozB9Vz9Qx9gS8Q1v1GGGkD3dKY4t_QsWU0kUR4alf1_z7Dq70yfmxyPFlAZQ0JkwvAvfV5G1GZ8pLIUwKmGyBJy6rabnqAjpaickmtxlDhE68Cei665h5rNFTC2HdEAqUkdTat9m3Tr9OwjNT-piJ9hs23y_IyiXEp--mXjZM_VuhCxVop2rnhdvNvCu39VfR6k-0NpfLH8nBnCSNOkzgE3sQcMFg1cA',
      badge: 'Cinephile',
      content: 'Completely agree with this assessment. The visual framing of Hae Sung waiting on the street corner spoke volumes without a single word of exposition.',
      time: '1 day ago',
    },
    {
      id: 'c-2',
      author: 'Claire Dufresne',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXt6iys2Xv23BtgF6oen9zdQ2NYT4hwxA7iXCtAhX93l1hGo6EQBANLJOkThCnMWgn2PwwuDLpb6aGIDgIc0JLP72TzL7cpQmdfjsVovxhBB0RGyRnnD9KI4xG8hGqw-W4FdKSi2vlpwjAoGETJnuw3hfZF_x0vKqI5faGhCYEj4N8NNLmNtTJfLencmEyfLLLOQzuvdukxtWoSneqaHLG3UQwXqLfq6nMOBuuOkVd-UwAeAIn4Qfy_A',
      badge: 'Verified Critic',
      content: 'The soundscape during the bar scene in the final act where Arthur sits quietly while Nora and Hae Sung converse in Korean is masterfully subtle.',
      time: '18 hours ago',
    },
  ]);
  const [newText, setNewText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: 'Marcus Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg3_FufF0y0hJcrYoBeJhy2ztNDpZEHYgyAD351iNRlCpQI1KHzAeLPO8v0tMY-M2ezKfIcWi1vMljQkVB1gQ8Kuv5AG2f3Y_9sDaygclsyPTLd9rrSwTnGpCLPxKEBUkvXx2rCeTHvjDmne06osu9jGKNAYmHosPXnaJN9fs62Nulw9c_bTU-Jfdr5ZR8zvkemKCYMYQ0Rdyj6s1OCyZ1RB3JCDpzjfpnnOeK0fyANXq682YNG4HCNg',
      badge: 'PRO Cinephile',
      content: newText,
      time: 'Just now',
    };

    setCommentList([newComment, ...commentList]);
    setNewText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-left max-h-[85vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c5c5d5] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        <div className="pb-3 border-b border-[#2a2a2c] mb-4">
          <div className="text-[10px] font-semibold text-[#ffb4aa] uppercase tracking-wider">
            Discussion &amp; Debates
          </div>
          <h3 className="font-serif text-lg font-bold text-white">
            Responses to {review.authorName}’s Review
          </h3>
          <p className="text-xs text-[#c5c5d5] truncate">
            {review.movieTitle} ({review.movieYear})
          </p>
        </div>

        {/* Input for new comment */}
        <form onSubmit={handleAddComment} className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Join the debate as Marcus Vance..."
              className="w-full bg-[#131315] text-[#e5e1e4] text-xs pl-3 pr-16 py-2.5 rounded-lg border border-[#2a2a2c] focus:border-[#e50914] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!newText.trim()}
              className="absolute right-1.5 top-1.5 px-3 py-1 bg-[#e50914] text-white text-[11px] font-semibold rounded hover:bg-[#c0000c] disabled:opacity-40 transition-colors"
            >
              Post
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {commentList.map((item) => (
            <div key={item.id} className="p-3 bg-[#131315] rounded-xl border border-[#2a2a2c]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <span className="text-xs font-semibold text-white">{item.author}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#201f21] text-[#ffb4aa] font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#70717f]">{item.time}</span>
              </div>
              <p className="text-xs text-[#e9bcb6] leading-relaxed pl-8">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
