"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Assuming ShadCN switch
import { Lock, Bell, User as UserIcon, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-[#1C2230] border-white/5 mb-8">
          <TabsTrigger value="account" className="gap-2"><UserIcon size={16}/> Account</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock size={16}/> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell size={16}/> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="bg-[#171B25] border-white/5 rounded-2xl">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your public profile and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input className="bg-[#20283A] border-white/5" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input className="bg-[#20283A] border-white/5" disabled defaultValue="john@example.com" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-[#171B25] border-white/5 rounded-2xl">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" className="bg-[#20283A] border-white/5" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" className="bg-[#20283A] border-white/5" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 mt-4">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
