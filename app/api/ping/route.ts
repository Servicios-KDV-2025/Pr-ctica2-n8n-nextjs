export async function GET() {
  return Response.json({
    message: "Ping recibido!",
    time: Date.now(),
  });
}
