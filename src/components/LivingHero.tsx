import {useEffect, useRef} from 'react';
import './LivingHero.css';

/*
 * Cinematic WebGL treatment of the approved paired portraits.
 * UV deformation is confined to two painted regions: moving water on the
 * right and shirt fabric around the torso. The face and silhouette stay fixed.
 * Both themes use the same source UVs, avoiding any position jump.
 * On unsupported devices the existing still/legacy layers remain visible.
 */
const vertex = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform sampler2D uLight;
uniform sampler2D uDark;
uniform vec2 uResolution;
uniform float uImageAspect;
uniform float uTime;
uniform float uDarkAmount;

float softOval(vec2 p, vec2 center, vec2 size) {
  return 1.0-smoothstep(0.77,1.15,length((p-center)/size));
}
float band(vec2 p,float y,float thickness){
  return 1.0-smoothstep(0.0,thickness,abs(p.y-y));
}

void main() {
  // Y increases downwards to match the original portrait asset.
  vec2 screen = vec2(gl_FragCoord.x/uResolution.x,1.0-gl_FragCoord.y/uResolution.y);
  // The background is CSS cover at scale(1.02), centered.
  vec2 p = (screen-0.5)/1.02+0.5;
  float screenAspect = uResolution.x/uResolution.y;
  if(screenAspect>uImageAspect) p.y=(p.y-0.5)*uImageAspect/screenAspect+0.5;
  else p.x=(p.x-0.5)*screenAspect/uImageAspect+0.5;

  // Animated surf follows the diagonal line of the actual shore.
  // The sea and reflection stay on the image's right-hand side.
  float waterBounds = smoothstep(0.49,0.61,p.x) *
       smoothstep(0.31,0.42,p.y)*(1.0-smoothstep(0.82,0.94,p.y));
  float crest = 0.425+0.30*(p.x-0.55);
  float surf = waterBounds*(1.0-smoothstep(0.035,0.19,abs(p.y-crest)));
  float reflected = softOval(p,vec2(0.87,0.675),vec2(0.19,0.34));
  float motionMask = max(waterBounds*0.75, surf);
  // Two speeds and directions: rippling upper sea and rolling shore foam.
  float waveA = sin(p.y*127.0+p.x*11.0-uTime*2.4);
  float waveB = sin(p.y*239.0-p.x*22.0+uTime*3.2);
  float waveC = sin(p.x*85.0+p.y*63.0-uTime*1.45);
  vec2 flow = vec2(0.0088*waveA+0.0035*waveC,
                   0.0056*waveB+0.0035*waveA);
  vec2 distorted = p + flow*motionMask;

  // Moving fabric folds only inside the upper torso—never across the head.
  float cloth = softOval(p,vec2(0.477,0.405),vec2(0.074,0.094));
  cloth *= smoothstep(0.344,0.380,p.y);
  float clothWave = sin(p.y*67.0+p.x*37.0+uTime*2.1);
  distorted.x += cloth*(0.0052*clothWave+0.0027*sin(p.y*108.0-uTime*2.8));
  distorted.y += cloth*(0.0028*sin(p.y*79.0-uTime*1.7));

  // Original image is always the baseline. Both scenes have identical crop.
  vec2 sampleUV = vec2(clamp(distorted.x,0.001,0.999),1.0-clamp(distorted.y,0.001,0.999));
  vec3 light = texture2D(uLight,sampleUV).rgb;
  vec3 dark = texture2D(uDark,sampleUV).rgb;
  vec3 color = mix(light,dark,uDarkAmount);

  // A bright animated foam ribbon—visibly moving, not a static overlay.
  float foamLine = crest+0.023*sin(p.x*22.0-uTime*1.9)
       +0.012*sin(p.x*53.0+uTime*2.4);
  float foam = waterBounds*band(p,foamLine,0.046);
  float foamFlicker = 0.4+0.6*pow(0.5+0.5*sin(p.x*110.0-uTime*3.9),2.0);
  float foamIntensity=foam*foamFlicker;
  vec3 foamTint=mix(vec3(1.0,0.88,0.67),vec3(0.92,0.43,0.94),uDarkAmount);
  color=mix(color,foamTint,foamIntensity*(0.11+0.13*(1.0-uDarkAmount)));

  // Shimmer moves along the wet foreground, stronger near the sunset path.
  float flecks=pow(max(0.0,sin(p.y*228.0-uTime*4.0+sin(p.x*48.0)*2.2)),9.0);
  float broken=pow(max(0.0,sin(p.x*97.0+uTime*2.7)),5.0);
  float sparkle=reflected*waterBounds*flecks*broken;
  color+=mix(vec3(0.22,0.15,0.07),vec3(0.21,0.06,0.22),uDarkAmount)
    *sparkle*(0.75+0.25*sin(uTime*1.1));

  // Shirt fabric: visible traveling fold highlights, but no fake second body.
  float folding = 0.5+0.5*sin(p.y*84.0+p.x*37.0-uTime*2.1);
  float smallFolds = sin(p.x*156.0-p.y*94.0+uTime*3.25);
  float crease=cloth*(folding*0.11+smallFolds*0.045);
  color+=crease*mix(vec3(0.26,0.25,0.26),vec3(0.22,0.09,0.28),uDarkAmount);
  color-=cloth*max(0.0,smallFolds)*0.035;

  gl_FragColor=vec4(clamp(color,0.0,1.0),1.0);
}
`;

type GLState = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  time: WebGLUniformLocation | null;
  dark: WebGLUniformLocation | null;
  resolution: WebGLUniformLocation | null;
  aspect: WebGLUniformLocation | null;
};

function buildShader(gl:WebGLRenderingContext,type:number,source:string) {
  const shader=gl.createShader(type);
  if(!shader)return null;
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    console.warn('Hero animation shader unavailable:',gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function init(gl:WebGLRenderingContext): GLState | null {
  const vs=buildShader(gl,gl.VERTEX_SHADER,vertex);
  const fs=buildShader(gl,gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs)return null;
  const program=gl.createProgram();
  if(!program)return null;
  gl.attachShader(program,vs);gl.attachShader(program,fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
    console.warn('Hero animation program unavailable:',gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);
  const buffer=gl.createBuffer();
  if(!buffer)return null;
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  return {
    gl,program,time:gl.getUniformLocation(program,'uTime'),
    dark:gl.getUniformLocation(program,'uDarkAmount'),
    resolution:gl.getUniformLocation(program,'uResolution'),
    aspect:gl.getUniformLocation(program,'uImageAspect')
  };
}
function makeTexture(gl:WebGLRenderingContext,image:HTMLImageElement,unit:number) {
  const texture=gl.createTexture();
  if(!texture)return false;
  gl.activeTexture(gl.TEXTURE0+unit);
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  // Restrict GPU upload size to reduce mobile memory and texture limits.
  const source=document.createElement('canvas');
  const maxWidth=Math.min(1920,gl.getParameter(gl.MAX_TEXTURE_SIZE) as number);
  const w=Math.min(image.naturalWidth,maxWidth);
  source.width=w;source.height=Math.round(image.naturalHeight*w/image.naturalWidth);
  const ctx=source.getContext('2d');
  if(!ctx)return false;
  ctx.drawImage(image,0,0,source.width,source.height);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
  return true;
}

export default function LivingHero() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(reduced.matches)return;
    const gl=canvas.getContext('webgl',{
      alpha:false,antialias:false,depth:false,stencil:false,premultipliedAlpha:false,
      powerPreference:'low-power'
    });
    if(!gl)return;
    const state=init(gl);
    if(!state)return;
    let disposed=false,raf=0,visible=true,firstFrame=true,lastFrame=0;
    let blend=document.documentElement.dataset.theme==='dark'?1:0;
    const parent=canvas.parentElement;
    if(!parent)return;
    const observer=new IntersectionObserver(entries=>{
      visible=Boolean(entries[0]?.isIntersecting);
      if(visible && !raf)raf=requestAnimationFrame(render);
    },{threshold:0});
    observer.observe(parent);
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      const density=Math.min(window.devicePixelRatio||1,1.3,1920/Math.max(1,rect.width));
      canvas.width=Math.max(2,Math.round(rect.width*density));
      canvas.height=Math.max(2,Math.round(rect.height*density));
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    const resizeObserver=new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    const images=['/images/hero-light-4k.webp','/images/hero-dark-4k.webp'].map(src=>{
      const im=new Image();
      im.decoding='async';im.src=src;
      return im;
    });
    let ready=false;
    Promise.all(images.map(img=>img.decode())).then(()=>{
      if(disposed)return;
      gl.useProgram(state.program);
      if(!makeTexture(gl,images[0],0)||!makeTexture(gl,images[1],1))return;
      gl.uniform1i(gl.getUniformLocation(state.program,'uLight'),0);
      gl.uniform1i(gl.getUniformLocation(state.program,'uDark'),1);
      gl.uniform1f(state.aspect,images[0].naturalWidth/images[0].naturalHeight);
      ready=true;
    }).catch(()=>{/* Static portfolio image stays available. */});
    function render(now:number) {
      raf=0;
      if(disposed||!visible||reduced.matches)return;
      raf=requestAnimationFrame(render);
      if(now-lastFrame<32)return; // Roughly 30 FPS, even on 120 Hz screens.
      lastFrame=now;
      if(!ready)return;
      const target=document.documentElement.dataset.theme==='dark'?1:0;
      blend+=(target-blend)*.055;
      const duration=now/1000;
      gl!.uniform1f(state!.time,duration);
      gl!.uniform1f(state!.dark,blend);
      gl!.uniform2f(state!.resolution,canvas!.width,canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP,0,4);
      if(firstFrame){canvas!.dataset.ready='true';firstFrame=false;}
    }
    raf=requestAnimationFrame(render);
    return()=>{
      disposed=true;cancelAnimationFrame(raf);observer.disconnect();resizeObserver.disconnect();
    };
  },[]);
  return <canvas ref={canvasRef} className="hero-live-canvas" aria-hidden="true"/>;
}
