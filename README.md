## 后台管理系统练习

### 首页登录

![登录界面](README.assets/login.jpg)

### 首页图表

![首页图表](README.assets/shouye.png)

### 商品管理

![平台属性管理](README.assets/shangpinguanli.jpg)
![Spu管理](README.assets/SPUguanli.jpg)
![Sku管理](README.assets/SKUguanli.jpg)

### 权限管理

![用户管理](README.assets/quanxianguanli1.jpg)
![角色管理](README.assets/juesheguanli.jpg)
![菜单管理](README.assets/caidanguanli.jpg)

### 项目依赖安装

```
npm install
```

### 项目运行
```
npm run dev
```

### 项目打包编译
```
//构建生产环境
npm run build:prod
//构成测试环境
npm run build:stage
```

#### 如果想在nginx上线,注意配置转发和删除.env.production的里面的内容(以生产环境打包为例)

* 需要删除Vue_APP_BASE_API里面的内容~

![.env.production文件](README.assets/202205161644946.png)

* nginx转发设置

  ![nginx转发设置](README.assets/202205161646156.png)
