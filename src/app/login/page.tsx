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
    <div className="min-h-screen flex items-center justify-center bg-yellow-400 px-6">

      <div className="w-full max-w-md bg-blue-600 rounded-3xl p-10 text-white shadow-2xl">

        <h1 className="text-4xl font-extrabold text-center mb-4 text-black">
          VERSION NUEVA 2026
        </h1>

        <p className="text-center text-white mb-8 text-sm">
          Si ves esto, el deploy funciona
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-white">Correo electrónico</label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full p-4 rounded-xl bg-white text-black border border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-white">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full p-4 rounded-xl bg-white text-black border border-gray-300"
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition font-semibold p-4 rounded-xl disabled:opacity-60 text-black"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        <div className="mt-8 text-center text-white text-sm">
          ¿Nuevo usuario?{" "}
          <Link
            href="/register"
            className="text-black font-bold underline"
          >
            Crear cuenta
          </Link>
        </div>

      </div>
    </div>
  )
}