'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Download, Filter, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react'

// Mock data type
type CallLog = {
  id: string
  dateTime: Date
  type: 'inbound' | 'outbound'
  name: string
  phone: string
  duration: string
  status: 'completed' | 'missed' | 'failed' | 'voicemail'
  campaign: string
  agent: string
  outcome: string
}

export default function Component() {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null)
  const [dateRange, setDateRange] = useState<Date | undefined>()
  
  // Mock data
  const callLogs: CallLog[] = [
    {
      id: '1',
      dateTime: new Date(),
      type: 'inbound',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      duration: '5:23',
      status: 'completed',
      campaign: 'Summer Sale 2024',
      agent: 'Alice Johnson',
      outcome: 'Lead Generated'
    },
    {
      id: '2',
      dateTime: new Date(),
      type: 'outbound',
      name: 'Sarah Wilson',
      phone: '+1 (555) 987-6543',
      duration: '3:45',
      status: 'completed',
      campaign: 'Follow-up Campaign',
      agent: 'Bob Williams',
      outcome: 'Sale Completed'
    },
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-500',
      missed: 'bg-red-500',
      failed: 'bg-yellow-500',
      voicemail: 'bg-blue-500'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Call Logs</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange}
                    onSelect={setDateRange}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Call Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
                <SelectItem value="outbound">Outbound</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search by name or number" />
          </div>
        </CardContent>
      </Card>

      {/* Call Logs Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((log) => (
              <TableRow 
                key={log.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedCall(log)}
              >
                <TableCell>{format(log.dateTime, 'PPp')}</TableCell>
                <TableCell>
                  {log.type === 'inbound' ? 
                    <PhoneIncoming className="w-4 h-4 text-green-500" /> :
                    <PhoneOutgoing className="w-4 h-4 text-blue-500" />
                  }
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{log.name}</div>
                    <div className="text-sm text-muted-foreground">{log.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{log.duration}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(log.status)}>
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>{log.campaign}</TableCell>
                <TableCell>{log.agent}</TableCell>
                <TableCell>{log.outcome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Call Details Modal */}
      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          {selectedCall && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div>{format(selectedCall.dateTime, 'PPp')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="flex items-center">
                  {selectedCall.type === 'inbound' ? 
                    <PhoneIncoming className="w-4 h-4 text-green-500 mr-2" /> :
                    <PhoneOutgoing className="w-4 h-4 text-blue-500 mr-2" />
                  }
                  {selectedCall.type}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Contact</div>
                <div>
                  <div className="font-medium">{selectedCall.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedCall.phone}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Duration</div>
                <div>{selectedCall.duration}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge variant="secondary" className={getStatusColor(selectedCall.status)}>
                  {selectedCall.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Campaign</div>
                <div>{selectedCall.campaign}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Agent</div>
                <div>{selectedCall.agent}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Outcome</div>
                <div>{selectedCall.outcome}</div>
              </div>
              <div className="col-span-2 space-y-2">
                <div className="text-sm text-muted-foreground">Notes</div>
                <div className="p-4 rounded-md bg-muted">
                  No notes available for this call.
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}