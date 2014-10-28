$('.ctrl__slider').each(function() {
  this.value = parseFloat(this.getAttribute('data-value') || 0);
  $('[for="'+this.id+'"] .ctrl__value').text(this.value);
  $(this).slider({
    slide: function(evt, ui) {
      var lock = $(this).closest('fieldset').find('.ctrl__lock');
      $('[for="'+this.id+'"] .ctrl__value').text(ui.value);
      if (lock.length && lock[0].checked) {
        $(this)
          .closest('fieldset')
            .find('.ctrl__slider')
              .not(this)
              .slider('value', ui.value);
      }
    },
    change: function(evt, ui) {
      $('[for="'+this.id+'"] .ctrl__value').text(ui.value);
      this.value = parseFloat(ui.value);
      update();
    },
    step: parseFloat(this.getAttribute('data-step') || 1),
    min:  parseFloat(this.getAttribute('data-min') || 0),
    max:  parseFloat(this.getAttribute('data-max') || 100),
    value: this.value
  });
});

$('.ctrl__pi input').on('click', function() {
  var lock = $(this).closest('fieldset').find('.ctrl__lock'),
      chk = this.checked;
  if (lock.length && lock[0].checked) {
    $(this)
      .closest('fieldset')
        .find('.ctrl__pi input')
          .not(this)
          .each(function() {
            this.checked = chk;
          });
  }
  update();
});

update();

function RGB2Color(r,g,b) {
  return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function update() {
  var html = '', html_r = '', html_g = '', html_b = '', i = 0, red, grn, blu;

  for (; i < len.value; ++i) {
    red = Math.sin(frequency1.value*(frequency1_pi.checked? Math.PI : 1)*i + phase1.value) * width.value + center.value;
    grn = Math.sin(frequency2.value*(frequency2_pi.checked? Math.PI : 1)*i + phase2.value) * width.value + center.value;
    blu = Math.sin(frequency3.value*(frequency3_pi.checked? Math.PI : 1)*i + phase3.value) * width.value + center.value;
    html   += '<span class="r__p" style="background-color:' + RGB2Color(red,grn,blu) + '"></span>';
    html_r += '<span class="r__p" style="background-color:' + RGB2Color(red,0,0) + '"></span>';
    html_g += '<span class="r__p" style="background-color:' + RGB2Color(0,grn,0) + '"></span>';
    html_b += '<span class="r__p" style="background-color:' + RGB2Color(0,0,blu) + '"></span>';
  }
  $('#result').html(html);
  $('#result_r').html(html_r);
  $('#result_g').html(html_g);
  $('#result_b').html(html_b);
}
