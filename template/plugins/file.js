import http from "./http";

function chooseImage({maxCount}, success) {
  uni.chooseImage({
    count: maxCount == 0 ? 9999 : maxCount,
    success({tempFilePaths}) {
      const files = tempFilePaths.map((path) => {
        return {
          name: 'file',
          uri: path
        }
      })
      uploadFiles(files, success)
    }
  })
}

function chooseVideo({}, success) {
  uni.chooseVideo({
    success({tempFilePath}) {
      const files = [
        {
          name: 'file',
          uri: tempFilePath
        }
      ]
      uploadFiles(files, success)
    }
  })
}

function uploadFiles(files, success) {
  http.uploadFiles('file-upload/file', files, {name: 'file'}, data => {
    success && success(data.filenames[0])
  })
}

export default {
  chooseFileAndUpload(config, success) {
    config = Object.assign({
      type: 'image', // image video
      maxCount: 0, // 上传的文件个数，0代表无限
    }, config)
    if (config.type == 'image') {
      chooseImage(config, success)
    } else if (config.type == 'video') {
      chooseVideo(config, success)
    }
  }
}
