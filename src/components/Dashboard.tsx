
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, TrendingUp, Clock, ArrowUp, ArrowDown, Zap, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const conversationData = [
  { time: '00:00', messages: 45, resolved: 38 },
  { time: '04:00', messages: 32, resolved: 28 },
  { time: '08:00', messages: 78, resolved: 65 },
  { time: '12:00', messages: 95, resolved: 82 },
  { time: '16:00', messages: 88, resolved: 76 },
  { time: '20:00', messages: 52, resolved: 45 },
];

const teamPerformance = [
  { name: 'Sarah Chen', conversations: 45, rating: 4.9, responseTime: '2m' },
  { name: 'Mike Johnson', conversations: 38, rating: 4.8, responseTime: '3m' },
  { name: 'Lisa Wang', conversations: 42, rating: 4.7, responseTime: '2m' },
  { name: 'Alex Rodriguez', conversations: 35, rating: 4.6, responseTime: '4m' },
];

const recentConversations = [
  { id: 1, customer: 'Emma Thompson', status: 'open', priority: 'high', lastMessage: '2 min ago', subject: 'Payment issue with subscription' },
  { id: 2, customer: 'David Chen', status: 'pending', priority: 'medium', lastMessage: '15 min ago', subject: 'Feature request for mobile app' },
  { id: 3, customer: 'Sarah Wilson', status: 'resolved', priority: 'low', lastMessage: '1 hour ago', subject: 'How to reset password' },
  { id: 4, customer: 'John Martinez', status: 'open', priority: 'high', lastMessage: '5 min ago', subject: 'Data export not working' },
];

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4m</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              -15% improvement
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +0.2 this week
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Resolutions</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +5% this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Conversation Volume</CardTitle>
            <CardDescription>Messages received and resolved today</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Today's agent statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.conversations} conversations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{agent.rating}⭐</p>
                    <p className="text-sm text-gray-500">{agent.responseTime} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>Latest customer interactions requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentConversations.map((conversation) => (
              <div key={conversation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{conversation.customer}</p>
                    <p className="text-sm text-gray-600">{conversation.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={conversation.priority === 'high' ? 'destructive' : conversation.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {conversation.priority}
                  </Badge>
                  <Badge 
                    variant={conversation.status === 'resolved' ? 'default' : conversation.status === 'open' ? 'destructive' : 'secondary'}
                  >
                    {conversation.status}
                  </Badge>
                  <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
