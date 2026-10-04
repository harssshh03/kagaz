import { useState } from "react";
import type { FormEvent } from "react";
import type { SigninType } from "@harshchalwadi/medium-app";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/passwordinput";
import { Spinner } from "@/components/icons/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInComp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signInReq, setSignInReq] = useState<SigninType>({
    email: "",
    password: "",
  });

  async function sendRequest(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signInReq,
      );
      localStorage.setItem("token", response.data.token);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="mb-4 w-full max-w-sm">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex cursor-pointer items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
          <CardAction>
            <Link to="/signup">
              <Button variant="link" className="cursor-pointer">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        <form onSubmit={sendRequest}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) =>
                    setSignInReq({ ...signInReq, email: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  required
                  onChange={(e) =>
                    setSignInReq({ ...signInReq, password: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading && <Spinner />}
              {loading ? "Signing in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}