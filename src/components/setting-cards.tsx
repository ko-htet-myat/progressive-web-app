import React from "react";
import {
  Users,
  Calendar,
  ShieldCheck,
  Store,
  Bell,
  UtensilsCrossed,
  Layers,
  CreditCard,
  Layers2,
  Printer,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// Define the structure for our setting items
interface SettingItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function SettingsGrid() {
  const settings: SettingItem[] = [
    { id: "employee-data", label: "Employee Data", icon: Users },
    { id: "login", label: "Login", icon: Lock },
    { id: "employee-schedule", label: "Employee Schedule", icon: Calendar },
    { id: "users-account", label: "Users Account", icon: ShieldCheck },
    { id: "store-info", label: "Store Info", icon: Store },
    { id: "notification", label: "Notification", icon: Bell },
    { id: "dine-in", label: "Dine In", icon: UtensilsCrossed },
    { id: "categories-menu", label: "Categories Menu", icon: Layers },
    { id: "payment-type", label: "Payment Type", icon: CreditCard },
    { id: "bank-account", label: "Bank Account", icon: CreditCard }, // Reused CreditCard for the bank icon feel
    { id: "floor-area-data", label: "Floor & Area Data", icon: Layers2 },
    { id: "printing-device", label: "Printing Device", icon: Printer },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-950">
      {/* Header */}
      <h1 className=" text-xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
        Settings
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={"/" + item.id}
              children={({ isActive }) => (
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 shadow-sm",
                    isActive &&
                      "bg-orange-50/50 border-orange-300 hover:border-orange-300 dark:bg-orange-950/20 dark:border-orange-900",
                  )}
                >
                  <CardContent className="flex flex-col items-center justify-center p-8 space-y-3 text-center">
                    <Icon
                      className={cn(
                        "w-6 h-6 text-zinc-700 dark:text-zinc-300",
                        isActive && "text-amber-700 dark:text-amber-500",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium text-zinc-950 dark:text-zinc-50",
                        isActive && "text-amber-950 dark:text-amber-400",
                      )}
                    >
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
