import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/use-logout";

export default function LogoutButton() {
  const { logout, reFresh, isAuthenticated } = useLogout();
  if (isAuthenticated === false) return null;
  return (
    <>
      <Button onClick={logout} className={" cursor-pointer"}>
        Logout
      </Button>
      <Button onClick={reFresh} className={" cursor-pointer"}>
        reFresh
      </Button>
    </>
  );
}
