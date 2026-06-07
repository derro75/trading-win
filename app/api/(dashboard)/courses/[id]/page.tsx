"use client";

import { useState } from "react";
import { ChevronRight, PlayCircle, CheckCircle, Lock, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Assumes ShadCN Progress component
import { cn } from "@/lib/utils";

// Mock data for a single course
const courseData = {
  id: "bronze-1",
  title: "Trading Fundamentals: Bronze Level",
  progress: 35,
  modules: [
    {
      id: "m1",
      title: "Introduction to Forex",
      lessons: [
        { id: "l1", title: "What is the Forex Market?", duration: "10:05", type: "video", completed: true },
        { id: "l2", title: "Major, Minor & Exotic Pairs", duration: "15:20", type: "video", completed: true },
        { id: "l3", title: "Market Participants", duration: "08:45", type: "text", completed: false },
      ]
    },
    {
      id: "m2",
      title: "Understanding Price Action",
      lessons: [
        { id: "l4", title: "Candlestick Anatomy", duration: "12:30", type: "video", completed: false },
        { id: "l5", title: "Support & Resistance", duration: "20:00", type: "video", completed: false },
      ]
    }
  ]
};

export default function CourseDetailPage() {
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100-80px)] overflow-hidden -m-8">
      {/* Video / Content Area */}
      <div className="flex-1 overflow-y-auto p-8 border-r border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="aspect-video bg-[#1C2230] rounded-2xl border border-white/5 flex items-center justify-center relative group cursor-pointer overflow-hidden">
             {/* Placeholder for Video Player */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <PlayCircle size={64} className="text-blue-500 group-hover:scale-110 transition-transform relative z-10" />
             <p className="absolute bottom-6 left-6 text-white font-medium z-10">Now Playing: {activeLesson.title}</p>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><BookOpen size={14}/> Module: Introduction</span>
              <span className="flex items-center gap-1"><FileText size={14}/> Type: {activeLesson.type}</span>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300">
              <p>This lesson covers the fundamental structure of the global financial markets. You will learn how liquidity providers interact with retail brokers and why price moves the way it does.</p>
              <h3>Key Learning Objectives:</h3>
              <ul>
                <li>Understand Market Capitalization</li>
                <li>Identify Session Volatility (London vs NY)</li>
                <li>Analyze Spread and Slippage</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex justify-between">
            <Button variant="outline" className="border-white/10">Previous Lesson</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Complete & Next</Button>
          </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-full lg:w-96 bg-[#171B25] overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-bold text-lg mb-4">Course Content</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span>{courseData.progress}%</span>
            </div>
            <Progress value={courseData.progress} className="h-1.5 bg-white/5" />
          </div>
        </div>

        <div className="p-2">
          {courseData.modules.map((module) => (
            <div key={module.id} className="mb-2">
              <div className="px-4 py-3 text-sm font-bold text-gray-400 uppercase tracking-wider bg-white/5 rounded-lg mb-1">
                {module.title}
              </div>
              <div className="space-y-1">
                {module.lessons.map((lesson) => {
                  const isActive = activeLesson.id === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left",
                        isActive ? "bg-blue-600/10 border border-blue-500/20" : "hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <PlayCircle size={18} className={isActive ? "text-blue-500" : "text-gray-500"} />
                        )}
                        <div>
                          <p className={cn("text-sm font-medium", isActive ? "text-blue-500" : "text-gray-300")}>
                            {lesson.title}
                          </p>
                          <p className="text-[10px] text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
