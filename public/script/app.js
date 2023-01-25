// Selectors, définition des variables en constantes
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

// création des Event Listeners. récupération de contenu, du bouton, du + et du filtre au click
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", filterTodo);

// Création de Functions
function createComponents(value) {
    // Création de div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // création de li. utilisation d'appenChild pour ajouter une Div juste au dessus de la dernier div ajoutée
    const newTodo = document.createElement("li");
    newTodo.innerText = value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Création du bouton check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    // Création du bouton trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append all
    todoList.appendChild(todoDiv);
}

// Cette fonction ajoute un nouvel élément de liste de tâches. Elle prend en paramètre un événement (e) qui est déclenchée lors de la transimission d'un formulaire (input). Elle empêche d'abord le comportement par défaut de l'événement, puis vérifie si le champ d'entrée de la tâche est vide et si c'est le cas, la fonction s'arrête. Ensuite, j'appelle une fonction "createComponents" pour créer les éléments visuels pour le nouvel élément de tâche sur la page, puis elle appelle une fonction "saveLocalTodos" pour enregistrer la nouvelle tâche dans le stockage local. Enfin, elle efface le contenu du champ d'entrée pour permettre à l'utilisateur de saisir une nouvelle tâche.

function addTodo(e) {
    // Valider et empêcher qu ele contenu disparaisse au rafraîchissement via un return (cela place le contenu en attente)
    e.preventDefault();
    if (!todoInput.value) return;

    // Création de tous les composants input
    createComponents(todoInput.value);

    // Ajouter un todo en stockage local
    saveLocalTodos(todoInput.value);

    // Clear + focus Input
    todoInput.value = "";
}

// Cette fonction permet d'ajouter un nouvel élément à faire. Elle empêche d'abord le comportement par défaut de l'événement qui a déclenché la fonction, puis je vérifie si le champ d'entrée est vide, si c'est le cas, la fonction s'arrête. Ensuite, elle appelle une fonction appelée "createComponents" qui crée les éléments visuels pour le nouvel élément à faire sur la page Web. Elle appelle également une fonction appelée "saveLocalTodos" qui enregistre le nouvel élément à faire dans le stockage local. Enfin, j'efface le champ d'entrée.

function addTodo(e) {
    e.preventDefault();
    if (!todoInput.value) return;
    createComponents(todoInput.value);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}

// Cette fonction a pour but de gérer la suppression et la marque qui spécfiique que la tâche est achevée d'un élément de liste de tâches. Elle prend en paramètre un événement (e) qui cible l'élément sur lequel l'utilisateur a cliqué. Elle vérifie ensuite si cet élément est le bouton de suppression ou le bouton de validation. Si c'est le bouton de suppression qui est cliqué, la focntion ajoute une animation "fall" à l'élément parent, à savoir la tâche, puis, une fois l'animation terminée, elle appelle une fonction pour supprimer la tâche de la mémoire locale, puis la tâche est supprimée de l'affichage. Si c'est le bouton de validation qui est cliqué, la fonctoin ajoute une class "completed" à l'élément parent (la tâche), ce qui permet de marquer la tâche comme achevée.

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    if (item.classList[0] === "trash-btn") {
        todo.classList.add("fall");
        todo.addEventListener("animationend", function () {
            removeLocalTodos(todo);
            todo.remove();
        });
    }
    if (item.classList[0] === "check-btn") todo.classList.toggle("completed");
}

// ici, utilisation d'une fonction filter via un switch. Quand all est selectioné, ce sont tous les items qui apparaissent. Quand c'est done qui est selectioné, ce sont les items done qui apparaissent. Quand c'est to do qui est selectioné, ce sont les items to do qui apparaissent. 

function filterTodo(e) {
    const value = e.target.value;
    const todos = todoList.childNodes;
    console.log(value);
    todos.forEach(function (todo) {
        switch (value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                return;
        }
    });
}

// l'objectif ici est de sauvegarder les todo en local storage. cela permet le display sur l'interface utilisateur. Avec cette fonction je sauvegarderun élément de la liste des tâches dans l'espace de stockage local. je vérifie d'abord s'il existe un élément "todos" existant dans l'espace de stockage local, et s'il en existe un, je le transforme en tableau. S'il n'y a pas d'élément "todos", la fonction crée un tableau vide. La fonction utilise ensuite la méthode push() pour ajouter le nouvel élément de la liste des tâches dans le tableau. Enfin, le tableau mis à jour est transformé en chaîne et remis dans l'espace de stockage local sous la forme d'un élément "todos".

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Cette fonction JavaScript s'appelle "getTodos" et elle est utilisée pour récupérer les tâches à faire :"todos" stockées dans le stockage local de l'utilisateur (LocalStorage). je commence par déclarer une variable "todos" qui sera utilisée pour stocker les tâches à faire récupérées. Ensuite, je vérifie si un élément "todos" existe dans le stockage local. Si c'est le cas, j'utilise la méthode JSON.parse pour convertir les données stockées en format JSON en un objet JavaScript, et les stocke dans la variable "todos". Si cet élément n'existe pas dans le stockage local, la variable "todos" sera définie sur un tableau vide. Enfin, j'utilise la méthode forEach pour parcourir chaque élément du tableau "todos", et appelle une fonction "createComponents" pour chaque élément, en passant l'élément en question en tant qu'argument. Cette fonction "createComponents" est utilisée pour qu'elle aparaissent sur l'interface utilisateur pour chaque tâche à faire récupérée.

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    todos.forEach(function (todo) {
        createComponents(todo);
    });
}

// Cette fonction vise à supprimer un élément de la liste des tâches de l'espace de stockage local. Il vérifie d'abord s'il existe un élément "todos" existant dans l'espace de stockage local, et s'il en existe un, le transforme en tableau JavaScript. S'il n'y a pas d'élément "todos", je crée un tableau vide. La fonction trouve ensuite l'index de l'élément de la liste des tâches à supprimer dans le tableau, en utilisant le texte de la tâche comme référence.j'utilise ensuite la méthode splice() pour supprimer cet élément du tableau. Enfin, le tableau mis à jour est transformé en chaîne et remis dans l'espace de stockage local sous la forme d'un élément "todos".

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
