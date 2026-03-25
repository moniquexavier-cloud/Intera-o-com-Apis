async function buscarTarefa() {
    const log = document.getElementById('log');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); /*Utilizando API de testes*/ 
        
        if (response.ok) {
            const tarefa = await response.json(); /*Transfroma a resposta em JSON*/
            const TituloBusca = "Esquentar o"; /*Título do ID 1*/
            log.innerText = `Tarefa "${TituloBusca}" encontrada com sucesso!;` /*Aterando o texto do #log*/
            console.log("ID da tarefa no servidor:", tarefa.id);
        } else {
            log.innerText = "Erro ao buscar tarefa.";
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        log.innerText = "Erro de conexão.";
    }
}

/* Criação de uma nova tarefa.*/

async function cadastrarTarefa() {
    const log = document.getElementById('log');
    const novaTarefa = {
        title: "Ir ao Pilates",
        completed: false,
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(novaTarefa),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            const dadosRetornados = await response.json();

           log.innerText = `Sucesso! Tarefa "${novaTarefa.title}" criada.;`
        }
    } catch (error) {
        log.innerText = "Erro ao cadastrar.";
    }
}

/*Modifica a tarefa de ID 1.*/

async function atualizarTarefa() {
    const log = document.getElementById('log');
    const novoTitulo = "Esquentar o Cuscuz";

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: "Tarefa Atualizada",
                completed: true,
                userId: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Atualização concluída!");
            log.innerText = `Sucesso! Tarefa atualizada para: ${novoTitulo};`
        }
    } catch (error) {
        log.innerText = "Erro ao atualizar.";
    }
}

/*QUESTÕES TEÓRICAS

Por que o fetch precisa da palavra-chave await (ou .then)?

 Porque o fetch é uma operação assíncrona, ele retorna uma Promise, que 
representa um valor que estará disponível no futuro, o await "pausa" a execução 
da função até que a rede responda, garantindo que não seja possível ler os dados 
antes de eles chegarem.


Qual a diferença entre os Status Codes 201 e 204?

O status 201 indica que a requisição foi bem-sucedida e resultou 
na criação de um novo recurso e o status 204 indica que a requisição deu certo,
 mas o servidor não precisa retornar nenhum conteúdo no corpo da resposta.


Se esquecer o JSON.stringify() no POST, o que acontecerá?

A requisição provavelmente falhará ou o servidor não entenderá os dados.
O servidor espera uma string formatada como JSON, mas receberia um objeto 
JavaScript puro, o que causa erro de sintaxe no lado do servidor.


O fetch dispara o catch se o servidor responder com erro 404?

Não, o catch do fetch só é disparado em caso de falha de rede ou se a 
requisição for interrompida, um erro 404 é uma resposta válida do servidor,
 por isso o fetch resolve a Promise normalmente, 
cabendo ao desenvolvedor verificar a propriedade 'response.ok'.
*/