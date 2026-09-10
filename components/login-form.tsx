"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export function LoginForm({}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next, "/protected"));
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
          <h2 className="text-2xl">Entre na sua conta</h2>
          <p className="text-sm text-gray-400">
            Entre com seu email e senha ou crie uma conta!
          </p>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6 items-center">
              <div className="grid gap-2 px-10">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="text-[#757575] w-100"
                  placeholder="m@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#6E6CDF]"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  className="w-100"
                  id="password"
                  type="password"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-100 h-8 text-white bg-[#6E6CDF] text-lg cursor-pointer hover:bg-[#716ffc] rounded-sm"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4 text-[#6E6CDF]"
              >
                Cadastre-se!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
