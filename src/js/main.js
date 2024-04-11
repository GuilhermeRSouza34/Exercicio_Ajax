$(document).ready(function() {
    $('#cep').mask('00000-000');
    
    $('#cepForm').submit(function(e) {
      e.preventDefault();
    
      const cepInput = $('#cep');
      const cep = cepInput.val().replace(/\D/g, '');
      const btnBuscarCep = $('#buscarCepBtn');
      const spinner = $('#spinner');
    
      btnBuscarCep.prop('disabled', true);
      spinner.removeClass('d-none');
    
      $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        dataType: 'json',
        success: function(data) {
          if (data.erro) {
            $('#endereco').text('');
            alert('CEP não encontrado');
          } else {
            $('#endereco').text(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
          }
        },
        error: function() {
          $('#endereco').text('');
          alert('Erro ao buscar o CEP');
        },
        complete: function() {
          btnBuscarCep.prop('disabled', false);
          spinner.addClass('d-none');
        }
      });
    });
    
    $('#enviarBtn').click(function() {
      $('#cepForm')[0].reset();
      $('#endereco').text('');
    });
  });