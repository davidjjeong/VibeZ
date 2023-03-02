function lid () {
    function generateRandomString(length) {
        var result = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(var i = 0; i < length; i++){
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    const now = String(Date.now());
    const middlePos = Math.ceil(now.length / 2);
    let output = `USR-${now.substring(0, middlePos)}-${generateRandomString(6)}-${now.substring(middlePos)}`;

    return output;
}

export default lid;