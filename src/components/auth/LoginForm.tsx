
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    
    if (success) {
      navigate("/dashboard");
    }
  };

  const handleDemoLogin = async (role: string) => {
    setIsSubmitting(true);
    let success;
    
    switch (role) {
      case "admin":
        success = await login("admin@example.com", "password");
        break;
      case "donor":
        success = await login("donor@example.com", "password");
        break;
      case "volunteer":
        success = await login("volunteer@example.com", "password");
        break;
      default:
        success = false;
    }
    
    setIsSubmitting(false);
    
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-center w-full mb-2">
          Or log in with demo accounts
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("admin")}
            disabled={isSubmitting}
          >
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("donor")}
            disabled={isSubmitting}
          >
            Donor
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("volunteer")}
            disabled={isSubmitting}
          >
            Volunteer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
