
"use client";

import { useState } from "react";
import { sendToN8N } from "../app/actions/sendToN8N";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const result = await sendToN8N({ name, email });

    setLoading(false);

    if (result.ok) {
      alert("¡Se envió correctamente!");
      form.reset();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <main className="w-full max-w-lg mx-auto p-6">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6">

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Formulario de contacto</h1>
          <p className="text-sm text-gray-500 mt-1">
            Envía tu nombre y correo. Se enviará automáticamente a n8n.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-6">

          {/* Nombre */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Nombre</span>
            <input
              name="name"
              placeholder="Ingresa tu nombre"
              required
              className="border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 outline-none
                         focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Correo electrónico</span>
            <input
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
              className="border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 outline-none
                         focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </label>

          {/* Botones */}
          <div className="flex justify-between items-center">

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg text-white font-medium shadow
                       bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                       transition-all active:scale-95 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>

            <button
              type="button"
              onClick={() => {
                (
                  document.querySelector('input[name="name"]') as HTMLInputElement
                ).value = "";
                (
                  document.querySelector('input[name="email"]') as HTMLInputElement
                ).value = "";
              }}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}