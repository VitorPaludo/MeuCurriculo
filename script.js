document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form"); 
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    if (!form || !successMessage || !errorMessage) {
        console.error("Erro: Elementos do formulário não encontrados!");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        console.log("Evento submit acionado! A página NÃO deve recarregar.");

        // Captura os dados do formulário
        const formData = {
            email: document.getElementById("exampleInputEmail1").value,
            senha: document.getElementById("exampleInputPassword1").value,
            mensagem: document.getElementById("messageInput").value
        };

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData) // Envia os dados como JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao enviar mensagem");
            }
            return response.json();
        })
        .then(() => {
            console.log("Mensagem enviada com sucesso!", formData); // Exibe os dados enviados no console

            successMessage.classList.remove("d-none");
            errorMessage.classList.add("d-none");

            form.reset(); // Limpa o formulário após o envio

            setTimeout(() => {
                successMessage.classList.add("d-none");
            }, 10000);
        })
        .catch(error => {
            console.error("Erro ao enviar mensagem:", error);

            successMessage.classList.add("d-none");
            errorMessage.classList.remove("d-none");
        });
    });
});