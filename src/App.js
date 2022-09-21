import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  let r, g, b;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// https://www.unum.la/blog/color-theory-on-instagram
function App() {
  const pickH = [0.1, 0.2, 0.4, 0.8, 0.9];
  // const pickH = [0.1, 0.17, 0.24, 0.31, 0.38];
  // const pickH = [0.3, 0.4, 0.6, 0.7, 0.9];
  const pickS = [0.05, 0.2, 0.4, 0.65, 0.95];
  const pickV = [0.15, 0.3, 0.5, 0.75, 0.95];
  const pickSV = [0.15, 0.3, 0.5, 0.75, 0.95];
  const rgbs = [];
  pickH.forEach((h, idx) => {rgbs[idx] = hsvToRgb(h + 0.3, 0.7, 0.8)});
  // pickS.forEach((s, idx) => {rgbs[idx] = hsvToRgb(0.0, s, 0.99)});
  // pickSV.forEach((sv, idx) => {rgbs[idx] = hsvToRgb(0., 1 - sv, sv)});
  //// pickSV.forEach((sv, idx) => {rgbs[idx] = hsvToRgb(0.1, sv, 1 - sv)});
  //// pickV.forEach((v, idx) => {rgbs[idx] = hsvToRgb(0., 0.2, v)});
  console.log(rgbs);
  return (
    <div className="container">
      <div className="palette">
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color3"></div>
        <div className="color3"></div>
        <div className="color3"></div>
        <div className="color4"></div>
        <div className="color4"></div>
        
        <div className="color2"></div>
        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color3"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color4"></div>
        
        <div className="color4"></div>
        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color5"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color1"></div>
        
        <div className="color4"></div>
        <div className="color4"></div>
        <div className="color5"></div>
        <div className="color5"></div>
        <div className="color5"></div>
        <div className="color1"></div>
        <div className="color1"></div>
        
        <div className="color4"></div>
        <div className="color3"></div>
        <div className="color3"></div>
        <div className="color5"></div>
        <div className="color4"></div>
        <div className="color4"></div>
        <div className="color1"></div>
        
        <div className="color1"></div>
        <div className="color3"></div>
        <div className="color3"></div>
        <div className="color2"></div>
        <div className="color4"></div>
        <div className="color4"></div>
        <div className="color3"></div>

        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color3"></div>
        <div className="color3"></div>
      </div>
      <style jsx>{`
        .palette {
          width: 360px;
          height: 360px;
          display: grid;
          grid-template-columns: repeat(3, 1fr) 2fr repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr) 2fr repeat(3, 1fr);
        }
        .color1 {
          background-color: rgb(${rgbs[0].r}, ${rgbs[0].g}, ${rgbs[0].b});
        }
        .color2 {
          background-color: rgb(${rgbs[1].r}, ${rgbs[1].g}, ${rgbs[1].b});
        }
        .color3 {
          background-color: rgb(${rgbs[2].r}, ${rgbs[2].g}, ${rgbs[2].b});
        }
        .color4 {
          background-color: rgb(${rgbs[3].r}, ${rgbs[3].g}, ${rgbs[3].b});
        }
        .color5 {
          background-color: rgb(${rgbs[4].r}, ${rgbs[4].g}, ${rgbs[4].b});
        }
      `}</style>
    </div>
  );
}

export default App;
