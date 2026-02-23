"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.target)

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (res?.error) {
      setError("Credenciales incorrectas")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-6">
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10 text-white">
        
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          NEW BODY
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Inicia sesión y sigue tu progreso 💪
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button className="w-full bg-red-600 hover:bg-red-700 transition font-semibold p-4 rounded-xl">
            Ingresar
          </button>

        </form>

        <p className="text-sm text-center mt-8 text-gray-400">
          ¿Nuevo en NEW BODY?{" "}
          <Link href="/register" className="text-red-500 font-semibold hover:underline">
            Crear cuenta
          </Link>
        </p>

      </div>
    </div>
  )
}