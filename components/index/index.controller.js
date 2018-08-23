$('#language-select').selectize();

$('#language-select').on('change', function() {
    window.location = window.location.origin + window.location.pathname + '?lang=' + this.value;
});

$('form').on('submit', function(event) {
    event.preventDefault();
    let form = $(this);

    let data = form.serializeArray();

    let payload = {
        key: data.find((input) => input.name === 'key').value,
        value: data.find((input) => input.name === 'text').value,
        language: data.find((input) => input.name === 'language').value
    }

    form.find('.message').remove();

    let input = form.find('.item-value-input');

    editField(form, payload)
    .done(() => {
        input.data('defaultValue', payload.value)
        form.append('<span class="message success">Edit successful</span>');
    })
    .fail((error) => {
        input.val(input.data('defaultValue'));
        form.append('<span class="message error">' + (error.responseJSON.message || 'Error') + '</span>');
    });
});

function editField(form, payload) {
    showLoader(form);
    return $.ajax({
        url: 'api/item/edit',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(payload)
    })
    .done(() => {
        removeLoader(form);
    })
    .fail(() => {
        removeLoader(form);
    });
}

function showLoader(form) {
    form.append('<span class="loading">Loading...</span>');
}

function removeLoader(form) {
    form.find('.loading').remove();
}