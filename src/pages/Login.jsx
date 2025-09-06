import React, { useState } from "react";
import { z } from "zod";
import "../index.css";

// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Validation function
function validateWithZod(schema, values) {
  const result = schema.safeParse(values);

  if (!result.success) {
    const fieldErrors = {};
    result.error.errors.forEach((err) => {
      const fieldName = err.path[0];
      fieldErrors[fieldName] = err.message;
    });
    return fieldErrors;
  }
  return {};
}

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ validation أثناء الكتابة
  const handleChange = (e) => {
    const newValues = { ...values, [e.target.id]: e.target.value };
    setValues(newValues);

    // نعمل validation لحظي
    const newErrors = validateWithZod(loginSchema, newValues);
    setErrors(newErrors);
  };

  // ✅ validation عند الضغط على الزرار
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateWithZod(loginSchema, values);
    setErrors(newErrors);

    // لو فيه أخطاء ما نكمّلش
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // لو كل شيء تمام
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted ✅");
      console.log(values);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Login to continue shopping with us
        </p>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email*
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password*
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Extra Links */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="hover:underline">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}
