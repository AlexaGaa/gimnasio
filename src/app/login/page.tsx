"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.target)

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    })

    setLoading(false)

    if (res?.error) {
      setError("Credenciales incorrectas")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black px-6 overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[600px] h-[600px] bg-red-600/20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-red-500/10 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(255,0,0,0.15)] rounded-3xl p-10 text-white">

        <h1 className="text-4xl font-extrabold text-center tracking-wider">
          NEW BODY
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8 text-sm">
          Accede a tu progreso y supera tus límites
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Correo electrónico</label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] transition font-semibold p-4 rounded-xl shadow-lg shadow-red-600/30 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          ¿Nuevo en NEW BODY?{" "}
          <Link
            href="/register"
            className="text-red-500 font-semibold hover:text-red-400 transition"
          >
            Crear cuenta
          </Link>
        </div>

      </div>
    </div>
  )
}