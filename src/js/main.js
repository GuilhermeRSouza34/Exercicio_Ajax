cepForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.erro) {
            enderecoSpan.textContent = '';
            alert('CEP não encontrado');
          } else {
            enderecoSpan.textContent = `${data.logradouro}, ${data.localidade} - ${data.uf}`;
          }
        } else {
          enderecoSpan.textContent = '';
          alert('Erro ao buscar o CEP');
        }
      }
    };
    xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`);
    xhr.send();
  });