/**
 * 将以base64的图片数据转换为Blob
 * @param base64 base64图片数据
 * @return blob  返回blob对象
 */
export function convertBase64toBlob (base64) {
	// 提取base64头的type如 'image/png'
	var type = base64.split(',')[0].match(/:(.*?);/)[1]
	// 去掉url的头，并转换为byte (atob:编码 btoa:解码)
    var bytes = atob(base64.split(',')[1])

    // 处理异常,将ascii码小于0的转换为大于0
    // 通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
    var ab = new ArrayBuffer(bytes.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }

    return new Blob([ab], {type: type})

    /*
    let byteString;

    if (base64Data.split (',')[0].indexOf ('base64') >= 0)
    	byteString = atob (base64Data.split (',')[1]);
    else
        byteString = unescape (base64Data.split (',')[1]);

    let mimeString = base64Data.split (',')[0].split (':')[1].split (';')[0];

    let ia = new Uint8Array (byteString.length);

    for (var i = 0; i < byteString.length; i ++) {
        ia[i] = byteString.charCodeAt (i);
    }

    return new Blob ([ia], {
    	type: mimeString
    });
    */
}