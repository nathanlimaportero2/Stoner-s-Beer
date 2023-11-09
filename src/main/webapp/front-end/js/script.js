// aula 05
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de cervejas na modal
let quantcervejas = 1

let cart = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.cervejaWindowArea').style.opacity = 0 // transparente
    seleciona('.cervejaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.cervejaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.cervejaWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.cervejaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.cervejaInfo--cancelButton, .cervejaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDascervejas = (cervejaItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
	cervejaItem.setAttribute('data-key', index)
    cervejaItem.querySelector('.cerveja-item--img img').src = item.img
    cervejaItem.querySelector('.cerveja-item--price').innerHTML = formatoReal(item.price[2])
    cervejaItem.querySelector('.cerveja-item--name').innerHTML = item.name
    cervejaItem.querySelector('.cerveja-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.cervejaBig img').src = item.img
    seleciona('.cervejaInfo h1').innerHTML = item.name
    seleciona('.cervejaInfo--desc').innerHTML = item.description
    seleciona('.cervejaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .cerveja-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.cerveja-item').getAttribute('data-key')
    console.log('cerveja clicada ' + key)
    console.log(cervejaJson[key])

    // garantir que a quantidade inicial de cerveja é 1
    quantcervejas = 1

    // Para manter a informação de qual cerveja foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.cervejaInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.cervejaInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = cervejaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.cervejaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.cervejaInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.cervejaInfo--actualPrice').innerHTML = formatoReal(cervejaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.cervejaInfo--qtmais').addEventListener('click', () => {
        quantcervejas++
        seleciona('.cervejaInfo--qt').innerHTML = quantcervejas
    })

    seleciona('.cervejaInfo--qtmenos').addEventListener('click', () => {
        if(quantcervejas > 1) {
            quantcervejas--
            seleciona('.cervejaInfo--qt').innerHTML = quantcervejas	
        }
    })
}
// /aula 05

// aula 06
const adicionarNoCarrinho = () => {
    seleciona('.cervejaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual cerveja? pegue o modalKey para usar cervejaJson[modalKey]
    	console.log("cerveja " + modalKey)
    	// tamanho
	    let size = seleciona('.cervejaInfo--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quantcervejas)
        // preco
        let price = seleciona('.cervejaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = cervejaJson[modalKey].id+'t'+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantcervejas
        } else {
            // adicionar objeto cerveja no carrinho
            let cerveja = {
                identificador,
                id: cervejaJson[modalKey].id,
                size, // size: size
                qt: quantcervejas,
                price: parseFloat(price) // price: price
            }
            cart.push(cerveja)
            console.log(cerveja)
            console.log('Sub total R$ ' + (cerveja.qt * cerveja.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let cervejaItem = cervejaJson.find( (item) => item.id == cart[i].id )
			console.log(cervejaItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let cervejaSizeName = cart[i].size

			let cervejaName = `${cervejaItem.name} (${cervejaSizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = cervejaItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = cervejaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
		window.location.href = 'pagamento.jsp'
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// /aula 06

// MAPEAR cervejaJson para gerar lista de cervejas
cervejaJson.map((item, index ) => {
    //console.log(item)
    let cervejaItem = document.querySelector('.models .cerveja-item').cloneNode(true)
    //console.log(cervejaItem)
    //document.querySelector('.cerveja-area').append(cervejaItem)
    seleciona('.cerveja-area').append(cervejaItem)

    // preencher os dados de cada cerveja
    preencheDadosDascervejas(cervejaItem, item, index)
    
    // cerveja clicada
    cervejaItem.querySelector('.cerveja-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na cerveja')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.cervejaInfo--qt').innerHTML = quantcervejas

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        // /aula 05

    })

    botoesFechar()

}) // fim do MAPEAR cervejaJson para gerar lista de cervejas

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06
