"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const adminStats = [
    { label: "Total Users", value: "1,234", icon: "👥", color: "blue", change: "+12%", changeType: "positive" },
    { label: "Total Festivals", value: "45", icon: "🎬", color: "purple", change: "+3", changeType: "positive" },
    { label: "Total Submissions", value: "567", icon: "📄", color: "green", change: "+28", changeType: "positive" },
    { label: "Pending Reviews", value: "23", icon: "⏳", color: "yellow", change: "-5", changeType: "negative" },
  ];

  const recentActivities = [
    { user: "John Doe", action: "submitted a new project", time: "5 minutes ago", type: "submission" },
    { user: "Jane Smith", action: "registered as a filmmaker", time: "1 hour ago", type: "user" },
    { user: "Mike Johnson", action: "updated festival details", time: "3 hours ago", type: "festival" },
    { user: "Sarah Williams", action: "submitted a film for review", time: "5 hours ago", type: "submission" },
  ];

  const pendingTasks = [
    { task: "Review new submissions", count: 12, priority: "high", link: "/admin/submissions" },
    { task: "Verify new users", count: 8, priority: "medium", link: "/admin/users" },
    { task: "Approve festival entries", count: 5, priority: "low", link: "/admin/festivals" },
  ];

  // To this (remove : string):
  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50",
      purple: "bg-purple-50",
      green: "bg-green-50",
      yellow: "bg-yellow-50",
    };
    return colors[color] || "bg-gray-50";
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs mt-2 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${getColorClasses(stat.color)} p-3 rounded-full text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                + Add New Festival
              </button>
              <button className="bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                + Invite User
              </button>
              <button className="bg-purple-50 text-purple-700 p-3 rounded-lg hover:bg-purple-100 transition text-sm font-medium">
                📊 Generate Report
              </button>
              <button className="bg-orange-50 text-orange-700 p-3 rounded-lg hover:bg-orange-100 transition text-sm font-medium">
                ⚙️ Platform Settings
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${activity.type === "submission" ? "bg-green-100" :
                      activity.type === "user" ? "bg-blue-100" : "bg-purple-100"
                    }`}>
                    {activity.type === "submission" ? "📄" : activity.type === "user" ? "👤" : "🎬"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-700 mt-4 inline-block">
              View all activity →
            </Link>
          </div>
        </div>

        {/* Right Column - Analytics & Tasks */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h2>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <Link key={index} href={task.link} className="block">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-gray-500 mt-1">{task.count} items pending</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${task.priority === "high" ? "bg-red-100 text-red-700" :
                        task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                      }`}>
                      {task.priority}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Total Views</span>
                  <span>12,345</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Active Users</span>
                  <span>892</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Storage Used</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
            <Link href="/admin/analytics" className="text-sm text-blue-600 hover:text-blue-700 mt-4 inline-block">
              View detailed analytics →
            </Link>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">API Status</span>
                <span className="text-green-600">● Operational</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600">● Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Backup</span>
                <span className="text-gray-900">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}