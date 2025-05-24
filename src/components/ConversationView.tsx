
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Smile, Bot, User, Clock, Star, MoreHorizontal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const conversations = [
  { id: 1, customer: 'Emma Thompson', status: 'open', priority: 'high', lastMessage: '2 min ago', unread: 3 },
  { id: 2, customer: 'David Chen', status: 'pending', priority: 'medium', lastMessage: '15 min ago', unread: 1 },
  { id: 3, customer: 'Sarah Wilson', status: 'resolved', priority: 'low', lastMessage: '1 hour ago', unread: 0 },
  { id: 4, customer: 'John Martinez', status: 'open', priority: 'high', lastMessage: '5 min ago', unread: 2 },
];

const messages = [
  { id: 1, sender: 'Emma Thompson', type: 'customer', content: 'Hi, I\'m having trouble with my subscription payment. It keeps getting declined even though my card is valid.', time: '10:30 AM', avatar: 'ET' },
  { id: 2, sender: 'AI Assistant', type: 'ai', content: 'I can help you with payment issues. Let me check your account and payment methods.', time: '10:31 AM', avatar: 'AI' },
  { id: 3, sender: 'Sarah Chen', type: 'agent', content: 'Hello Emma! I\'ve reviewed your account and I can see the payment issue. It looks like your card was flagged by our fraud detection system. Let me resolve this for you right away.', time: '10:32 AM', avatar: 'SC' },
  { id: 4, sender: 'Emma Thompson', type: 'customer', content: 'Thank you so much! That would be great. How long will it take to fix?', time: '10:33 AM', avatar: 'ET' },
];

const aiSuggestions = [
  'Thank you for contacting us. I understand your frustration with the payment issue.',
  'I\'ve escalated this to our billing team and you should receive an update within 24 hours.',
  'Is there anything else I can help you with today?'
];

export const ConversationView = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState('');
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Conversation List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Zap className="w-4 h-4 mr-2" />
              AI Assist
            </Button>
          </div>
          <Input placeholder="Search conversations..." className="w-full" />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={cn(
                "p-4 border-b border-gray-100 cursor-pointer transition-colors",
                selectedConversation === conv.id ? "bg-green-50 border-l-4 border-l-green-500" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {conv.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{conv.customer}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={conv.priority === 'high' ? 'destructive' : conv.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                        {conv.priority}
                      </Badge>
                      <Badge variant={conv.status === 'open' ? 'destructive' : conv.status === 'pending' ? 'default' : 'secondary'} className="text-xs">
                        {conv.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-red-500 text-white">{conv.unread}</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">Payment issue with subscription</p>
              <p className="text-xs text-gray-500 mt-1">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                ET
              </div>
              <div>
                <h3 className="font-semibold">Emma Thompson</h3>
                <p className="text-sm text-gray-500">Customer • emma@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.type === 'customer' ? "justify-start" : "justify-end")}>
              <div className={cn("flex space-x-3 max-w-[70%]", msg.type === 'customer' ? "flex-row" : "flex-row-reverse space-x-reverse")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0",
                  msg.type === 'customer' ? "bg-gradient-to-br from-blue-400 to-purple-500" :
                  msg.type === 'ai' ? "bg-gradient-to-br from-green-400 to-emerald-500" :
                  "bg-gradient-to-br from-orange-400 to-red-500"
                )}>
                  {msg.type === 'ai' ? <Bot className="w-4 h-4" /> : msg.avatar}
                </div>
                <div className={cn("rounded-lg p-3", 
                  msg.type === 'customer' ? "bg-gray-100" : "bg-green-500 text-white"
                )}>
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className={cn("text-xs", msg.type === 'customer' ? "text-gray-500" : "text-green-100")}>
                      {msg.time}
                    </p>
                    {msg.type === 'ai' && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        AI
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        {showAiSuggestions && (
          <div className="bg-blue-50 border-t border-blue-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-blue-900 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                AI Suggestions
              </h4>
              <Button variant="ghost" size="sm" onClick={() => setShowAiSuggestions(false)}>
                ×
              </Button>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="block w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Customer Details</h3>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-lg mx-auto mb-2">
              ET
            </div>
            <h4 className="font-medium">Emma Thompson</h4>
            <p className="text-sm text-gray-500">Premium Customer</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">emma@example.com</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">+1 234 567 8900</p>
            </div>
            <div>
              <p className="text-gray-500">Plan</p>
              <p className="font-medium">Premium</p>
            </div>
            <div>
              <p className="text-gray-500">Since</p>
              <p className="font-medium">Jan 2023</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h5 className="font-medium mb-2">Previous Issues</h5>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-medium">Login Issues</p>
                <p className="text-gray-500">Resolved • 2 days ago</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-medium">Feature Request</p>
                <p className="text-gray-500">Resolved • 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
