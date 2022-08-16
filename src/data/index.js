import {
    ControleQualite,
    EthiqueDeontologie,
    ExerciceProfession,
    ResponsableProfessionel,
} from "./images";

const themes = [{
        id: 1,
        title: "Ethique & Deontologie",
        slug: "ethique_&_deontologie",
        cover: EthiqueDeontologie,
        description: "Connaitre et savoir appliquer les elements fondamentaux de comportement de des autres textes lies a l'etique",
        contents: [{
            _id: "1a",
            title: "Cadre légal et réglementaire",
            questions: [{
                _id: "2a",
                text: "Is this your first question",
                type: "multi",
                score: 2,
                answers: [],
                correctAnswers: [],
            }, ],
        }, ],
    },
    {
        id: 2,
        title: "Exercice de la profession",
        slug: "exercice_de_la_profession",
        cover: ExerciceProfession,
        description: "This is a short description",
        contents: [{
            _id: "1b",
            title: "Cadre légal et réglementaire",
            questions: [{
                _id: "2b",
                text: "Is this your first question",
                type: "multi",
                score: 2,
                answers: [],
                correctAnswers: [],
            }, ],
        }, ],
    },
    {
        id: 3,
        title: "Controle de qualite",
        slug: "controle_de_qualite",
        cover: ControleQualite,
        description: "This is a short description",
        contents: [{
            _id: "1c",
            title: "Cadre légal et réglementaire",
            questions: [{
                _id: "2c",
                text: "Is this your first question",
                type: "multi",
                score: 2,
                answers: [],
                correctAnswers: [],
            }, ],
        }, ],
    },
    {
        id: 4,
        title: "Responsable du professionel",
        slug: "responsable_du_professionel",
        cover: ResponsableProfessionel,
        description: "This is a short description",
        contents: [{
            _id: "id",
            title: "Cadre légal et réglementaire",
            questions: [{
                _id: "2d",
                text: "Is this your first question",
                type: "multi",
                score: 2,
                answers: [],
                correctAnswers: [],
            }, ],
        }, ],
    },
];

export { themes };