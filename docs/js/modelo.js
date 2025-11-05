const modelos = {
    "circle":{
        "objetos":[
            {

                "pitch":  -6.04,
                "yaw":  -120.19,
                "cssClass": "custom-hotspot",
                "createTooltipArgs": {
                    "titulo":"Smith",
                    "descripcion":`
                    Máquina guiada que permite levantar peso con seguridad, mejorando fuerza, técnica y estabilidad en distintos ejercicios`,
                    "url":[
                        {"titulo":"Press Plano 1","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                        {"titulo":"Press Plano 2","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                        {"titulo":"Press Plano 3","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                        ],
                    "pitch": -6.04,
                    "yaw": -120.19,
                }
            },  
             {
                "pitch": -20.19,
                "yaw": -151.16,
                "cssClass": "custom-hotspot",
                "createTooltipArgs": {
                    "titulo":"RELOS GIGANTE",
                    "descripcion":`
                        Una reloj copada, todos queremos un reloj, 
                        yo quiero un reloj tu quieres una reloj, ella quiere una reloj, metele wacho
                        mira esta tremenda es de colores y tiene waifai incluido

                        `, "url":[
                            {"titulo":"Press Plano 4","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                            {"titulo":"Press Plano 5","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                                 ],
                    "pitch": -20.19,
                    "yaw": -151.16,
                }
            },  
        ],
        "salidas":[
            {       
                "id":0,
                "pitch": 2.95,
                "yaw": -83.60,
                "type": "scene",
                "sceneId": "1",
                "cssClass": "custom-exit",
            },  
        ],
    },
    "house":{
            "objetos":[
            {
                "pitch": -20.19,
                "yaw": -151.16,
                "cssClass": "custom-hotspot",
                "createTooltipArgs": {
                    "titulo":"RELOS GIGANTE",
                    "descripcion":`
                        Una reloj copada, todos queremos un reloj, 
                        yo quiero un reloj tu quieres una reloj, ella quiere una reloj, metele wacho
                        mira esta tremenda es de colores y tiene waifai incluido

                        `, "url":[
                            {"titulo":"Press Plano 4","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                            {"titulo":"Press Plano 5","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                                 ],
                    "pitch": -20.19,
                    "yaw": -151.16,
                }
            },  
        ],
        "salidas":[
            {       
                "id":1,
                "pitch": -8.27,
                "yaw":  53.44,
                "type": "scene",
                "cssClass": "custom-exit",
                "text": "",
                "sceneId": "0"

            },  
             {       
                "id":2,
                "pitch": -9.08,
                "yaw":  -42.33,
                "type": "scene",
                "cssClass": "custom-exit",
                "text": "",
                "sceneId": "2"

            },  
        ],
    },
    "cuarto":{
            "objetos":[
            {
                "pitch": -42.38,
                "yaw": 32.36,
                "cssClass": "custom-hotspot",
                "createTooltipArgs": {
                    "titulo":"RELOS GIGANTE",
                    "descripcion":`
                        Una reloj copada, todos queremos un reloj, 
                        yo quiero un reloj tu quieres una reloj, ella quiere una reloj, metele wacho
                        mira esta tremenda es de colores y tiene waifai incluido

                        `, 
                        "url":[
                            {"titulo":"Press Plano 1","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                            {"titulo":"Press Plano 2","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                            {"titulo":"Press Plano 3","link":"https://www.youtube.com/embed/CQ6V6o7VXcQ?si=maL-MM05y8CQYB46"},
                        ],
                    "pitch": -42.38,
                    "yaw": 32.36,
                }
            },  
        ],
        "salidas":[  
             {       
                "id":2,
                "pitch":  -19.03,
                "yaw":  82.30,
                "type": "scene",
                "cssClass": "custom-exit",
                "text": "",
                "sceneId": "1"

            },  
        ],
    }
}
const cuartos = [
    {
        "id":"0",
        "nombre": "circle",
        "url":"https://www.luofluck.tech/360/8-min.jpeg",
        "modelos":modelos.circle.objetos,
        "salidas":modelos.circle.salidas,

    },
    {
        "id":"1",
        "nombre": "house",
        "url":"https://www.luofluck.tech/360/7-min.jpeg",
        "modelos":modelos.house.objetos,
        "salidas":modelos.house.salidas,
    },

]
