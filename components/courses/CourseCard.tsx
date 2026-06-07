import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  features: string[];
  isPurchased: boolean;
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="bg-[#171B25] border-white/5 rounded-2xl flex flex-col justify-between overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-white">{course.title}</CardTitle>
        <CardDescription className="text-gray-400">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 py-4">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-blue-500">${course.price}</span>
          <span className="text-lg text-gray-500">/ course</span>
        </div>
        <ul className="space-y-2 text-gray-300">
          {course.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        {course.isPurchased ? (
          <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
            <Link href={`/courses/${course.id}`}>
              <CheckCircle size={18} className="mr-2" /> Continue Learning
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full bg-primary hover:bg-blue-700 text-white rounded-xl">
            <Link href={`/courses/${course.id}`}>
              <Lock size={18} className="mr-2" /> Unlock Course
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
