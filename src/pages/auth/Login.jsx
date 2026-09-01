import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import authService from "@/services/auth/authService";
import { useAuth } from "@/providers/AuthProvider";

import { loginSchema } from "./loginSchema";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);

      login(response);

      toast.success("Login successful", {
        description: response.message,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to login. Please check your credentials.";

      toast.error("Login failed", {
        description: message,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to Merchant Mart
          </h1>

          <p className="text-muted-foreground">
            Sign in to continue to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;