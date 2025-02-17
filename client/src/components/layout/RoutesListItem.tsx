import { useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, ChevronRight, Clock } from "lucide-react";
import { formatDistanceToNow, format, isAfter, subDays } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  routeId: string;
  name: string;
  url: string;
  numOfRows: number;
  initialIsPublic: boolean;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function RoutesListItem({
  routeId,
  name,
  url,
  numOfRows,
  initialIsPublic,
  projectId,
  createdAt,
  updatedAt,
}: Props) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
    // Here you would typically update the server state
  };

  const createdAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  const updatedAgo = formatDistanceToNow(updatedAt, { addSuffix: true });
  const isRecentlyUpdated = isAfter(updatedAt, subDays(new Date(), 1));

  const getUpdateColor = () => {
    if (isAfter(updatedAt, subDays(new Date(), 1))) return "text-green-500";
    if (isAfter(updatedAt, subDays(new Date(), 7))) return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-900/50 border border-zinc-800 rounded-lg transition-colors">
      <Link
        href={`/dashboard/projects/${projectId}/${routeId}`}
        className="flex-1 flex items-center"
      >
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            {isRecentlyUpdated && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Recently Updated
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2">{url}</p>
          <div className="flex items-center mt-1 text-xs space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  Created {createdAgo}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Created on {format(createdAt, "PPpp")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={cn("flex items-center", getUpdateColor())}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {updatedAgo}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last updated on {format(updatedAt, "PPpp")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">{numOfRows} entries</div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </Link>
      <div className="flex items-center space-x-2 ml-4">
        {isPublic ? (
          <Globe className="text-green-500" size={16} />
        ) : (
          <Lock className="text-red-500" size={16} />
        )}
        <Switch checked={isPublic} onCheckedChange={handleSwitchChange} />
      </div>
    </div>
  );
}
