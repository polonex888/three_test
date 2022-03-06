const canvasElement = document.querySelector('#myCanvas')
const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true
});
const WIDTH  = canvasElement.width; // ブラウザの横サイズ
const HEIGHT = canvasElement.height;// ブラウザの縦サイズ
const ASPECT = WIDTH / HEIGHT;// アスペクト比

//カメラを作る
const camera = new THREE.PerspectiveCamera(45, ASPECT, 1, 2000);
camera.position.set(0, 0, 250);
//シーンを作る
const scene = new THREE.Scene();
// ライトの準備
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-1, 1, 1).normalize();
scene.add(directionalLight);
//レンダラーを作る
renderer.setSize(WIDTH, HEIGHT);

//カメラコントローラを作成
const controls = new THREE.OrbitControls(camera, canvasElement);

// OBJファイルの読み込み
//const objLoader = new THREE.OBJLoader();

/*
let geometry = new THREE.BoxGeometry(200, 200, 200);// 立方体
let material = new THREE.MeshLambertMaterial({color: 0x00ddff});// 影が表示される
const cube = new THREE.Mesh(geometry, material);// それらをまとめて3Dオブジェクトにします
scene.add(cube);
*/
//アニメーションの開始
animate();


function animate(){
	renderer.render(scene, camera);// レンダリング
    controls.update();
	requestAnimationFrame(animate);// 更新
}

function addObj(obj, mtl){


    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
    };
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };
    if(!mtl){
        objUrl = URL.createObjectURL(obj);
        new THREE.OBJLoader(manager)
                .load(
                objUrl, 
                function (object) {
                    // シーンへのモデルの追加
                    scene.add(object);
                });
    }else{
        mtlUrl = URL.createObjectURL(mtl);
        objUrl = URL.createObjectURL(obj);        
        new THREE.MTLLoader(manager).load(
            mtlUrl,
            // ロード完了時の処理
            function (materials) {
            materials.preload();
            // OBJファイルの読み込み
            new THREE.OBJLoader(manager)
                .setMaterials(materials) // マテリアルの指定
                .load(
                objUrl, 
                // ロード完了時の処理
                function (object) {
                    // シーンへのモデルの追加
                    scene.add(object);
                });
            },
        );
    }
}