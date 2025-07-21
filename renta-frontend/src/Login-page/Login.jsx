import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [role, setRole] = useState("tenant");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted Account:", { ...formData, role });
    // Optionally navigate to connect wallet step next
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
            required
          />

          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              onClick={() => setRole("tenant")}
              className={`px-4 py-2 rounded-xl border ${
                role === "tenant" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              Tenant
            </button>
            <button
              type="button"
              onClick={() => setRole("landlord")}
              className={`px-4 py-2 rounded-xl border ${
                role === "landlord" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              Landlord
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm mt-2">Already have an account?</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-1 text-blue-600 hover:underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
