async function consultarDados() {
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const resultadoDiv = document.getElementById('resultado');

    try {
        // Consulta de CEP
        const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const cepData = await cepResponse.json();

        // Consulta de previsão do tempo
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cepData.latitude}&longitude=${cepData.longitude}&hourly=temperature_2m`);
        const weatherData = await weatherResponse.json();

        // Atualiza a interface com os dados
        resultadoDiv.innerHTML = `
            <h3>Resultado</h3>
            <p><strong>CEP:</strong> ${cepData.cep}</p>
            <p><strong>Localidade:</strong> ${cepData.localidade}</p>
            <p><strong>Temperatura Atual:</strong> ${weatherData.hourly.temperature_2m[0]}°C</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = `<p>Erro ao consultar os dados. Verifique o CEP e a cidade fornecidos.</p>`;
    }
}
