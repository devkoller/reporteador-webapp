"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Blood Drive",
    description: "Donate blood and save lives",
    date: new Date(2023, 4, 15), // May 15, 2023
    location: "North Campus",
    type: "community",
  },
  {
    id: 2,
    title: "Diabetes Awareness Workshop",
    description: "Learn about diabetes prevention and management",
    date: new Date(2023, 4, 18), // May 18, 2023
    location: "East Campus",
    type: "education",
  },
  {
    id: 3,
    title: "CPR Certification Class",
    description: "Get certified in life-saving CPR techniques",
    date: new Date(2023, 4, 22), // May 22, 2023
    location: "West Campus",
    type: "training",
  },
  {
    id: 4,
    title: "Mental Health Symposium",
    description: "Join healthcare professionals for discussions on mental health",
    date: new Date(2023, 4, 25), // May 25, 2023
    location: "North Campus",
    type: "conference",
  },
]

export function EventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filter events for the selected date
  const selectedDateEvents = events.filter((event) => date && event.date.toDateString() === date.toDateString())

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some((event) => event.date.toDateString() === day.toDateString())
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View and select upcoming events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: (date) => isDayWithEvent(date),
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: "bold",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "100%",
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {date ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Events"}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length
              ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`
              : "No events scheduled for this date"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Location: {event.location}</p>
                    <p>Time: {event.date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                Select a date with events to view details
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
