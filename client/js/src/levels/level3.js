function createLevel3Objects() {

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

    var hydraTargetData = { type: 'hydra', score: 10 };
    var ultronTargetData = { type: 'ultron', score: 20 };
    var lokiTargetData = { type: 'loki', score: 30 };
    var shieldTargetData = { type: 'shield', score: -20 };
    var thanosTargetData = { type: 'thanos', score: 80 };

    // Add Hydra Panes
    createTargetPane(20, .5, -15, hydraTargetData);
    createTargetPane(-20, 15, -20, ultronTargetData);
    createTargetPane(-10, 0, 5, lokiTargetData);
    createTargetPane(0, 3, -17, shieldTargetData);
    createTargetPane(7, 10, 0, thanosTargetData);
}
