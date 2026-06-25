export async function POST() {
  return Response.json(
    { message: 'Endpoint dismesso: utilizzare /api/checkout' },
    { status: 410 },
  )
}
