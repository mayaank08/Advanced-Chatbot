
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, Star, MessageSquare, Calendar, Mail, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const customers = [
  {
    id: 1,
    name: 'Emma Thompson',
    email: 'emma@example.com',
    phone: '+1 234 567 8900',
    plan: 'Premium',
    status: 'Active',
    satisfaction: 4.8,
    conversations: 12,
    lastContact: '2 hours ago',
    joinDate: 'Jan 2023',
    avatar: 'ET',
    tags: ['VIP', 'Enterprise']
  },
  {
    id: 2,
    name: 'David Chen',
    email: 'david@company.com',
    phone: '+1 234 567 8901',
    plan: 'Business',
    status: 'Active',
    satisfaction: 4.5,
    conversations: 8,
    lastContact: '1 day ago',
    joinDate: 'Mar 2023',
    avatar: 'DC',
    tags: ['Business']
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    email: 'sarah@startup.co',
    phone: '+1 234 567 8902',
    plan: 'Starter',
    status: 'Active',
    satisfaction: 4.9,
    conversations: 15,
    lastContact: '3 hours ago',
    joinDate: 'Feb 2023',
    avatar: 'SW',
    tags: ['Startup', 'High Engagement']
  },
  {
    id: 4,
    name: 'John Martinez',
    email: 'john@agency.com',
    phone: '+1 234 567 8903',
    plan: 'Premium',
    status: 'Inactive',
    satisfaction: 4.2,
    conversations: 6,
    lastContact: '1 week ago',
    joinDate: 'Dec 2022',
    avatar: 'JM',
    tags: ['At Risk']
  },
  {
    id: 5,
    name: 'Lisa Park',
    email: 'lisa@tech.io',
    phone: '+1 234 567 8904',
    plan: 'Enterprise',
    status: 'Active',
    satisfaction: 4.7,
    conversations: 25,
    lastContact: '1 hour ago',
    joinDate: 'Nov 2022',
    avatar: 'LP',
    tags: ['VIP', 'Tech Lead']
  },
];

export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || customer.plan.toLowerCase() === filterPlan;
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage and view customer information</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {customer.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription>{customer.email}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                  {customer.status}
                </Badge>
                <Badge variant="outline">{customer.plan}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Satisfaction</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{customer.satisfaction}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Conversations</span>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{customer.conversations}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Last Contact</span>
                  <span className="font-medium">{customer.lastContact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Customer Since</span>
                  <span className="font-medium">{customer.joinDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {customer.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found matching your filters.</p>
        </div>
      )}
    </div>
  );
};
