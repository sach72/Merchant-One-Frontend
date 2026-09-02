import ThemeToggle from "@/components/theme/ThemeToggle";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <h1>Navbar</h1>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;