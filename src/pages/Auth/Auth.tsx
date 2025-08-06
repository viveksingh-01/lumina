import { Link, Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="p-5 ml-[88px] mb-8">
        <Link to="/">
          <h2 className="text-2xl text-[#585858]">Lumina</h2>
        </Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default Auth;
