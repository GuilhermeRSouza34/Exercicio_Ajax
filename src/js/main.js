const cepForm = document.getElementById('cepForm');
const enderecoSpan = document.getElementById('endereco');

cepForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const cepInput = document.getElementById('cep');
  const cep = cepInput.value.replace(/\D/g, '');

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new Error('CEP não encontrado');
    } else {
      enderecoSpan.textContent = `${data.logradouro}, ${data.localidade} - ${data.uf}`;
    }
  } catch (error) {
    enderecoSpan.textContent = '';
    alert(error.message);
  }
});