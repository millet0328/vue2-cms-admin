<template>
  <el-upload
      :action="uploadAction"
      :before-upload="handleBeforeUpload"
      :data="data"
      :headers="headers"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      class="avatar-uploader"
  >
    <template v-if="src">
      <div class="cover" @click.stop="handleRemove"><i class="el-icon-delete avatar-uploader-icon"></i></div>
      <img :src="src" class="avatar"/>
    </template>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
// 支持双向数据绑定，采用:src.sync
// 支持$emit事件success,处理复杂上传成功回调函数
import axios from 'axios';

export default {
  name: 'single-upload',
  props: {
    src: {
      type: String
    },
    defaultImage: {
      type: String
    },
    uploadAction: {
      type: String,
      required: true
    },
    removeAction: {
      type: String,
      required: true
    },
    data: {
      type: Object
    },
    headers: {
      type: Object
    }
  },
  methods: {
    // 上传图片之前的检查
    handleBeforeUpload(file) {
      let reg = /^image\/(jpe?g|png)$/;
      const isImg = reg.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImg && isLt2M;
    },
    // 上传图片成功
    handleUploadSuccess(res, file) {
      // 触发外部绑定的事件
      this.$emit('success', res);
      // 双向数据绑定触发
      this.$emit('update:src', res.src);
    },
    // 上传图片失败
    handleUploadError({status, message}, file, fileList) {
      switch (status) {
        case 401:
          this.$message.error(`错误:401,Token失效,请重新登录!`);
          break;
        case 400:
          message = JSON.parse(message);
          this.$message.error(`错误:400,${message}`);
          break;
        default:
          this.$message.error(`错误:${status},${message}!`);
          break;
      }
    },
    // 删除现有图片
    async handleRemove() {
      // 如果不是默认头像，物理删除图片
      if (this.src != this.defaultImage) {
        let {status} = await axios.post(this.removeAction, {src: this.src});
        if (status) {
          this.$message.success('删除成功!');
        }
      }
      // 如果是默认头像，仅移除，不做物理删除
      this.$emit('update:src', '');
    }
  }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .cover {
    content: '';
    display: block;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: all 0.5s;

    .el-icon-delete {
      color: white;
    }
  }

  &:hover .cover {
    opacity: 1;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
