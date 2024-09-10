document.getElementById('getAddressByCep').addEventListener('click', async function () {
    const cep = document.getElementById("cep").value;
    const nome = document.getElementById("primeiroNome").value;

    // Validação do CEP (somente números e 8 dígitos)
    if (!/^\d{8}$/.test(cep)) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        // Atualiza os campos com as informações obtidas
        document.getElementById('nome').value = nome;
        document.getElementById('bairro-local').value = data.bairro || 'N/A';
        document.getElementById('uf').value = data.uf || 'N/A';

    } catch (error) {
        alert("Erro ao buscar CEP: " + error.message);
    }
});

document.getElementById('getPrevisao').addEventListener('click', async function () {
    const lat = parseFloat(document.getElementById("latitude").value);
    const lon = parseFloat(document.getElementById("longitude").value);

    // Validação de latitude e longitude
    if (isNaN(lat) || lat < -90 || lat > 90) {
        alert("Por favor, insira uma latitude válida entre -90 e 90.");
        return;
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
        alert("Por favor, insira uma longitude válida entre -180 e 180.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await response.json();

        const respostaElement = document.getElementById('resposta');
        respostaElement.value = ''; // Limpa o conteúdo anterior

        // Verifica se a resposta contém o campo `current_weather`
        if (data.current_weather) {
            const temp = data.current_weather.temperature;

            // Atualiza as informações de previsão do tempo
            respostaElement.value = `${temp}°C`;
        } else {
            respostaElement.value = 'Dados não disponíveis.';
        }

    } catch (error) {
        alert("Erro ao buscar previsão do tempo: " + error.message);
    }
});
