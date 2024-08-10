import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, Phone, CircleUser, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Functionality imports
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/actions/authActions";

const DashboardPanel = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout
  };

  const isAdmin = role === "admin";
  
  const username = localStorage.getItem('username');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6"></div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4">
              <Link
                to="/dashboard/home"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              {isAdmin ? (
                <Link
                  to="/dashboard/add-retailers"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Add Retailers
                </Link>
              ) : (
                <Link
                  to="/dashboard/update-numbers"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  Add Numbers
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/dashboard/home"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                {isAdmin ? (
                  <Link
                    to="/dashboard/add-retailers"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Add Retailers
                  </Link>
                ) : (
                  <Link
                    to="/dashboard/update-numbers"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  >
                    <Phone className="h-5 w-5" />
                    Add Numbers
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for..." className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <p>{username}</p>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Outlet renders role-specific content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPanel;