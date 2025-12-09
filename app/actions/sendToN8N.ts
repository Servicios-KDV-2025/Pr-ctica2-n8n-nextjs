"use server";

export async function sendToN8N(data: { name: string; email: string }) {
  try {
    // Validación básica
    if (!data.name || !data.email) {
      return { ok: false, error: "Faltan datos." };
    }

    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { ok: false, error: "Error al enviar datos a n8n." };
    }

    return { ok: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { ok: false, error: "Error interno del servidor." };
  }
}
