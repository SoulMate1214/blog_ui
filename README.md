# 部署服务器前端口修改
    1.所有"127.0.0.1:1111"改为"服务器IP:1111"
    2.所有"127.0.0.1:2222"改为"服务器IP/#"
    3.router.ts中的history改为hash
    
# vue-build打包
    使用package.json中的build打包成一个dist目录
    
# 上传服务器
    修改nginx.conf指向dist/index.html
    location / {
      root   /root/blog/dist;
      index  index.html index.html;
    }
