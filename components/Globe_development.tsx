import { StyleSheet, View } from 'react-native';
import ExpoTHREE, { Renderer } from 'expo-three';
import { GLView } from 'expo-gl';
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
} from 'three';

import { GeoJsonGeometry } from 'three-geojson-geometry';
import { geoGraticule10 } from 'd3-geo';

// @ts-ignore
import SimpleTween from 'react-native-simple-tween';

export default function Globe_V1() {
    const onContextCreate = async (gl: any) => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
        );

        camera.position.z = 10;

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

        const globeTexture = await ExpoTHREE.loadAsync(
            require('../assets/Textures/Earth_Texture.png')
        );

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

        const graticulesObj = new LineSegments(
            new GeoJsonGeometry(geoGraticule10(), 5, 2),
            new LineBasicMaterial({ color: 'lightgrey', transparent: true, opacity: 0.1 })
        );

        // @ts-ignore
        earth.rotation.y = -Math.PI / 2;

        scene.add(ambientLight);
        scene.add(light);
        scene.add(earth);
        scene.add(clouds);
        scene.add(graticulesObj);

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
        // scene.rotation.x = ((lat * Math.PI) / 180);
        // scene.rotation.x = 0;
        // @ts-ignore
        // let goalY = -((long * Math.PI) / 180);
        // let goalX = (lat * Math.PI) / 180;
        // scene.rotation.y = -((long * Math.PI) / 180);
        // scene.rotation.y = 0;

        const from = {
            z: 10,
            x: 0,
            y: 0,
        };
        const to = {
            z: 8,
            x: (lat * Math.PI) / 180,
            y: -((long * Math.PI) / 180) - 0.2,
        };

        const tween = new SimpleTween(from, to, 1000);
        tween.setDuration(2000);
        tween.setEasing(SimpleTween.Easing.Quadratic.InOut);

        tween.start();



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
        // backgroundColor: Colors.blackBase,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
