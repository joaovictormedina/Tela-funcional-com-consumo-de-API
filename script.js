document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário e os campos de entrada
    const form = document.querySelector('#my-form');
    const firstNameInput = document.querySelector('#primeiroNome');
    const cepInput = document.querySelector('#cep');
    
    // Seleciona as áreas onde os dados serão exibidos
    const firstNameDisplay = document.querySelector('#new-layout-section-first-name');
    const neighborhoodDisplay = document.querySelector('#new-layout-section-neighborhood');
    const stateDisplay = document.querySelector('#new-layout-section-state');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtém os valores dos campos
        const firstName = firstNameInput.value;
        const cep = cepInput.value;

        // Atualiza o nome na div
        if (firstNameDisplay) {
            firstNameDisplay.textContent = firstName;
        }

        // Faz a busca pelo CEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                // Atualiza o bairro e o UF na div
                if (data.bairro && data.uf) {
                    if (neighborhoodDisplay) {
                        neighborhoodDisplay.textContent = data.bairro;
                    }
                    if (stateDisplay) {
                        stateDisplay.textContent = data.uf;
                    }
                } else {
                    alert('Não foi possível encontrar o CEP. Verifique e tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP. Verifique sua conexão e tente novamente.');
            });
    });
});
