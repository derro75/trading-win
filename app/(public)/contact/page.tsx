import { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TagOption Education",
};

export default function ContactPage() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold mb-6">Get in <span className="text-blue-500">Touch</span></h1>
          <p className="text-gray-400 mb-10 text-lg">
            Have questions about our courses or the trading simulator? Our team of experts in Nairobi is ready to assist you.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Mail className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold">Email Support</h4>
                <p className="text-gray-500">support@tagoption.ke</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Phone className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-500">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <MapPin className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold">Office</h4>
                <p className="text-gray-500">Westlands Business Park, Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#171B25] p-10 rounded-3xl border border-white/10 shadow-xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Full Name</label>
                <input type="text" className="w-full bg-[#1C2230] border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-[#1C2230] border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject</label>
              <select className="w-full bg-[#1C2230] border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none">
                <option>General Inquiry</option>
                <option>Course Access</option>
                <option>Partnerships</option>
                <option>Withdrawal Support</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Message</label>
              <textarea rows={5} className="w-full bg-[#1C2230] border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
