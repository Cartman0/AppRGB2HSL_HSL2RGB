'use strict';

// window.onload = function(){
class Color {
  constructor(r, g, b) {
    var r_int = parseInt(r);
    var g_int = parseInt(g);
    var b_int = parseInt(b);

    this.r_ = r_int;
    this.g_ = g_int;
    this.b_ = b_int;

    this.h_ = this._calcHue(r_int, g_int, b_int);
    this.s_ = this._calcSaturation(r_int, g_int, b_int);
    this.l_ = this._calcLightness(r_int, g_int, b_int);
  }

  // setter rgb
  _setR(r) {
    var r_int = parseInt(r);
    this.r_ = r_int;
  }
  setR(r) {
    var r_int = parseInt(r);
    this._setR(r_int);
    this.rgb2hsl(r_int, this.g_, this.b_);
  }
  _setG(g) {
    var g_int = parseInt(g);
    this.g_ = parseInt(g_int);
  }
  setG(g) {
    var g_int = parseInt(g);
    this._setG(g_int);
    this.rgb2hsl(this.r_, g_int, this.b_);
  }
  _setB(b) {
    var b_int = parseInt(b);
    this.b_ = parseInt(b_int);
  }
  setB(b) {
    var b_int = parseInt(b);
    this._setB(b_int);
    this.rgb2hsl(this.r_, this.g_, b_int);
  }
  setRGB(r, g, b) {
    var r_int = parseInt(r);
    var g_int = parseInt(g);
    var b_int = parseInt(b);
    this._setR(r_int);
    this._setG(g_int);
    this._setB(b_int);
    this.rgb2hsl(r_int, g_int, b_int);
  }

  // getter rgb
  getR() {
    return this.r_;
  }
  getG() {
    return this.g_;
  }
  getB() {
    return this.b_;
  }

  toRGB() {
    return 'rgb(' + this.r_ + ', ' + this.g_ + ', ' + this.b_ + ')';
  }

  toHEX() {
    return '#' +
    parseInt(this.r_).toString(16).replace(/^([0-9]|[a-f])$/, '0$&') +
    parseInt(this.g_).toString(16).replace(/^([0-9]|[a-f])$/, '0$&') +
    parseInt(this.b_).toString(16).replace(/^([0-9]|[a-f])$/, '0$&');
  }

  // setter hsl
  _setH(h) {
    this.h_ = parseInt(h);
  }
  setH(h) {
    var h_int = parseInt(h);
    this._setH(h_int);
    this.hsl2rgb(h_int, this.s_, this.l_);
  }
  _setS(s) {
    this.s_ = parseInt(s);
  }
  setS(s) {
    var s_int = parseInt(s);
    this._setS(s_int);
    this.hsl2rgb(this.h_, s_int, this.l_);
  }
  _setL(l) {
    this.l_ = parseInt(l);
  }
  setL(l) {
    var l_int = parseInt(l);
    this._setL(l_int);
    this.hsl2rgb(this.h_, this.s_, l_int);
  }
  setHSL(h, s, l) {
    var h_int = parseInt(h);
    var s_int = parseInt(s);
    var l_int = parseInt(l);
    this._setH(h_int);
    this._setS(s_int);
    this._setL(l_int);
    this.hsl2rgb(h_int, s_int, l_int);
  }

  // getter hsl
  getH() {
    return this.h_;
  }
  getS() {
    return this.s_;
  }
  getL() {
    return this.l_;
  }

  toHSL() {
    return 'hsl(' + this.h_ + ', ' + this.s_ + '%, ' + this.l_ + '%)';
  }

  hsl2rgb(h_deg, s_percent, l_percent) {
    var h_norm = h_deg / 360;
    var s_norm = s_percent / 100;
    var l_norm = l_percent / 100;

    var m2;
    if (l_norm < 0.5) {
      m2 = l_norm * (s_norm + 1);
    } else {
      m2 = l_norm + s_norm - l_norm * s_norm;
    }

    var m1 = l_norm * 2 - m2;
    var r_norm = this._hsl2rgb(m1, m2, h_norm + 1 / 3);
    var g_norm = this._hsl2rgb(m1, m2, h_norm);
    var b_norm = this._hsl2rgb(m1, m2, h_norm - 1 / 3);

    this.r_ = parseInt(Math.round(r_norm * 255));
    this.g_ = parseInt(Math.round(g_norm * 255));
    this.b_ = parseInt(Math.round(b_norm * 255));
  }

  _hsl2rgb(m1, m2, h) {
    var _h = h;
    if (_h < 0) {
      _h = _h + 1;
    }
    if (_h > 1) {
      _h = _h - 1;
    }

    if (_h * 6 < 1) {
      return m1 + (m2 - m1) * _h * 6;
    }
    if (_h * 2 < 1) {
      return m2;
    }
    if (_h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - _h) * 6;
    }
    return m1;
  }

  _calcHueNorm(r, g, b) {
    var color_arr = [r, g, b];
    var h_norm = 0.0;

    // 等しいとき
    if ((color_arr[0] == color_arr[1]) && (color_arr[1] == color_arr[2])) {
      h_norm = 0.0;
    } else if ((color_arr[0] >= color_arr[1]) && (color_arr[0] >= color_arr[2])) {
      // r最大の場合
      h_norm = ((color_arr[1] - color_arr[2]) / (Math.max.apply(null, color_arr) - Math.min.apply(null, color_arr))) / 6;
    } else if ((color_arr[1] >= color_arr[0]) && (color_arr[1] >= color_arr[2])) {
      // g最大の場合
      h_norm = ((color_arr[2] - color_arr[1]) / (Math.max.apply(null, color_arr) - Math.min.apply(null, color_arr))) / 6 + 1 / 3;
    } else if ((color_arr[2] >= color_arr[0]) && (color_arr[2] >= color_arr[1])) {
      // b最大の場合
      h_norm = ((color_arr[0] - color_arr[1]) / (Math.max.apply(null, color_arr) - Math.min.apply(null, color_arr))) / 6 + 2 / 3;
    }

    // 求めたhueが 0以下なら1足す
    if (h_norm < 0) {
      h_norm += 1;
    }
    return h_norm;
  }
  _calcHue(r, g, b) {
    return Math.round(this._calcHueNorm(r, g, b) * 360);
  }

  _calcSaturationNorm(r, g, b) {
    var color = [r, g, b];

    // 収束値CNTを求める
    var max = Math.max.apply(null, color);
    var min = Math.min.apply(null, color);
    var cnt = (max + min) / 2;

    var s = 0.0;
    if (cnt < 127) {
      s = (max - min) / (max + min);
    } else if (510 <= (max + min)) {
      return 0.0;
    } else {
      s = (max - min) / (510 - max - min);
    }
    return s;
  }
  _calcSaturation(r, g, b) {
    return Math.round(this._calcSaturationNorm(r, g, b) * 100);
  }

  _calcLightnessNorm(r, g, b) {
    var color = [r, g, b];
    var max = Math.max.apply(null, color);
    var min = Math.min.apply(null, color);
    var l = (max + min) / 2;
    l /= 255;
    return l;
  }
  _calcLightness(r, g, b) {
    return Math.round(this._calcLightnessNorm(r, g, b) * 100);
  }

  rgb2hsl(r, g, b) {
    this.h_ = this._calcHue(r, g, b);
    this.s_ = this._calcSaturation(r, g, b);
    this.l_ = this._calcLightness(r, g, b);
  }
}
