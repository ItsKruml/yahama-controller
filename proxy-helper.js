// HTTPS Proxy Helper für Yamaha Controller
const isHTTPS = process.env.HTTPS === 'true' || 
                req.get('X-Forwarded-Proto') === 'https';

function getYamahaUrl(path) {
    if (isHTTPS) {
        // Nutze nginx proxy
        return `/YamahaExtendedControl/${path}`;
    } else {
        // Direkte Verbindung
        return `http://192.168.178.31/YamahaExtendedControl/${path}`;
    }
}

// Beispiel-Nutzung:
// const url = getYamahaUrl('v1/system/getDeviceInfo');
// axios.get(url).then(response => ...);

module.exports = { getYamahaUrl, isHTTPS };
