# YhCascade

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server

基于目前angular 组件没有这种非浮层的级联效果，个人开发的组件。
目前 还在完善中，稍后在新版本更新最新效果。

## Development server

![图片名称](https://img-blog.csdnimg.cn/47d27b22eccd4c91988a82344c8ff6ac.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Z-z5LmQ5a6H,size_20,color_FFFFFF,t_70,g_se,x_16)
![图片名称](https://img-blog.csdnimg.cn/cf9436a8ccd049e2bfed0c53d8d33a67.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Z-z5LmQ5a6H,size_20,color_FFFFFF,t_70,g_se,x_16)

引用方式:
`<yh-cascade [options]="mockGroup" (outer)="onChange($event)"></yh-cascade>`

`  imports:      [ CascadeModule ],
`

数据格式:
`
const mockGroup = [
{
id: '1',
name: '壹',
subgroup: [
{
id: '1.1',
name: '壹壹',
}]
`
