import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Dummy data for courses
const courses = [
  {
    id: "course_bronze",
    title: "Bronze Level: Trading Fundamentals",
    description: "Learn the absolute basics of forex, stocks, and crypto. Understand market terminology and simple strategies.",
    price: 50,
    level: "Bronze",
    features: ["Introduction to Markets", "Basic Chart Reading", "Risk Management 101"],
    isPurchased: true, // Simulate purchased status
  },
  {
    id: "course_silver",
    title: "Silver Level: Intermediate Strategies",
    description: "Dive deeper into technical analysis, common indicators, and developing a trading plan.",
    price: 100,
    level: "Silver",
    features: ["Advanced Chart Patterns", "Indicator Mastery", "Trading Psychology"],
    isPurchased: false,
  },
  {
    id: "course_gold",
    title: "Gold Level: Advanced Techniques",
    description: "Master complex strategies, institutional trading concepts, and advanced risk management.",
    price: 200,
    level: "Gold",
    features: ["Supply & Demand", "Order Blocks", "Algorithmic Trading Basics"],
    isPurchased: false,
  },
  {
    id: "course_diamond",
    title: "Diamond Level: Professional Trading",
    description: "Exclusive content for aspiring professional traders. Includes live trading sessions and mentorship.",
    price: 300,
    level: "Diamond",
    features: ["Live Trading Sessions", "Personal Mentorship", "Proprietary Strategies"],
    isPurchased: false,
  },
  {
    id: "course_premium_gold",
    title: "Premium Gold: Elite Market Insights",
    description: "Access to premium market analysis, exclusive signals, and advanced portfolio management.",
    price: 400,
    level: "Premium Gold",
    features: ["Elite Market Analysis", "Exclusive Signals", "Portfolio Management"],
    isPurchased: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold">Our Courses</h1>
      <p className="text-gray-400">Unlock your trading potential with our expert-led educational programs.</p>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search courses..."
            className="pl-10 bg-[#1C2230] border-white/5 focus:border-primary"
          />
        </div>
        {/* Add filter/sort dropdowns here if needed */}
      </div>

      {/* Course Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
