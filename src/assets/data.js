export const data_options_radio = [
    {
        question:'What is your preference for power',
        name:'power',

        options:[
            {
                name:'gas',
                img_path:'../../assets/marcador-de-posicion.png'
            },
            
            {
                name:'battery',
                img_path:'../../assets/marcador-de-posicion.png'
            },
            
            {
                name:'electric',
                img_path:'../../assets/marcador-de-posicion.png'
            },
        ],
        
        isIcon: true,
    },
    {
        question:'How frequent do you plan  on working on your lawn',
        name:'frequent',
        options:[
            {
                name:'infrequent',
                subtitle:'once or Twice/month'
            },
            {
                name:'Frequent',
                subtitle:'weekly'
            },
            {
                name:'constant',
                subtitle:'daily'
            },
        ],
        isIcon: false,
    },
    {
        question:'How heavy is the vegetation on your property',
        name:'vegetation',
        options:[
            {
                name:'light',
                subtitle:'small shrubs'
            },
            {
                name:'medium',
                subtitle:'small to medium sizes trees and shrubs'
            },
            {
                name:'heavy',
                subtitle:'large trees and forestation'
            },
        ],
        isIcon: false,
    },
]

