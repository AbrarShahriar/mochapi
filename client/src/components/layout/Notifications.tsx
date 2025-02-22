import {
  Bell,
  MessageSquareDot,
  PackagePlus,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NotificationType {
  type: "feat" | "fix" | "notice" | "convo";
  content: string;
  createdAt: Date;
}

const notifications: Array<NotificationType> = [
  {
    type: "feat",
    content: "Added table view on the generated data view section",
    createdAt: new Date("2025-2-2"),
  },
  {
    type: "fix",
    content: "Fixed function execution time analysis calculation.",
    createdAt: new Date("2025-1-20"),
  },
  {
    type: "notice",
    content: "Request: Please dont use the app for the next 7days",
    createdAt: new Date("2025-2-9"),
  },
  {
    type: "convo",
    content: "Something new is coming!!",
    createdAt: new Date("2024-12-30"),
  },
];

export default function Notifications() {
  const handleNotiType = (noti: NotificationType) => {
    switch (noti.type) {
      case "feat":
        return (
          <div className="grid place-content-center aspect-square size-10 border rounded-full border-zinc-700 text-green-400 bg-green-950/50">
            <PackagePlus />
          </div>
        );
      case "fix":
        return (
          <div className="grid place-content-center aspect-square size-10 border rounded-full border-zinc-700 text-blue-400 bg-blue-950/50">
            <Wrench />
          </div>
        );
      case "notice":
        return (
          <div className="grid place-content-center aspect-square size-10 border rounded-full border-zinc-700 text-yellow-400 bg-yellow-950/50">
            <TriangleAlert />
          </div>
        );
      case "convo":
        return (
          <div className="grid place-content-center aspect-square size-10 border rounded-full border-zinc-700 text-violet-400 bg-violet-950/50">
            <MessageSquareDot />
          </div>
        );

      default:
        break;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto ">
        <div className="rounded-full p-2 border border-zinc-700 hover:bg-zinc-900/50 transition-colors">
          <Bell className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuLabel className="px-4 py-2">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((noti, i) => (
          <DropdownMenuItem
            key={i}
            className="border-b border-zinc-800 rounded-none p-4 flex items-center gap-4"
          >
            {handleNotiType(noti)}
            <div className="text-left">
              <p>{noti.content}</p>
              <p className="text-muted-foreground text-sm">
                {noti.createdAt.toDateString()}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
