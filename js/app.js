import * as THREE from 'three';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import particleTexture from '../particle.webp';
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild(this.renderer.domElement)

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.point = new THREE.Vector3();

        document.getElementById('container').appendChild(this.renderer.domElement);

        // this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
        this.camera.position.set(2, 1, 3);
        // this.camera.position.set(1, 1, 3);


        // To add or not to?
        // this.camera.position.z = 1000;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.time = 0;

        this.materials = [];
        this.isPlaying = true;

        let opts = [
            {
                min_radius: 0.7,
                max_radius: 1.5,
                color: '#f7b373',
                size: 1,
                uAmp: 1,
            },
            {
                min_radius: 0.4,
                max_radius: 1.5,
                color: '#88b3ce',
                size: 0.7,
                uAmp: 3,

            },
            {
                min_radius: 1.0,
                max_radius: 2.0,
                color: '#89d3ce',
                size: 0.9,
                uAmp: 4,

            },
        ]
        opts.forEach(op => {
            this.addObject(op);
        });
        this.raycasterEvent();
        this.addObject(opts);
        this.resize();
        this.render();
        this.setupResize();
    }
    raycasterEvent() {

        let mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10, 10).rotateX(-Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        )

        let test = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 10, 10).rotateX(-Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        )

        // this.scene.add(test);

        window.addEventListener('pointermove', (event) => {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera);
            let intersects = this.raycaster.intersectObjects([mesh]);
            if (intersects[0]) {
                // this.point = intersects[0].point;
                test.position.copy(intersects[0].point);
                this.point.copy(intersects[0].point);
            }
        })
    }
    settings() {
        let that = this;
        this.settings = {
            progress: 0,
        };
        this.gui = new GUI();
        this.gui.add(this.settings, "progress", 0, 1, 0.01);
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    addObject(opts) {
        let that = this;
        let count = 10000;
        let min_radius = opts.min_radius || 0.5;
        let max_radius = opts.max_radius || 1.2;
        let particlegeo = new THREE.PlaneGeometry(1, 1);
        let geo = new THREE.InstancedBufferGeometry();
        geo.instanceCount = 10000;
        geo.setAttribute('position', particlegeo.getAttribute('position'));
        geo.index = particlegeo.index;

        let pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            let theta = Math.random() * 2 * Math.PI;
            let r = lerp(min_radius, max_radius, Math.random());
            let x = r * Math.sin(theta);
            let y = (Math.random() - 0.5) * 0.1;
            let z = r * Math.cos(theta);
            pos.set([
                x, y, z
            ], i * 3);
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
            // wireframe: true,
            transparent: true,
            depthTest: false,
            vertexShader: vertex,
            fragmentShader: fragment
        });
        this.materials.push(material);
        this.geometry = new THREE.PlaneGeometry(1, 1, 1);

        this.points = new THREE.Mesh(geo, material);
        this.scene.add(this.points);
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.05;
        this.materials.forEach(m => {
            m.uniforms.time.value = this.time * 0.05;
            // m.uniforms.time.value = this.time * 0.01;
            m.uniforms.uMouse.value = this.point;
        })
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);

    }
}

new Sketch({
    dom: document.getElementById("container")
});