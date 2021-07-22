export default class MapAPI {
    //获取当前位置
    getLocation() {
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    debugger
                    return resolve(res);
                },
                fail: (error) => {
                    return reject(error);
                },
            });
        });
    }

    //通过地址返回坐标位置信息
    getPositionInfoByAddress(address = undefined) {
        return new Promise((resolve, reject) => {
            //调用地址解析接口
            this.$qqmapsdk.geocoder({
                //获取表单传入地址
                address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
                success: (res) => {//成功后的回调
                    let { result: { location }, status } = res;
                    debugger
                    if (status === this.qqMapsSDKStatusEnum.success) {
                        return resolve(location);
                    } else {
                        return reject(false);
                    }
                },
                fail: (error) => {
                    console.error(error);
                    return reject(error);
                },
                complete: (res) => {
                    console.log(res);
                }
            });
        });
    }

    //路线规划
    routePolylinePlan({ from, to }, mode = 'driving') {
        return new Promise((resolve, reject) => {
            //调用距离计算接口
            this.$qqmapsdk.direction({
                mode,//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
                //from参数不填默认当前地址
                from,
                to,
                success: (res) => {
                    debugger
                    return resolve(res);
                },
                fail: (error) => {
                    console.error(error);
                    return reject(error);
                },
                complete: (res) => {
                    console.log(res);
                }
            });
        });
    }
}
