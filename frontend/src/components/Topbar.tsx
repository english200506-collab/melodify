import { LayoutDashboardIcon, UserIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { useMusicStore } from "@/stores/useMusicStore.ts";

const Topbar = () => {
    const { isAdmin } = useAuthStore();
    const { searchText, setSearchText } = useMusicStore(); // берем глобальный searchText

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value); // обновляем глобальный searchText
    };

    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-card/75
          backdrop-blur-md z-10 transition-colors duration-300 border-b border-border/50">

            {/* ЛОГОТИП */}
            <div className="flex gap-2 items-center text-foreground transition-colors duration-300">
                <img src="/spotify.png" className="size-8" alt="Spotify logo" />
                <span className="font-semibold text-lg tracking-tight">Melodify</span>
            </div>

            {/* ПОИСК */}
            <div className="hidden md:flex items-center w-full max-w-md mx-6 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                    type="text"
                    placeholder="Search songs, artists..."
                    value={searchText} // используем глобальный state
                    onChange={handleChange} // обновляем searchText
                    className="pl-9 bg-background/50 border-border/50 focus-visible:ring-1 focus-visible:ring-primary transition-all duration-200"
                />
            </div>

            {/* СПРАВА */}
            <div className="flex items-center gap-3">
                {isAdmin && (
                    <Link
                        to={"/admin"}
                        className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}
                    >
                        <LayoutDashboardIcon className="size-4" />
                        Admin Dashboard
                    </Link>
                )}
                <Link
                    to="/profile"
                    className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}
                >
                    <UserIcon className="size-4" />
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
