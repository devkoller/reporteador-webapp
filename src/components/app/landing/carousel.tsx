"use client"

import { useState, useEffect } from "react"
import Image from "@/assets/images/placeholder.svg"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const announcements = [
  {
    id: 1,
    title: "New Cardiac Center Opening",
    description: "State-of-the-art cardiac care center opening next month at North Campus",
    image: "/placeholder.svg?height=600&width=1200",
    link: "#",
  },
  {
    id: 2,
    title: "COVID-19 Vaccination Drive",
    description: "Free vaccinations available at all campuses. Schedule your appointment today.",
    image: "/placeholder.svg?height=600&width=1200",
    link: "#",
  },
  {
    id: 3,
    title: "Community Health Fair",
    description: "Join us for free health screenings and wellness activities this weekend.",
    image: "/placeholder.svg?height=600&width=1200",
    link: "#",
  },
]

export function Carousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current) => (current === 0 ? announcements.length - 1 : current - 1))
  const next = () => setCurrent((current) => (current === announcements.length - 1 ? 0 : current + 1))

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {announcements.map((announcement) => (
          <div key={announcement.id} className="relative h-full w-full flex-shrink-0">
            <img
              src={Image || "/placeholder.svg"}
              alt={announcement.title}
              className="object-cover w-full"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold">{announcement.title}</h2>
              <p className="mt-2">{announcement.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
