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

    // frontpage slider
    var indexValue = 1;
      showImg(indexValue);
      function btm_slide(e){showImg(indexValue = e);}
      function side_slide(e){showImg(indexValue += e);}
      function showImg(e){
        var i;
        const img = document.querySelectorAll('.front');
        const slider = document.querySelectorAll('.btm-slides span');
        if(e > img.length){indexValue = 1}
        if(e < 1){indexValue = img.length}
        for(i = 0; i < img.length; i++){
          img[i].style.display = "none";
        }
        for(i = 0; i < slider.length; i++){
          slider[i].style.background = "rgba(255,255,255,0.1)";
        }
        img[indexValue-1].style.display = "block";
        slider[indexValue-1].style.background = "white";
      }

      var n = 1;
      function loop(n) {
        setInterval(side_slide, 4000, n);
      }
      loop(n); 
})

function cart_qty(elem, plus) {
  var qty = $(elem).siblings('form').children('#cart_qty').val();
  
}




