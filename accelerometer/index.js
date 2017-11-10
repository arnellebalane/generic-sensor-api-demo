(async () => {

    if (!window.Accelerometer) {
        throw new Error('Accelerometer sensor is not supported.');
    }

    const permissionStatus = await navigator.permissions.query({ name: 'accelerometer' });
    if (permissionStatus.state !== 'granted') {
        throw new Error('Permission for accelerometer not granted.');
    }

    const accelerometer = new Accelerometer({ frequency: 20 });
    accelerometer.onerror = e => console.error(e);
    accelerometer.onreading = e => console.info(e);
    accelerometer.start();

})();
