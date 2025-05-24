
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, Paperclip, Smile, Bot, Clock, Star, MoreHorizontal, Zap, 
  Search, Filter, AlertCircle, Phone, Video, ChevronLeft, ChevronRight,
  User, Mail, Calendar, FileText, CheckCircle, X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const conversations = [
  { id: 1, customer: 'Emma Thompson', status: 'active', priority: 'high', lastMessage: '2 min ago', unread: 3, email: 'emma@example.com', subject: 'Payment issue with subscription' },
  { id: 2, customer: 'David Chen', status: 'waiting', priority: 'medium', lastMessage: '15 min ago', unread: 1, email: 'david@example.com', subject: 'Feature request for mobile app' },
  { id: 3, customer: 'Sarah Wilson', status: 'resolved', priority: 'low', lastMessage: '1 hour ago', unread: 0, email: 'sarah@example.com', subject: 'How to reset password' },
  { id: 4, customer: 'John Martinez', status: 'active', priority: 'high', lastMessage: '5 min ago', unread: 2, email: 'john@example.com', subject: 'Data export not working' },
  { id: 5, customer: 'Alice Johnson', status: 'active', priority: 'medium', lastMessage: '10 min ago', unread: 1, email: 'alice@example.com', subject: 'Billing question' },
];

const messages = [
  { id: 1, sender: 'Emma Thompson', type: 'customer', content: 'Hi, I\'m having trouble with my subscription payment. It keeps getting declined even though my card is valid.', time: '10:30 AM', avatar: 'ET' },
  { id: 2, sender: 'AI Assistant', type: 'ai', content: 'I\'ll help you with your payment issue. Let me check your account.', time: '10:31 AM', avatar: 'AI' },
  { id: 3, sender: 'AI Assistant', type: 'ai', content: 'I see that your card was flagged by our fraud detection system. This can happen sometimes with international transactions.', time: '10:31 AM', avatar: 'AI' },
  { id: 4, sender: 'Emma Thompson', type: 'customer', content: 'That makes sense. I\'m currently traveling abroad. Is there a way to resolve this?', time: '10:33 AM', avatar: 'ET' },
  { id: 5, sender: 'Sarah Chen', type: 'agent', content: 'Hello Emma! I\'m Sarah, taking over from our AI assistant. I\'ve reviewed your account and I can resolve this payment issue for you right away. I\'ll need to whitelist your card in our system.', time: '10:35 AM', avatar: 'SC' },
  { id: 6, sender: 'Emma Thompson', type: 'customer', content: 'Thank you so much Sarah! That would be great. How long will it take to fix?', time: '10:36 AM', avatar: 'ET' },
];

const aiSuggestions = [
  'I\'ve marked your card as safe for international use. Your payment should work now.',
  'If you\'re still having trouble, we can try an alternative payment method.',
  'Is there anything else I can help you with today?'
];

export const ConversationView = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState('');
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [showCustomerDetails, setShowCustomerDetails] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // On mobile, hide sidebar/details by default
      if (isMobileView) {
        setShowConversationList(false);
        setShowCustomerDetails(false);
      } else {
        setShowConversationList(true);
        setShowCustomerDetails(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleConversationList = () => {
    setShowConversationList(!showConversationList);
    if (isMobile && !showConversationList) {
      setShowCustomerDetails(false);
    }
  };

  const toggleCustomerDetails = () => {
    setShowCustomerDetails(!showCustomerDetails);
    if (isMobile && !showCustomerDetails) {
      setShowConversationList(false);
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCustomer = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Conversation List */}
      {showConversationList && (
        <div className={`${isMobile ? 'fixed inset-0 z-30 bg-white' : 'w-1/4'} border-r border-gray-200 flex flex-col bg-white`}>
          <div className="p-4 border-b border-gray-200">
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleConversationList}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Inbox</h2>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Zap className="w-4 h-4 mr-2" />
                AI Assist
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search conversations..." 
                className="w-full pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="all" className="p-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="assigned" className="text-xs">Assigned</TabsTrigger>
                <TabsTrigger value="unassigned" className="text-xs">Unassigned</TabsTrigger>
              </TabsList>
              <div className="flex justify-between items-center my-4">
                <p className="text-sm text-gray-500">{filteredConversations.length} conversations</p>
                <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv.id);
                    if (isMobile) {
                      setShowConversationList(false);
                    }
                  }}
                  className={cn(
                    "p-4 border-b border-gray-100 cursor-pointer transition-colors",
                    selectedConversation === conv.id 
                      ? "bg-green-50 border-l-2 border-l-green-500" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {conv.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{conv.customer}</p>
                          {conv.unread > 0 && (
                            <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={conv.priority === 'high' ? 'destructive' : conv.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                            {conv.priority}
                          </Badge>
                          <Badge variant={conv.status === 'active' ? 'default' : conv.status === 'waiting' ? 'secondary' : 'outline'} className="text-xs">
                            {conv.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-green-500 text-white">{conv.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{conv.subject}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">{conv.lastMessage}</p>
                  </div>
                </div>
              ))}
            </Tabs>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              {isMobile && !showConversationList && (
                <Button variant="ghost" size="icon" onClick={toggleConversationList} className="mr-2">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                ET
              </div>
              <div>
                <h3 className="font-semibold">Emma Thompson</h3>
                <p className="text-sm text-gray-500">Payment issue with subscription</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Video className="w-4 h-4 mr-1" />
                  Video
                </Button>
              </div>
              {isMobile ? (
                <Button variant="ghost" size="icon" onClick={toggleCustomerDetails}>
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant="outline" size="icon" onClick={toggleCustomerDetails}>
                  {showCustomerDetails ? <ChevronRight className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.type === 'customer' ? "justify-start" : "justify-end")}>
              <div className={cn("flex space-x-3 max-w-[80%] md:max-w-[70%]", msg.type === 'customer' ? "flex-row" : "flex-row-reverse space-x-reverse")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0",
                  msg.type === 'customer' ? "bg-gradient-to-br from-blue-400 to-purple-500" :
                  msg.type === 'ai' ? "bg-gradient-to-br from-green-400 to-emerald-500" :
                  "bg-gradient-to-br from-orange-400 to-red-500"
                )}>
                  {msg.type === 'ai' ? <Bot className="w-4 h-4" /> : msg.avatar}
                </div>
                <div className={cn("rounded-xl p-4 shadow-sm", 
                  msg.type === 'customer' ? "bg-white" : 
                  msg.type === 'ai' ? "bg-green-100" : "bg-blue-100"
                )}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{msg.sender}</span>
                    {msg.type === 'ai' && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">AI</Badge>
                    )}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-end mt-1">
                    <p className="text-xs text-gray-500">{msg.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* AI Suggestions */}
        {showAiSuggestions && (
          <div className="bg-blue-50 border-t border-blue-200 p-4 z-10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-blue-900 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                AI Suggestions
              </h4>
              <Button variant="ghost" size="sm" onClick={() => setShowAiSuggestions(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="block w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors text-sm shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="resize-none border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <div>Press Enter to send, Shift+Enter for new line</div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Emma is online</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="icon" className="bg-green-600 hover:bg-green-700 h-9 w-9">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info Sidebar */}
      {showCustomerDetails && (
        <div className={`${isMobile ? 'fixed inset-0 z-30 bg-white' : 'w-1/4'} bg-white border-l border-gray-200 overflow-y-auto`}>
          {isMobile && (
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Customer Details</h3>
                <Button variant="ghost" size="icon" onClick={toggleCustomerDetails}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="p-4 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-lg mx-auto mb-2">
                ET
              </div>
              <h4 className="font-medium text-lg">Emma Thompson</h4>
              <p className="text-sm text-gray-500">Premium Customer</p>
              <div className="flex justify-center space-x-2 mt-2">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  Meeting
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h5 className="font-medium text-sm text-gray-700">Contact Information</h5>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs mb-1">Email</p>
                  <p className="font-medium">emma@example.com</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs mb-1">Phone</p>
                  <p className="font-medium">+1 234 567 8900</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs mb-1">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-sm text-gray-700">Customer Details</h5>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Plan</p>
                  <p className="font-medium">Premium</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Since</p>
                  <p className="font-medium">Jan 2023</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Value</p>
                  <p className="font-medium">$3,240</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Status</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-sm text-gray-700">Previous Issues</h5>
                <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                  View all
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <p className="font-medium">Login Issues</p>
                    <Badge variant="outline" className="text-xs bg-gray-100">Resolved</Badge>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <p className="font-medium">Feature Request</p>
                    <Badge variant="outline" className="text-xs bg-gray-100">Resolved</Badge>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h5 className="font-medium text-sm text-gray-700">Notes</h5>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">Premium customer with multiple accounts. Very responsive and understanding.</p>
                <p className="text-xs text-gray-500 mt-1">Added by Sarah Chen - May 15</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
