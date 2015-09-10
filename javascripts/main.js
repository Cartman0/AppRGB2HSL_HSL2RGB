$(function(){
    /* functions */
    function setThreeRangesValue(range1, color1, range2, color2, range3, color3) {
      range1.val(color1);
      range2.val(color2);
      range3.val(color3);
    }
    function setThreeNumbersValue(number1, color1, number2, color2, number3, color3) {
      number1.val(color1);
      number2.val(color2);
      number3.val(color3);
    }

    function updateView(rgb10, rgbHex, hsl,
      range_arr_rgb, number_arr_rgb,
      range_arr_hsl, number_arr_hsl,
      color) {
      rgb10.val(color.toRGB());
      rgbHex.val(color.toHEX());
      hsl.val(color.toHSL());

      // rgb
      var r = color.getR();
      var g = color.getG();
      var b = color.getB();
      setThreeRangesValue(range_arr_rgb[0], r, range_arr_rgb[1], g, range_arr_rgb[2], b);
      setThreeNumbersValue(number_arr_rgb[0], r, number_arr_rgb[1], g, number_arr_rgb[2], b);

      // hsl
      var h = color.getH();
      var s = color.getS();
      var l = color.getL();
      setThreeRangesValue(range_arr_hsl[0], h, range_arr_hsl[1], s, range_arr_hsl[2], l);
      setThreeNumbersValue(number_arr_hsl[0], h, number_arr_hsl[1], s, number_arr_hsl[2], l);

      $('main').css('backgroundColor', color.toRGB());
    }
    //////////////////////////////////////////////////////////////////////

    (function(){
      // 初期
      // rgb
      var range_r = $('.input-box__range_rgb_r');
      var range_g = $('.input-box__range_rgb_g');
      var range_b = $('.input-box__range_rgb_b');

      var number_r = $('.input-box__number_rgb_r');
      var number_g = $('.input-box__number_rgb_g');
      var number_b = $('.input-box__number_rgb_b');

      var rgb10 = $('.input-box__result_rgb10');
      var rgbHex = $('.input-box__result_rgbHex');

      // hsl
      var range_h = $('.input-box__range_hsl_h');
      var range_s = $('.input-box__range_hsl_s');
      var range_l = $('.input-box__range_hsl_l');

      var number_h = $('.input-box__number_hsl_h');
      var number_s = $('.input-box__number_hsl_s');
      var number_l = $('.input-box__number_hsl_l');

      var hsl = $('.input-box__result_hsl');

      var r = parseInt(range_r.val());
      var g = parseInt(range_g.val());
      var b = parseInt(range_b.val());

      // colorオブジェクト
      var color = new Color(r, g, b);

      updateView(rgb10, rgbHex, hsl,
        [range_r, range_g, range_b], [number_r, number_g, number_b],
        [range_h, range_s, range_l], [number_h, number_s, number_l],
        color);

      /* rgb 変更中（ドラッグ中） */
      var changeREvent = function () {
        var val = parseInt($(this).val());
        color.setR(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_r.on('input', changeREvent);
      number_r.on('input', changeREvent);

      var changeGEvent = function () {
        var val = parseInt($(this).val());
        color.setG(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_g.on('input', changeGEvent);
      number_g.on('input', changeGEvent);

      var changeBEvent = function () {
        var val = parseInt($(this).val());
        color.setB(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_b.on('input', changeBEvent);
      number_b.on('input', changeBEvent);


      /* hsl 変更中（ドラッグ中） */
      var changeHEvent = function () {
        var val = parseInt($(this).val());
        color.setH(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_h.on('input', changeHEvent);
      number_h.on('input', changeHEvent);

      var changeSEvent = function () {
        var val = parseInt($(this).val());
        color.setS(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_s.on('input', changeSEvent);
      number_s.on('input', changeSEvent);

      var changeLEvent = function () {
        var val = parseInt($(this).val());
        color.setL(val);

        updateView(rgb10, rgbHex, hsl,
          [range_r, range_g, range_b], [number_r, number_g, number_b],
          [range_h, range_s, range_l], [number_h, number_s, number_l],
          color);
      };
      range_l.on('input', changeLEvent);
      number_l.on('input', changeLEvent);

    })();
});
