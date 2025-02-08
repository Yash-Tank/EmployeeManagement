import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.role);
    } catch (err) {
      console.error("Login failed");
    }
  };

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/manager/departments?page=${page}`, {
        headers: { Authorization: token },
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user === "Manager") {
      fetchDepartments();
    }
  }, [user, page]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employee-Manager System</h1>
      {!user && (
        <button 
          onClick={() => login("manager@example.com", "password123")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Login as Manager
        </button>
      )}
      {user === "Manager" && (
        <div className="w-full max-w-md bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept.id} className="p-2 bg-gray-200 rounded">
                  {dept.department_name} - {dept.location}
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setPage(page - 1)} 
              disabled={page === 1} 
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
