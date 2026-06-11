import SettingsGrid from "@/components/setting-cards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <SettingsGrid />
    </div>
  );
}
