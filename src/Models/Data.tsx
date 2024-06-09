import admin_image from '../assets/img/HomePage_Accueil/admin.jpg';
import installation_image from '../assets/img/HomePage_Accueil/installation_visual_planning_entreprise.jpg';
import manipulation_image from '../assets/img/HomePage_Accueil/manipulation_donnees.jpg';
import agencement_image from '../assets/img/HomePage_Accueil/agencement_visualisation.jpg';
import modules_image from '../assets/img/HomePage_Accueil/module.jpg';
import presentation_image from '../assets/img/HomePage_Accueil/fond_presentation.jpg';
import api_image from '../assets/img/HomePage_Accueil/bandeau_doc_api.jpg';
import definition_image from '../assets/img/HomePage_Accueil/Définition.jpg';

// Définition de la structure des données pour la page d'accueil
const Data = {
    "Presentation de Visual Planning": {
        "image" : presentation_image,
        "Pourquoi Visual planning ?": {
            "Slug": "presentation-generale"
        },
    },

    "Installation et mise a jour de Visual Planning": {
        "image" : installation_image,
        "Les prerequis techniques": {
            "Slug": "installation-et-mise-a-jour-de-visual-planning-entreprise-prerequis"
        },
        "Architecture de VP Entreprise": {
            "Slug": "architecture-de-visual-planning"
        },
        "Installation de VP Entreprise": {
            "Slug": "installation-de-vp-enterprise"
        },
        "Connexion au SGBD": {
            "Slug": "connexion-au-sgbd"
        },
        "Mise a jour majeure de VP Entreprise": {
            "Slug": "mise-a-jour-majeure-de-vp-enterprise"
        },
        "Mise a jour mineure de VP Entreprise": {
            "Slug": "mise-a-jour-mineure-de-vp-enterprise"
        },
        "Desinstallation de VP Entreprise": {
            "Slug": "mise-a-jour-mineure-de-vp-enterprise"
        }
    },

    "Définition de la structure de Visual Planning": {
        "image" : definition_image,
        "Paramètres généraux": {
            "Slug": "les-parametres-generaux"
        },
        "Dimension": {
            "Slug": "dimension"
        },
        "Formulaire": {
            "Slug": "formulaire"
        },
        "Icône": {
            "Slug": "icone"
        },
        "Rubriques": {
            "Slug": "rubrique-affichage"
        },
        "Période de temps": {
            "Slug": "periode-de-temps"
        },
        "Poste de valorisation": {
            "Slug": "poste-de-valorisation"
        },
        "Règle de création": {
            "Slug": "regle-de-creation"
        },
        "Hiérarchie d’événements": {
            "Slug": "hierarchie-evenements"
        },
        "Workflows": {
            "Slug": "workflows"
        }
    },

    "Manipulation des données": {
        "image" : manipulation_image,
        "Affectation d'une ressource": {
            "Slug": "affectation-dune-ressource"
        },
        "Calendrier": {
            "Slug": "calendrier"
        },
        "Charge": {
            "Slug": "charge"
        },
        "Durée": {
            "Slug": "duree"
        },
        "Déplacement": {
            "Slug": "deplacement"
        },
        "Filtre": {
            "Slug": "filtre"
        },
        "Liens": {
            "Slug": "lien"
        },
        "Menus contextuels": {
            "Slug": "menu-contextuel"
        },
        "Ordonnancement d’événements": {
            "Slug": "ordonnancement-devenements"
        },
        "Recherche, sélection, tri": {
            "Slug": "recherche"
        },
        "Événement et ressource": {
            "Slug": ""
        },
        "Événement": {
            "Slug": ""
        },
        "Ressource": {
            "Slug": ""
        }
    },

    "Agencement et visualisation": {
        "image" : agencement_image,

        "Fenêtre principale": {
            "Slug": ""
        },
        "Barres de menus": {
            "Slug": ""
        },
        "Tableau de bord": {
            "Slug": ""
        },
        "Gestion et disposition des vues": {
            "Slug": ""
        },
        "Éditeur de ressources": {
            "Slug": ""
        },
        "Éditeur d’événements": {
            "Slug": ""
        },
        "Echelle de temps": {
            "Slug": ""
        },
        "Aides visuelles": {
            "Slug": ""
        }
    },

    "Modules de Visual Planning": {
        "image" : modules_image,

        "Calendriers internet": {
            "Slug": ""
        },
        "Envoi de mails, de sms": {
            "Slug": ""
        },
        "Flux RSS": {
            "Slug": ""
        },
        "Géolocalisation": {
            "Slug": ""
        },
        "VPBlueprint": {
            "Slug": ""
        },
        "VPPublipost": {
            "Slug": ""
        },
        "VPWhatsUp": {
            "Slug": ""
        }
    },
    "API WebServices": {
        "image" : api_image,

        "Introduction": {
            "Slug": ""
        },
        "SOAP WebService": {
            "Slug": ""
        },
        "REST WebService": {
            "Slug": ""
        }
    },
    "Administration de Visual Planning": {
        "image" : admin_image,

        "Admin Center": {
            "Slug": ""
        },
        "Les licences": {
            "Slug": ""
        },
        "Les services": {
            "Slug": ""
        },
        "Les modules": {
            "Slug": ""
        },
        "Les utilisateurs, les permissions": {
            "Slug": ""
        },
        "Gestion des plannings": {
            "Slug": ""
        },
        "Les logs": {
            "Slug": ""
        },
        "Stockage de fichiers": {
            "Slug": ""
        }
    }
};

export default Data;