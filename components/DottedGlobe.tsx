import { Dimensions, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { Renderer } from 'expo-three';
import { GLView } from 'expo-gl';
import {
    Scene,
    Mesh,
    PerspectiveCamera,
    SphereGeometry,
    MeshStandardMaterial,
    AmbientLight,
    PointLight,
    CircleGeometry,
    InstancedMesh,
    Object3D,
    Vector3,
    Group,
    ShaderMaterial,
    Color,
} from 'three';

// @ts-ignore
import SimpleTween from 'react-native-simple-tween';
import Colors from '../constants/colors';

import data from './map_img_data.json';
import { useEffect, useState } from 'react';
import Satoshi from '../constants/Satoshi';

export default function DottedGlobe() {
    const [rotate, setRotate] = useState(true); 

    useEffect(() => {
        console.log('rotate changed'); 
    }, [rotate])



    const onContextCreate = async (gl: any) => {
        const scene = new Scene();
        const earthContainer = new Group();
        const haloContainer = new Group();
        const camera = new PerspectiveCamera(
            20,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
        );

        const GLOBE_RADIUS = 15;
        const DEG2RAD = Math.PI / 180;
        const worldDotRows = 135;
        const worldDotSize = 0.1;

        camera.position.z = 200;

        gl.canvas = {
            width: gl.drawingBufferWidth,
            height: gl.drawingBufferHeight,
        };

        const color = 0xffffff;
        const intensity = 1;

        const ambientLight = new AmbientLight(color, intensity);

        const light = new PointLight(0xffffff, 1, 40);
        light.position.set(-15, 15, 15);

        const renderer = new Renderer({ gl, antialias: true });

        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const earth = new Mesh(
            new SphereGeometry(GLOBE_RADIUS, 50, 50),
            new MeshStandardMaterial({
                color: Colors.blackBase,
            })
        );

        const haloGeometry = new SphereGeometry(GLOBE_RADIUS, 45, 45),
            haloMaterial = new ShaderMaterial({
                uniforms: {
                    c: {
                        //@ts-ignore
                        type: 'f',
                        value: 0.7,
                    },
                    p: {
                        //@ts-ignore
                        type: 'f',
                        value: 15,
                    },
                    glowColor: {
                        //@ts-ignore
                        type: 'c',
                        value: new Color(Colors.text),
                    },
                    viewVector: {
                        //@ts-ignore
                        type: 'v3',
                        value: new Vector3(0, 0, 220),
                    },
                },
                vertexShader:
                    '#define GLSLIFY 1\nuniform vec3 viewVector;\nuniform float c;\nuniform float p;\nvarying float intensity;\nvarying float intensityA;\nvoid main() \n{\n  vec3 vNormal = normalize( normalMatrix * normal );\n  vec3 vNormel = normalize( normalMatrix * viewVector );\n  intensity = pow( c - dot(vNormal, vNormel), p );\n  intensityA = pow( 0.63 - dot(vNormal, vNormel), p );\n  \n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
                fragmentShader:
                    '#define GLSLIFY 1\nuniform vec3 glowColor;\nvarying float intensity;\nvarying float intensityA;\nvoid main()\n{\n  gl_FragColor = vec4( glowColor * intensity, 1.0 * intensityA );\n}',
                side: 1,
                blending: 2,
                transparent: !0,
                dithering: !0,
            }),
            halo = new Mesh(haloGeometry, haloMaterial);
        halo.scale.multiplyScalar(1.125);
        halo.renderOrder = 3;
        haloContainer.add(halo);
        haloContainer.position.set(0, 0, -10);
        scene.add(haloContainer);

        scene.add(ambientLight);
        scene.add(light);
        scene.add(earthContainer);
        earthContainer.rotation.y = -Math.PI / 2;
        earthContainer.add(earth);

        scene.rotateZ(23.5/2 * DEG2RAD)

        const locations = {
            la: {
                lat: 34.0522,
                long: -118.2437,
            },
            cos: {
                lat: 38.8339,
                long: -104.8214,
            },
            hyd: {
                lat: 17.385,
                long: 78.4867,
            },
            hawaii: {
                lat: 19.8968, 
                long: -155.5828, 
            }
        };

        let exactLat = locations.cos.lat;
        let exactLong = locations.cos.long;

        draw_world_dots();
        draw_location_dot();

        const from = {
            z: 200,
            x: 0,
            y: -Math.PI / 2,
        };
        const to = {
            z: 100,
            x: (exactLat * Math.PI) / 180,
            y: (-exactLong - 90) * DEG2RAD,
        };


        const tween = new SimpleTween(from, to, 1000);
        tween.setDuration(2000);
        tween.setEasing(SimpleTween.Easing.Quadratic.InOut);

        tween.start();

        const render = () => {
            requestAnimationFrame(render);

            if (!rotate) {
                tween.onUpdate((values: any) => {
                    // @ts-ignore
                    camera.position.z = values.z;
                    // @ts-ignore
                    earthContainer.rotation.x = values.x;
                    // @ts-ignore
                    earthContainer.rotation.y = values.y;
                });
            }

            if (rotate) {
                earthContainer.rotation.y += 0.004;
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        render();

        function draw_location_dot() {
            const e = new Object3D();

            const possibleLats: number[] = [];
            for (let lat = -90; lat <= 90; lat += 180 / worldDotRows) {
                possibleLats.push(lat);
            }

            let nearestLat = possibleLats.reduce(function (prev, curr) {
                return Math.abs(curr - exactLat) < Math.abs(prev - exactLat) ? curr : prev;
            });

            const radius = Math.cos(Math.abs(nearestLat) * DEG2RAD) * GLOBE_RADIUS;
            const circum = radius * Math.PI * 2 * 2;
            const possibleLongs: number[] = [];

            for (let r = 0; r < circum; r++) {
                const lng = (360 * r) / circum - 180;
                possibleLongs.push(lng);
            }

            let nearestLong = possibleLongs.reduce(function (prev, curr) {
                return Math.abs(curr - exactLong) < Math.abs(prev - exactLong) ? curr : prev;
            });

            //@ts-ignore
            const s = calc_pos(nearestLat, nearestLong, GLOBE_RADIUS);
            e.position.set(s.x * 1.003, s.y * 1.003, s.z * 1.003);
            //@ts-ignore
            const o = calc_pos(nearestLat, nearestLong, GLOBE_RADIUS + 5);
            e.lookAt(o.x, o.y, o.z);
            e.updateMatrix();

            const dot = new CircleGeometry(worldDotSize * 2, 1000),
                dot_mat = new MeshStandardMaterial({
                    color: Colors.accentColor,
                });

            const i_mesh = new InstancedMesh(dot, dot_mat, 1);
            i_mesh.setMatrixAt(0, e.matrix);
            i_mesh.renderOrder = 3;
            earthContainer.add(i_mesh);
        }

        //Functions

        function draw_world_dots() {
            const e = new Object3D(),
                i = [],
                r = worldDotRows;

            let d = {
                //@ts-ignore
                data: data.data,
                height: 200,
                width: 400,
            };

            for (let lat = -90; lat <= 90; lat += 180 / r) {
                const radius = Math.cos(Math.abs(lat) * DEG2RAD) * GLOBE_RADIUS;
                const circum = radius * Math.PI * 2 * 2;
                for (let r = 0; r < circum; r++) {
                    const lng = (360 * r) / circum - 180;

                    if (!visibilityForCoordinate(lng, lat, d)) continue;
                    //@ts-ignore
                    const s = calc_pos(lat, lng, GLOBE_RADIUS);
                    e.position.set(s.x * 1.002, s.y * 1.002, s.z * 1.002);
                    //@ts-ignore
                    const o = calc_pos(lat, lng, GLOBE_RADIUS + 5);
                    e.lookAt(o.x, o.y, o.z);
                    e.updateMatrix();
                    i.push(e.matrix.clone());
                }
            }
            const dot = new CircleGeometry(worldDotSize, 1000),
                dot_mat = new MeshStandardMaterial({
                    color: Colors.textTwo,
                    metalness: 0.3,
                });
            dot_mat.onBeforeCompile = (t) => {
                t.fragmentShader = t.fragmentShader.replace(
                    'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
                    '\n        gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n        if (gl_FragCoord.z > 0.51) {\n          gl_FragColor.a = 1.0 + ( 0.51 - gl_FragCoord.z ) * 17.0;\n        }\n      '
                );
            };

            const o = new InstancedMesh(dot, dot_mat, i.length);
            for (let l = 0; l < i.length; l++) o.setMatrixAt(l, i[l]);
            o.renderOrder = 3;
            earthContainer.add(o);
        }

        function visibilityForCoordinate(lng: number, lat: number, data: any) {
            const i = 4 * data.width,
                //@ts-ignore
                r = parseInt(((lng + 180) / 360) * data.width + 0.5),
                //@ts-ignore
                a = data.height - parseInt(((lat + 90) / 180) * data.height - 0.5),
                //@ts-ignore
                s = parseInt(i * (a - 1) + 4 * r) + 3;
            return data.data[s] > 90;
        }

        //@ts-ignore
        function calc_pos(lat, lng, R, vec) {
            vec = vec || new Vector3();
            const V = (90 - lat) * DEG2RAD,
                H = (lng + 180) * DEG2RAD;
            return (
                vec.set(
                    -R * Math.sin(V) * Math.cos(H),
                    R * Math.cos(V),
                    R * Math.sin(V) * Math.sin(H)
                ),
                vec
            );
        }
    };
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={() => {
                setRotate(!rotate)
            }} >
                <Satoshi.Black style={{color: 'white', paddingTop: 50}}>rotate</Satoshi.Black>
            </TouchableOpacity> */}
            <GLView
                onContextCreate={onContextCreate}
                // set height and width of GLView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackBase,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
