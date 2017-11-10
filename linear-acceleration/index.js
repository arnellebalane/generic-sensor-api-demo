(async () => {

    if (!window.LinearAccelerationSensor) {
        throw new Error('LinearAccelerationSensor is not supported.');
    }

    const permission = await navigator.permissions.query({ name: 'accelerometer' });
    if (permission.state !== 'granted') {
        throw new Error('Permission for accelerometer not granted.');
    }

    const accelerometer = new LinearAccelerationSensor({ frequency: 50 });
    accelerometer.onerror = handleError;
    accelerometer.onreading = handleReading;
    accelerometer.start();

    const model = document.querySelector('.model');
    const GRAVITY = 9.8;

    function handleReading(e) {
        const transform = [
            `translateX(${computeTranslateX(model, e.target.x)}px)`,
            `translateY(${computeTranslateY(model, e.target.y)}px)`,
            `translateZ(${computeTranslateZ(model, e.target.z)}px)`
        ];
        model.style.transform = transform.join(' ');
    }

    function handleError(e) {
        console.error(e);
    }

    function computeTranslateX(model, x) {
        x = enforceRange(-GRAVITY, GRAVITY, x);
        const half = model.getBoundingClientRect().width / 2;
        const difference = window.innerWidth / 2 - half;
        const percentage = Math.abs(x) / GRAVITY;
        return difference * percentage * (x < 0 ? 1 : -1);
    }

    function computeTranslateY(model, y) {
        y = enforceRange(-GRAVITY, GRAVITY, y);
        const half = model.getBoundingClientRect().height / 2;
        const difference = window.innerHeight / 2 - half;
        const percentage = Math.abs(y) / GRAVITY;
        return difference * percentage * (y < 0 ? -1 : 1);
    }

    function computeTranslateZ(model, z) {
        z = enforceRange(-GRAVITY, GRAVITY, z);
        const percentage = Math.abs(z) / GRAVITY;
        const Z_EXTREME = 250;
        return Z_EXTREME * percentage * (z < 0 ? 1 : -1);
    }

    function enforceRange(min, max, value) {
        value = Math.min(value, max);
        value = Math.max(value, min);
        return value;
    }

})();
