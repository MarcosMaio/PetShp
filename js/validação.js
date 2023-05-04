export function valida(input) { //função que será chamada para cada tipo de input que eu quiser validar.
    const tipoDeInput = input.dataset.tipo
    
    if (validadores[tipoDeInput]) { //condição para verificar se tal tipo de input está dentro de validadores
        validadores[tipoDeInput](input) //Pega o validador certo com o tipo de input certo e chama a função validando o input, a função que será chamada será uma função relacionada ao tipo de input.
    }

    if(input.validity.valid) {//Caso dentro do input o objeto validity tiver o valor valid como true ele vai arrancar a class "input-container--invalido".
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '' //Caso não ocorra um erro a mensagem erro string vazia. 
    } else {
        input.parentElement.classList.add('input-container--invalido') //Caso dentro do input o objeto validity tiver o valor valid como false então adcionamos a class "input-container--invalido".
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input) //Caso ocorra um erro irei personalizar a mensagem que o usuario irá ver.
    }
}
const tiposDeErro = [ //Objeto de vetor de erros , ele irá atribuir qual erro deve ser aplicado em qual categoria que eu quero.
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]


const mensagensDeErro = {
    nome: {
        valueMissing: "O campo nome não pode estar vazio."
    },
    email: {
        valueMissing: "O campo email não pode estar vazio.",
        typeMismatch: "O email digitado não é válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        patternMismatch: "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não símbolos."
    },

    dataNascimento: {
        valueMisssing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior que 18 anos para se cadastrar."
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo de preço não pode estar vazio.'
    }
}

const validadores = { //objeto que irá conter os diferentes tipos de validações que talvez possa ter dentro do nosso arquivo de validação
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput, input) { // A função desssa função e pegar a mensagem daquele nosso objeto de mensagens de erro e essa função será chamada no momento que a gente substitui o InnerHTML
    let mensagem = ''
    tiposDeErro.forEach(erro => {  //para cada erro ele vai verificar se o input.validity ele tem erro.
        if (input.validity [erro]) { // aqui ele vai checkar se  valor dentro de x erro será true o false, se o campo nome por ex não tiver preenchido o retorno desse campo será true.
            mensagem  = mensagensDeErro[tipoDeInput][erro] // e então passaremos uma mensagem de erro, caso o input validity procurando pelo valueMissing ao exemplo retorne verdadeiro
// então ele vai colocar a mensagem de erro baseado no objeto de mensagens de erro pegando pelo tipo de input nome e depois vai procurar pelo valor do erro o valueMissing e tem a mensagem nele. 
        }
    });                           
    return mensagem
}

function validaDataNascimento(input) { //Função para validar data de nascimento
    
    const dataRecebida = new Date(input.value)
    let mensagem = "" // Mensagem que vai validar caso a pessoa seja maior ou menor de 18 anos caso seja maior a string fica vazia

        if (!maiorQue18(dataRecebida)) { //Caso o usuario seja menor que 18 anos a mensagem será exibida com a string abaixo
            mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
        }


        input.setCustomValidity(mensagem) //Vai validar se o input de data possui os requisitos para aprovação do formulario
}

function maiorQue18(data){
    const dataAtual = new Date() // Constante que irá armazenar a data  de hoje automaticamente por ser () vazio
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()) 
    //Validação que fará a data recebida do input somar com 18 

    return dataMais18 <= dataAtual // agora farei uma comparção que se o valor do input for menor que a data atual 
    //então o usuario tem maior de 18 return true , se a data do input for maior que a data atual return false
}

function validaCPF(input){ //função responsavel por validar o CPF formatando para retirar tudo que não for numeros como ex 195.080.077-61 , será valido porém os caracteres sem ser numeros serão descartados.
    const cpfFormatado = input.value.replace(/\D/g, '')  //Vamos substituir tudo que não for numeros.
    let mensagem = ''
    
    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {  //condição que checka se o cpf e invalido de acordo com a formatação e envia um erro ao usuario e checa a estrutura do cpf se e valida ou não
            mensagem = 'O CPF digitado não é válido.'
    }                   

    input.setCustomValidity(mensagem)
}   

function checaCPFRepetido(cpf) { //função que vai verificar se oo cpf possui 11 digitos iguais do mesmo número que no caso seria um cpf ínvalido 111.111.111.11
    const  valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]
    
        let cpfValido = true //O cpf começa com o valor true
        
        valoresRepetidos.forEach(valor => {  //verificar se o cpf que a gente vai receber dentro da função vai bater com alguns dos valores que a gente tem nesse vetor.
            if (valor == cpf) {
                    cpfValido = false

            }
        })    

        return cpfValido
}

function checaEstruturaCPF(cpf) { //Função que vai checar a estrutura do CPF
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador) 
}

function checaDigitoVerificador(cpf, multiplicador) {
    if(multiplicador >= 12) {
        return true
    }
    
    let multiplicadorInicial = multiplicador 
    let soma = 0
    const cpfSemDigito = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
            soma = soma + cpfSemDigito[contador] * multiplicadorInicial 
            contador ++
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }
    
    return false
}

function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

// Calculo por trás de varidação do CPF 

// 123 456 789 09

//let soma = (11 *1) + (10 * 2) + (9 * 3)  .... até (2 * 0)

// let digitoVerificador = 11 - (soma & 11)

function recuperarCEP(input){ //função responsavel por validar o CEP formatando para retirar tudo que não for numeros como ex 21520-460 , será valido porém os caracteres sem ser numeros serão descartados.
    const cep = input.value.replace(/\D/g,'') // vou substituir o qualquer caracteres que não for numeros por uma string vazia que no caso equivale a nada. 
    const url = `https://viacep.com.br/ws/${cep}/json/` // fazendo a requisição para a API ultilizando a função fetch mais a frente.
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {  //Condição que vai verificar que quando o retorno for false ou seja não tiver erro , ai sim será enviada a requisição.
            fetch(url,options).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                    if(data.erro) {  //Se o ocorrer um erro ao buscar o CEP enviar mensagem ao usuario
                        input.setCustomValidity('Não foi possivel buscar o CEP')
                        return
                    }
                    input.setCustomValidity('')
                    preencheCamposComCEP(data)
                    return
                }
            )
    }
}

    function preencheCamposComCEP(data){ //Função responsavel por preencher os campos de Rua,Cidade e Estado automaticamente ao validar o CEP.
        const logradouro = document.querySelector('[data-tipo="logradouro"]')
        const cidade = document.querySelector('[data-tipo="cidade"]')
        const estado = document.querySelector('[data-tipo="estado"]')

        logradouro.value = data.logradouro
        cidade.value = data.localidade
        estado.value = data.uf
    
    }