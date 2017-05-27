/**
 * 文件类型
 * 来源: https://github.com/sindresorhus/file-type/blob/master/index.js
 * @param input {Object} File
 * @returns {*}
 */
export default input => {
  const buf = new Uint8Array(input)

  if (!(buf && buf.length > 1)) {
    return null
  }

  const check = header => {
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== buf[i]) {
        return false
      }
    }
    return true
  }

  // 图片
  if (check([0xFF, 0xD8, 0xFF])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg'
    }
  }

  if (check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
    return {
      ext: 'png',
      mime: 'image/png'
    }
  }

  if (check([0x47, 0x49, 0x46])) {
    return {
      ext: 'gif',
      mime: 'image/gif'
    }
  }

  if (check([0x49, 0x49, 0x2A, 0x0]) || check([0x4D, 0x4D, 0x0, 0x2A])) {
    return {
      ext: 'tif',
      mime: 'image/tiff'
    }
  }

  if (check([0x42, 0x4D])) {
    return {
      ext: 'bmp',
      mime: 'image/bmp'
    }
  }

  if (check([0x38, 0x42, 0x50, 0x53])) {
    return {
      ext: 'psd',
      mime: 'image/vnd.adobe.photoshop'
    }
  }

  // 视频
  if (
    (check([0x0, 0x0, 0x0]) && (buf[3] === 0x18 || buf[3] === 0x20) && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) ||
    check([0x33, 0x67, 0x70, 0x35]) ||
    (check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32]) && buf[16] === 0x6D && buf[17] === 0x70 && buf[18] === 0x34 && buf[19] === 0x31 && buf[20] === 0x6D && buf[21] === 0x70 && buf[22] === 0x34 && buf[23] === 0x32 && buf[24] === 0x69 && buf[25] === 0x73 && buf[26] === 0x6F && buf[27] === 0x6D) ||
    check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D]) ||
    check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32, 0x0, 0x0, 0x0, 0x0])
  ) {
    return {
      ext: 'mp4',
      mime: 'player/mp4'
    }
  }

  if (check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x56])) {
    return {
      ext: 'm4v',
      mime: 'player/x-m4v'
    }
  }

  // https://github.com/threatstack/libmagic/blob/master/magic/Magdir/matroska
  if (check([0x1A, 0x45, 0xDF, 0xA3])) {
    const sliced = buf.subarray(4, 4 + 4096)
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 0x42 && arr[i + 1] === 0x82)

    if (idPos >= 0) {
      const docTypePos = idPos + 3
      const findDocType = type => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0))

      if (findDocType('matroska')) {
        return {
          ext: 'mkv',
          mime: 'player/x-matroska'
        }
      }

      if (findDocType('webm')) {
        return {
          ext: 'webm',
          mime: 'player/webm'
        }
      }
    }
  }

  if (check([0x0, 0x0, 0x0, 0x14, 0x66, 0x74, 0x79, 0x70])) {
    return {
      ext: 'mov',
      mime: 'player/quicktime'
    }
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && buf[8] === 0x41 && buf[9] === 0x56 && buf[10] === 0x49) {
    return {
      ext: 'avi',
      mime: 'player/x-msvideo'
    }
  }

  if (check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
    return {
      ext: 'wmv',
      mime: 'player/x-ms-wmv'
    }
  }

  if (check([0x0, 0x0, 0x1, 0xBA])) {
    return {
      ext: 'mpg',
      mime: 'player/mpeg'
    }
  }

  if (check([0x46, 0x4C, 0x56, 0x01])) {
    return {
      ext: 'flv',
      mime: 'player/x-flv'
    }
  }

  // 音频
  if (check([0x49, 0x44, 0x33]) || check([0xFF, 0xFB])) {
    return {
      ext: 'mp3',
      mime: 'music/mpeg'
    }
  }

  if ((buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x4D && buf[9] === 0x34 && buf[10] === 0x41) || (buf[0] === 0x4D && buf[1] === 0x34 && buf[2] === 0x41 && buf[3] === 0x20)) {
    return {
      ext: 'm4a',
      mime: 'music/m4a'
    }
  }

  // Needs to be before `ogg` check
  if (buf[28] === 0x4F && buf[29] === 0x70 && buf[30] === 0x75 && buf[31] === 0x73 && buf[32] === 0x48 && buf[33] === 0x65 && buf[34] === 0x61 && buf[35] === 0x64) {
    return {
      ext: 'opus',
      mime: 'music/opus'
    }
  }

  if (check([0x4F, 0x67, 0x67, 0x53])) {
    return {
      ext: 'ogg',
      mime: 'music/ogg'
    }
  }

  if (check([0x66, 0x4C, 0x61, 0x43])) {
    return {
      ext: 'flac',
      mime: 'music/x-flac'
    }
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && buf[8] === 0x57 && buf[9] === 0x41 && buf[10] === 0x56 && buf[11] === 0x45) {
    return {
      ext: 'wav',
      mime: 'music/x-wav'
    }
  }

  if (check([0x23, 0x21, 0x41, 0x4D, 0x52, 0x0A])) {
    return {
      ext: 'amr',
      mime: 'music/amr'
    }
  }

  if (check([0x4D, 0x54, 0x68, 0x64])) {
    return {
      ext: 'mid',
      mime: 'music/midi'
    }
  }
}
