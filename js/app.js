import { valida } from './validação.js' //importa a validação do arquivo js
const inputs = document.querySelectorAll('input')//Vamos executar a função valida para todos os inputs

inputs.forEach(input => {  //Laço de repetição para todos os inputs com evento de blur
      if(input.dataset.tipo === 'preco'){  //condição para importar a mask para o campo de preços no cadastro_produto.html
            SimpleMaskMoney.setMask(input, {
                prefix: 'R$',
                fixed: true,
                fractionDigits: 2,
                decimalSeparator: ',',
                thousandsSeparator: '.',
                cursor: 'end'
            })
    }                     
    
    
    input.addEventListener('blur', (evento) => {
        valida(evento.target) //Agora vamos chamar a função valida par cada input que tivermos dentro do nosso formulário
    })
})