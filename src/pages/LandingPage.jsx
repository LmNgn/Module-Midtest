import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    nav("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Homepage</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default LandingPage;
