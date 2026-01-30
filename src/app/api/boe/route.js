export async function GET(request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date) {
    return new Response(JSON.stringify({ error: "date is required" }), {
      status: 400,
    });
  }
  
  try {
    const response = await fetch(
      `https://boe.es/datosabiertos/api/boe/sumario/${date}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      },
    );
    const data = await response.json();

    data.data.sumario.diario[0].seccion.forEach(element => {
      console.log(element);
    });

    return Response.json(data.data.sumario.diario[0].seccion);
  } catch (error) {
    return new Response(
      JSON.stringify({error: "Internal server error"}),
      {status:500}
    )
  }
}
