import { StyleSheet, View } from 'react-native';
import ExpoTHREE, { Renderer } from 'expo-three';
import { GLView } from 'expo-gl';
import data from './map_img_data.json';
import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    SphereGeometry,
    MeshStandardMaterial,
    AmbientLight,
    LineSegments,
    LineBasicMaterial,
    PointLight,
    MeshLambertMaterial,
    MathUtils,
    Group,
    Euler,
    Vector3,
    ShaderMaterial,
    SpotLight,
    DirectionalLight,
    Object3D,
    CircleGeometry,
    InstancedMesh,
    Color,
} from 'three';

//@ts-ignore
import SimpleTween from 'react-native-simple-tween';

export default function Globe() {
    // const onContextCreate = async (gl: any) => {

    //     const GLOBE_RADIUS = 25;
    //     const DEG2RAD = Math.PI / 180;
    //     const worldDotRows = 200; 
    //     const worldDotSize = 0.095;

    //     const scene = new Scene();
    //     // const camera = new PerspectiveCamera(
    //     //     20,
    //     //     gl.drawingBufferWidth / gl.drawingBufferHeight,
    //     //     170,
    //     //     260
    //     // );
    //     // camera.position.set(0, 0, 220);
    //     const camera = new PerspectiveCamera(
    //         75,
    //         gl.drawingBufferWidth / gl.drawingBufferHeight,
    //         0.1,
    //         1000
    //     );

    //     camera.position.z = 10;

    //     const light = new PointLight(0xffffff, 1, 100);
    //     light.position.set(10, 10, 10);

    //     gl.canvas = {
    //         width: gl.drawingBufferWidth,
    //         height: gl.drawingBufferHeight,
    //     };

    //     const renderer = new Renderer({ gl, antialias: true });

    //     renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    //     // const parentContainer = new Group();
    //     // const euler = new Euler(0.3, 4.6, 0.05);
    //     // let rot = euler;
    //     // const offset = new Date().getTimezoneOffset() || 0;
    //     // rot.y = euler.y + Math.PI * (offset / 720);
    //     // //@ts-ignore
    //     // parentContainer.rotation.copy(rot);
    //     // scene.add(parentContainer);
    //     // const haloContainer = new Group();
    //     // scene.add(haloContainer);

    //     // class Globe {
    //     //     constructor(t) {
    //     //         (this.props = t), this.init();
    //     //     }
    //     //     init() {
    //     //         const {
    //     //                 radius: t,
    //     //                 detail: e = 50,
    //     //                 renderer: n,
    //     //                 shadowPoint: i,
    //     //                 highlightPoint: r,
    //     //                 highlightColor: a,
    //     //                 frontHighlightColor: s = 3555965,
    //     //                 waterColor: o = 857395,
    //     //                 landColorFront: l = 16777215,
    //     //                 shadowDist: c,
    //     //                 highlightDist: h,
    //     //                 frontPoint: d,
    //     //             } = this.props,
    //     //             u = new SphereGeometry(t, e, e),
    //     //             p = new MeshStandardMaterial({
    //     //                 color: o,
    //     //                 metalness: 0,
    //     //                 roughness: 0.9,
    //     //             });
    //     //         (this.uniforms = []),
    //     //             (p.onBeforeCompile = (t) => {
    //     //                 (t.uniforms.shadowDist = {
    //     //                     value: c,
    //     //                 }),
    //     //                     (t.uniforms.highlightDist = {
    //     //                         value: h,
    //     //                     }),
    //     //                     (t.uniforms.shadowPoint = {
    //     //                         value: new Vector3().copy(i),
    //     //                     }),
    //     //                     (t.uniforms.highlightPoint = {
    //     //                         value: new Vector3().copy(r),
    //     //                     }),
    //     //                     (t.uniforms.frontPoint = {
    //     //                         value: new Vector3().copy(d),
    //     //                     }),
    //     //                     (t.uniforms.highlightColor = {
    //     //                         value: new Color(a),
    //     //                     }),
    //     //                     (t.uniforms.frontHighlightColor = {
    //     //                         value: new Color(s),
    //     //                     }),
    //     //                     (t.vertexShader =
    //     //                         '#define GLSLIFY 1\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvarying vec3 vWorldPosition;\n\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t// # include <worldpos_vertex>\n    vec4 worldPosition = vec4( transformed, 1.0 );\n\n\t#ifdef USE_INSTANCING\n\n\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t#endif\n\n\tworldPosition = modelMatrix * worldPosition;\n\tvWorldPosition = worldPosition.xyz;\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}'),
    //     //                     (t.fragmentShader =
    //     //                         '#define GLSLIFY 1\n#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nuniform float shadowDist;\nuniform float highlightDist;\nuniform vec3 shadowPoint;\nuniform vec3 highlightPoint;\nuniform vec3 frontPoint;\nuniform vec3 highlightColor;\nuniform vec3 frontHighlightColor;\n\nvarying vec3 vWorldPosition;\n\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#ifdef USE_MAP\n\n\t\tvec4 texelColor = texture2D( map, vUv );\n\t\ttexelColor = mapTexelToLinear( texelColor );\n\t\t\n\t\t#ifndef IS_FILL\n\t\t\tdiffuseColor *= texelColor;\n\t\t#endif\n\n\t#endif\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\n    float dist;\n\tfloat distZ;\n\n    // highlights\n\t#ifdef USE_HIGHLIGHT\n\t\tdist = distance(vWorldPosition, highlightPoint);\n\t\tdistZ = distance(vWorldPosition.z, 0.0);\n\t\toutgoingLight = mix(highlightColor, outgoingLight, smoothstep(0.0, highlightDist, dist) * smoothstep(0.0, 3.0, pow(distZ, 0.5)));\n        outgoingLight = mix(outgoingLight * 2.0, outgoingLight, smoothstep(0.0, 12.0, distZ));\n\t#endif\n\n    // front hightlight\n    #ifdef USE_FRONT_HIGHLIGHT\n        dist = distance(vWorldPosition * vec3(0.875, 0.5, 1.0), frontPoint);\n        outgoingLight = mix(frontHighlightColor * 1.6, outgoingLight, smoothstep(0.0, 15.0, dist));\n    #endif\n\n    // shadows\n    dist = distance(vWorldPosition, shadowPoint);\n\toutgoingLight = mix(outgoingLight * 0.01, outgoingLight, smoothstep(0.0, shadowDist, dist));\n    // shadow debug\n\t// outgoingLight = mix(vec3(1.0, 0.0, 0.0), outgoingLight, smoothstep(0.0, shadowDist, dist));\n\n\t#ifdef IS_FILL\n\t\toutgoingLight = mix(outgoingLight, outgoingLight * 0.5, 1.0 - texelColor.g * 1.5);\n\t#endif\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}'),
    //     //                     this.uniforms.push(t.uniforms);
    //     //             }),
    //     //             (p.defines = {
    //     //                 USE_HIGHLIGHT: 1,
    //     //                 USE_HIGHLIGHT_ALT: 1,
    //     //                 USE_FRONT_HIGHLIGHT: 1,
    //     //                 DITHERING: 1,
    //     //             }),
    //     //             (this.mesh = new Group());
    //     //         const m = new Mesh(u, p);
    //     //         (m.renderOrder = 1), this.mesh.add(m), (this.meshFill = m), (this.materials = [p]);
    //     //     }
    //     //     setShadowPoint(t) {
    //     //         this.uniforms &&
    //     //             this.uniforms.forEach((e) => {
    //     //                 e.shadowPoint.value.copy(t);
    //     //             });
    //     //     }
    //     //     setHighlightPoint(t) {
    //     //         this.uniforms &&
    //     //             this.uniforms.forEach((e) => {
    //     //                 e.highlightPoint.value.copy(t);
    //     //             });
    //     //     }
    //     //     setFrontPoint(t) {
    //     //         this.uniforms &&
    //     //             this.uniforms.forEach((e) => {
    //     //                 e.frontPoint.value.copy(t);
    //     //             });
    //     //     }
    //     //     setShadowDist(t) {
    //     //         this.uniforms &&
    //     //             this.uniforms.forEach((e) => {
    //     //                 e.shadowDist.value = t;
    //     //             });
    //     //     }
    //     //     setHighlightDist(t) {
    //     //         this.uniforms &&
    //     //             this.uniforms.forEach((e) => {
    //     //                 e.highlightDist.value = t;
    //     //             });
    //     //     }
    //     //     dispose() {
    //     //         (this.mesh = null),
    //     //             (this.materials = null),
    //     //             (this.uniforms = null),
    //     //             (this.meshFill = null);
    //     //     }
    //     // }

    //     // // draw_world_dots();

    //     // const shadowPoint = new Vector3()
    //     //         .copy(parentContainer.position)
    //     //         .add(new Vector3(0.7 * GLOBE_RADIUS, 0.3 * -GLOBE_RADIUS, GLOBE_RADIUS)),
    //     //     highlightPoint = new Vector3()
    //     //         .copy(parentContainer.position)
    //     //         .add(new Vector3(1.5 * -GLOBE_RADIUS, 1.5 * -GLOBE_RADIUS, 0)),
    //     //     frontPoint = new Vector3()
    //     //         .copy(parentContainer.position)
    //     //         .add(new Vector3(0, 0, GLOBE_RADIUS)),
    //     //     globe = new Globe({
    //     //         radius: GLOBE_RADIUS,
    //     //         detail: 55,
    //     //         renderer: renderer,
    //     //         shadowPoint: shadowPoint,
    //     //         shadowDist: 1.5 * GLOBE_RADIUS,
    //     //         highlightPoint: highlightPoint,
    //     //         highlightColor: 5339494,
    //     //         highlightDist: 5,
    //     //         frontPoint: frontPoint,
    //     //         frontHighlightColor: 2569853,
    //     //         waterColor: 1513012,
    //     //         landColorFront: 16777215,
    //     //         landColorBack: 16777215,
    //     //     });

    //     const globeMaterial = await ExpoTHREE.loadAsync(
    //         require('../assets/Textures/Earth_January.jpg')
    //     );

    //     const earth = new Mesh(
    //         new SphereGeometry(5, 50, 50),
    //         new MeshStandardMaterial({
    //             map: globeMaterial,
    //         })
    //     );

    //     const color = 0xffffff;
    //     const intensity = 1;

    //     const ambientLight = new AmbientLight(color, intensity);

    //     scene.add(earth);
    //     scene.add(ambientLight);
    //     scene.add(light); 

    //     // const a = new SphereGeometry(GLOBE_RADIUS, 45, 45),
    //     //     s = new ShaderMaterial({
    //     //         uniforms: {
    //     //             c: {
    //     //                 type: 'f',
    //     //                 value: 0.7,
    //     //             },
    //     //             p: {
    //     //                 type: 'f',
    //     //                 value: 15,
    //     //             },
    //     //             glowColor: {
    //     //                 type: 'c',
    //     //                 value: new Color(1844322),
    //     //             },
    //     //             viewVector: {
    //     //                 type: 'v3',
    //     //                 value: new Vector3(0, 0, 220),
    //     //             },
    //     //         },
    //     //         vertexShader:
    //     //             '#define GLSLIFY 1\nuniform vec3 viewVector;\nuniform float c;\nuniform float p;\nvarying float intensity;\nvarying float intensityA;\nvoid main() \n{\n  vec3 vNormal = normalize( normalMatrix * normal );\n  vec3 vNormel = normalize( normalMatrix * viewVector );\n  intensity = pow( c - dot(vNormal, vNormel), p );\n  intensityA = pow( 0.63 - dot(vNormal, vNormel), p );\n  \n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
    //     //         fragmentShader:
    //     //             '#define GLSLIFY 1\nuniform vec3 glowColor;\nvarying float intensity;\nvarying float intensityA;\nvoid main()\n{\n  gl_FragColor = vec4( glowColor * intensity, 1.0 * intensityA );\n}',
    //     //         side: 1,
    //     //         blending: 2,
    //     //         transparent: !0,
    //     //         dithering: !0,
    //     //     }),
    //     //     halo = new Mesh(a, s);

    //     // halo.scale.multiplyScalar(1.15);
    //     // halo.rotateX(0.03 * Math.PI);
    //     // halo.rotateY(0.03 * Math.PI);
    //     // halo.renderOrder = 3;
    //     // haloContainer.add(halo);
    //     // haloContainer.position.set(0, 0, -10);

    //     // const light_amb = new AmbientLight(16777215, 0.8),
    //     //     light_spot_1 = new SpotLight(2197759, 12, 120, 0.3, 0, 1.1),
    //     //     light_spot_2 = new SpotLight(16018366, 5, 75, 0.5, 0, 1.25),
    //     //     light_dir = new DirectionalLight(11124735, 3);

    //     // light_spot_1.position.set(parentContainer.position.x - 2.5 * GLOBE_RADIUS, 80, -40); //.multiplyScalar(t);
    //     // light_spot_2.position.set(
    //     //     parentContainer.position.x + GLOBE_RADIUS,
    //     //     GLOBE_RADIUS,
    //     //     2 * GLOBE_RADIUS
    //     // ); //.multiplyScalar(t)
    //     // light_spot_2.distance = 75; // * t
    //     // light_dir.position.set(
    //     //     parentContainer.position.x - 50,
    //     //     parentContainer.position.y + 30,
    //     //     10
    //     // ); //.multiplyScalar(t)

    //     // light_spot_1.target = parentContainer;
    //     // light_spot_2.target = parentContainer;
    //     // light_dir.target = parentContainer;

    //     // scene.add(light_amb, light_spot_1, light_spot_2);

    //     const render = () => {
    //         requestAnimationFrame(render);
    //         // parentContainer.rotation.y += 0.002;
    //         gl.endFrameEXP();
    //     };

    //     render();

    //     function draw_world_dots() {
    //         const e = new Object3D(),
    //             // d = getImageData(globeDots),
    //             i = [],
    //             r = worldDotRows;

    //         let d = {
    //             data: data.data,
    //             height: 200,
    //             width: 400,
    //         };

    //         for (let lat = -90; lat <= 90; lat += 180 / r) {
    //             const radius = Math.cos(Math.abs(lat) * DEG2RAD) * GLOBE_RADIUS;
    //             const circum = radius * Math.PI * 2 * 2;
    //             for (let r = 0; r < circum; r++) {
    //                 const lng = (360 * r) / circum - 180;
    //                 if (!visibilityForCoordinate(lng, lat, d)) continue;
    //                 const s = calc_pos(lat, lng, GLOBE_RADIUS);
    //                 e.position.set(s.x, s.y, s.z);
    //                 const o = calc_pos(lat, lng, GLOBE_RADIUS + 5);
    //                 e.lookAt(o.x, o.y, o.z);
    //                 e.updateMatrix();
    //                 i.push(e.matrix.clone());
    //             }
    //         }
    //         const dot = new CircleGeometry(worldDotSize, 5),
    //             dot_mat = new MeshStandardMaterial({
    //                 color: 3818644,
    //                 metalness: 0,
    //                 roughness: 0.9,
    //                 transparent: !0,
    //                 alphaTest: 0.02,
    //             });
    //         dot_mat.onBeforeCompile = (t) => {
    //             t.fragmentShader = t.fragmentShader.replace(
    //                 'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
    //                 '\n        gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n        if (gl_FragCoord.z > 0.51) {\n          gl_FragColor.a = 1.0 + ( 0.51 - gl_FragCoord.z ) * 17.0;\n        }\n      '
    //             );
    //         };

    //         const o = new InstancedMesh(dot, dot_mat, i.length);
    //         for (let l = 0; l < i.length; l++) o.setMatrixAt(l, i[l]);
    //         o.renderOrder = 3;
    //         //worldMesh = o;
    //         parentContainer.add(o);
    //     }

    //     function visibilityForCoordinate(lng, lat, data) {
    //         const i = 4 * data.width,
    //             r = parseInt(((lng + 180) / 360) * data.width + 0.5),
    //             a = data.height - parseInt(((lat + 90) / 180) * data.height - 0.5),
    //             s = parseInt(i * (a - 1) + 4 * r) + 3;
    //         return data.data[s] > 90;
    //     }

    //     function calc_pos(lat, lng, R, vec) {
    //         vec = vec || new Vector3();
    //         const V = (90 - lat) * DEG2RAD,
    //             H = (lng + 180) * DEG2RAD;
    //         return (
    //             vec.set(
    //                 -R * Math.sin(V) * Math.cos(H),
    //                 R * Math.cos(V),
    //                 R * Math.sin(V) * Math.sin(H)
    //             ),
    //             vec
    //         );
    //     }
    // };

    const onContextCreate = async (gl: any) => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            20,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            200,
            500
        );

        camera.position.z = 200;

        gl.canvas = {
            width: gl.drawingBufferWidth,
            height: gl.drawingBufferHeight,
        };

        const color = 0xffffff;
        const intensity = 1;

        const ambientLight = new AmbientLight(color, intensity);

        const light = new PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);

        const renderer = new Renderer({ gl, antialias: true });

        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const globeMaterial = await ExpoTHREE.loadAsync(
            require('../assets/Textures/Earth_January.jpg')
        );

        const globeCloudsMaterial = await ExpoTHREE.loadAsync(
            require('../assets/Textures/Earth_clouds.jpeg')
        );

        const globeTexture = await ExpoTHREE.loadAsync(require('../assets/Textures/Earth_Texture.png'));

        const earth = new Mesh(
            new SphereGeometry(5, 50, 50),
            new MeshStandardMaterial({
                map: globeMaterial,
                bumpMap: globeTexture,
                bumpScale: 10,
            })
        );

        const clouds = new Mesh(
            new SphereGeometry(5, 50, 50),
            new MeshLambertMaterial({
                color: 0xffffff,
                map: globeCloudsMaterial,
                transparent: true,
                opacity: 0.4,
            })
        );

        clouds.scale.set(1.005, 1.005, 1.005);



        // @ts-ignore
        earth.rotation.y = -Math.PI / 2;

        scene.add(ambientLight);
        scene.add(light);
        scene.add(earth);
        scene.add(clouds);

        function polar2Cartesian(lat: number, lng: number, relAltitude = 0) {
            const phi = ((90 - lat) * Math.PI) / 180;
            const theta = ((90 - lng) * Math.PI) / 180;
            const r = 5 * (1 + relAltitude);
            return {
                x: r * Math.sin(phi) * Math.cos(theta),
                y: r * Math.cos(phi),
                z: r * Math.sin(phi) * Math.sin(theta),
            };
        }

        let lat = 38.8339;
        let long = -104.8214;

        let coords = polar2Cartesian(lat, long);
        console.log(coords);

        const point = new Mesh(
            new SphereGeometry(0.1, 50, 50),
            new MeshBasicMaterial({ color: 0xff0000 })
        );

        point.position.set(coords.x, coords.y, coords.z);

        scene.add(point);

        // @ts-ignore
        scene.rotation.x = ((lat * Math.PI) / 180);
        // scene.rotation.x = 0; 
        // @ts-ignore
        // let goalY = -((long * Math.PI) / 180);
        // let goalX = (lat * Math.PI) / 180;
        scene.rotation.y = -((long * Math.PI) / 180);
        // scene.rotation.y = 0; 

        const from = {
            z: 10,
            x: 0, 
            y: 0, 
        };
        const to = {
            z: 8,
            x: ((lat * Math.PI) / 180),
            y: -((long * Math.PI) / 180) - 0.2,
        };

        const tween = new SimpleTween(from, to, 1000);
        tween.setDuration(2000);
        tween.setEasing(SimpleTween.Easing.Quadratic.InOut);

        tween.start()

        const render = () => {
            requestAnimationFrame(render);

            tween.onUpdate((values: any) => {
                // Use the values here
                // @ts-ignore
                camera.position.z = values.z;
                // @ts-ignore
                scene.rotation.x = values.x;
                // @ts-ignore
                scene.rotation.y = values.y; 
            });

            // @ts-ignore
            clouds.rotation.y += 0.0001;
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        render();
    };
    return (
        <View style={styles.container}>
            <GLView
                onContextCreate={onContextCreate}
                // set height and width of GLView
                style={{ width: 400, height: 400 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'darkblue',
    },
});
