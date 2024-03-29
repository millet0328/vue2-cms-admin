<template>
  <div :class="{'uploaded':src}" class="upload-box text-center">
    <div class="plus">
      <i class="el-icon-plus"></i>
      <input ref="file" class="file" type="file" @change="handleUpload">
    </div>
    <img :src="src" alt="">
    <div class="cover">
      <i class="el-icon-delete" @click="handleRemove"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-upload",
  // 组件外部数据
  props: {
    value: {
      type: String,
      default: '',
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
      type: Object,
      default: () => {
        return {
          type: 'common'
        }
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {
          Authorization: `Bearer ${ sessionStorage.token }`
        }
      }
    }
  },
  // 组件内部数据
  methods: {
    // 删除图片
    async handleRemove() {
      // 判断是否默认头像
      let isDefault = this.value.includes(this.defaultImage);
      // 判断是否默认头像，如果是默认头像，直接清空，后台不用物理删除
      if (!isDefault) {
        let { status, msg, data } = await this.post(this.removeAction, { src, ...this.data }, {
          headers: {
            ...this.headers,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (status) {
          this.$message.success('删除成功!');
        }
      }
      // 删除图片
      this.$emit('input', '');
    },
    // 上传文件
    async handleUpload(e) {
      // 获取file对象
      let file = e.target.files[0];
      // 生成formData
      var formData = new FormData();
      formData.append('file', file);
      // 附加参数
      Object.keys(this.data).forEach((key) => {
        formData.append(key, this.data[key])
      });
      // 上传图片
      let { status, msg, data } = await this.post(this.uploadAction, formData, {
        headers: this.headers,
        transformData: false
      });
      if (status) {
        // 触发外部绑定的事件
        this.$emit('success', res);
        // 上传成功
        this.$emit('input', data);
        // 清空file表单value
        this.$refs.file.value = "";
      }
    },
    // 对象转化为querystring
    serialize(obj) {
      var str = [];
      for (var key in obj)
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
      return str.join("&");
    },
    // ajax
    post(url, data, { headers, transformData = true }) {
      return new Promise((resolve, reject) => {
        // 实例
        var ajax = new XMLHttpRequest();
        ajax.open("POST", url, true);
        // 设置header
        for (let key in headers) {
          ajax.setRequestHeader(key, headers[key]);
        }
        if (transformData) {
          data = this.serialize(data);
        }
        ajax.send(data);
        // 监听响应
        ajax.onload = function () {
          let { status, statusText, responseText } = ajax;
          if (status == 200) {
            resolve(JSON.parse(responseText));
          } else {
            reject({ status, statusText })
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
/* upload组件 */
.text-center {
  text-align: center;
}

.upload-box {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

}

.upload-box .el-icon-plus {
  font-size: 24px;
}

.upload-box .file {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}

.upload-box .cover {
  content: "";
  display: block;
  font-size: 14px;
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
}

.uploaded:hover .cover {
  display: block;
}

.upload-box img {
  width: 100%;
}

.uploaded .plus {
  display: none;
}
</style>
