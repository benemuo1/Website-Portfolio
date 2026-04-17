import LazyEffect from "./components/LazyEffect";

import Effect01 from "./components/Effect01";
import Effect02 from "./components/Effect02";
import Effect03 from "./components/Effect03";
import Effect04 from "./components/Effect04";
import Effect05 from "./components/Effect05";
import Effect06 from "./components/Effect06";
import Effect07 from "./components/Effect07";
import Effect08 from "./components/Effect08";
import Effect09 from "./components/Effect09";
import Effect10 from "./components/Effect10";
import Effect11 from "./components/Effect11";
import Effect12 from "./components/Effect12";
import Effect13 from "./components/Effect13";
import Effect14 from "./components/Effect14";
import Effect15 from "./components/Effect15";
import TextEffect01 from "./components/TextEffect01";
import TextEffect02 from "./components/TextEffect02";
import TextEffect03 from "./components/TextEffect03";
import TextEffect04 from "./components/TextEffect04";
import TextEffect05 from "./components/TextEffect05";
import TextEffect06 from "./components/TextEffect06";
import TextEffect07 from "./components/TextEffect07";
import TextEffect08 from "./components/TextEffect08";
import TextEffect09 from "./components/TextEffect09";
import TextEffect10 from "./components/TextEffect10";
import TextEffect11 from "./components/TextEffect11";
import TextEffect12 from "./components/TextEffect12";
import TextEffect13 from "./components/TextEffect13";
import TextEffect14 from "./components/TextEffect14";
import TextEffect15 from "./components/TextEffect15";
import TextEffect16 from "./components/TextEffect16";
import TextEffect17 from "./components/TextEffect17";
import TextEffect18 from "./components/TextEffect18";
import TextEffect19 from "./components/TextEffect19";
import TextEffect20 from "./components/TextEffect20";
import CursorEffect01 from "./components/CursorEffect01";
import CursorEffect02 from "./components/CursorEffect02";
import CursorEffect03 from "./components/CursorEffect03";
import CursorEffect04 from "./components/CursorEffect04";
import CursorEffect05 from "./components/CursorEffect05";
import CursorEffect06 from "./components/CursorEffect06";
import ScrollEffect07 from "./components/ScrollEffect07";
import ScrollEffect08 from "./components/ScrollEffect08";
import ScrollEffect09 from "./components/ScrollEffect09";
import ScrollEffect10 from "./components/ScrollEffect10";
import ScrollEffect11 from "./components/ScrollEffect11";
import ScrollEffect12 from "./components/ScrollEffect12";
import ScrollEffect13 from "./components/ScrollEffect13";
import ScrollEffect14 from "./components/ScrollEffect14";
import TransitionEffect15 from "./components/TransitionEffect15";
import TransitionEffect16 from "./components/TransitionEffect16";
import TransitionEffect17 from "./components/TransitionEffect17";
import TransitionEffect18 from "./components/TransitionEffect18";
import TransitionEffect19 from "./components/TransitionEffect19";
import TransitionEffect20 from "./components/TransitionEffect20";
import CardEffect21 from "./components/CardEffect21";
import CardEffect22 from "./components/CardEffect22";
import CardEffect23 from "./components/CardEffect23";
import CardEffect24 from "./components/CardEffect24";
import CardEffect25 from "./components/CardEffect25";
import CardEffect26 from "./components/CardEffect26";
import CardEffect27 from "./components/CardEffect27";
import CardEffect28 from "./components/CardEffect28";
import LoaderEffect29 from "./components/LoaderEffect29";
import LoaderEffect30 from "./components/LoaderEffect30";
import LoaderEffect31 from "./components/LoaderEffect31";
import LoaderEffect32 from "./components/LoaderEffect32";
import LoaderEffect33 from "./components/LoaderEffect33";
import LoaderEffect34 from "./components/LoaderEffect34";
import PhysicsEffect35 from "./components/PhysicsEffect35";
import PhysicsEffect36 from "./components/PhysicsEffect36";
import PhysicsEffect37 from "./components/PhysicsEffect37";
import PhysicsEffect38 from "./components/PhysicsEffect38";
import PhysicsEffect39 from "./components/PhysicsEffect39";
import PhysicsEffect40 from "./components/PhysicsEffect40";
import GenEffect41 from "./components/GenEffect41";
import GenEffect42 from "./components/GenEffect42";
import GenEffect43 from "./components/GenEffect43";
import GenEffect44 from "./components/GenEffect44";
import GenEffect45 from "./components/GenEffect45";
import GenEffect46 from "./components/GenEffect46";
import ThreeDEffect47 from "./components/ThreeDEffect47";
import ThreeDEffect48 from "./components/ThreeDEffect48";
import ThreeDEffect49 from "./components/ThreeDEffect49";
import ThreeDEffect50 from "./components/ThreeDEffect50";
import ThreeDEffect51 from "./components/ThreeDEffect51";
import ThreeDEffect52 from "./components/ThreeDEffect52";
import AudioEffect53 from "./components/AudioEffect53";
import AudioEffect54 from "./components/AudioEffect54";
import AudioEffect55 from "./components/AudioEffect55";
import AudioEffect56 from "./components/AudioEffect56";
import ImageEffect57 from "./components/ImageEffect57";
import ImageEffect58 from "./components/ImageEffect58";
import ImageEffect59 from "./components/ImageEffect59";
import ImageEffect60 from "./components/ImageEffect60";
import ImageEffect61 from "./components/ImageEffect61";
import AdvancedEffect01 from "./components/AdvancedEffect01";
import AdvancedEffect02 from "./components/AdvancedEffect02";
import AdvancedEffect03 from "./components/AdvancedEffect03";
import AdvancedEffect04 from "./components/AdvancedEffect04";
import AdvancedEffect05 from "./components/AdvancedEffect05";
import AdvancedEffect06 from "./components/AdvancedEffect06";
import AdvancedEffect07 from "./components/AdvancedEffect07";
import AdvancedEffect08 from "./components/AdvancedEffect08";
import AdvancedEffect09 from "./components/AdvancedEffect09";
import AdvancedEffect10 from "./components/AdvancedEffect10";
import AdvancedEffect11 from "./components/AdvancedEffect11";
import AdvancedEffect12 from "./components/AdvancedEffect12";
import AdvancedEffect13 from "./components/AdvancedEffect13";
import AdvancedEffect14 from "./components/AdvancedEffect14";
import AdvancedEffect15 from "./components/AdvancedEffect15";
import NewEffect01 from "./components/NewEffect01";
import NewEffect02 from "./components/NewEffect02";
import NewEffect03 from "./components/NewEffect03";
import NewEffect04 from "./components/NewEffect04";
import NewEffect05 from "./components/NewEffect05";
import NewEffect06 from "./components/NewEffect06";
import NewEffect07 from "./components/NewEffect07";
import NewEffect08 from "./components/NewEffect08";
import NewEffect09 from "./components/NewEffect09";
import NewEffect10 from "./components/NewEffect10";

const SECTIONS = [
  { title: "Background / Environment", color: "#a78bfa", height: 320, effects: [
    { id:"01",  name:"Parallax Depth Layers",    desc:"Layers move at different speeds with mouse",        C: Effect01 },
    { id:"02",  name:"3D Perspective Tilt",       desc:"Card tilts in 3D following your cursor",           C: Effect02 },
    { id:"03",  name:"Magnetic Field Lines",      desc:"Live field lines curve between charged poles",      C: Effect03 },
    { id:"04",  name:"Volumetric God Rays",       desc:"Light shafts from a moveable source",              C: Effect04 },
    { id:"05",  name:"Noise / Perlin Warp Field", desc:"Particles flow along organic noise paths",         C: Effect05 },
    { id:"06",  name:"Depth of Field Blur",       desc:"Focus plane shifts left/right with mouse",         C: Effect06 },
    { id:"07",  name:"Ripple / Water Distortion", desc:"Click to drop ripples that expand outward",        C: Effect07 },
    { id:"08",  name:"Aurora Borealis",           desc:"Shimmering northern lights with star field",       C: Effect08 },
    { id:"09",  name:"Chromatic Aberration",      desc:"RGB channel split intensifies toward edges",       C: Effect09 },
    { id:"10",  name:"Gravitational Lensing",     desc:"Cursor acts as a gravity well bending particles",  C: Effect10 },
    { id:"11",  name:"3D Floating Geometry",      desc:"Wireframe icosahedron and cube rotating in 3D",    C: Effect11 },
    { id:"12",  name:"Audio Visualizer",          desc:"Simulated beat-reactive radial bar visualizer",    C: Effect12 },
    { id:"13",  name:"Smoke / Fog",               desc:"Organic fog puffs drift upward through orb light", C: Effect13 },
    { id:"14",  name:"Star Field / Warp Speed",   desc:"Hover to jump to warp speed through the stars",    C: Effect14 },
    { id:"15",  name:"Liquid Metal Surface",      desc:"Reflective mercury-like surface with wave physics", C: Effect15 },
  ]},
  { title: "Text Effects", color: "#f472b6", height: 280, effects: [
    { id:"T01", name:"Scramble / Decode",         desc:"Letters cycle random chars — click to re-trigger",  C: TextEffect01 },
    { id:"T02", name:"Magnetic Text",             desc:"Letters repel from cursor and spring back",          C: TextEffect02 },
    { id:"T03", name:"Liquid Fill",               desc:"Colored liquid rises filling the outline",           C: TextEffect03 },
    { id:"T04", name:"Glitch / Corrupt",          desc:"Text corrupts with RGB splits and offsets",          C: TextEffect04 },
    { id:"T05", name:"Typewriter",                desc:"Types and deletes phrases in a loop",                C: TextEffect05 },
    { id:"T06", name:"3D Extrude",                desc:"Deep layered shadow gives text physical depth",      C: TextEffect06 },
    { id:"T07", name:"Shatter / Explode",         desc:"Click to shatter letters into flying fragments",     C: TextEffect07 },
    { id:"T08", name:"Neon Glow Pulse",           desc:"Neon sign with realistic random tube flicker",       C: TextEffect08 },
    { id:"T09", name:"Gradient Sweep",            desc:"Metallic sheen sweeps across the letters",           C: TextEffect09 },
    { id:"T10", name:"Morph Between Words",       desc:"Letters scramble and resolve into a new word",       C: TextEffect10 },
    { id:"T11", name:"Particle Burst",            desc:"Hover each letter to explode particles outward",     C: TextEffect11 },
    { id:"T12", name:"Outline Trace",             desc:"A glowing pen tip traces the letter outlines",       C: TextEffect12 },
    { id:"T13", name:"Depth Parallax Letters",    desc:"Each letter at a different Z depth",                 C: TextEffect13 },
    { id:"T14", name:"Fire / Smoke Text",         desc:"Flame particles rise from each letter",              C: TextEffect14 },
    { id:"T15", name:"Elastic Stretch",           desc:"Letters stretch toward cursor and snap back",        C: TextEffect15 },
    { id:"T16", name:"Ink Bleed",                 desc:"Text blooms like ink on wet paper",                  C: TextEffect16 },
    { id:"T17", name:"Split Reveal",              desc:"Top and bottom halves slide apart and back",         C: TextEffect17 },
    { id:"T18", name:"Staggered Wave Color",      desc:"Rainbow hue wave rolls through each letter",         C: TextEffect18 },
    { id:"T19", name:"Gravity Drop",              desc:"Letters fall with gravity and bounce",               C: TextEffect19 },
    { id:"T20", name:"Mirror Reflection",         desc:"Shimmering flipped reflection beneath the text",     C: TextEffect20 },
  ]},
  { title: "Cursor & Interaction", color: "#34d399", height: 280, effects: [
    { id:"C01", name:"Custom Cursor",             desc:"Glowing orb cursor with fading trail",               C: CursorEffect01 },
    { id:"C02", name:"Cursor Trail",              desc:"Rainbow particle trail follows the cursor",           C: CursorEffect02 },
    { id:"C03", name:"Cursor Spotlight",          desc:"Dark page with a light circle revealing content",     C: CursorEffect03 },
    { id:"C04", name:"Cursor Magnet",             desc:"UI elements lean toward the cursor",                  C: CursorEffect04 },
    { id:"C05", name:"Cursor Ripple",             desc:"Mouse movement leaves expanding ring ripples",        C: CursorEffect05 },
    { id:"C06", name:"Cursor Paint",              desc:"Paint colorful strokes with your cursor",             C: CursorEffect06 },
  ]},
  { title: "Scroll Effects", color: "#60a5fa", height: 280, effects: [
    { id:"S07", name:"Parallax Scroll",           desc:"Background layers scroll at different speeds",        C: ScrollEffect07 },
    { id:"S08", name:"Scroll Reveal",             desc:"Elements animate in as they enter the viewport",     C: ScrollEffect08 },
    { id:"S09", name:"Scroll Progress",           desc:"Circular progress indicator updates with scroll",     C: ScrollEffect09 },
    { id:"S10", name:"Horizontal Scroll",         desc:"Section scrolls horizontally",                       C: ScrollEffect10 },
    { id:"S11", name:"Scroll Zoom",               desc:"Element scales up as you scroll down",               C: ScrollEffect11 },
    { id:"S12", name:"Sticky Morph",              desc:"Shape morphs and changes color as you scroll",        C: ScrollEffect12 },
    { id:"S13", name:"Scroll Counter",            desc:"Numbers count up when scrolled into view",            C: ScrollEffect13 },
    { id:"S14", name:"Path Draw",                 desc:"SVG path draws itself with scroll position",          C: ScrollEffect14 },
  ]},
  { title: "Page Transitions", color: "#fb923c", height: 280, effects: [
    { id:"P15", name:"Curtain Wipe",              desc:"Colored panel slides across to reveal new page",      C: TransitionEffect15 },
    { id:"P16", name:"Shatter Transition",        desc:"Page shatters into pieces",                          C: TransitionEffect16 },
    { id:"P17", name:"Zoom Transition",           desc:"Page zooms into element then zooms out",             C: TransitionEffect17 },
    { id:"P18", name:"Liquid Morph",              desc:"Blob expands from click point to fill screen",        C: TransitionEffect18 },
    { id:"P19", name:"Glitch Transition",         desc:"Screen glitches before snapping to new page",        C: TransitionEffect19 },
    { id:"P20", name:"Fade + Slide",              desc:"Smooth fade combined with directional slide",         C: TransitionEffect20 },
  ]},
  { title: "Cards & UI", color: "#e879f9", height: 280, effects: [
    { id:"U21", name:"Holographic Card",          desc:"Rainbow iridescent sheen shifts with mouse angle",    C: CardEffect21 },
    { id:"U22", name:"Glassmorphism",             desc:"Frosted glass with blur and colored light bleed",     C: CardEffect22 },
    { id:"U23", name:"Tilt + Shine",              desc:"Card tilts in 3D with specular highlight",            C: CardEffect23 },
    { id:"U24", name:"Flip Card",                 desc:"Card flips 180° in 3D to reveal back",               C: CardEffect24 },
    { id:"U25", name:"Magnetic Button",           desc:"Button physically moves toward the cursor",           C: CardEffect25 },
    { id:"U26", name:"Liquid Button",             desc:"Button fill animates like a liquid blob",             C: CardEffect26 },
    { id:"U27", name:"Morphing Border",           desc:"Rotating gradient border around a card",              C: CardEffect27 },
    { id:"U28", name:"Spotlight Grid",            desc:"Spotlight illuminates nearby cards on hover",         C: CardEffect28 },
  ]},
  { title: "Loaders", color: "#facc15", height: 280, effects: [
    { id:"L29", name:"DNA Helix",                 desc:"Two strands spiral like a DNA double helix",          C: LoaderEffect29 },
    { id:"L30", name:"Morphing Shape",            desc:"Shape morphs between circle and square",              C: LoaderEffect30 },
    { id:"L31", name:"Liquid Blob",               desc:"Organic blob that stretches and squashes",            C: LoaderEffect31 },
    { id:"L32", name:"Orbital",                   desc:"Dots orbit a center point at different speeds",       C: LoaderEffect32 },
    { id:"L33", name:"Progress Fill",             desc:"Circular progress bar that fills with color",         C: LoaderEffect33 },
    { id:"L34", name:"Particle Gather",           desc:"Particles fly together to form a star shape",         C: LoaderEffect34 },
  ]},
  { title: "Physics", color: "#f87171", height: 300, effects: [
    { id:"PH35", name:"Cloth Simulation",         desc:"Fabric mesh waves in wind, reacts to mouse",          C: PhysicsEffect35 },
    { id:"PH36", name:"Soft Body Blobs",          desc:"Metaball blobs that merge with organic physics",      C: PhysicsEffect36 },
    { id:"PH37", name:"Rope / Chain",             desc:"Hanging rope with realistic pendulum physics",        C: PhysicsEffect37 },
    { id:"PH38", name:"Bouncing Balls",           desc:"Balls with gravity, friction and collision",          C: PhysicsEffect38 },
    { id:"PH39", name:"Flocking / Boids",         desc:"Particles flock like birds, scatter from mouse",      C: PhysicsEffect39 },
    { id:"PH40", name:"Sand Fall",                desc:"Click and drag to pour falling sand",                 C: PhysicsEffect40 },
  ]},
  { title: "Generative Art", color: "#2dd4bf", height: 300, effects: [
    { id:"G41", name:"Voronoi Diagram",           desc:"Animated colored cells that shift and flow",          C: GenEffect41 },
    { id:"G42", name:"Lissajous Curves",          desc:"Mathematical curves forming complex patterns",        C: GenEffect42 },
    { id:"G43", name:"Reaction Diffusion",        desc:"Organic spotted patterns that grow like biology",     C: GenEffect43 },
    { id:"G44", name:"Fractal Zoom",              desc:"Animated zoom into a Mandelbrot set fractal",        C: GenEffect44 },
    { id:"G45", name:"Truchet Tiles",             desc:"Rotating quarter-circle tiles forming maze patterns", C: GenEffect45 },
    { id:"G46", name:"Flow Field Art",            desc:"Lines follow a vector field creating organic art",    C: GenEffect46 },
  ]},
  { title: "3D Scenes", color: "#818cf8", height: 300, effects: [
    { id:"3D47", name:"3D Globe",                 desc:"Wireframe globe — drag to rotate",                    C: ThreeDEffect47 },
    { id:"3D48", name:"Particle Sphere",          desc:"Thousands of particles arranged in a sphere",         C: ThreeDEffect48 },
    { id:"3D49", name:"3D Tunnel",                desc:"Flying through an infinite tunnel of rings",          C: ThreeDEffect49 },
    { id:"3D50", name:"3D Wave Grid",             desc:"Grid of points undulating in a 3D wave",              C: ThreeDEffect50 },
    { id:"3D51", name:"3D Text",                  desc:"Extruded 3D text that tilts with mouse",              C: ThreeDEffect51 },
    { id:"3D52", name:"3D Ribbon",                desc:"Flowing ribbon rotating in 3D space",                 C: ThreeDEffect52 },
  ]},
  { title: "Audio Reactive", color: "#4ade80", height: 280, effects: [
    { id:"A53", name:"Mic-reactive Orbs",         desc:"Orbs pulse with microphone input (simulated)",        C: AudioEffect53 },
    { id:"A54", name:"Frequency Bars",            desc:"Classic equalizer bars reacting to audio",            C: AudioEffect54 },
    { id:"A55", name:"Waveform Line",             desc:"Smooth line tracing the audio waveform",              C: AudioEffect55 },
    { id:"A56", name:"Particle Explosion",        desc:"Particles explode outward on beat detection",         C: AudioEffect56 },
  ]},
  { title: "Image & Video", color: "#fb7185", height: 280, effects: [
    { id:"I57", name:"Image Distortion",          desc:"Hover to warp image like a funhouse mirror",          C: ImageEffect57 },
    { id:"I58", name:"Pixel Scatter",             desc:"Image explodes into pixels — click to scatter",       C: ImageEffect58 },
    { id:"I59", name:"RGB Split",                 desc:"Chromatic aberration applied dynamically",            C: ImageEffect59 },
    { id:"I60", name:"Scroll Reveal",             desc:"Image revealed through a wipe mask as you scroll",    C: ImageEffect60 },
    { id:"I61", name:"ASCII Art",                 desc:"Image rendered as ASCII characters in real time",     C: ImageEffect61 },
  ]},
  { title: "Advanced", color: "#f97316", height: 320, effects: [
    { id:"ADV01", name:"Fluid Simulation",        desc:"Real Navier-Stokes fluid — move mouse to inject dye", C: AdvancedEffect01 },
    { id:"ADV02", name:"Pixel Sorting",           desc:"Sorts pixels by brightness — click to toggle",        C: AdvancedEffect02 },
    { id:"ADV03", name:"Edge Detection",          desc:"Renders image as sketch outlines or neon edges",      C: AdvancedEffect03 },
    { id:"ADV04", name:"Halftone",                desc:"Converts image to dot grid like newspaper print",     C: AdvancedEffect04 },
    { id:"ADV05", name:"Force-directed Graph",    desc:"Physics-based node graph — mouse pushes nodes",       C: AdvancedEffect05 },
    { id:"ADV06", name:"Strange Attractor",       desc:"Lorenz chaotic system tracing a 3D path",             C: AdvancedEffect06 },
    { id:"ADV07", name:"L-System Tree",           desc:"Recursive grammar rules generating fractal trees",    C: AdvancedEffect07 },
    { id:"ADV08", name:"Fourier Epicycles",       desc:"Rotating circles reconstructing a path via DFT",      C: AdvancedEffect08 },
    { id:"ADV09", name:"Variable Font",           desc:"Font weight, width and slant axes animating live",    C: AdvancedEffect09 },
    { id:"ADV10", name:"Drag with Inertia",       desc:"Draggable cards with momentum and spring physics",    C: AdvancedEffect10 },
    { id:"ADV11", name:"Game of Life",            desc:"Conway's cellular automata — pause, play, reset",     C: AdvancedEffect11 },
    { id:"ADV12", name:"Perlin Terrain",          desc:"Animated procedural landscape using Perlin noise",    C: AdvancedEffect12 },
    { id:"ADV13", name:"Text on a Path",          desc:"Text flows along a circular path with color wave",    C: AdvancedEffect13 },
    { id:"ADV14", name:"Webcam ASCII",            desc:"Live webcam feed rendered as ASCII characters",       C: AdvancedEffect14 },
    { id:"ADV15", name:"Spring Network",          desc:"Interconnected nodes held by springs — mouse disturbs",C: AdvancedEffect15 },
  ]},
  { title: "More Effects", color: "#67e8f9", height: 300, effects: [
    { id:"N01", name:"Constellation",            desc:"Stars connect to each other and your cursor",           C: NewEffect01 },
    { id:"N02", name:"Shockwave",                desc:"Click to spawn expanding shockwave rings",             C: NewEffect02 },
    { id:"N03", name:"Morphing Blob",            desc:"Organic layered blob that deforms with mouse",          C: NewEffect03 },
    { id:"N04", name:"Matrix Rain",              desc:"Falling katakana characters like The Matrix",           C: NewEffect04 },
    { id:"N05", name:"Smoke Trails",             desc:"Move mouse to leave drifting smoke behind",             C: NewEffect05 },
    { id:"N06", name:"Lightning",                desc:"Fractal lightning bolts - move mouse to aim",           C: NewEffect06 },
    { id:"N07", name:"Kaleidoscope",             desc:"Symmetrical rotating geometric patterns",              C: NewEffect07 },
    { id:"N08", name:"Soap Bubbles",             desc:"Iridescent bubbles floating upward with physics",      C: NewEffect08 },
    { id:"N09", name:"Spiral Galaxy",            desc:"3-arm spiral galaxy with rotating star orbits",        C: NewEffect09 },
    { id:"N10", name:"Confetti Burst",           desc:"Click to explode colorful confetti with gravity",      C: NewEffect10 },
  ]},
];

export default function App() {
  const total = SECTIONS.reduce((acc, s) => acc + s.effects.length, 0);
  return (
    <div style={{ minHeight: "100vh", background: "#030308", color: "white" }}>
      <div style={{ textAlign: "center", padding: "64px 24px 48px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
          Complete Effects Library
        </p>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16, background: "linear-gradient(to right, #a78bfa, #f472b6, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {total} Effects
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", fontSize: 14 }}>
          {SECTIONS.length} categories. All interactive. Effects activate as you scroll down.
        </p>
      </div>

      <div style={{ padding: "0 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
        {SECTIONS.map(section => (
          <div key={section.title} style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: section.color, boxShadow: `0 0 10px ${section.color}`, flexShrink: 0 }} />
              <h2 style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: section.color, margin: 0 }}>
                {section.title}
              </h2>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{section.effects.length} effects</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
              {section.effects.map(({ id, name, desc, C }) => (
                <div key={id} style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <LazyEffect component={C} height={section.height} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "10px 12px", background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)", pointerEvents: "none", zIndex: 10 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 900, color: "rgba(255,255,255,0.2)", marginTop: 2, flexShrink: 0 }}>#{id}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{name}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{desc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}