
async function cepCalculator({cep, quantity}: {cep: string, quantity: number}) {
    const res = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',{
        headers:{
            'Content-Type': 'application/json',

            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTMzYzE3M2U4MjRlMTdmMDZkYWQwNzg4YTcyN2MzZTI5YmI5YTJiZWE4MDU5MTM2MjEwMzc1YTg3MWIyYWI4MGFkYzIxOGVlMDc4ODIwMmMiLCJpYXQiOjE3MTIxODMxNzkuMjEzMjUzLCJuYmYiOjE3MTIxODMxNzkuMjEzMjU0LCJleHAiOjE3NDM3MTkxNzkuMTkxMDU5LCJzdWIiOiI5YmI4YzQ4OS1lYjdlLTQyMGMtYjk3ZC05ZjZkZGYxMzY4YTkiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.R3z5FmzZvQmqHB0O69W-sa4bC3CaPcKJUaAW8KD92osrwDdXuiKNeFgNan15bcJrpQNnrk-RCXhB5E8UBl0LQQyBU7WzMhEXuOk87tU42Lf4BQdgI2q2atBmKLPFIqIaJvzP0Llui_yMVOd5AQR5wJv1ZQX8zDMrRy84ScgDtCo-0yp11I9ClqFp4l3Bmo4AX9Tz0npXACYWWu2LrSVvOLGji2YVlEi1HAmTLPgXkGxqVB22DihK0nCkRjXVu1VaV-wlbRPfz7SDKSEAC3GkKq18rVyq7tFQ61tjupNy5z6v02jXyKjvvjNKkziTBvOuiVkEzwvwiM-Cz170acdgJAHJnC6dfGRgrRaB6WPh8FbuDBlhtbOzeCgbKFtCCAo27kwD8X26IboVtBOomQvU-zgy08y8LlEZjblb-UJ7xvmytTDTmzrzb-_Ig9-H4jeepQ8fK1D81ToA2idd3FXVLQ2YmPFFuxjzWOQ-cLL3Vl4B1chUfB8C727Yykqcz-95tJbLZWaoatEwI_Y_aYzYvsREVUWKfX0mOvYNY5lczz-x91F626MZqABlXQUMngGQfaiVO9rQb3EzkxdHTCanKv6amMXGxk67WY6ZYeR09FD2KvG5MQcW_KF4-HaSoEZqFWooHoqsWQmWA25cKod2nhUF426_iUi2pH-G8WzuDEg`,

            'Accept': 'application/json',
            'User-Agent': 'Aplicação andradefj13@hotmail.com'
        },
        method: 'POST',
        body: JSON.stringify({
            "from": {
                "postal_code": "45470000"
            },
            "to": {
                "postal_code": cep
            },
            "products": [
                {
                    "id": "x",
                    "width": 11,
                    "height": 17,
                    "length": 11,
                    "weight": 0.3,
                    "insurance_value": 10.1,
                    "quantity": quantity
                }
            ],
            "options": {
                "receipt": false,
                "own_hand": false
            },
            "services": "1,2"
        })
    })

    console.log(await res.json())
}







export const cepService = {
    cepCalculator
}