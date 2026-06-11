import SettingsGrid from "@/components/setting-cards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users-account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsGrid />;
}
