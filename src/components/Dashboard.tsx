
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, TrendingUp, Clock, ArrowUp, ArrowDown, Zap, CheckCircle, Filter, RefreshCw, ChevronDown, MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

const conversationData = [
  { time: 'Mon', messages: 45, resolved: 38 },
  { time: 'Tue', messages: 52, resolved: 41 },
  { time: 'Wed', messages: 68, resolved: 52 },
  { time: 'Thu', messages: 55, resolved: 42 },
  { time: 'Fri', messages: 78, resolved: 65 },
  { time: 'Sat', messages: 42, resolved: 35 },
  { time: 'Sun', messages: 35, resolved: 30 },
];

const channelData = [
  { name: 'Chat', value: 55 },
  { name: 'Email', value: 30 },
  { name: 'Social', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const teamPerformance = [
  { name: 'Sarah Chen', conversations: 45, rating: 4.9, responseTime: '1m 42s', resolutionRate: '93%' },
  { name: 'Mike Johnson', conversations: 38, rating: 4.8, responseTime: '2m 15s', resolutionRate: '89%' },
  { name: 'Lisa Wang', conversations: 42, rating: 4.7, responseTime: '1m 58s', resolutionRate: '91%' },
  { name: 'Alex Rodriguez', conversations: 35, rating: 4.6, responseTime: '3m 05s', resolutionRate: '87%' },
];

const recentConversations = [
  { id: 1, customer: 'Emma Thompson', status: 'active', priority: 'high', lastMessage: '2 min ago', subject: 'Payment issue with subscription', unread: true },
  { id: 2, customer: 'David Chen', status: 'waiting', priority: 'medium', lastMessage: '15 min ago', subject: 'Feature request for mobile app', unread: false },
  { id: 3, customer: 'Sarah Wilson', status: 'resolved', priority: 'low', lastMessage: '1 hour ago', subject: 'How to reset password', unread: false },
  { id: 4, customer: 'John Martinez', status: 'active', priority: 'high', lastMessage: '5 min ago', subject: 'Data export not working', unread: true },
];

export const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)] pb-20 md:pb-6 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Refresh</span>
          </Button>
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto justify-start bg-transparent p-0 space-x-4">
          <TabsTrigger 
            value="overview" 
            className={`px-1 py-2 text-sm font-medium border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 rounded-none ${
              activeTab === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'
            }`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="conversations" 
            className={`px-1 py-2 text-sm font-medium border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 rounded-none ${
              activeTab === 'conversations' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'
            }`}
          >
            Conversations
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className={`px-1 py-2 text-sm font-medium border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 rounded-none ${
              activeTab === 'team' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'
            }`}
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50 hover:bg-green-100">+12%</Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-bold">24</h3>
                  <p className="text-xs md:text-sm text-gray-500">Active Conversations</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50 hover:bg-green-100">-15%</Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-bold">1m 52s</h3>
                  <p className="text-xs md:text-sm text-gray-500">Avg. Response Time</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50 hover:bg-green-100">+0.2</Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-bold">4.8</h3>
                  <p className="text-xs md:text-sm text-gray-500">Customer Satisfaction</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-8 h-8 rounded-md bg-yellow-100 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-yellow-600" />
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50 hover:bg-green-100">+5%</Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-bold">68%</h3>
                  <p className="text-xs md:text-sm text-gray-500">AI Resolution Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations Chart */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Conversation Volume</CardTitle>
                    <CardDescription>Messages received and resolved this week</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <span className="mr-1">This Week</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="time" tickLine={false} axisLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Received" />
                      <Line type="monotone" dataKey="resolved" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Channel Distribution */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Channel Distribution</CardTitle>
                    <CardDescription>Conversations by channel</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <span className="mr-1">This Month</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {channelData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
                      <div className="text-xs">
                        <span className="font-medium">{entry.name}</span>
                        <span className="text-gray-500 ml-1">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Team Performance</CardTitle>
                  <CardDescription>Agent statistics for this week</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamPerformance.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.conversations} conversations</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-right">
                      <div>
                        <p className="font-medium">{agent.rating}⭐</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <div>
                        <p className="font-medium">{agent.responseTime}</p>
                        <p className="text-xs text-gray-500">Response</p>
                      </div>
                      <div>
                        <p className="font-medium">{agent.resolutionRate}</p>
                        <p className="text-xs text-gray-500">Resolution</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Recent Conversations</CardTitle>
                  <CardDescription>Latest customer interactions requiring attention</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentConversations.map((conversation) => (
                  <div key={conversation.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {conversation.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{conversation.customer}</p>
                          {conversation.unread && (
                            <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{conversation.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={conversation.priority === 'high' ? 'destructive' : conversation.priority === 'medium' ? 'default' : 'secondary'}
                        className={
                          conversation.priority === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                          conversation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }
                      >
                        {conversation.priority}
                      </Badge>
                      <Badge 
                        variant={
                          conversation.status === 'active' ? 'default' : 
                          conversation.status === 'waiting' ? 'secondary' : 
                          'outline'
                        }
                        className={
                          conversation.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                          conversation.status === 'waiting' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }
                      >
                        {conversation.status}
                      </Badge>
                      <p className="text-sm text-gray-500 hidden md:block">{conversation.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Team Performance</CardTitle>
                  <CardDescription>Detailed agent statistics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((agent, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-lg">{agent.name}</p>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm font-medium">{agent.rating}</span>
                              <span className="mx-2 text-gray-300">|</span>
                              <span className="text-sm text-gray-600">{agent.conversations} conversations</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Response Time</p>
                          <p className="text-lg font-medium">{agent.responseTime}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Resolution Rate</p>
                          <p className="text-lg font-medium">{agent.resolutionRate}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Active Chats</p>
                          <p className="text-lg font-medium">{Math.floor(agent.conversations * 0.3)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Resolved Today</p>
                          <p className="text-lg font-medium">{Math.floor(agent.conversations * 0.7)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
