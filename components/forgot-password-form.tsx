"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center">
          <div className="relative w-150 h-175">
            <Image
              src="/it-help-image-login.png"
              alt="Ilustração do Login de Suporte"
              fill
              className="object-cover rounded-l-lg" // Preenche todo o espaço sem deformar
              priority
            />
          </div>
          <div className="w-150 h-175 rounded-r-lg bg-white shadow-[0_0_30px_rgba(0,0,0,0.15)] py-40">
            <div className="w-full p-5 grid mx-19">
              <h2 className="text-2xl">Recupere sua senha</h2>
              <p className="text-sm text-gray-400 w-100">
                Coloque seu email abaixo e caso exista uma conta, um link será
                enviado para recuperação de senha.
              </p>
            </div>
            <div>
              <form onSubmit={handleForgotPassword}>
                <div className="flex flex-col gap-6 items-center">
                  <div className="grid gap-2 px-10">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="text-[#757575] w-100"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button
                    type="submit"
                    className="w-100 h-8 text-white bg-[#6E6CDF] text-[15px] cursor-pointer hover:bg-[#716ffc] rounded-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar email"}
                  </button>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  Já tem uma conta?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4 text-[#6E6CDF]"
                  >
                    Entre aqui!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
