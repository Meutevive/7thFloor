# 7th floor

![7thfloor](https://user-images.githubusercontent.com/67522046/229477486-5fe0d0bd-b2bc-4ade-beee-d8fe3c50b91d.png)

## Description

Ce projet est un site dans le domaine de la cinématographie, les utilisateurs pourront consulter les films, poster des reviews et des commentaires.
L'administrateur peut ajouter des films, des acteurs, des réalisateurs et des actualités. 

## Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## Installation

### Démmarer le client en local

```bash
  cd cinematheque
  cd client
  npm install
```

### Démmarer le serveur en local

Nous vous recommendons d'utiliser **intelliJ** qui reconnait directement le projet **spring boot** et appuyer sur le **run**.
Sinon on peut utiliser visual studio code et onvrir le fichier **CinemathequeApplication** et **run** l'application.  

### Accés à la base de donnée
Pour mettre tes propres accés à la base de donnée: **modifier** le fichier **src\main\resources\application.properties**

## Référencement des apis

#### Récupérer tous les ressources

```http
  GET /api/v1/{ressources}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ressources` | `string` | **Required**. la ressource peut être: users, films, articles, acteurs |

#### Récupérer une ressource  par l'id

```http
  GET /api/{ressource}/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la ressource que l'on veut récupérer |

#### Récupérer une ressource  par le username

```http
  GET /api/{ressource}/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Username de la ressource que l'on veut récupérer |

#### Récupérer une ressource  par le username

```http
  GET /api/{ressource}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `RequestBody`      | `{ressource}` | **Required**. La nouvelle ressource à modifié |

#### supprimer une ressource

```http
  DELETE /api/{ressource}/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la ressource à supprimer |

#### Créer une nouvelle ressource

```http
  POST /api/v1/{ressource}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ressource`      | `string` | **Required**. le type de ressource à creer. |

## Page d'inscription

![image](https://user-images.githubusercontent.com/67522046/211048045-1278a26a-ed1f-4a78-a2e0-5cbc77e528a9.png)

###  Validation des inputs

- Le nom et le prénom sont obligatoires.
- L'identifiant doit avoir au moins 6 charactéres.
- Le mot de passe doit avoir au moins un 8 charactéres, un charactére majuscule, un charactére minuscule, un charactére spécial et un chiffre.
- Confirmation du mot de passe.
- Checkbox pour accépter les conditions d'utilisation.

## Page de connection

![co](https://user-images.githubusercontent.com/67522046/229521610-a41f1899-0efb-4cff-8760-f4890c5546d5.PNG)

- Support le mot de passe oublié et connection via les apis: google, facebook et twitter.

## Organisation des fichiers

### Partie client

#### components

Ce dossier regroupe tous les composants micro ou macros réutilisables dans l'application.

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Button`      | `text` | le texte sur le bouton |
|     | `type` | le type du bouton: normal, submit, link |
|     | `color` | couleur du bouton: white, red, orange |
|     | `size` | la taille du bouton: large, small, note |
|     | `handleClick` | fonction pour gérer le click du bouton |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Footer`      | | le footer global de la page |


| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `CheckBoxField`      | `checked` | booleen pour enregistrer l'état checked ou unchecked du beckbox |
|     | `formError` | message de l'erreur à aficher  |
|     | `chandleChecked` | fonction pour gérer le l'événement check ou unchecked |
|     | `showError` | Booleen pour afficher ou pas le message d'erreur |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `SelectField`      | `label` | le texte label du champ |
|     | `values` | la valeur du champ |
|     | `name` | le nom du champ |
|     | `handleChange` | la fonction qui s'éxécute à chaque changement dans le champ |
|     | `listeSelected` | la liste qui contient tous les éléments sélectionnés |
|     | `selection` | la liste qui contient tous les éléments qu'on pourrait sélectionner |
|     | `handleReset` | fonction qui réinnitialise les éléments sélectionnés |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `TextArea`      | `label` | le texte label du champ |
|     | `values` | la valeur du champ |
|     | `name` | le nom du champ |
|     | `placeholder` | le texte provisoire dans le champ |
|     | `formError` | message de l'erreur à aficher  |
|     | `handleChange` | la fonction qui s'éxécute à chaque changement dans le champ |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `TextFieldLarge`      | `label` | le texte label du champ |
|     | `values` | la valeur du champ |
|     | `name` | le nom du champ |
|     | `placeholder` | le texte provisoire dans le champ |
|     | `formError` | message de l'erreur à aficher  |
|     | `handleChange` | la fonction qui s'éxécute à chaque changement dans le champ |
|     | `showError` | Booleen pour afficher ou pas le message d'erreur |
|     | `type` | le type du champ: text, email, input ... |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `TextFieldMedium`      | `label` | le texte label du champ |
|     | `values` | la valeur du champ |
|     | `name` | le nom du champ |
|     | `placeholder` | le texte provisoire dans le champ |
|     | `formError` | message de l'erreur à aficher  |
|     | `handleChange` | la fonction qui s'éxécute à chaque changement dans le champ |
|     | `showError` | Booleen pour afficher ou pas le message d'erreur |
|     | `type` | le type du champ: text, email, input ... |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `TextFieldMedium`      | `label` | le texte label du champ |
|     | `values` | la valeur du champ |
|     | `name` | le nom du champ |
|     | `placeholder` | le texte provisoire dans le champ |
|     | `formError` | message de l'erreur à aficher  |
|     | `handleChange` | la fonction qui s'éxécute à chaque changement dans le champ |
|     | `showError` | Booleen pour afficher ou pas le message d'erreur |
|     | `type` | le type du champ: text, email, input ... |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Corfirm`      | `type` | le type de confirmation: suppression, confirmation, alerte|
|     | `context` | le contexte du modal |
|     | `handleModal` | finction qui gére l'ouverture et la fermeture du modal |
|     | `handleDelete` | fonction à appeler lorsque que l'on veut confirmer la suppression |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `FormNavbar`      | | la bar de navigation global de la page |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Pagination`      | `totalPages` | le nombre total de pages à paginer |
|     | `link` | début du lien à ouvrir par éxemple: `/films` |

| composant | paramétres     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `AminSidebar`      | | la bar de menu admin pour afficher les statistiques données de l'application |

#### reducers

Ce dossier contient tous les fichiers redux de l'application.

| reducer | states    | fonctions                       |
| :-------- | :------- | :-------------------------------- |
| `actorsReducer`      | `allActors` `isLoading` | `fetchAllActors` |
| `articlesReducer`      | `allArticles` `isLoading` | `fetchAllArticles` |
| `directorsReducer`      | `allDirectors` `isLoading` | `fetchAllDirectors` |
| `filmsReducer`      | `allFilms` `isLoading` | `fetchAllFilms` |
| `usersReducer`      | `allUsers` `isLoading` | `fetchAllUsers` |
| `userReducer`      | `user` `isLogged` | `loginUser` `logout` |

#### services

Ce dossier contient les fichiers qui permettent déclarer des constantes et des fonctions que nous allons utiliser dans l'application.

#### utils

Ce dossier contient l'ensemble des api utilisé par l'application.

#### views

Ce dossier contient toutes les pages de l'application.

## Support

Pour support, rejoignez notre serveur discord https://discord.gg/Umx9mXR2.

