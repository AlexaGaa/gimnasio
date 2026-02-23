"use client"

import { useEffect, useState } from "react"

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      applySettings(settings)
      setFontSize(settings.fontSize || 16)
    }
  }, [])

  const applySettings = (settings: any) => {
    document.documentElement.style.fontSize = settings.fontSize + "px"

    document.body.classList.toggle("high-contrast", settings.contrast)
    document.body.classList.toggle("grayscale", settings.grayscale)
    document.body.classList.toggle("highlight-links", settings.links)
    document.body.classList.toggle("text-spacing", settings.spacing)
  }

  const updateSettings = (newSettings: any) => {
    const current = {
      fontSize,
      contrast: document.body.classList.contains("high-contrast"),
      grayscale: document.body.classList.contains("grayscale"),
      links: document.body.classList.contains("highlight-links"),
      spacing: document.body.classList.contains("text-spacing"),
      ...newSettings,
    }

    applySettings(current)
    localStorage.setItem("accessibilitySettings", JSON.stringify(current))
  }

  const increaseFont = () => {
    const newSize = fontSize + 2
    setFontSize(newSize)
    updateSettings({ fontSize: newSize })
  }

  const decreaseFont = () => {
    const newSize = Math.max(14, fontSize - 2)
    setFontSize(newSize)
    updateSettings({ fontSize: newSize })
  }

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl transition transform hover:scale-110"
        aria-label="Opciones de accesibilidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <circle cx="12" cy="4" r="2" />
          <path d="M12 6c-3 0-5 2-5 5h2c0-2 1-3 3-3s3 1 3 3h2c0-3-2-5-5-5zm-1 6v8h2v-8h-2z" />
        </svg>
      </button>

      {/* PANEL */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black text-white shadow-2xl transform transition-transform duration-300 z-40 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold border-b border-gray-700 pb-2">
            Accesibilidad
          </h2>

          <div className="space-y-3">
            <button onClick={increaseFont} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Aumentar Fuente +
            </button>

            <button onClick={decreaseFont} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Reducir Fuente –
            </button>

            <button onClick={() => updateSettings({ contrast: !document.body.classList.contains("high-contrast") })} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Alto Contraste
            </button>

            <button onClick={() => updateSettings({ grayscale: !document.body.classList.contains("grayscale") })} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Escala de Grises
            </button>

            <button onClick={() => updateSettings({ links: !document.body.classList.contains("highlight-links") })} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Resaltar Enlaces
            </button>

            <button onClick={() => updateSettings({ spacing: !document.body.classList.contains("text-spacing") })} className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              Espaciado de Texto
            </button>
          </div>
        </div>
      </div>
    </>
  )
}