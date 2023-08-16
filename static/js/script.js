 // function to set csrftoken
 function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // does the cookie has the same name as the one we want
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// general GET data fetching
function getData(url) {
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // necessary to work with .is_ajax verification
    },
  })
  .then(response => {
    return response.json() // convert response to json  
  })
  .then(data => {
    return data
  })
  .catch(error => {
    console.log("Error: " + error);
    $(function() {
        Swal.fire('Error Occured!');
    })
  })
}
// POST data fetching
function postData(url, data) {
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // necessary to work with .is_ajax verification
        'X-CSRFToken': csrftoken,
    },
    body: data,
  })
  .then(response => {
    return response.json() // convert response to json
  })
  .then(data => {
    return data
  })
  .catch(error => {
    console.log("Error: " + error);
    $(function() {
        Swal.fire('Error Occured!');
    })
  })
}

$(document).ready(function() {
    // Navigation Bar
    $('.loader-con').hide();
    
    $('#search-input').on('input', function() {
        if($(this).val() != '') {
            $('.search-result').show();
        }
        else {
            $('.search-result').hide()
        }
        
    })

    $('.cart-plus').on('click', function() {
      var qty = $(this).siblings('form').children('.cart_qty').val();
      qty = parseInt(qty);
      new_qty = qty + 1;
      $(this).siblings('form').children('.cart_qty').val(new_qty);
    })
    
    $('.cart-minus').on('click', function() {
      var qty = $(this).siblings('form').children('.cart_qty').val();
      qty = parseInt(qty);
      new_qty = qty - 1;
      if(new_qty < 1) {
        $(this).siblings('form').children('.cart_qty').val(1);
      }
      else {
        $(this).siblings('form').children('.cart_qty').val(new_qty);
      }
    })
    $('.cart-remove').on('click', function() {
      $(this).parent('div').parent('.cart-box')
      .fadeOut(500);
    })

    /* add to cart effect */
    let count = 0;
    $('.add-cart-btn').on('click', function(e) {
      e.preventDefault();
      $('.note-header').html(`<i class="fa fa-shopping-cart"></i> Cart`);
      
      if($(this).hasClass('btn-danger')) {
        count--;
      $('.cart-no').text(count);
      $('.note-body').text('A new item has been removed from cart!')
      $('.notification').addClass('active');
        setTimeout(function() {
          $('.notification').removeClass('active')
        }, 5000);
      $(this).html(`Add Cart <i class="fa fa-shopping-cart"></i>`).removeClass('btn-danger');
      }

      else {
        count++;
        $('.cart-no').text(count);
        $('.note-body').text('A new item has been added to cart!')
        $('.notification').addClass('active');
        setTimeout(function() {
          $('.notification').removeClass('active')
        }, 5000);
        $(this).html(`Remove <i class="fa fa-times"></i>`).addClass('btn-danger');
      }
      
    })
})

function cart_qty(elem, plus) {
  var qty = $(elem).siblings('form').children('#cart_qty').val();
  
}




