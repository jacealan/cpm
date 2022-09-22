import { useState } from 'react';
import { HuePicker } from 'react-color'; // http://casesandberg.github.io/react-color/
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
  let r, g, b, hex;

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
  };

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

  return {
    r, g, b, hex
  };
}

// https://www.unum.la/blog/color-theory-on-instagram
function App() {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0.5);
  const [v, setV] = useState(0.5);
  
  const [background, setBackground] = useState(0);
  const onChangeHue = (color) => {
    console.log(color)
    setBackground(color.hex);
    setH(Math.round(color.hsv.h));
    const newRgbs = [];
    const pickSV1 = [0.15, 0.3, 0.5, 0.75, 0.95];
    pickSV1.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - sv, sv)});
    // pickSV.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - 1 / (1 - sv), sv)});
    const pickSV2 = [0.2, 0.5, 0.75, 0.9, 0.95];
    pickSV2.forEach((sv, idx) => {newRgbs[idx + 5] = hsvToRgb(h / 360, 1 - sv ** 10, sv)});
    setRgbs(newRgbs);
  }

  const newRgbs = [];
  const pickSV1 = [0.15, 0.3, 0.5, 0.75, 0.95];
  pickSV1.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - sv, sv)});
  const pickSV2 = [0.2, 0.5, 0.75, 0.9, 0.95];
  pickSV2.forEach((sv, idx) => {newRgbs[idx + 5] = hsvToRgb(h / 360, 1 - sv ** 10, sv)});
  const [rgbs, setRgbs] = useState(newRgbs);
  const onChangeH = (e) => {
    setH(e.target.value);

    const newRgbs = [];
    const pickSV1 = [0.15, 0.3, 0.5, 0.75, 0.95];
    pickSV1.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - sv, sv)});
    // pickSV.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - 1 / (1 - sv), sv)});
    const pickSV2 = [0.2, 0.5, 0.75, 0.9, 0.95];
    pickSV2.forEach((sv, idx) => {newRgbs[idx + 5] = hsvToRgb(h / 360, 1 - sv ** 10, sv)});
    setRgbs(newRgbs);
  }

  const onChangeS = (e) => {
    setS(e.target.value);
  }
  const onChangeV = (e) => {
    setV(e.target.value);
  }

  // pickH.forEach((h, idx) => {rgbs[idx] = hsvToRgb(h + 0.3, 0.7, 0.8)});
  // pickS.forEach((s, idx) => {rgbs[idx] = hsvToRgb(0.0, s, 0.99)});
  //// pickSV.forEach((sv, idx) => {rgbs[idx] = hsvToRgb(0.1, sv, 1 - sv)});
  //// pickV.forEach((v, idx) => {rgbs[idx] = hsvToRgb(0., 0.2, v)});

  return (
    <div className="container">

      <div className="controller">
        <div className="hue-text">
          HUE : {h}°
          {/* <input type="number" min="0" max="359" step="1" onChange={onChangeH} value={h} style={{width: 37}} /> */}
        </div>
        <div className="hue-slider"><HuePicker color={background} onChange={onChangeHue} width="270px" /></div>
        {/* <input onChange={onChangeS} value={s} /> */}
        {/* <input onChange={onChangeV} value={v} /> */}
      </div>

      <div className="palette">
        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color2"></div>
        <div className="color3"></div>
        <div className="color3"></div>
        
        <div className="color1"></div>
        <div className="color0">{rgbs[0].hex}</div>
        {/* <div className="color0"></div> */}
        <div className="color2"></div>
        <div className="color1">{rgbs[1].hex}</div>
        {/* <div className="color1"></div> */}
        <div className="color3"></div>
        
        <div className="color3"></div>
        {/* <div className="color0"></div> */}
        {/* <div className="color0"></div> */}
        <div className="color4"></div>
        {/* <div className="color1"></div> */}
        {/* <div className="color1"></div> */}
        <div className="color0"></div>
        
        <div className="color3"></div>
        <div className="color3"></div>
        <div className="color4"></div>
        <div className="color4">{rgbs[4].hex}</div>
        <div className="color4"></div>
        <div className="color0"></div>
        <div className="color0"></div>
        
        <div className="color3"></div>
        <div className="color2">{rgbs[2].hex}</div>
        {/* <div className="color2"></div> */}
        <div className="color4"></div>
        <div className="color3">{rgbs[3].hex}</div>
        {/* <div className="color3"></div> */}
        <div className="color0"></div>
        
        <div className="color0"></div>
        {/* <div className="color2"></div> */}
        {/* <div className="color2"></div> */}
        <div className="color1"></div>
        {/* <div className="color3"></div> */}
        {/* <div className="color3"></div> */}
        <div className="color2"></div>

        <div className="color0"></div>
        <div className="color0"></div>
        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color1"></div>
        <div className="color2"></div>
        <div className="color2"></div>
      </div>
      <hr />
      <div className="palette">
        <div className="color6"></div>
        <div className="color6"></div>
        <div className="color7"></div>
        <div className="color7"></div>
        <div className="color7"></div>
        <div className="color8"></div>
        <div className="color8"></div>
        
        <div className="color6"></div>
        <div className="color5">{rgbs[5].hex}</div>
        {/* <div className="color5"></div> */}
        <div className="color7"></div>
        <div className="color6">{rgbs[6].hex}</div>
        {/* <div className="color6"></div> */}
        <div className="color8"></div>
        
        <div className="color8"></div>
        {/* <div className="color5"></div> */}
        {/* <div className="color5"></div> */}
        <div className="color9"></div>
        {/* <div className="color6"></div> */}
        {/* <div className="color6"></div> */}
        <div className="color5"></div>
        
        <div className="color8"></div>
        <div className="color8"></div>
        <div className="color9"></div>
        <div className="color9">{rgbs[9].hex}</div>
        <div className="color9"></div>
        <div className="color5"></div>
        <div className="color5"></div>
        
        <div className="color8"></div>
        <div className="color7">{rgbs[7].hex}</div>
        {/* <div className="color7"></div> */}
        <div className="color9"></div>
        <div className="color8">{rgbs[8].hex}</div>
        {/* <div className="color8"></div> */}
        <div className="color5"></div>
        
        <div className="color5"></div>
        {/* <div className="color7"></div> */}
        {/* <div className="color7"></div> */}
        <div className="color6"></div>
        {/* <div className="color8"></div> */}
        {/* <div className="color8"></div> */}
        <div className="color7"></div>

        <div className="color5"></div>
        <div className="color5"></div>
        <div className="color6"></div>
        <div className="color6"></div>
        <div className="color6"></div>
        <div className="color7"></div>
        <div className="color7"></div>
      </div>
      <style jsx>{`
        .controller {
          width: 360px;
          height: 36px;
          display: grid;
          grid-template-columns: 1fr 3fr;
        }
        .hue-text {
          margin: 10px 15px 10px 5px;
          border: solid 1px grey;
          border-radius: 10px;
          font-size: 0.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hue-slider {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .palette {
          width: 360px;
          height: 360px;
          display: grid;
          grid-template-columns: repeat(3, 1fr) 2fr repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr) 2fr repeat(3, 1fr);
        }
        .palette div:nth-child(9) {
          color: white;
          grid-area: 2 / 2 / 4 / 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .palette div:nth-child(11) {
          color: white;
          grid-area: 2 / 5 / 4 / 7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .palette div:nth-child(19) {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .palette div:nth-child(24) {
          color: white;
          grid-area: 5 / 2 / 7 / 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .palette div:nth-child(26) {
          color: white;
          grid-area: 5 / 5 / 7 / 7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .color0 {
          background-color: rgb(${rgbs[0].r}, ${rgbs[0].g}, ${rgbs[0].b});
        }
        .color1 {
          background-color: rgb(${rgbs[1].r}, ${rgbs[1].g}, ${rgbs[1].b});
        }
        .color2 {
          background-color: rgb(${rgbs[2].r}, ${rgbs[2].g}, ${rgbs[2].b});
        }
        .color3 {
          background-color: rgb(${rgbs[3].r}, ${rgbs[3].g}, ${rgbs[3].b});
        }
        .color4 {
          background-color: rgb(${rgbs[4].r}, ${rgbs[4].g}, ${rgbs[4].b});
        }
        .color5 {
          background-color: rgb(${rgbs[5].r}, ${rgbs[5].g}, ${rgbs[5].b});
        }
        .color6 {
          background-color: rgb(${rgbs[6].r}, ${rgbs[6].g}, ${rgbs[6].b});
        }
        .color7 {
          background-color: rgb(${rgbs[7].r}, ${rgbs[7].g}, ${rgbs[7].b});
        }
        .color8 {
          background-color: rgb(${rgbs[8].r}, ${rgbs[8].g}, ${rgbs[8].b});
        }
        .color9 {
          background-color: rgb(${rgbs[9].r}, ${rgbs[9].g}, ${rgbs[9].b});
        }
      `}</style>
    </div>
  );
}

export default App;
