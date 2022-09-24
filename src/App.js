import { useState } from 'react';
import { HuePicker } from 'react-color'; // http://casesandberg.github.io/react-color/
import Slider from 'react-rangeslider'
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

function ColorPalette(props) {
  const [showCopied, setShowCopied] = useState("none");
  const [copiedColor, setCopiedColor] = useState("");
  const [textColor, setTextColor] = useState("black");
  const noticeTime = 1000;

  const copyColor = (colorHex, fontColor="white") => {
    navigator.clipboard.writeText(colorHex);
    // alert('Copied ' + props.color0);
    setCopiedColor(colorHex);
    setTextColor(fontColor);
    setShowCopied("flex");
    setTimeout(() => setShowCopied("none"), noticeTime);
  }

  return (
    <div>
      <div className={`${props.cp}-notice-copied`}>{copiedColor}<br />copied</div>

      <div className={`${props.cp}-palette`}>        
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color2`}></div>
        <div className={`${props.cp}-color2`}></div>
        <div className={`${props.cp}-color2`}></div>
        <div className={`${props.cp}-color3`}></div>
        <div className={`${props.cp}-color3`}></div>
        
        <div className={`${props.cp}-color1`}></div>
        <div
          className={`${props.cp}-color0`}
          onClick={() => copyColor(props.color0)}>{props.color0}</div>
        <div className={`${props.cp}-color2`}></div>
        <div
          className={`${props.cp}-color1`}
          onClick={() => copyColor(props.color1)}>{props.color1}</div>
        <div className={`${props.cp}-color3`}></div>
        
        <div className={`${props.cp}-color3`}></div>
        <div className={`${props.cp}-color4`}></div>
        <div className={`${props.cp}-color0`}></div>
        
        <div className={`${props.cp}-color3`}></div>
        <div className={`${props.cp}-color3`}></div>
        <div className={`${props.cp}-color4`}></div>
        <div
          className={`${props.cp}-color4`}
          onClick={() => copyColor(props.color4, "black")}>{props.color4}</div>
        <div className={`${props.cp}-color4`}></div>
        <div className={`${props.cp}-color0`}></div>
        <div className={`${props.cp}-color0`}></div>
        
        <div className={`${props.cp}-color3`}></div>
        <div
          className={`${props.cp}-color2`}
          onClick={() => copyColor(props.color2)}>{props.color2}</div>
        <div className={`${props.cp}-color4`}></div>
        <div
          className={`${props.cp}-color3`}
          onClick={() => copyColor(props.color3)}>{props.color3}</div>
        <div className={`${props.cp}-color0`}></div>
        
        <div className={`${props.cp}-color0`}></div>
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color2`}></div>

        <div className={`${props.cp}-color0`}></div>
        <div className={`${props.cp}-color0`}></div>
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color1`}></div>
        <div className={`${props.cp}-color2`}></div>
        <div className={`${props.cp}-color2`}></div>
      </div>
      <style jsx>{`
        .${props.cp}-notice-copied {
          position: fixed;
          top: calc(100vh /2 - 25px);
          left: calc(100vw / 2 - 45px);
          z-index: 10;
          width: 90px;
          height: 50px;
          border: solid #999 2px;
          border-radius: 10px;  
          background-color: ${copiedColor}cc;
          color: ${textColor};
          display: ${showCopied};
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .${props.cp}-palette {
          margin: 20px auto;
          width: 360px;
          height: 360px;
          display: grid;
          grid-template-columns: repeat(3, 1fr) 2fr repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr) 2fr repeat(3, 1fr);
        }
        .${props.cp}-palette div:nth-child(9) {
          color: white;
          grid-area: 2 / 2 / 4 / 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .${props.cp}-palette div:nth-child(11) {
          color: white;
          grid-area: 2 / 5 / 4 / 7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .${props.cp}-palette div:nth-child(19) {
          ${(props.cp === "cp3") || (props.cp === "cp4") ? "color:white;" : ""}
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .${props.cp}-palette div:nth-child(24) {
          color: white;
          grid-area: 5 / 2 / 7 / 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .${props.cp}-palette div:nth-child(26) {
          color: white;
          grid-area: 5 / 5 / 7 / 7;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .${props.cp}-color0 {
          background-color: ${props.color0};
        }
        .${props.cp}-color1 {
          background-color: ${props.color1};
        }
        .${props.cp}-color2 {
          background-color: ${props.color2};
        }
        .${props.cp}-color3 {
          background-color: ${props.color3};
        }
        .${props.cp}-color4 {
          background-color: ${props.color4};
        }
      `}</style>
    </div>
  )
}

// function NoticeCopied(props) {
//   return (
//     <>
//       <div className="notice-copied">
//         {props.copiedColor}12
//       </div>
//       <style jsx>{`
//         .notice-copied {
//           position: fixed;
//           top: 100px;
//           left: calc(100vw / 2);
//           z-index: 10;
//           display: ${props.copiedDisplay}
//         }
//       `}</style>
//     </>
//   )
// }


function App() {
  const [h, setH] = useState(210);
  const [s, setS] = useState(0.9);
  const [v, setV] = useState(0.9);
  
  const [background, setBackground] = useState("#E6ECF2");
  const [colorDif, setColorDif] = useState(60);
  
  const [copiedColor, setCopiedColor] = useState("");
  const [copiedDisplay, setCopiedDisplay] = useState("block");

  // setBackground(hsvToRgb(210).hex);
  const newRgbs = [];
  const pickSV1 = [0.15, 0.3, 0.5, 0.75, 0.95];
  pickSV1.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - sv, sv)});
  const pickSV2 = [0.2, 0.5, 0.75, 0.9, 0.95];
  pickSV2.forEach((sv, idx) => {newRgbs[idx + 5] = hsvToRgb(h / 360, 1 - sv ** 10, sv)});
  const pickH = [h, (h + colorDif) % 360, (h + colorDif * 2) % 360, (h + colorDif * 3) % 360, (h + colorDif * 4) % 360]
  pickH.forEach((hh, idx) => {newRgbs[idx + 10] = hsvToRgb(hh / 360, s, v)});
  pickH.forEach((hh, idx) => {newRgbs[idx + 15] = hsvToRgb(hh / 360, 0.7, 0.7)});
  const [rgbs, setRgbs] = useState(newRgbs);

  const onChangeHue = (color) => {
    setBackground(color.hex);
    setH(Math.round(color.hsv.h));
    const newRgbs = [];
    const pickSV1 = [0.15, 0.3, 0.5, 0.75, 0.95];
    pickSV1.forEach((sv, idx) => {newRgbs[idx] = hsvToRgb(h / 360, 1 - sv, sv)});
    const pickSV2 = [0.2, 0.5, 0.75, 0.9, 0.95];
    pickSV2.forEach((sv, idx) => {newRgbs[idx + 5] = hsvToRgb(h / 360, 1 - sv ** 10, sv)});

    const pickH = [h, (h + colorDif) % 360, (h + colorDif * 2) % 360, (h + colorDif * 3) % 360, (h + colorDif * 4) % 360]
    pickH.forEach((hh, idx) => {newRgbs[idx + 10] = hsvToRgb(hh / 360, s, v)});
    pickH.forEach((hh, idx) => {newRgbs[idx + 15] = hsvToRgb(hh / 360, 0.7, 0.7)});
    setRgbs(newRgbs);
  }

  const onChangeColorDif = (colorDif) => {
    setColorDif(colorDif);
    const pickH = [h, (h + colorDif) % 360, (h + colorDif * 2) % 360, (h + colorDif * 3) % 360, (h + colorDif * 4) % 360]
    pickH.forEach((hh, idx) => {newRgbs[idx + 10] = hsvToRgb(hh / 360, s, v)});
    pickH.forEach((hh, idx) => {newRgbs[idx + 15] = hsvToRgb(hh / 360, 0.7, 0.7)});
    setRgbs(newRgbs);
  }

  return (
    <div className="container">

      <div className="grid">
        
        <div className="center">
          <div className="title">Color Palette Maker</div>
        </div>
        <div className="center">
          <div className="author">
            <a href="https://japp-nu.vercel.app/bookmark" target="_blank">Japp <img src="/link.svg" width="12px" /></a>
            <a href="https://jadoc.vercel.app/" target="_blank">JaDoc <img src="/link.svg" width="12px" /></a>
            ⓒ Jace
          </div>
        </div>

        <div className="center">
          <div className="controller-hue">
            <div className="hue-text">
              HUE {h}°
              {/* <input type="number" min="0" max="359" step="1" onChange={onChangeH} value={h} style={{width: 37}} /> */}
            </div>
            <div className="hue-slider">
              <HuePicker color={background} onChange={onChangeHue} width="270px" />
            </div>
            {/* <input onChange={onChangeS} value={s} /> */}
            {/* <input onChange={onChangeV} value={v} /> */}
          </div>
        </div>
        <div></div>

        <ColorPalette cp="cp1" color0={rgbs[0].hex} color1={rgbs[1].hex} color2={rgbs[2].hex} color3={rgbs[3].hex} color4={rgbs[4].hex} />
        <ColorPalette cp="cp2" color0={rgbs[5].hex} color1={rgbs[6].hex} color2={rgbs[7].hex} color3={rgbs[8].hex} color4={rgbs[9].hex} />

        <div className="center">
          <div className="controller-interval">
            <div className="interval-text">Interval {colorDif}</div>
            <div className="interval-slider">            
              <Slider
                min={0}
                max={359}
                value={colorDif}
                // labels={colorDif}
                // format={formatkg}
                // handleLabel={colorDif}
                onChange={onChangeColorDif}
              />
            </div>
          </div>
        </div>
        <div></div>

        <ColorPalette cp="cp3" color0={rgbs[10].hex} color1={rgbs[11].hex} color2={rgbs[12].hex} color3={rgbs[13].hex} color4={rgbs[14].hex} />
        <ColorPalette cp="cp4" color0={rgbs[15].hex} color1={rgbs[16].hex} color2={rgbs[17].hex} color3={rgbs[18].hex} color4={rgbs[19].hex} />
      </div>

      <style jsx>{`
        .container {
        }

        .grid {
          width: 100vw;
          max-width: 800px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
        }

        .center {
          display: flex;
          justify-content: center;
        }

        .title {
          width: 360px;
          margin-bottom: 1rem;
          padding: 10px 0;
          // grid-area: 1 / 1 / 2 / 3;
          display: flex;
          justify-content: center;
          font-family: 'Saira Stencil One', cursive;
          font-size: 3rem;
          font-weight: 600;
          line-height: 2.5rem;
        }
        .author {
          width: 360px;
          margin-bottom: 1rem;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: end  ;
          align-items: end;
          color: #999;
          font-size: 0.6rem;
        }

        .controller-hue {
          width: 360px;
          height: 20px;
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

        .controller-interval {
          // position: relative;
          // top: 20px;
          width: 360px;
          height: 24px;
          display: grid;
          grid-template-columns: 1fr 3fr;
          align-items: center;
        }
        .interval-text {
          height: 20px;
          margin: 0 5px 0 5px;
          border: solid 1px grey;
          border-radius: 10px;
          font-size: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .interval-slider {
        }

        .rangeslider-horizontal .rangeslider__fill {
          height: 100%;
          background-color: ${rgbs[10].hex};
          border-radius: 10px;
          top: 0;
        }
        .rangeslider-horizontal .rangeslider__handle {
          width: 20px;
          height: 20px;
          border-radius: 20px;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        .rangeslider-horizontal .rangeslider__handle:after {
          content: ' ';
          position: absolute;
          width: 16px;
          height: 16px;
          top: 2px;
          left: 2px;
          border-radius: 50%;
          background-color: ${rgbs[11].hex};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) inset, 0 -1px 3px rgba(0, 0, 0, 0.4) inset;
        }

      `}</style>
    </div>
  );
}

export default App;
