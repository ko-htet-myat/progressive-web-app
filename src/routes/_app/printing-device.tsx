import SettingsGrid from "@/components/setting-cards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/printing-device")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsGrid />;
}
