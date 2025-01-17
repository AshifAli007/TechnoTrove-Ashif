import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import fragment from '../shaders/fragment.glsl';
// import vertex from '../shaders/vertex.glsl';
import particleTexture from './particle.webp';
import { Navbar, Footer, Landing, About, Skills, Testimonials, Blog, Education, Experience, Contacts, Projects, Services, Achievement } from '../../components'
import { headerData } from '../../data/headerData';
import Arrow from '../../assets/arrow.svg';
import './Galaxy.css';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ThemeContext } from '../../contexts/ThemeContext';



const vertex = `
    uniform float time;
uniform float size;
uniform float uAmp;
uniform vec3 uMouse;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
attribute vec3 pos;
float PI = 3.141592653589793238;

//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}


mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

float saturate(float x)
{
  return clamp(x, 0.0, 1.0);
}

vec3 curl_noise(vec3 p)
{

  // return curlNoise(p);
  const float step = 0.01;
  float ddx = cnoise(p+vec3(step, 0.0, 0.0)) - cnoise(p-vec3(step, 0.0, 0.0));
  float ddy = cnoise(p+vec3(0.0, step, 0.0)) - cnoise(p-vec3(0.0, step, 0.0));
  float ddz = cnoise(p+vec3(0.0, 0.0, step)) - cnoise(p-vec3(0.0, 0.0, step));

  const float divisor = 1.0 / ( 2.0 * step );
  return ( vec3(ddy - ddz, ddz - ddx, ddx - ddy) * divisor );
}

vec3 fbm_vec3(vec3 p, float frequency, float offset)
{
  return vec3(
    cnoise((p+vec3(offset))*frequency),
    cnoise((p+vec3(offset+20.0))*frequency),
    cnoise((p+vec3(offset-30.0))*frequency)
  );
}
vec3 getOffset(vec3 p)
{
    float twist_scale = cnoise(pos)*0.5+0.5;
    vec3 temppos = rotation3dY(time*(0.5 + 0.5*twist_scale)+ length(pos.xz))*p;
    vec3 offset = fbm_vec3(pos, 0.5, 0.);
    return offset*0.2*uAmp;
}
void main() {
    vUv = position.xy + vec2(0.5);
    vec3 finalpos = pos + position*0.1;

    float particle_size = cnoise(pos*5.)*0.5 + 0.5;

    vec3 world_pos = rotation3dY(time*0.3*(0.1+0.5*particle_size))*pos;

    vec3 offset0 = getOffset(world_pos);
    vec3 offset = fbm_vec3(world_pos + offset0, 0., 0.);



    vec3 particle_position = (modelMatrix*vec4(world_pos + offset0, 1.)).xyz;

    float distanceToMouse = pow(1. - clamp(length(uMouse.xz - particle_position.xz)-0.3, 0., 1.), 4.);

    vec3 dir = particle_position - uMouse;

    // particle_position.y += distanceToMouse*0.3;
    // try this one it's good
    // particle_position = mix(particle_position, particle_position + normalize(dir)*distanceToMouse*0.3, 0.5);

    particle_position = mix(particle_position, uMouse + normalize(dir)*0.1, distanceToMouse);



    // calc global position
    // add position
    vec4 view_pos = viewMatrix*vec4(particle_position, 1.);

    view_pos.xyz += position*size*(0.01+0.1*particle_size);

    // gl_Position = projectionMatrix * viewMatrix*modelMatrix * vec4(finalpos, 1.0);

    gl_Position = projectionMatrix * view_pos;

}
`

const fragment = `
    uniform float time;
uniform float progress;
uniform vec3 uColor;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

void main() {

    // vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);

    vec4 ttt = texture2D(uTexture, vUv);
    gl_FragColor = vec4(uColor, 0.6*ttt.r); 
}

`

gsap.registerPlugin(useGSAP);

const Galaxy = () => {
  const containerRef = useRef();
  const galaxyContainer = useRef();
  const { theme } = useContext(ThemeContext);

  useGSAP(() => {
    gsap.from("#galaxy-container", { y: '30%', duration: 2.5, ease: "back.out(0.5)", delay: 1.5 });
    gsap.from(".arrow", { y: '-100%', duration: 2.5, ease: "back.out(0.5)", delay: 4, opacity: 0 });

  }, { scope: galaxyContainer });

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 1000);
    camera.position.set(10, 1, 3);
    gsap.to(camera.position, {
      x: 2,
      duration: 2, // Duration of the animation in seconds
      ease: 'power2.inOut', // Easing function,
      delay: 2,
      onUpdate: () => {
        camera.updateProjectionMatrix(); // Update the camera projection matrix
      }
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const point = new THREE.Vector3();

    let materials = [];
    let mesh;

    function lerp(a, b, t) {
      return a * (1 - t) + b * t;
    }

    function addObject(opts) {
      let count = 10000;
      let min_radius = opts.min_radius;
      let max_radius = opts.max_radius;
      let particlegeo = new THREE.PlaneGeometry(1, 1);
      let geo = new THREE.InstancedBufferGeometry();
      geo.instanceCount = count;
      geo.setAttribute('position', particlegeo.getAttribute('position'));
      geo.index = particlegeo.index;

      let pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        let theta = Math.random() * 2 * Math.PI;
        let r = lerp(min_radius, max_radius, Math.random());
        let x = r * Math.sin(theta);
        let y = (Math.random() - 0.5) * 0.1;
        let z = r * Math.cos(theta);
        pos.set([x, y, z], i * 3);
      }

      geo.setAttribute('pos', new THREE.InstancedBufferAttribute(pos, 3, false));

      let material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: new THREE.TextureLoader().load(particleTexture) },
          time: { value: 0 },
          uAmp: { value: opts.uAmp },
          uMouse: { value: new THREE.Vector3() },
          size: { value: opts.size },
          uColor: { value: new THREE.Color(opts.color) },
          resolution: { value: new THREE.Vector4() },
        },
        transparent: true,
        depthTest: false,
        vertexShader: vertex,
        fragmentShader: fragment
      });

      materials.push(material);
      let points = new THREE.Mesh(geo, material);
      scene.add(points);
    }

    const opts = [
      { min_radius: 0.7, max_radius: 1.5, color: '#f7b373', size: 1, uAmp: 1 },
      { min_radius: 0.4, max_radius: 1.5, color: '#88b3ce', size: 0.7, uAmp: 3 },
      // { min_radius: 1.0, max_radius: 2.0, color: '#89d3ce', size: 0.9, uAmp: 4 },
      { min_radius: 1.0, max_radius: 2.0, color: theme.primary, size: 0.9, uAmp: 4 },
    ];

    opts.forEach(addObject);

    function raycasterEvent() {
      mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 10, 10).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
      );
      // Uncomment to see the mesh used for raycasting
      // scene.add(mesh);

      window.addEventListener('pointermove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects([mesh]);
        if (intersects.length > 0) {
          point.copy(intersects[0].point);
        }
      });
    }

    raycasterEvent();

    function animate() {
      requestAnimationFrame(animate);
      materials.forEach(material => {
        material.uniforms.time.value += 0.001;
        material.uniforms.uMouse.value.copy(point);
      });
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className='galaxy-container' ref={galaxyContainer}>
      <svg
        onClick={() => {
          document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }}
        className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path style={{ fill: 'white' }} d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
      </svg>
      <div id="galaxy-container" ref={containerRef} style={{ width: '100vw', height: '100vh' }}>

      </div>

    </div>

  );
};

export default Galaxy;

