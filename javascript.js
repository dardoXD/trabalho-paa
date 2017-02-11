// Inicialização de dados para gerar um gráfico inicial quando o usuário abrir a página
dados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Delay padrão das transições (1 segundo e meio)
var delay = 1500;

// Definição das cores das barras do gráfico
var azul = "rgba(54, 162, 235, 0.2)";
var roxo = "rgba(135, 31, 120, 0.5)";
var vermelho = "rgba(255, 0, 0, 0.5)";
var amarelo = "rgba(255, 255, 0, 0.5)";
var verde = "rgba(0, 255, 0, 0.5)";

// Vetor que guarda as cores de cada barra (requisito da biblioteca utilizada para gerar o gráfico)
colors = [];

// Inicialização do vetor de cores
for (i = 0; i < dados.length; i++) {
    colors.push(azul);
}

// Construção do gráfico inicial
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dados,
        datasets: [{
            data: dados,
            backgroundColor: colors,
            borderColor: 'rgba(54, 162, 235, 1)'
            ,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    }
});
embaralharElementos(); // Embaralha a ordem dos elementos do vetor inicial
myChart.update(); // Mostra na tela o gráfico gerado

// Função para aumentar a velocidade das iterações dos algoritmos de ordenação
// Botões são ajustados de modo a não permitir tempo menor que 0,5 segundo
function aumentarVelocidade() {
    if (delay > 500) {
        delay -= 500;
        document.getElementById("aumentar_velocidade").value = "Mais rápido (atual: " + delay / 1000 + "s)";
        document.getElementById("diminuir_velocidade").value = "Mais lento (atual: " + delay / 1000 + "s)";
        if (delay <= 500) {
            document.getElementById("aumentar_velocidade").className = "ui inverted disabled button";
        }
    } else {
        document.getElementById("aumentar_velocidade").className = "ui inverted disabled button";
    }
}

// Função para diminuir a velocidade das iterações dos algoritmos de ordenação
function diminuirVelocidade() {
    delay += 500;
    document.getElementById("aumentar_velocidade").value = "Mais rápido (atual: " + delay / 1000 + "s)";
    document.getElementById("diminuir_velocidade").value = "Mais lento (atual: " + delay / 1000 + "s)";
    if (delay >= 1000) {
        document.getElementById("aumentar_velocidade").className = "ui inverted green button";
    }
}

// Função para pegar o elemento do campo input e adicionar ao gráfico
function adicionarElemento() {
    dados.push(+document.getElementById("n1").value);
    for (i = 0; i < dados.length; i++) {
        colors.push(azul);
    }
    myChart.update();
}

// Função que "segura" a execução do programa pela quantidade de milissegundos especificada em 'ms'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função que limpa todos os dados do gráfico atual
function limparGrafico() {
    max = dados.length;
    limparGrafico2(max);
}

// Função auxiliar da função limparGrafico() (por questões de escopo de variáveis em JavaScript, acessar
// dados.lenght em uma função assíncrona daria erro)
async function limparGrafico2(max) {
    for (i = 0; i < max; i++) {
        dados.pop();
        colors.pop();
        await sleep(30);
        myChart.update();
    }
}

// Função para embaralhar os elementos atuais do gráfico ou, caso o gráfico esteja vazio, criar um novo
// gráfico com valores de 1 a 15 embaralhados
function embaralharElementos() {
    if (dados.length > 0) {
        for (var i = dados.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var aux = dados[i];
            dados[i] = dados[j];
            dados[j] = aux;
        }
        for (k = 0; k < dados.length; k++) {
            myChart.data.datasets[0].backgroundColor[k] = azul;
        }
        myChart.update();
    } else {
        for (i = 1; i < 15; i++) {
            dados.push(i);
        }
        myChart.update();
    }
}

// Função para remover o último elemento do gráfico
function removerUltimoElemento() {
    dados.pop();
    colors.pop();
    myChart.update();
}

// Função que desabilita alguns botões da interface (para quando a ordenação estiver em execução)
function desabilitarBotoes() {
    document.getElementById("ordenar_selection_sort").className = "ui huge inverted teal disabled button";
    document.getElementById("ordenar_insertion_sort").className = "ui huge inverted teal disabled button";
    document.getElementById("adicionar_elemento").className = "ui inverted disabled button";
    document.getElementById("embaralhar_dados").className = "ui inverted blue disabled button";
    document.getElementById("remover_ultimo").className = "ui inverted blue disabled button";
    document.getElementById("limpar_tudo").className = "ui inverted blue disabled button";
}

// Função para reabilitar os botões desativados no início da ordenação. Utilizada quando a ordenação termina
function habilitarBotoes() {
    document.getElementById("ordenar_insertion_sort").className = "ui huge inverted teal button";
    document.getElementById("ordenar_selection_sort").className = "ui huge inverted teal button";
    document.getElementById("adicionar_elemento").className = "ui inverted button";
    document.getElementById("embaralhar_dados").className = "ui inverted blue button";
    document.getElementById("remover_ultimo").className = "ui inverted blue button";
    document.getElementById("limpar_tudo").className = "ui inverted blue button";
}

// Função que realiza a ordenação usando o algoritmo Insertion Sort (as animações estão aqui também)
// Esta função é marcada como assíncrona para poder fazer uso da função sleep definida anteriormente,
// permitindo fazer as animações da ordenação
async function insertionSort() {
    desabilitarBotoes();

    for (i = 1; i < dados.length; i++) {
        j = i;

        for (k = 0; k < dados.length; k++) {
            myChart.data.datasets[0].backgroundColor[k] = azul;
        }
        myChart.data.datasets[0].backgroundColor[j] = amarelo;
        await sleep(delay);
        document.getElementById("i").innerHTML = "i = " + i;
        document.getElementById("j").innerHTML = "j = " + j;

        myChart.update();

        while (j > 0 && dados[j - 1] > dados[j]) {

            document.getElementById("i").innerHTML = "i = " + i;
            document.getElementById("j").innerHTML = "j = " + j;
            document.getElementById("comparacao").innerHTML =
                "Próxima comparação: V[" + (j - 1) + "] > V[" + j + "] (" + dados[j - 1] + " > " + dados[j] + ")";

            myChart.data.datasets[0].backgroundColor[j - 1] = vermelho;
            myChart.data.datasets[0].backgroundColor[j] = vermelho;

            if (i != 0) {
                await sleep(delay);
                myChart.update();
            }

            aux = dados[j];
            dados[j] = dados[j - 1];
            dados[j - 1] = aux;

            myChart.data.datasets[0].backgroundColor[j - 1] = verde;
            myChart.data.datasets[0].backgroundColor[j] = verde;

            await sleep(delay);
            myChart.update();

            j--;

            for (k = 0; k < dados.length; k++) {
                myChart.data.datasets[0].backgroundColor[k] = azul;
            }
            myChart.data.datasets[0].backgroundColor[i] = amarelo;
            myChart.data.datasets[0].backgroundColor[j - 1] = vermelho;
            myChart.data.datasets[0].backgroundColor[j] = vermelho;
        }
    }
    for (k = 0; k < dados.length; k++) {
        myChart.data.datasets[0].backgroundColor[k] = verde;
    }
    myChart.update();

    habilitarBotoes();
}

// Função que realiza a ordenação usando o algoritmo Selection Sort (as animações estão aqui também)
// Esta função, assim como a insertionSort, também é marcada como assíncrona para as animações funcionarem
async function selectionSort() {
    desabilitarBotoes();

    for(i = 0; i < dados.length; i++) {
        min = i;

        for (k = 0; k < i; k++) {
            myChart.data.datasets[0].backgroundColor[k] = verde;
        }
        for (k = i + 1; k < dados.length; k++) {
            myChart.data.datasets[0].backgroundColor[k] = azul;
        }
        myChart.data.datasets[0].backgroundColor[i] = amarelo;
        await sleep(delay);

        myChart.update();

        for(j = i + 1; j < dados.length; j++) {
            document.getElementById("i").innerHTML = "i = " + i;
            document.getElementById("j").innerHTML = "j = " + j + ", min = " + min;

            for (k = 0; k < i; k++) {
                myChart.data.datasets[0].backgroundColor[k] = verde;
            }
            for (k = i + 1; k < dados.length; k++) {
                myChart.data.datasets[0].backgroundColor[k] = azul;
            }

            myChart.data.datasets[0].backgroundColor[i] = amarelo;
            myChart.data.datasets[0].backgroundColor[j] = vermelho;
            myChart.data.datasets[0].backgroundColor[min] = roxo;

            await sleep(delay);
            myChart.update();

            document.getElementById("comparacao").innerHTML =
                "Próxima comparação: V[j] < V[min] (" + dados[j] + " < " + dados[min] + ")";
            if(dados[j] < dados[min]) {
                min = j;

                myChart.data.datasets[0].backgroundColor[min] = roxo;
                await sleep(delay);
                myChart.update();
            }
        }

        if (i !== min) {
            for (k = 0; k < i; k++) {
                myChart.data.datasets[0].backgroundColor[k] = verde;
            }
            for (k = i + 1; k < dados.length; k++) {
                myChart.data.datasets[0].backgroundColor[k] = azul;
            }
            myChart.data.datasets[0].backgroundColor[min] = roxo;
            myChart.data.datasets[0].backgroundColor[i] = vermelho;
            myChart.data.datasets[0].backgroundColor[min] = vermelho;

            await sleep(delay);
            myChart.update();

            aux = dados[i];
            dados[i] = dados[min];
            dados[min] = aux;

            await sleep(delay);
            myChart.update();
        }
    }
    for (k = 0; k < dados.length; k++) {
        myChart.data.datasets[0].backgroundColor[k] = verde;
    }
    myChart.update();

    habilitarBotoes();
}
