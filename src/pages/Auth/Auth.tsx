import { Link, Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="p-3 lg:p-5 mb-8">
        <Link to="/">
          <h2 className="text-xl lg:text-2xl text-[#585858]">Lumina</h2>
        </Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default Auth;
