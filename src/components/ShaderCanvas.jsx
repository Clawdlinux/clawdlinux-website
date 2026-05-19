import { useRef, useEffect } from 'react';

/**
 * WebGL2 animated shader background — adapted from 21st.dev animated-shader-hero.
 * Blue/teal/indigo palette to match the NineVigil brand.
 * Used as a full-screen background layer on the homepage.
 */

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform int pointerCount;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(3,2,1))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.05,bg*.10,bg*.25),d);
  }
  O=vec4(col,1);
}`;

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2');
    if (this.gl) this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    this.mouseMove = [0, 0];
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    }
  }

  setup() {
    const gl = this.gl;
    if (!gl) return;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, VERTEX_SRC);
    this.compile(this.fs, FRAGMENT_SRC);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    this.program._resolution = gl.getUniformLocation(this.program, 'resolution');
    this.program._time = gl.getUniformLocation(this.program, 'time');
    this.program._move = gl.getUniformLocation(this.program, 'move');
    this.program._touch = gl.getUniformLocation(this.program, 'touch');
    this.program._pointerCount = gl.getUniformLocation(this.program, 'pointerCount');
  }

  updateScale(scale) {
    this.scale = scale;
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  updateMouse(coords) { this.mouseCoords = coords; }
  updatePointerCount(n) { this.nbrOfPointers = n; }
  updatePointerCoords(coords) { this.pointerCoords = coords; }
  updateMove(deltas) { this.mouseMove = deltas; }

  render(now = 0) {
    const gl = this.gl;
    const p = this.program;
    if (!gl || !p || gl.getProgramParameter(p, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(p._resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(p._time, now * 1e-3);
    gl.uniform2f(p._move, ...this.mouseMove);
    gl.uniform2f(p._touch, ...this.mouseCoords);
    gl.uniform1i(p._pointerCount, this.nbrOfPointers);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  reset() {
    const gl = this.gl;
    if (this.program && gl && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }
}

export default function ShaderCanvas({ className = '' }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const pointerActive = useRef(false);
  const lastCoords = useRef([0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const renderer = new WebGLRenderer(canvas, dpr);
    rendererRef.current = renderer;
    renderer.setup();
    renderer.init();

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      renderer.updateScale(dpr);
    };

    const map = (x, y) => [x * dpr, canvas.height - y * dpr];

    const onDown = (e) => {
      pointerActive.current = true;
      lastCoords.current = map(e.clientX, e.clientY);
      renderer.updatePointerCount(1);
      renderer.updateMouse(lastCoords.current);
    };
    const onUp = () => {
      pointerActive.current = false;
      renderer.updatePointerCount(0);
    };
    const onMove = (e) => {
      if (!pointerActive.current) return;
      lastCoords.current = map(e.clientX, e.clientY);
      renderer.updateMouse(lastCoords.current);
      renderer.updateMove([e.movementX, e.movementY]);
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', onUp);
    canvas.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);

    const loop = (now) => {
      renderer.render(now);
      frameRef.current = requestAnimationFrame(loop);
    };
    loop(0);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onUp);
      canvas.removeEventListener('pointermove', onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      renderer.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full touch-none ${className}`}
      style={{ background: 'black' }}
    />
  );
}
