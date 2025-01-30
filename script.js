/* --------------FONCTIONS--------------- */

// Fonction qui permet d'ouvrir ou de fermer le popup
function togglePopup() {
    var popup = document.querySelector("#popup-overlay"); // Sélectionne l'élément popup avec l'ID
    popup.classList.toggle("open"); // Permet d'ajouter ou retirer la classe "open" pour afficher ou masquer la popup
}

//Fonction qui permet de gérer la lecture et la pause des audios
function lectureAudio() {
    const audioElements = document.querySelectorAll('.audio'); // Sélectionne toutes les balises audio
    const playPauseButtons = document.querySelectorAll('.playPause'); // Sélectionne tous les boutons
    var musiqueEnCours = null; // Variable pour stocker le fichier audio actuellement en lecture
    var boutonEnCours = null; // Variable pour stocker le bouton associé à la musique en cours

    playPauseButtons.forEach(function (button, index) {
        const audio = audioElements[index]; // Permet d'associé chaque bouton à son fichier audio

        /* Evenement qui permet de gérer les différentes situations */
        button.addEventListener('click', function () {
            if (musiqueEnCours === audio) { // Si ce fichier audio est déjà en cours
                if (audio.paused) { // Si le fichier audio est en pause
                    audio.play(); // Reprend la lecture
                    button.innerHTML = '⏸'; // Change l'icône du bouton
                    console.log('Lecture reprise');
                } 
                else { // Si le fichier est déjà en cours.
                    audio.pause(); // Met le fichier en pause
                    button.innerHTML = '⏵'; // Change l'icône du bouton
                    console.log('Lecture mise en pause');
                }
            } 
            else { // Si un autre fichier audio est en cours
                if (musiqueEnCours && !musiqueEnCours.paused) {
                    musiqueEnCours.pause(); // Met l'autre fichier en pause
                    boutonEnCours.innerHTML = '⏵'; // Permet de réinitialisé l'icône du bouton précédent
                    console.log('Lecture mise en pause');
                }

                audio.play(); // Joue le fichier audio
                button.innerHTML = '⏸'; // Change l'icône
                console.log('Lecture lancée');

                musiqueEnCours = audio; // Permet de mettre la variable à jour pour indiquer le fichier en cours
                boutonEnCours = button; // Permet de mettre la variable à jour pour indiquer le bouton associé
            }
        });

        // Evenement qui permet de réinitialiser l'état du bouton quand la lecture est finis
        audio.addEventListener('ended', function () {
            button.innerHTML = '⏵'; // Réinitialise l'icône
            console.log('Lecture terminée');
            if (musiqueEnCours === audio) {
                musiqueEnCours = null; // Réinitialise la variable
                boutonEnCours = null; // Réinitialise le bouton associé
            }
        });
    });
}

// Permet de gérer l'affichage des menus déroulants
function menuDeroulant() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle'); // Permet de sélectionne tous les chevrons
    const dropdownContents = document.querySelectorAll('.dropdown-content'); // Permet de sélectionne tous les contenus des menus déroulants

    dropdownToggles.forEach(function (toggle, index) {
        const content = dropdownContents[index]; // Permet d'associé chaque bouton à son contenu déroulant

        // Evenement qui permet d'afficher ou de masquer le contenu 
        toggle.addEventListener('click', function () {
            const estVisible = content.style.display === 'block'; // Permet de vérifier si le contenu est visible
            if (estVisible) {
                content.style.display = 'none'; // Permet de cacher le contenu
            } 
            else {
                content.style.display = 'block'; // Permet d'afficher le contenu
            }
        });

        // Evenement qui permet de masquer le contenu  quand la souris quitte le menu
        const container = toggle.closest('.dropdown-container'); // Trouve le conteneur parent le plus proche
        container.addEventListener('mouseleave', function () {
            content.style.display = 'none'; // Permet de cacher le contenu
        });
    });
}

// Fonction qui permet de créer un défilement vers une catégorie précise de la page
function defilement() {
    const navLien = document.querySelectorAll('nav a'); // Permet de sélectionner tous les liens dans la navbar

    navLien.forEach(function (Lien) {
        Lien.addEventListener('click', function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            const categorieCible = this.getAttribute('data-target'); // Permet de récupérer la valeur de l'attribut
            const categorieElement = document.querySelector('section[data-category="' + categorieCible + '"]'); // Permet de sélectionner la catégorie

            if (categorieElement) { // Si la catégorie existe
                categorieElement.scrollIntoView({
                    behavior: 'smooth', // Permet d'avoir un défilement fluide
                });
            }
        });
    });
}

// Fonction qui permet de mettre ajour l'affichage des musiques d'une catégorie précise
function rechargerCategorie(categorie, musiquesParCategorie, template) {
    const container = document.querySelector('.liste-musiques'); // Permet de sélectionner le conteneur
    container.innerHTML = ''; // Permet de vidé le contenu actuel

    // Permet de définir l'ordre des catégories à afficher
    const ordreCategories = ["Top des écoutes", "L'univers de Gazo", "Les featurings"];
    ordreCategories.forEach(function (categorieNom) {
        if (musiquesParCategorie[categorieNom]) { // Si des musiques existent pour la catégorie
            var sectionHTML = '<section class="categorie" data-category="' + categorieNom + '">';
            sectionHTML += '<h2 class="category-title">' + categorieNom + '</h2>';
            sectionHTML += '<div class="music-list">';

            musiquesParCategorie[categorieNom].forEach(function (elt, index) {
                var alignmentClass = ''; // On définit la classe pour aligner à gauche ou à droite
                if (index % 2 === 1) {
                    alignmentClass = 'music-right';
                }

                sectionHTML += '<div class="music-item ' + alignmentClass + '">' + template
                    .replace('{{musique}}', elt.musique)
                    .replace('{{artiste}}', elt.artiste)
                    .replace('{{label}}', elt.label)
                    .replace('{{annee}}', elt.annee)
                    .replace('{{description}}', elt.descriptionMusicale)
                    .replace('{{choix}}', elt.choixMusique)
                    .replace('{{extraitAudio}}', elt.extraitAudio)
                    .replace('{{Spotify}}', elt.Spotify)
                    .replace('{{Deezer}}', elt.Deezer)
                    .replace('{{ytb}}', elt.ytb)
                    .replace('{{image}}', elt.image) + '</div>'; // Remplace les {} dans le template
            });

            sectionHTML += '</div></section>';
            container.innerHTML += sectionHTML;
        }
    });

    // Permet d'ajouter une alerte de confirmation pour les liens
    document.querySelectorAll('.music-list a, .credit-content a').forEach(function (lien) {
        lien.addEventListener('click', function (event) {
            const confirmation = confirm("Êtes-vous sûr de vouloir l'ouvrir dans une nouvelle fenêtre ?");
            if (!confirmation) {
                event.preventDefault(); // Permet d'annuler l'ouverture du lien si l'utilisateur le fait
            }
        });
    });

    lectureAudio(); // Réinitialise les gestionnaires pour l'audio
    menuDeroulant(); // Réinitialise les gestionnaires pour les menus déroulants
}

/* ---------------FONCTIONNEMENT--------------- */

document.addEventListener('DOMContentLoaded', function () { // Permet d'exécute le code une fois que le DOM est entièrement chargé
    fetch('musiques.json') // Charge le fichier JSON qui contient les informations des musiques
        .then(function (response) { 
            return response.json(); // Permet de convertir la réponse en JSON
        })
        .then(function (data) {
            fetch('template.html') // Charge le fichier HTML pour les sections des musiques.
                .then(function (responseTemplate) {
                    return responseTemplate.text(); // Permet de convertir la réponse en texte
                })
                .then(function (template) {
                    var container = document.querySelector('.liste-musiques'); // Permet de sélectionner le conteneur principale où les musiques seront affichées

                    var musiquesParCategorie = {}; // Permet d'initialiser un objet pour regrouper les musiques par catégorie
                    data.forEach(function (elt) { // Permet de parcourir chaque musique dans les données chargées
                        if (!musiquesParCategorie[elt.categorie]) { // Permet de vérifier si la catégorie existe déjà dans l'objet
                            musiquesParCategorie[elt.categorie] = []; // Si non, on initialise un tableau pour cette catégorie
                        }
                        musiquesParCategorie[elt.categorie].push(elt); // Permet d'ajouter la musique à la catégorie correspondante
                    });

                    var ordreCategories = ["Top des écoutes", "L'univers de Gazo", "Les featurings"]; // Permet de définit l'ordre d'affichage
                    ordreCategories.forEach(function (categorie) { // Permet de parcourir chaque catégorie dans l'ordre défini
                        if (musiquesParCategorie[categorie]) { // Permet de vérifier si des musiques existent pour cette catégorie
                            var sectionHTML = '<section class="categorie" data-category="' + categorie + '">';
                            sectionHTML += '<h2 class="category-title">' + categorie + '</h2>';
                            sectionHTML += '<div class="music-list">';

                            musiquesParCategorie[categorie].forEach(function (elt, index) { // Permet de Parcourir chaque musique de la catégorie
                                var alignmentClass = ''; // Permet d'initialisé la classe pour l'alignement
                                if (index % 2 === 1) { // Permet d'alterner l'alignement entre gauche et droite.
                                    alignmentClass = 'music-right'; 
                                }

                                sectionHTML += '<div class="music-item ' + alignmentClass + '">' + template
                                        .replace('{{musique}}', elt.musique)
                                        .replace('{{artiste}}', elt.artiste)
                                        .replace('{{label}}', elt.label)
                                        .replace('{{annee}}', elt.annee)
                                        .replace('{{description}}', elt.descriptionMusicale)
                                        .replace('{{choix}}', elt.choixMusique)
                                        .replace('{{extraitAudio}}', elt.extraitAudio)
                                        .replace('{{Spotify}}', elt.Spotify)
                                        .replace('{{Deezer}}', elt.Deezer)
                                        .replace('{{ytb}}', elt.ytb)
                                        .replace('{{image}}', elt.image) + '</div>';
                            });

                            sectionHTML += '</div></section>'; // Termine la section HTML de la catégorie.
                            container.innerHTML += sectionHTML; // Ajoute la section au conteneur principal.
                        }
                    });

                    rechargerCategorie(null, musiquesParCategorie, template); // Appel de la fonction rechargerCategorie pour mettre à jour l'affichage des musiques
                    defilement(); // Appel de la fonction defilement

                    var submitButton = document.getElementById('submitButton'); // Sélectionne le bouton pour soumettre une nouvelle musique
                    
                    submitButton.addEventListener('click', function () {
                        var titre = document.getElementById("titre").value; // Permet de récupérer le titre saisi
                        var descriptionMusique = document.getElementById("description").value;
                        var artist = document.getElementById("artist").value;
                        var label = document.getElementById("label").value;
                        var year = document.getElementById("year").value;
                        var choix = document.getElementById("choix").value;
                        var category = document.getElementById("category").value;
                        var spotify = document.getElementById("spotify").value;
                        var deezer = document.getElementById("deezer").value;
                        var ytb = document.getElementById("ytb").value;
                        var audioFile = document.getElementById("audioFile").files[0];
                        var imageFile = document.getElementById("imageFile").files[0];

                        if (!musiquesParCategorie[category]) { // Vérifie si la catégorie existe déjà.
                            musiquesParCategorie[category] = []; // Si non, initialise un tableau pour cette catégorie.
                        }

                        var audioURL = URL.createObjectURL(audioFile); // Crée une URL temporaire pour le fichier audio.
                        var imageURL = URL.createObjectURL(imageFile); // Crée une URL temporaire pour le fichier image.

                        musiquesParCategorie[category].push({ // Ajoute la nouvelle musique à la catégorie correspondante.
                            musique: titre,
                            artiste: artist,
                            label: label,
                            annee: year,
                            descriptionMusicale: descriptionMusique,
                            choixMusique: choix,
                            extraitAudio: audioURL,
                            Spotify: spotify,
                            Deezer: deezer,
                            ytb: ytb,
                            image: imageURL
                        });

                        rechargerCategorie(null, musiquesParCategorie, template); // Recharge toutes les catégories après l'ajout.
                        alert("Musique ajoutée avec succès !"); // Affiche un message de confirmation.

                        // Réinitialise tous les champs du formulaire.
                        document.getElementById("titre").value = "";
                        document.getElementById("description").value = "";
                        document.getElementById("audioURL").value = "";
                        document.getElementById("imageURL").value = "";
                        document.getElementById("artist").value = "";
                        document.getElementById("label").value = "";
                        document.getElementById("year").value = "";
                        document.getElementById("choix").value = "";
                        document.getElementById("category").value = "";
                        document.getElementById("spotify").value = "";
                        document.getElementById("deezer").value = "";
                        document.getElementById("ytb").value = "";
                        document.getElementById("audioFile").value = "";
                        document.getElementById("imageFile").value = "";

                    });
                });
        })
});