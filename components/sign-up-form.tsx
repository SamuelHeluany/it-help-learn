"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export function SignUpForm({}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <h2 className="text-2xl">Crie sua conta</h2>
          <p className="text-sm text-gray-400">
            Crie sua conta ou entre com um email e senha.
          </p>
        </div>
        <form onSubmit={handleSignUp}>
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                className="w-100"
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="repeat-password">Repita a senha</Label>
              </div>
              <Input
                id="repeat-password"
                className="w-100"
                placeholder="Repita a senha"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-100 h-8 text-white bg-[#6E6CDF] text-[17px] cursor-pointer hover:bg-[#716ffc] rounded-sm"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
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
  );
}
