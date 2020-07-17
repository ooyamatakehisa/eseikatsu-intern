/**
 * ES 物件API
 * （株）いい生活 が提供予定の 物件情報API のインターフェイス仕様書  いい物件Oneに登録した賃貸物件情報を参照する物件参照API仕様について定める。  ※1: 開発中のため、実際のリリース時の仕様は異なる場合がございます。  ※2: 売買物件に関する仕様に関してはα版であり、今後大きな仕様の見直しを行う可能性がございます。  ## リソース仕様  ### 通信仕様  HTTP/2 および HTTP/1.1 をサポートする。通信はTLSで暗号化されたHTTPSのみを許可する。  ### リクエストヘッダ  リクエストヘッダには以下の指定を必須とする。  | No. | リクエストヘッダのフィールド名 | 指定値 | |:---:|:-------------------------------|:-------| | 1 | Accept | application/json | | 2 | X-Api-Key | 弊社が指定するキー。ご利用のお客様を特定するためのもの。 |  Acceptヘッダには、常にapplication/json を指定する。 これにより、レスポンスがJSONであることを指示する。  ### データフォーマットと文字コード  データフォーマットはJSON、文字コードはUTF-8とする。  ### データ型  通常のJSONの型以外に擬似型としていくつかのデータ型を用意している。 これは、JSON標準では表現しきれないデータや、不動産特有のデータを扱うために定義したもので使用する。 また、ここに記載の無いデータ型については、 OpenAPI Specification (Version 3.0.2) の DataTypes に準拠する。  * [DataTypes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#data-types)   | No. | 型 | 説明 | |:---:|:---|:-----| | 1 | string | JSON標準の文字列 | | 2 | int | JSON標準の整数 | | 3 | float | JSON標準の浮動小数点数 | | 4 | bool | JSON標準の真偽値 | | 5 | datetime | ISO8611フォーマットの日付時刻を表す文字列。YYYY-MM-DDTHH:MM:SS。 <br> 例: 2015-08-26T19:16:03 = 2015年8月26日19時16分03秒 | | 6 | date | ISO8611フォーマットの日付を表す文字列。YYYY-MM-DD。 <br> 例: 2015-08-26 = 2015年8月26日 | | 7 | datejun | 後述 |  #### datejun型  いい生活独自の日付と旬を表すフォーマット。YYYYMMJDD。  * YYYY: 西暦年 * MM: 月。01～12。ただし00とすることにより、年単位までの精度の数字を表現可能。 * J: 旬。1=上旬、2=中旬、3=下旬。 0とすることで月単位までの精度の数字を表現可能。 * DD: 日。01～31。ただし00とすることにより、旬単位までの精度の数字を表現可能。日単位の精度の場合、1～10日までは旬を1、11～20日までは旬を2、21日以降は旬を3と指定する必要がある。 * 例:     * 201900000 = 2019年     * 201901000 = 2019年1月     * 201903100 = 2019年3月上旬     * 201912300 = 2019年12月下旬     * 201906105 = 2019年6月5日     * 201908216 = 2019年8月16日  ## 検索パラメータ  ### OR 検索  パラメータタイプが `array` のキーについては、クエリパラメータで複数指定を行った場合、 指定された値のいずれかに一致する対象を検索する（ OR 検索）。  ex) `?layout_type_code=1&layout_type_code=2`  ### ソート順  `*.order` という名前のパラメータでソート順を指定可能。ascを指定したとき昇順、descを指定したとき降順となる。  ex) `?price.order=desc`  基本的にソート順は一つだけ指定する。 
 *
 * The version of the OpenAPI document: 6.1.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AreaWithMeasurementMethod from './AreaWithMeasurementMethod';
import DateJun from './DateJun';

/**
 * The BuildingPreview model module.
 * @module model/BuildingPreview
 * @version 6.1.3
 */
class BuildingPreview {
    /**
     * Constructs a new <code>BuildingPreview</code>.
     * 建物概要
     * @alias module:model/BuildingPreview
     * @param buildingName {String} 
     * @param buildingType {String} 
     * @param buildingTypeCode {Number} 1: マンション<br/>2: リゾートマンション<br/>3: アパート<br/>4: テラスハウス<br/>5: タウンハウス<br/>6: 戸建<br/>7: 土地<br/>8: 店舗<br/>9: 事務所<br/>10: ビル<br/>11: 倉庫<br/>12: 工場<br/>13: トランクルーム<br/>14: 駐車場<br/>15: バイク置き場<br/>16: その他
     * @param prefecture {String} 
     * @param prefectureCode {Number} 
     * @param city {String} 
     * @param cityCode {Number} 
     * @param town {String} 
     * @param tyoume {String} 
     * @param parallel2ParkingFlag {Boolean} 
     * @param parallel3ParkingFlag {Boolean} 
     * @param hasLargeGarage {Boolean} 
     * @param hasVisitorsParking {Boolean} 
     * @param hasGarage {Boolean} 
     * @param hasDeliveryBox {Boolean} 
     */
    constructor(buildingName, buildingType, buildingTypeCode, prefecture, prefectureCode, city, cityCode, town, tyoume, parallel2ParkingFlag, parallel3ParkingFlag, hasLargeGarage, hasVisitorsParking, hasGarage, hasDeliveryBox) { 
        
        BuildingPreview.initialize(this, buildingName, buildingType, buildingTypeCode, prefecture, prefectureCode, city, cityCode, town, tyoume, parallel2ParkingFlag, parallel3ParkingFlag, hasLargeGarage, hasVisitorsParking, hasGarage, hasDeliveryBox);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, buildingName, buildingType, buildingTypeCode, prefecture, prefectureCode, city, cityCode, town, tyoume, parallel2ParkingFlag, parallel3ParkingFlag, hasLargeGarage, hasVisitorsParking, hasGarage, hasDeliveryBox) { 
        obj['building_name'] = buildingName;
        obj['building_type'] = buildingType;
        obj['building_type_code'] = buildingTypeCode;
        obj['prefecture'] = prefecture;
        obj['prefecture_code'] = prefectureCode;
        obj['city'] = city;
        obj['city_code'] = cityCode;
        obj['town'] = town;
        obj['tyoume'] = tyoume;
        obj['parallel_2_parking_flag'] = parallel2ParkingFlag;
        obj['parallel_3_parking_flag'] = parallel3ParkingFlag;
        obj['has_large_garage'] = hasLargeGarage;
        obj['has_visitors_parking'] = hasVisitorsParking;
        obj['has_garage'] = hasGarage;
        obj['has_delivery_box'] = hasDeliveryBox;
    }

    /**
     * Constructs a <code>BuildingPreview</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BuildingPreview} obj Optional instance to populate.
     * @return {module:model/BuildingPreview} The populated <code>BuildingPreview</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new BuildingPreview();

            if (data.hasOwnProperty('building_guid')) {
                obj['building_guid'] = ApiClient.convertToType(data['building_guid'], 'String');
            }
            if (data.hasOwnProperty('building_furigana')) {
                obj['building_furigana'] = ApiClient.convertToType(data['building_furigana'], 'String');
            }
            if (data.hasOwnProperty('building_name')) {
                obj['building_name'] = ApiClient.convertToType(data['building_name'], 'String');
            }
            if (data.hasOwnProperty('building_class')) {
                obj['building_class'] = ApiClient.convertToType(data['building_class'], 'String');
            }
            if (data.hasOwnProperty('building_class_code')) {
                obj['building_class_code'] = ApiClient.convertToType(data['building_class_code'], 'Number');
            }
            if (data.hasOwnProperty('building_type')) {
                obj['building_type'] = ApiClient.convertToType(data['building_type'], 'String');
            }
            if (data.hasOwnProperty('building_type_code')) {
                obj['building_type_code'] = ApiClient.convertToType(data['building_type_code'], 'Number');
            }
            if (data.hasOwnProperty('structure')) {
                obj['structure'] = ApiClient.convertToType(data['structure'], 'String');
            }
            if (data.hasOwnProperty('structure_code')) {
                obj['structure_code'] = ApiClient.convertToType(data['structure_code'], 'Number');
            }
            if (data.hasOwnProperty('total_units')) {
                obj['total_units'] = ApiClient.convertToType(data['total_units'], 'Number');
            }
            if (data.hasOwnProperty('total_floors')) {
                obj['total_floors'] = ApiClient.convertToType(data['total_floors'], 'Number');
            }
            if (data.hasOwnProperty('ground_floors')) {
                obj['ground_floors'] = ApiClient.convertToType(data['ground_floors'], 'Number');
            }
            if (data.hasOwnProperty('basement_floors')) {
                obj['basement_floors'] = ApiClient.convertToType(data['basement_floors'], 'Number');
            }
            if (data.hasOwnProperty('completion_datejun')) {
                obj['completion_datejun'] = ApiClient.convertToType(data['completion_datejun'], DateJun);
            }
            if (data.hasOwnProperty('land_reclamation_datejun')) {
                obj['land_reclamation_datejun'] = ApiClient.convertToType(data['land_reclamation_datejun'], DateJun);
            }
            if (data.hasOwnProperty('coverage')) {
                obj['coverage'] = ApiClient.convertToType(data['coverage'], 'Number');
            }
            if (data.hasOwnProperty('floor_area_ratio')) {
                obj['floor_area_ratio'] = ApiClient.convertToType(data['floor_area_ratio'], 'Number');
            }
            if (data.hasOwnProperty('site_area')) {
                obj['site_area'] = ApiClient.convertToType(data['site_area'], AreaWithMeasurementMethod);
            }
            if (data.hasOwnProperty('total_floor_area')) {
                obj['total_floor_area'] = ApiClient.convertToType(data['total_floor_area'], AreaWithMeasurementMethod);
            }
            if (data.hasOwnProperty('zipcode_text')) {
                obj['zipcode_text'] = ApiClient.convertToType(data['zipcode_text'], 'String');
            }
            if (data.hasOwnProperty('jis_code_value')) {
                obj['jis_code_value'] = ApiClient.convertToType(data['jis_code_value'], 'Number');
            }
            if (data.hasOwnProperty('prefecture')) {
                obj['prefecture'] = ApiClient.convertToType(data['prefecture'], 'String');
            }
            if (data.hasOwnProperty('prefecture_code')) {
                obj['prefecture_code'] = ApiClient.convertToType(data['prefecture_code'], 'Number');
            }
            if (data.hasOwnProperty('city')) {
                obj['city'] = ApiClient.convertToType(data['city'], 'String');
            }
            if (data.hasOwnProperty('city_code')) {
                obj['city_code'] = ApiClient.convertToType(data['city_code'], 'Number');
            }
            if (data.hasOwnProperty('town')) {
                obj['town'] = ApiClient.convertToType(data['town'], 'String');
            }
            if (data.hasOwnProperty('tyoume')) {
                obj['tyoume'] = ApiClient.convertToType(data['tyoume'], 'String');
            }
            if (data.hasOwnProperty('address_text')) {
                obj['address_text'] = ApiClient.convertToType(data['address_text'], 'String');
            }
            if (data.hasOwnProperty('branch_number_text')) {
                obj['branch_number_text'] = ApiClient.convertToType(data['branch_number_text'], 'String');
            }
            if (data.hasOwnProperty('latitude')) {
                obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
            }
            if (data.hasOwnProperty('longitude')) {
                obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
            }
            if (data.hasOwnProperty('parallel_2_parking_flag')) {
                obj['parallel_2_parking_flag'] = ApiClient.convertToType(data['parallel_2_parking_flag'], 'Boolean');
            }
            if (data.hasOwnProperty('parallel_3_parking_flag')) {
                obj['parallel_3_parking_flag'] = ApiClient.convertToType(data['parallel_3_parking_flag'], 'Boolean');
            }
            if (data.hasOwnProperty('has_large_garage')) {
                obj['has_large_garage'] = ApiClient.convertToType(data['has_large_garage'], 'Boolean');
            }
            if (data.hasOwnProperty('has_visitors_parking')) {
                obj['has_visitors_parking'] = ApiClient.convertToType(data['has_visitors_parking'], 'Boolean');
            }
            if (data.hasOwnProperty('has_garage')) {
                obj['has_garage'] = ApiClient.convertToType(data['has_garage'], 'Boolean');
            }
            if (data.hasOwnProperty('has_delivery_box')) {
                obj['has_delivery_box'] = ApiClient.convertToType(data['has_delivery_box'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {String} building_guid
 */
BuildingPreview.prototype['building_guid'] = undefined;

/**
 * @member {String} building_furigana
 */
BuildingPreview.prototype['building_furigana'] = undefined;

/**
 * @member {String} building_name
 */
BuildingPreview.prototype['building_name'] = undefined;

/**
 * @member {String} building_class
 */
BuildingPreview.prototype['building_class'] = undefined;

/**
 * 1: 戸建<br/>2: 集合住宅<br/>3: 事務所・商業施設<br/>4: 土地<br/>5: 駐車場
 * @member {Number} building_class_code
 */
BuildingPreview.prototype['building_class_code'] = undefined;

/**
 * @member {String} building_type
 */
BuildingPreview.prototype['building_type'] = undefined;

/**
 * 1: マンション<br/>2: リゾートマンション<br/>3: アパート<br/>4: テラスハウス<br/>5: タウンハウス<br/>6: 戸建<br/>7: 土地<br/>8: 店舗<br/>9: 事務所<br/>10: ビル<br/>11: 倉庫<br/>12: 工場<br/>13: トランクルーム<br/>14: 駐車場<br/>15: バイク置き場<br/>16: その他
 * @member {Number} building_type_code
 */
BuildingPreview.prototype['building_type_code'] = undefined;

/**
 * @member {String} structure
 */
BuildingPreview.prototype['structure'] = undefined;

/**
 * 1: 木造<br/>2: 軽量鉄骨<br/>3: 鉄筋コンクリート<br/>4: 鉄骨鉄筋コンクリート<br/>5: ALC<br/>6: プレキャストコンクリート<br/>7: 鉄筋ブロック<br/>8: 鉄骨プレ<br/>9: 鉄骨<br/>10: その他
 * @member {Number} structure_code
 */
BuildingPreview.prototype['structure_code'] = undefined;

/**
 * @member {Number} total_units
 */
BuildingPreview.prototype['total_units'] = undefined;

/**
 * @member {Number} total_floors
 */
BuildingPreview.prototype['total_floors'] = undefined;

/**
 * @member {Number} ground_floors
 */
BuildingPreview.prototype['ground_floors'] = undefined;

/**
 * @member {Number} basement_floors
 */
BuildingPreview.prototype['basement_floors'] = undefined;

/**
 * 竣工年月
 * @member {module:model/DateJun} completion_datejun
 */
BuildingPreview.prototype['completion_datejun'] = undefined;

/**
 * 土地造成完了年月
 * @member {module:model/DateJun} land_reclamation_datejun
 */
BuildingPreview.prototype['land_reclamation_datejun'] = undefined;

/**
 * @member {Number} coverage
 */
BuildingPreview.prototype['coverage'] = undefined;

/**
 * @member {Number} floor_area_ratio
 */
BuildingPreview.prototype['floor_area_ratio'] = undefined;

/**
 * 土地面積 単位: 平方メートル 計測方法: 公簿 実測
 * @member {module:model/AreaWithMeasurementMethod} site_area
 */
BuildingPreview.prototype['site_area'] = undefined;

/**
 * 延床面積 単位: 平方メートル 計測方法: 壁芯 内法 登記簿
 * @member {module:model/AreaWithMeasurementMethod} total_floor_area
 */
BuildingPreview.prototype['total_floor_area'] = undefined;

/**
 * @member {String} zipcode_text
 */
BuildingPreview.prototype['zipcode_text'] = undefined;

/**
 * @member {Number} jis_code_value
 */
BuildingPreview.prototype['jis_code_value'] = undefined;

/**
 * @member {String} prefecture
 */
BuildingPreview.prototype['prefecture'] = undefined;

/**
 * @member {Number} prefecture_code
 */
BuildingPreview.prototype['prefecture_code'] = undefined;

/**
 * @member {String} city
 */
BuildingPreview.prototype['city'] = undefined;

/**
 * @member {Number} city_code
 */
BuildingPreview.prototype['city_code'] = undefined;

/**
 * @member {String} town
 */
BuildingPreview.prototype['town'] = undefined;

/**
 * @member {String} tyoume
 */
BuildingPreview.prototype['tyoume'] = undefined;

/**
 * @member {String} address_text
 */
BuildingPreview.prototype['address_text'] = undefined;

/**
 * @member {String} branch_number_text
 */
BuildingPreview.prototype['branch_number_text'] = undefined;

/**
 * @member {Number} latitude
 */
BuildingPreview.prototype['latitude'] = undefined;

/**
 * @member {Number} longitude
 */
BuildingPreview.prototype['longitude'] = undefined;

/**
 * @member {Boolean} parallel_2_parking_flag
 */
BuildingPreview.prototype['parallel_2_parking_flag'] = undefined;

/**
 * @member {Boolean} parallel_3_parking_flag
 */
BuildingPreview.prototype['parallel_3_parking_flag'] = undefined;

/**
 * @member {Boolean} has_large_garage
 */
BuildingPreview.prototype['has_large_garage'] = undefined;

/**
 * @member {Boolean} has_visitors_parking
 */
BuildingPreview.prototype['has_visitors_parking'] = undefined;

/**
 * @member {Boolean} has_garage
 */
BuildingPreview.prototype['has_garage'] = undefined;

/**
 * @member {Boolean} has_delivery_box
 */
BuildingPreview.prototype['has_delivery_box'] = undefined;






export default BuildingPreview;
