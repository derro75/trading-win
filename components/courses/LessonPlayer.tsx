"use client";

import React, { useState } from "react";
import { Play, CheckCircle, Lock, ChevronRight, BookOpen } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  isLocked: boolean;
  isCompleted: boolean;
}

interface LessonPlayerProps {
  courseTitle: string;
  lessons: Lesson[];
  onComplete: (lessonId: string) => void;
}

const LessonPlayer = ({ courseTitle, lessons, onComplete }: LessonPlayerProps) => {
  const [activeLesson, setActiveLesson] = useState(lessons[0]);

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.isLocked) return;
    setActiveLesson(lesson);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[600px]">
      {/* Video Display Area */}
      <div className="lg:col-span-8 space-y-4">
        <div className="aspect-video bg-[#1C2230] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
          {activeLesson.isLocked ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#13161E]/80 backdrop-blur-sm z-10">
              <Lock className="text-blue-500 mb-4" size={48} />
              <h3 className="text-xl font-bold">Content Locked</h3>
              <p className="text-gray-500">Purchase the full course to unlock this lesson.</p>
            </div>
          ) : (
            <iframe
              src={activeLesson.videoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          )}
        </div>
        
        <div className="flex items-center justify-between p-6 bg-[#171B25] rounded-2xl border border-white/5">
          <div>
            <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
            <p className="text-gray-500 text-sm">{courseTitle}</p>
          </div>
          {!activeLesson.isCompleted && !activeLesson.isLocked && (
            <button 
              onClick={() => onComplete(activeLesson.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>

      {/* Playlist / Navigation */}
      <div className="lg:col-span-4 bg-[#171B25] rounded-3xl border border-white/10 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/5 bg-[#1C2230]">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <BookOpen size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Curriculum</span>
          </div>
          <h3 className="font-bold">Course Lessons</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={`w-full text-left p-4 flex items-center gap-4 border-b border-white/5 transition-all ${
                activeLesson.id === lesson.id ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-white/5'
              } ${lesson.isLocked ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="text-gray-600 font-mono text-xs">{String(idx + 1).padStart(2, '0')}</div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${activeLesson.id === lesson.id ? 'text-blue-500' : 'text-white'}`}>
                  {lesson.title}
                </p>
              </div>
              <div>
                {lesson.isCompleted ? (
                  <CheckCircle className="text-green-500" size={18} />
                ) : lesson.isLocked ? (
                  <Lock className="text-gray-600" size={16} />
                ) : (
                  <Play className={activeLesson.id === lesson.id ? 'text-blue-500' : 'text-gray-600'} size={16} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
