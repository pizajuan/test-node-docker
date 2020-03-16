const fetch = require('node-fetch');

class FirebaseController {
    // TODO: se debe realizar la suscripcion de las aplicaciones a los topics
    // TODO: se debe manejar en base de datos de firebase todas las key de las aplicaciones suscriptas asi como los topics q se manejan
    static async send(req, res, next) {
        try {
            //Esto es el token de la aplicacion destino
            const registrationToken = 'dzF-F3NSgQGXzXI6npO_Q6:APA91bFOd3do4ZfTVyp-nTsrAEauPk1uxbO01z5cJzaY3ps8CLjvDP5lNDesp76hRB3dh_wAPlFVq1gLH0Xls_XeNbZPnbOruWWApw8mQELvf5jc1_xm2XN_swFPJNZXz9Xow79m-huf';
            const body = {
                notification: {
                    "data": {
                        "name": "juan",
                        "age": 30,
                        "gender": "M"
                    },
                    "notification": { //Se envia solo si queremos mostrar la notificacion en la pantalla
                        "title": "Nuevo Mensaje",
                        "body": "Te llegó toda la Info"
                    },
                },
                to: registrationToken
            };

            //Authorization: Esta es la key de la aplicacion
            //https://console.firebase.google.com/u/1/project/test-teekit/settings/cloudmessaging/web:MmE5NzAyODItMDM3ZC00OWNlLWI1NDgtNDU5ZGM5YjMyYmQ1
            //Settings -> Cloud Messaging (Legacy server key)
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyCDjyFFlmtB6zTbxLvBRQniaOHWmO6l68s'
            }

            const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'post',
                body: JSON.stringify(body),
                headers: headers
            });
            const data = await response.json();
            res.status(200).json({
                message: 'Handling GET requests to /firebase',
                result: data
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async createProduct(req, res, next) {
        // https://www.jeansnyman.com/posts/google-firestore-rest-api-examples/
        const product = req.body;
        console.log(product);
        const headers = {
            'Content-Type': 'application/json',
        }

        const response = await fetch('https://firestore.googleapis.com/v1/projects/test-teekit/databases/(default)/documents/products', {
            method: 'post',
            body: JSON.stringify(product),
            headers: headers
        });
        const data = await response.json();
        res.status(200).json({
            message: 'Handling GET requests to /products/create',
            result: data
        });
    }

    static async listProducts(req, res, next) {
        // const product = req.body.product;
        console.log('list products');

        const response = await fetch('https://firestore.googleapis.com/v1/projects/test-teekit/databases/(default)/documents/products', {
            method: 'get'
        });
        const data = await response.json();
        res.status(200).json({
            message: 'Handling GET requests to /products/list',
            result: data
        });
    }
}


module.exports.FirebaseController = FirebaseController;