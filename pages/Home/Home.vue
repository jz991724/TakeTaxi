//主页面
<template>
  <view class="content">
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">背景</block>
    </cu-custom>
    <scroll-view scroll-y="true">
      <!-- <map-component></map-component> -->
      <map id="myMap"
           :markers="markers"
           style="width:100%;height:300px;"
           :longitude="longitude"
           :latitude="latitude"
           scale='16' show-location>
      </map>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Mixins
} from 'vue-property-decorator';

import VueMixins from '../../mixins/VueMixins.ts';

@Component({
  name: 'Home'
})
export default class Home extends Mixins(VueMixins) {
  title = '四川大学华西医院';
  distance = 0; //"距离"
  latitude = 39.909; // 默认定在首都
  longitude = 116.39742;
  scale = 12; // 默认16
  markers = [];
  markerHeight = 30;
  doorAddress = []; //门店地址

  // 拒绝授权后，弹框提示是否手动打开位置授权
  openConfirm() {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: '请求授权当前位置',
        content: '我们需要获取地理位置信息，为您推荐附近的美食',
        success: (res) => {
          if (res.confirm) {
            uni.openSetting()
                .then((res) => {
                  if (res[1].authSetting['scope.userLocation'] === true) {
                    resolve(); // 打开地图权限设置
                  } else {
                    reject();
                  }
                });
          } else if (res.cancel) {
            reject();
          }
        },
      });
    });
  };

  // 彻底拒绝位置获取
  rejectGetLocation() {
    uni.showToast({
      title: '你拒绝了授权，无法获得周边信息',
      icon: 'none',
      duration: 2000,
    });
  };

  //进行经纬度转换为距离的计算
  Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
  }

  //功能描述:计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度默认单位km
  getMapDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = this.Rad(lat1);
    let radLat2 = this.Rad(lat2);
    let a = radLat1 - radLat2;
    let b = this.Rad(lng1) - this.Rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(2);
    return s;
  }

  // //获取当前位置并定位
  // openMap(lon, lat) {
  //   console.log('获取经纬度ssssfff', lon, lat);
  //   uni.getLocation({
  //     success: res => {
  //       // res.latitude=lat;
  //       // res.longitude=lon;
  //       console.log('location success', parseFloat(lat), parseFloat(lon));
  //       uni.openLocation({
  //         latitude: parseFloat(lat),
  //         longitude: parseFloat(lon),
  //         scale: 18
  //       });
  //     }
  //   });
  // };

  getList() {
    console.log('获取周围美食');
  };

  // 确认授权后，获取用户位置
  getLocationInfo() {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        // 暂时
        this.longitude = res.longitude; //118.787575;
        this.latitude = res.latitude; //32.05024;
        console.log('获取当前的用户经度', this.longitude);
        console.log('获取当前的用户纬度', this.latitude);
        // let long = 0;
        // let lat = 0;
        //小数点保留六位  经度
        // if (this.longitude.toString()
        //     .indexOf('.') > 0) {
        //   const longSplit = this.longitude.toString()
        //       .split('.');
        //   if (longSplit.length >= 2) {
        //     long = parseFloat(longSplit[0] === '' ? 0 : longSplit[0]) + parseFloat('.' + longSplit[1].slice(0, 6));
        //   }
        // }
        // if (this.latitude.toString()
        //     .indexOf('.') > 0) {
        //   const latSplit = this.latitude.toString()
        //       .split('.');
        //   if (latSplit.length >= 2) {
        //     lat = parseFloat(latSplit[0] === '' ? 0 : latSplit[0]) + parseFloat('.' + latSplit[1].slice(0, 6));
        //   }
        // }
        // cookie.set("longitude", long);
        // cookie.set("latitude", lat);
        // console.log('纬度', lat);
        // this.distance(this.latitude,this.longitude);
        this.markers = [{
          id: '0',
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '../../static/location_icon.png',
          width: this.markerHeight, //宽
          height: this.markerHeight, //高
        },];
        this.getPositionInfoByAddress('昆明同德广场');
      },
    });
  };

  //通过地址返回坐标位置信息
  getPositionInfoByAddress(address = undefined) {
    //调用地址解析接口
    this.$qqmapsdk.geocoder({
      //获取表单传入地址
      address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: (res) => {//成功后的回调
        console.log(res);
        let { result: { location: { lat, lng }, title }, status } = res;
        if (status === this.qqMapsSDKStatusEnum.success) {
          //根据地址解析在地图上标记解析地址位置
          this.markers = [...this.markers, {
            // id: this.markers.length,
            // title: title,
            // latitude: lat,
            // longitude: lng,
            // iconPath: '../../static/location_icon.png',//图标路径
            // width: 20,
            // height: 20,
            // callout: { //可根据需求是否展示经纬度
            //   content: lat + ',' + lng,
            //   color: '#000',
            //   display: 'ALWAYS'
            // }
            id: this.markers.length,
            latitude: lat,
            longitude: lng,
            iconPath: '../../static/location_icon.png',
            width: this.markerHeight, //宽
            height: this.markerHeight, //高
          }];
        }
      },
      fail: (error) => {
        console.error(error);
      },
      complete: (res) => {
        console.log(res);
      }
    });
  }

  onReady() {
    //   wx请求获取位置权限
    this.getAuthorize('scope.userLocation')
        .then(() => {
          //   同意后获取
          this.getLocationInfo();
          // const _locationChangeFn = function (res) {
          //   debugger
          //   console.log('location change', res);
          // };
          // wx.onLocationChange(_locationChangeFn);
          // wx.offLocationChange(_locationChangeFn);
          // this.$qqmapsdk.search({
          //   keyword: '酒店',
          //   success: function (res) {
          //     debugger
          //     console.log(res);
          //   },
          //   fail: function (res) {
          //     console.log(res);
          //   },
          //   complete: function (res) {
          //     console.log(res);
          //   }
          // });
        })
        .catch(() => {
          //   不同意给出弹框，再次确认
          this.openConfirm()
              .then(() => {
                this.getLocationInfo();
              })
              .catch(() => {
                this.rejectGetLocation();
              });
        });
  }

}
</script>

<style lang="less">

</style>
