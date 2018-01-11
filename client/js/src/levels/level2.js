function createLevel2Objects() {

    // Ground
    pos.set(0, - 0.5, 0);
    quat.set(0, 0, 0, 1);
    var ground = createParalellepipedWithPhysics(100, 1, 100, 0, pos, quat, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
    ground.receiveShadow = true;
    textureLoader.load(window.mjolnirGameObject.levels[currentLevel].ground, function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 2);
        ground.material.map = texture;
        ground.material.needsUpdate = true;
    });

    var lokiTargetData = { type: 'loki', score: 30 };
    var shieldTargetData = { type: 'shield', score: -20 };
    var thanosTargetData = { type: 'thanos', score: 80 };

    // Add Hydra Panes
    createTargetPane(-10, 0, 5, lokiTargetData);
    createTargetPane(0, 3, -17, thanosTargetData);
    createTargetPane(7, 10, 0, shieldTargetData);
}
