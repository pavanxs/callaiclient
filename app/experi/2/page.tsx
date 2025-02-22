'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Types
type CampaignStatus = 'completed' | 'ongoing'
type CallOutcome = 'connected' | 'no-answer' | 'voicemail' | 'rejected' | 'other'

interface CampaignData {
  id: string
  name: string
  type: 'inbound' | 'outbound'
  startDate: Date
  endDate: Date | null
  status: CampaignStatus
  metrics: {
    totalCalls: number
    totalDuration: number
    averageCallDuration: number
    totalContacts: number
    leadsGenerated: number
    conversionRate: number
    followupsScheduled: number
  }
  outcomes: Record<CallOutcome, number>
  leadsByCategory: {
    hot: number
    warm: number
    cold: number
  }
}

export default function CampaignResults() {
  // Mock data
  const campaignData: CampaignData = {
    id: '1',
    name: 'Summer Sale 2024',
    type: 'outbound',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    status: 'completed',
    metrics: {
      totalCalls: 1500,
      totalDuration: 75000, // in seconds
      averageCallDuration: 180, // in seconds
      totalContacts: 1200,
      leadsGenerated: 300,
      conversionRate: 25,
      followupsScheduled: 250
    },
    outcomes: {
      connected: 800,
      'no-answer': 400,
      voicemail: 200,
      rejected: 50,
      other: 50
    },
    leadsByCategory: {
      hot: 100,
      warm: 150,
      cold: 50
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6 bg-red-500 max-w-full">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Campaign Results</h1>
        <p className="text-xl text-muted-foreground">
          Detailed Results of Campaign: {campaignData.name}
        </p>
      </div>

      {/* Campaign Info & Actions */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Campaign Type</div>
          <div className="font-medium capitalize">{campaignData.type}</div>
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="font-medium capitalize">{campaignData.status}</div>
        </div>
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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Calls"
          value={campaignData.metrics.totalCalls.toString()}
        />
        <MetricCard
          title="Leads Generated"
          value={campaignData.metrics.leadsGenerated.toString()}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${campaignData.metrics.conversionRate}%`}
        />
        <MetricCard
          title="Follow-ups"
          value={campaignData.metrics.followupsScheduled.toString()}
        />
      </div>

      {/* Call Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle>Call Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(campaignData.outcomes).map(([outcome, count]) => (
              <div key={outcome} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{outcome}</span>
                  <span>{count} calls</span>
                </div>
                <Progress 
                  value={(count / campaignData.metrics.totalCalls) * 100} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(campaignData.leadsByCategory).map(([category, count]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{category}</span>
                  <span>{count} leads</span>
                </div>
                <Progress 
                  value={(count / campaignData.metrics.leadsGenerated) * 100} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value }: { title: string, value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}