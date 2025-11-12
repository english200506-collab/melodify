import { LayoutDashboardIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
    const { isAdmin } = useAuthStore();

    return (
        <div
            className="flex items-center justify-between p-4 sticky top-0 bg-card/75
      backdrop-blur-md z-10 transition-colors duration-300"
        >
            <div className="flex gap-2 items-center text-foreground transition-colors duration-300">
                <img src="/spotify.png" className="size-8" alt="Spotify logo" />
                Melodify
            </div>

            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link
                        to={"/admin"}
                        className={cn(buttonVariants({ variant: "outline" }))}
                    >
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}

                {/* Иконка пользователя */}
                <Link
                    to="/profile"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex items-center gap-2"
                    )}
                >
                    <UserIcon className="size-4" />
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
