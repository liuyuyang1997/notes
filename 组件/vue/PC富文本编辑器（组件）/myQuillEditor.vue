<template>
  <div>
    <el-upload class="avatar-uploader" :action="serverUrl" :headers="header" :show-file-list="false" :on-success="uploadSuccess"
      :on-error="uploadError" :before-upload="beforeUpload" name='file' multiple></el-upload>
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)"
      :disabled="disabled" style="height: 600px;overflow: auto;" placeholder="请输入"></quill-editor>
    <!--
      :options="editorOption" -->
  </div>
</template>

<script>
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ['blockquote', 'code-block'], // toggled buttons
    [{
      'header': 1
    }, {
      'header': 2
    }], // 标题，键值对的形式；1、2表示字体大小
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }], //列表
    [{
      'script': 'sub'
    }, {
      'script': 'super'
    }], // 上下标
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], // 缩进
    [{
      'direction': 'rtl'
    }], // 文本方向
    [{
      'size': ['small', false, 'large', 'huge']
    }], // 字体大小
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }], //几级标题
    [{
      'color': []
    }, {
      'background': []
    }], // 字体颜色，字体背景颜色
    [{
      'font': []
    }], //字体
    [{
      'align': []
    }],
    ["link", "image"],
    ["clean"]
  ];
  export default {
    props: ['con', 'disabled'],
    data() {
      return {
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        content: '请输入',
        editorOption: {
          placeholder: "",
          theme: "snow", // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: function(value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        },
        serverUrl:  'http://123.57.66.213/qcm/PicUpController/queryUpload.json', // 这里写你要上传的图片服务器地址
        header: {
          // token: sessionStorage.token
        }, // 有的图片服务器要求请求头需要有token
        imgQuality: 0.5
      };
    },
    created() {
      this.content = this.con
    },
	mounted() {
		// var revoke=document.querySelector('.quill-editor .ql-file') //获取元素
		// var Front=document.createElement('i')  //创建元素
		// Front.className="el-icon-folder" //新增class属性
		// Front.style.fontSize='16px'
		// revoke.appendChild(Front) //追加到元素中
	},
    watch: {
      con() {
        this.content = this.con
      }

    },
	
    methods: {
      onEditorChange({
        editor,
        html,
        text
      }) {
        //内容改变事件
        // console.log("---内容改变事件---");
        this.content = html;
        // console.log(html);
        this.$emit('getContent', this.content)
      },
      //压缩图片用
      dataURItoBlob(dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
          type: type
        });
      },
      // 富文本图片上传前

      beforeUpload(file) {
        console.log(file)
        // 显示loading动画
        this.quillUpdateImg = true;
        let _this = this
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt4M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/png 格式!');
        }
        if (!isLt4M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        // if(file.size / 1024 / 1024 < 4 &&file.size / 1024 / 1024 < 2){
        // 	return new Promise(resolve => {
        // 		const reader = new FileReader()
        // 		const image = new Image()
        // 		image.onload = (imageEvent) => {
        // 			const canvas = document.createElement('canvas');
        // 			const context = canvas.getContext('2d');
        // 			const width = image.width * _this.imgQuality
        // 			const height = image.height * _this.imgQuality
        // 			canvas.width = width;
        // 			canvas.height = height;
        // 			context.clearRect(0, 0, width, height);
        // 			context.drawImage(image, 0, 0, width, height);
        // 			const dataUrl = canvas.toDataURL(file.type);
        // 			const blobData = _this.dataURItoBlob(dataUrl, file.type);
        // 			resolve(blobData)
        // 		}
        // 		reader.onload = (e => {
        // 			image.src = e.target.result;
        // 		});
        // 		reader.readAsDataURL(file);
        // 	})
        // }
        if (!isJPG || !isLt4M) {
          return isJPG && isLt4M;
        }
      },

      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        console.log(res)
        if (res.code == 1) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(length, "image", res.data[0].filepath);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
        // loading动画消失
        this.quillUpdateImg = false;
      },
      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error("图片插入失败");
      }
    }
  };
</script>
<style>
  .ql-container {
   max-height: 500px;
  }
</style>
